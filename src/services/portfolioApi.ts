const API_BASE = 'https://portfolio.api.maelrabot.com/api';
/* eslint-disable */

export interface Link {
    id: number;
    url: string;
    item: string; 
}

export interface Image {
    id: number;
    externalId: string;
    item: string;
    url?: string;
}

export interface PortfolioItem {
    '@id': string;
    id: string;
    name?: string;
    type?: string;
    status?: 'active' | 'completed' | 'archived';
    language?: string;
    description?: string;
    technologies?: string[];
    repository?: string;
    demo?: string;
    position?: string;
    company?: string;
    duration?: string;
    location?: string;
    contractType?: string;
    responsibilities?: string[];
    degree?: string;
    institution?: string;
    year?: string;
    bullets?: string[];
    images?: Image[];
    links?: Link[];
    itemType: 'project' | 'experience' | 'education' | 'certification';
    startDate?: string;
    endDate?: string;
    school?: string;
    jobTitle?: string;
    dataSource?: string;
    additionalInfo?: Record<string, any>;
}

interface HydraCollection<T> {
    member: T[];
    totalItems: number;
}

class PortfolioApiService {
    private async fetchFromApi<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            headers: {
                'accept': 'application/ld+json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    }

    async getAllData(): Promise<{ projects: PortfolioItem[], experiences: PortfolioItem[], educations: PortfolioItem[] }> {
        const itemsResponse = await this.fetchFromApi<HydraCollection<PortfolioItem>>('items?page=1');
        const linksResponse = await this.fetchFromApi<HydraCollection<Link>>('links?page=1');
        const imagesResponse = await this.fetchFromApi<HydraCollection<Image>>('images?page=1');

        const items = itemsResponse.member || [];
        const links = linksResponse.member || [];
        const images = imagesResponse.member || [];

        // @ts-ignore expected
        const filterdItems = items.filter(item => item["user"] === "/api/users/2"); // my user id

        const processedItems = filterdItems.map(item => {
            const itemImages = images
                .filter(image => image.item === item['@id'])
                .map(image => ({
                    ...image,
                    url: `http://cloud.api.maelrabot.com/api/items/${image.externalId}/shared`
                }));

            const itemLinks = links.filter(link => link.item === item['@id']);

            const demoLink = itemLinks.find(l => l.url.includes('http'))?.url;

            const technologies = (item as any).skills || [];

            const responsibilities = (item as any).informations?.responsibilities || item.bullets || [];

            let additionalInfo = (item as any).additionalInfo || (item as any).informations;
            if (additionalInfo) {
                const { responsibilities: _, ...rest } = additionalInfo;
                additionalInfo = Object.keys(rest).length > 0 ? rest : undefined;
            }

            return {
                ...item,
                dataSource: (item as any).datasource,
                itemType: item.type?.toLowerCase() as 'project' | 'experience' | 'education' | 'certification',
                position: item.name,
                institution: (item as any).companyName || item.school,
                company: (item as any).companyName,
                degree: item.name, // Name is both position or degree
                technologies,
                responsibilities,
                bullets: responsibilities,
                images: itemImages,
                links: itemLinks,
                demo: demoLink || item.demo,
                repository: itemLinks.find(l => l.url.includes('github.com'))?.url || item.repository,
                startDate: (item as any).startedAt ? new Date((item as any).startedAt).getFullYear().toString() : item.startDate,
                endDate: (item as any).endedAt ? new Date((item as any).endedAt).getFullYear().toString() : item.endDate || 'Present',
                additionalInfo
            };
        }).filter(item => item !== null) as PortfolioItem[];

        const projects = processedItems.filter(item => item.itemType === 'project');
        const experiences = processedItems.filter(item => item.itemType === 'experience');
        const educations = processedItems.filter(item => item.itemType === 'education');

        return { projects, experiences, educations };
    }
}

export const portfolioApi = new PortfolioApiService();
