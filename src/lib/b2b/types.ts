// MP-07: B2B Types (Isolated from B2C)

export interface Service {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    technicalDescription: string;
    useCases: string[];
    technicalNotes: {
        tolerances?: string;
        materials?: string;
        quantities?: string;
    };
    icon: string;
}

export interface QuoteRequest {
    id: string; // QTE-YYYYMMDD-XXXX
    fullName: string;
    company?: string;
    email: string;
    phone: string;
    serviceType: string;
    description: string;
    fileMetadata?: {
        fileName: string;
        fileSize: number;
        fileType: string;
    };
    createdAt: string; // ISO timestamp
    status: 'pending' | 'contacted' | 'completed';
}

export interface QuoteDraft {
    fullName: string;
    company?: string;
    email: string;
    phone: string;
    serviceType?: string;
    description: string;
    fileMetadata?: {
        fileName: string;
        fileSize: number;
        fileType: string;
    };
    lastUpdated: string;
}
