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
    files?: {
        name: string;
        size: number;
        type: string;
        dataUrl?: string; // Base64 for preview (MP-07 only)
    }[];
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

function generateReferenceNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TKL${year}${month}-${random}`;
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

        // Persist to localStorage
        if (typeof window !== 'undefined') {
            const existingQuotes = JSON.parse(localStorage.getItem('metal-poster-quotes') || '[]');
            localStorage.setItem('metal-poster-quotes', JSON.stringify([...existingQuotes, quote]));
        }

        // TODO MP-08: Silent sync to Supabase will be implemented here
        // For MP-07: localStorage-only approach (no DB dependency)

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
