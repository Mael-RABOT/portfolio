export interface FileTreeItem {
  name: string;
  type: 'file' | 'dir';
  path: string;
  children?: FileTreeItem[];
}

export interface GitHubRepoInfo {
  fileCount: number;
  lastCommit: string;
  stars: number;
  forks: number;
  size: number;
  language: string;
  updatedAt: string;
  fileStructure: FileTreeItem[];
}

export interface GitHubApiResponse {
  [repoUrl: string]: GitHubRepoInfo;
}

class GitHubApiService {
  private cache: Map<string, { data: GitHubRepoInfo; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly API_BASE = 'https://api.github.com';
  private readonly GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  constructor() {
    if (this.GITHUB_TOKEN) {
      console.log('🔑 GitHub API: Authenticated requests enabled');
    } else {
      console.warn('⚠️ GitHub API: Using unauthenticated requests (limited to 60/hour)');
    }
  }

  private extractRepoInfo(repoUrl: string): { owner: string; repo: string } | null {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)(?:\.git)?$/);
    if (!match) return null;
    return { owner: match[1], repo: match[2] };
  }

    private async fetchWithCache<T>(url: string): Promise<T> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Portfolio-Website-1.0'
    };

    if (this.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${this.GITHUB_TOKEN}`;
    }
    const response = await fetch(url, { headers });

    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');

    if (!response.ok) {
      if (response.status === 403) {
        if (rateLimitRemaining === '0') {
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown';
          throw new Error(`GitHub API rate limit exceeded. ${this.GITHUB_TOKEN ? 'Authenticated' : 'Unauthenticated'} requests limit reached. Reset at: ${resetTime}`);
        }
        throw new Error('GitHub API access forbidden');
      }
      if (response.status === 404) {
        throw new Error('Repository not found or is private');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private async getFileCount(owner: string, repo: string): Promise<number> {
    try {
      // Get repository contents recursively to count files
      const treeUrl = `${this.API_BASE}/repos/${owner}/${repo}/git/trees/master?recursive=1`;
      const treeData = await this.fetchWithCache<{ tree: Array<{ type: string }> }>(treeUrl);

      // Count only files (not directories)
      return treeData.tree.filter(item => item.type === 'blob').length;
    } catch (error) {
      console.warn(`Could not get file count for ${owner}/${repo}:`, error);
      return 0;
    }
  }

    private async getLastCommit(owner: string, repo: string): Promise<string> {
    try {
      const commitsUrl = `${this.API_BASE}/repos/${owner}/${repo}/commits?per_page=1`;
      const commits = await this.fetchWithCache<Array<{
        commit: { author: { date: string } };
        sha: string
      }>>(commitsUrl);

      if (commits.length === 0) return 'No commits';

      const commitDate = new Date(commits[0].commit.author.date);
      const now = new Date();
      const diffInMs = now.getTime() - commitDate.getTime();

      // Format relative time
      const minutes = Math.floor(diffInMs / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);

      if (minutes < 60) return minutes <= 1 ? '1m ago' : `${minutes}m ago`;
      if (hours < 24) return hours === 1 ? '1h ago' : `${hours}h ago`;
      if (days < 7) return days === 1 ? '1d ago' : `${days}d ago`;
      if (weeks < 4) return weeks === 1 ? '1w ago' : `${weeks}w ago`;
      return months === 1 ? '1mo ago' : `${months}mo ago`;

    } catch (error) {
      console.warn(`Could not get last commit for ${owner}/${repo}:`, error);
      return 'Unknown';
    }
  }

  private async getFileStructure(owner: string, repo: string): Promise<FileTreeItem[]> {
    try {
      // Get the default branch first
      const repoUrl = `${this.API_BASE}/repos/${owner}/${repo}`;
      const repoData = await this.fetchWithCache<{ default_branch: string }>(repoUrl);
      const defaultBranch = repoData.default_branch;

      // Get root directory contents
      const contentsUrl = `${this.API_BASE}/repos/${owner}/${repo}/contents?ref=${defaultBranch}`;
      const rootContents = await this.fetchWithCache<Array<{
        name: string;
        type: 'file' | 'dir';
        path: string;
        download_url?: string;
      }>>(contentsUrl);

      const fileStructure: FileTreeItem[] = [];

      // Process each item in root
      for (const item of rootContents.slice(0, 15)) { // Limit to 15 items to avoid too much data
        const fileItem: FileTreeItem = {
          name: item.name,
          type: item.type,
          path: item.path
        };

        // If it's a directory, fetch one level deep
        if (item.type === 'dir') {
          try {
            const dirContentsUrl = `${this.API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(item.path)}?ref=${defaultBranch}`;
            const dirContents = await this.fetchWithCache<Array<{
              name: string;
              type: 'file' | 'dir';
              path: string;
            }>>(dirContentsUrl);

            fileItem.children = dirContents.slice(0, 10).map(child => ({ // Limit to 10 children per directory
              name: child.name,
              type: child.type,
              path: child.path
            }));
          } catch (error) {
            console.warn(`Could not fetch directory contents for ${item.path}:`, error);
            fileItem.children = [];
          }
        }

        fileStructure.push(fileItem);
      }

      return fileStructure;
    } catch (error) {
      console.warn(`Could not get file structure for ${owner}/${repo}:`, error);
      return [];
    }
  }

  async getRepoInfo(repoUrl: string): Promise<GitHubRepoInfo> {
    // Check cache first
    const cached = this.cache.get(repoUrl);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    const repoInfo = this.extractRepoInfo(repoUrl);
    if (!repoInfo) {
      throw new Error(`Invalid GitHub URL: ${repoUrl}`);
    }

    const { owner, repo } = repoInfo;

    try {
      // Fetch basic repo info
      const repoData = await this.fetchWithCache<{
        stargazers_count: number;
        forks_count: number;
        size: number;
        language: string;
        updated_at: string;
      }>(`${this.API_BASE}/repos/${owner}/${repo}`);

      // Fetch file count, last commit, and file structure in parallel
      const [fileCount, lastCommit, fileStructure] = await Promise.all([
        this.getFileCount(owner, repo),
        this.getLastCommit(owner, repo),
        this.getFileStructure(owner, repo)
      ]);

      const result: GitHubRepoInfo = {
        fileCount,
        lastCommit,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        size: repoData.size,
        language: repoData.language || 'Unknown',
        updatedAt: repoData.updated_at,
        fileStructure
      };

      // Cache the result
      this.cache.set(repoUrl, {
        data: result,
        timestamp: Date.now()
      });

      return result;

    } catch (error) {
      console.error(`Error fetching repo info for ${repoUrl}:`, error);

      // Return fallback data
      return {
        fileCount: 0,
        lastCommit: 'Unknown',
        stars: 0,
        forks: 0,
        size: 0,
        language: 'Unknown',
        updatedAt: new Date().toISOString(),
        fileStructure: []
      };
    }
  }

    async getRateLimit(): Promise<{ remaining: number; reset: Date; limit: number }> {
    try {
      const data = await this.fetchWithCache<{
        rate: { remaining: number; reset: number; limit: number };
      }>(`${this.API_BASE}/rate_limit`);

      return {
        remaining: data.rate.remaining,
        reset: new Date(data.rate.reset * 1000),
        limit: data.rate.limit
      };
    } catch (error) {
      console.warn('Could not fetch rate limit info:', error);
      return { remaining: 0, reset: new Date(), limit: 0 };
    }
  }

  async getMultipleRepoInfo(repoUrls: string[]): Promise<GitHubApiResponse> {
    const results: GitHubApiResponse = {};

    // Check rate limit before starting
    const rateLimit = await this.getRateLimit();

    // Adjust batch size based on authentication and rate limit
    const batchSize = this.GITHUB_TOKEN ? 5 : 2; // Larger batches for authenticated requests
    const delayBetweenBatches = this.GITHUB_TOKEN ? 500 : 2000; // Shorter delays for authenticated requests

    for (let i = 0; i < repoUrls.length; i += batchSize) {
      const batch = repoUrls.slice(i, i + batchSize);

      const batchPromises = batch.map(async (url) => {
        try {
          const info = await this.getRepoInfo(url);
          return { url, info };
        } catch (error) {
          console.error(`Failed to fetch info for ${url}:`, error);
          return {
            url,
            info: {
              fileCount: 0,
              lastCommit: 'Error',
              stars: 0,
              forks: 0,
              size: 0,
              language: 'Unknown',
              updatedAt: new Date().toISOString(),
              fileStructure: []
            }
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(({ url, info }) => {
        results[url] = info;
      });

      // Add delay between batches to respect rate limits
      if (i + batchSize < repoUrls.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    return results;
  }

  clearCache(): void {
    this.cache.clear();
  }

  // Test method to check authentication
  async testAuthentication(): Promise<{ authenticated: boolean; rateLimit: any; user?: string }> {
    try {
      // Test with a simple API call
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'Portfolio-Website-1.0'
      };

      if (this.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${this.GITHUB_TOKEN}`;
      }

      const response = await fetch(`${this.API_BASE}/rate_limit`, { headers });

      if (response.ok) {
        const data = await response.json();

        // Also test user endpoint if authenticated
        let user = undefined;
        if (this.GITHUB_TOKEN) {
          try {
            const userResponse = await fetch(`${this.API_BASE}/user`, { headers });
            if (userResponse.ok) {
              const userData = await userResponse.json();
              user = userData.login;
            }
          } catch (e) {
            console.warn('Could not fetch user info:', e);
          }
        }

        return {
          authenticated: !!this.GITHUB_TOKEN && data.rate.limit > 60,
          rateLimit: data.rate,
          user
        };
      } else {
        return {
          authenticated: false,
          rateLimit: { remaining: 0, limit: 0, reset: 0 }
        };
      }
    } catch (error) {
      console.error('Authentication test failed:', error);
      return {
        authenticated: false,
        rateLimit: { remaining: 0, limit: 0, reset: 0 }
      };
    }
  }
}

export const githubApi = new GitHubApiService();