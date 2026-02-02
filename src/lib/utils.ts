
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
    if (!path) return '/placeholder.png';
    if (path.startsWith('http') || path.startsWith('data:')) return path;

    // Normalize path: replace backslashes, handle leading slash
    let normalized = path.replace(/\\/g, '/');

    // If it's a relative path from public, ensure it starts with /
    if (!normalized.startsWith('/') && !normalized.includes('://')) {
        normalized = '/' + normalized;
    }

    // Handle Turkish characters and spaces to match the filesystem normalization
    const turkishMap: Record<string, string> = {
        'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c',
        'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'İ': 'i', 'Ö': 'o', 'Ç': 'c',
        ' ': '-'
    };

    let slugified = normalized.toLowerCase().split('').map(char => turkishMap[char] || char).join('');

    // Remove duplicate hyphens and keep only valid characters (preserving slashes and dots)
    // We allow / and . for paths and extensions
    slugified = slugified.replace(/[^a-z0-9\/\.-]/g, '-').replace(/-+/g, '-');

    // Avoid double hyphens before extension
    slugified = slugified.replace(/-\./g, '.');

    return slugified;
}
