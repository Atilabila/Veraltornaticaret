
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(price)
}

export function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date))
}

export function slugify(str: string) {
    return str
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

export function normalizeImagePath(path: string | undefined | null): string {
    if (!path || path === "" || path === "null") return '/placeholder.png';

    // If it's an absolute URL, data URI or already normalized, return as is
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('https://')) {
        return path;
    }

    // If it looks like a Supabase URL but missing the protocol (unlikely but safe)
    if (path.includes('supabase.co') || path.includes('storage/v1')) {
        return path.startsWith('//') ? 'https:' + path : path;
    }

    // Auto-fix paths that are missing the /catalog prefix but start with known categories
    let normalized = path.replace(/\\/g, '/');

    // For local assets, we can be more strict, but for storage/external we must preserve case
    const isCategoryPath = (p: string) => {
        const cat = p.startsWith('/') ? p.substring(1).toLowerCase() : p.toLowerCase();
        return cat.startsWith('cars/') || cat.startsWith('characters/') || cat.startsWith('ataturk/') || cat.startsWith('city/') || cat.startsWith('motors/');
    };

    if (isCategoryPath(normalized) && !normalized.includes('/catalog/')) {
        const cleanPath = normalized.startsWith('/') ? normalized.substring(1) : normalized;
        normalized = '/catalog/' + cleanPath;
    }

    // Ensure leading slash for relative paths
    if (normalized.startsWith('/')) {
        return normalized;
    }

    return '/' + normalized;
}

export function toWebp(url: string | undefined | null): string {
    if (!url) return '/placeholder.png';
    return url.replace(/\.(png|jpg|jpeg)(\?.*)?$/i, ".webp$2");
}
