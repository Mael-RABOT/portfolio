import { getAllPortfolioData, PortfolioDataCollection } from '../data/portfolio.data';

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

class PortfolioApiService {
    /**
     * Local Data Provider
     * Fetches directly from the local expandable registry in `src/data/`
     * without needing any remote server or network calls.
     */
    async getAllData(): Promise<PortfolioDataCollection> {
        return Promise.resolve(getAllPortfolioData());
    }

    getAllDataSync(): PortfolioDataCollection {
        return getAllPortfolioData();
    }
}

export const portfolioApi = new PortfolioApiService();
export default portfolioApi;
