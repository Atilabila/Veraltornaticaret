// =====================================================
// UTILITY FUNCTIONS
// =====================================================

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS merge support
 * This is the standard utility used by Shadcn/UI
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[ğ]/g, 'g')           // Turkish character
        .replace(/[ü]/g, 'u')           // Turkish character
        .replace(/[ş]/g, 's')           // Turkish character
        .replace(/[ı]/g, 'i')           // Turkish character
        .replace(/[ö]/g, 'o')           // Turkish character
        .replace(/[ç]/g, 'c')           // Turkish character
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text
}

/**
 * Format price with Turkish Lira symbol
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(price)
}

/**
 * Format date to Turkish locale
 */
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date))
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
    return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date))
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length) + '...'
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * Generate random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}
