
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

    // If it's an absolute URL or data URI, return as is
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
        return path;
    }

    // Auto-fix paths that are missing the /catalog prefix but start with known categories
    let normalized = path.replace(/\\/g, '/');

    // Check both paths starting with and without /
    const isCategoryPath = (p: string) => {
        const cat = p.startsWith('/') ? p.substring(1) : p;
        return cat.startsWith('cars/') || cat.startsWith('characters/') || cat.startsWith('ataturk/') || cat.startsWith('city/') || cat.startsWith('motors/');
    };

    if (isCategoryPath(normalized) && !normalized.includes('/catalog/')) {
        const cleanPath = normalized.startsWith('/') ? normalized.substring(1) : normalized;
        normalized = '/catalog/' + cleanPath;
    }

    // If it's clearly a local public path (starts with /), don't over-normalize
    if (normalized.startsWith('/')) {
        return normalized;
    }

    // For other relative paths, ensure leading slash and replace invalid chars
    // But be careful not to break the structure
    return '/' + normalized.toLowerCase()
        .replace(/[ğĞ]/g, 'g')
        .replace(/[üÜ]/g, 'u')
        .replace(/[şŞ]/g, 's')
        .replace(/[ıİ]/g, 'i')
        .replace(/[öÖ]/g, 'o')
        .replace(/[çÇ]/g, 'c')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\/\.-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/-\./g, '.');
}

export function toWebp(url: string | undefined | null): string {
    if (!url) return '/placeholder.png';
    return url.replace(/\.(png|jpg|jpeg)(\?.*)?$/i, ".webp$2");
}
