"use client";

import { create } from 'zustand';

// =====================================================
// QUOTE TYPES
// =====================================================

export type ServiceType =
    | 'torna'
    | 'ozel-metal-uretim'
    | 'seri-imalat'
    | 'metal-etiket'
    | 'diger';

export interface QuoteRequest {
    id: string;
    referenceNumber: string;
    fullName: string;
    company?: string;
    email: string;
    phone: string;
    serviceType: ServiceType;
    description: string;
    // MP-07: Single file metadata only (NO base64)
    fileMetadata?: {
        fileName: string;
        fileSize: number;
        fileType: string;
    };
    status: 'pending' | 'contacted' | 'quoted' | 'closed';
    createdAt: string;
    updatedAt: string;
}

interface QuoteState {
    quotes: QuoteRequest[];
    currentQuote: QuoteRequest | null;

    // Actions
    createQuote: (data: Omit<QuoteRequest, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>) => QuoteRequest;
    getQuote: (id: string) => QuoteRequest | undefined;
    setCurrentQuote: (quote: QuoteRequest | null) => void;
}

// =====================================================
// HELPERS
// =====================================================

// MP-07: Reference format QTE-YYYYMMDD-XXXX (LOCKED)
function generateReferenceNumber(): string {
    const now = new Date();

    // Date part: YYYYMMDD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePart = `${year}${month}${day}`;

    // Random part: 4 alphanumeric characters (uppercase)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `QTE-${datePart}-${randomPart}`;
}

function generateQuoteId(): string {
    return `quote_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// =====================================================
// QUOTE STORE (localStorage-based)
// =====================================================

export const useQuoteStore = create<QuoteState>((set, get) => ({
    quotes: [],
    currentQuote: null,

    createQuote: (data) => {
        const now = new Date().toISOString();

        const quote: QuoteRequest = {
            id: generateQuoteId(),
            referenceNumber: generateReferenceNumber(),
            status: 'pending',
            ...data,
            createdAt: now,
            updatedAt: now,
        };

        set((state) => ({
            quotes: [...state.quotes, quote],
            currentQuote: quote,
        }));

        // Persist to localStorage (IMMEDIATE - user flow continues)
        if (typeof window !== 'undefined') {
            const existingQuotes = JSON.parse(localStorage.getItem('metal-poster-quotes') || '[]');
            localStorage.setItem('metal-poster-quotes', JSON.stringify([...existingQuotes, quote]));
        }

        // MP-08: Silent Sync to Supabase (BACKGROUND - non-blocking)
        if (typeof window !== 'undefined') {
            import('@/lib/sync/syncService').then(({ syncQuoteToSupabase }) => {
                syncQuoteToSupabase(quote).catch((error) => {
                    console.error('[QUOTE] Silent sync failed (non-critical):', error);
                    // User flow NOT affected - quote is in localStorage
                });
            });
        }

        console.log('[QUOTE] Created:', quote.referenceNumber, quote.id);
        return quote;
    },

    getQuote: (id) => {
        // First check in-memory
        let quote = get().quotes.find(q => q.id === id);

        // If not found, try localStorage
        if (!quote && typeof window !== 'undefined') {
            const quotes = JSON.parse(localStorage.getItem('metal-poster-quotes') || '[]');
            quote = quotes.find((q: QuoteRequest) => q.id === id);
        }

        return quote;
    },

    setCurrentQuote: (quote) => set({ currentQuote: quote }),
}));

// =====================================================
// SERVER-SIDE COMPATIBLE HELPER
// =====================================================

export function getQuoteFromStorage(id: string): QuoteRequest | null {
    if (typeof window === 'undefined') return null;

    try {
        const quotes = JSON.parse(localStorage.getItem('metal-poster-quotes') || '[]');
        return quotes.find((q: QuoteRequest) => q.id === id) || null;
    } catch {
        return null;
    }
}
