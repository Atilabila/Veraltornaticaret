// MP-07: localStorage Utilities for B2B Quotes

import { QuoteRequest, QuoteDraft } from './types';

const QUOTES_KEY = 'metal-poster-quotes';
const DRAFT_KEY = 'metal-poster-quote-draft';

// ============================================
// QUOTE STORAGE (Array - Never Auto-Clear)
// ============================================

/**
 * Get all quotes from localStorage
 * B2B customers may return after months - quotes persist until manually deleted
 */
export function getAllQuotes(): QuoteRequest[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(QUOTES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load quotes:', error);
        return [];
    }
}

/**
 * Save a new quote to localStorage
 */
export function saveQuote(quote: QuoteRequest): void {
    if (typeof window === 'undefined') return;

    try {
        const quotes = getAllQuotes();
        quotes.unshift(quote); // Add to beginning (newest first)
        localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
    } catch (error) {
        console.error('Failed to save quote:', error);
        throw new Error('Teklif kaydedilemedi. Lütfen tekrar deneyin.');
    }
}

/**
 * Get a specific quote by reference number
 */
export function getQuoteByReference(reference: string): QuoteRequest | null {
    const quotes = getAllQuotes();
    return quotes.find(q => q.id === reference) || null;
}

/**
 * Delete a quote (manual user action only)
 */
export function deleteQuote(reference: string): void {
    if (typeof window === 'undefined') return;

    try {
        const quotes = getAllQuotes();
        const filtered = quotes.filter(q => q.id !== reference);
        localStorage.setItem(QUOTES_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Failed to delete quote:', error);
    }
}

// ============================================
// DRAFT STORAGE (Single Object - Auto-Save)
// ============================================

/**
 * Get current draft from localStorage
 */
export function getDraft(): QuoteDraft | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(DRAFT_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Failed to load draft:', error);
        return null;
    }
}

/**
 * Save draft to localStorage (auto-save on form change)
 */
export function saveDraft(draft: QuoteDraft): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (error) {
        console.error('Failed to save draft:', error);
    }
}

/**
 * Clear draft after successful submission
 */
export function clearDraft(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
        console.error('Failed to clear draft:', error);
    }
}

// ============================================
// TODO: MP-08 - Database Sync
// ============================================
// When MP-08 is implemented:
// 1. Add server action to sync quotes to Supabase
// 2. Add background sync on app load
// 3. Add conflict resolution (localStorage vs DB)
// 4. Keep localStorage as fallback for offline capability
