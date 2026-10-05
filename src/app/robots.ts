import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin',
                    '/admin/',
                    '/admin-login',
                    '/api/admin/',
                    '/api/auth/',
                ],
            },
            {
                // Explicitly unblock Googlebot & Googlebot-Image
                userAgent: ['Googlebot', 'Googlebot-Image', 'Bingbot', 'Applebot'],
                allow: '/',
                disallow: [
                    '/admin',
                    '/admin/',
                    '/admin-login',
                ],
            },
            {
                // Machine Layer & GEO: Full permission for AI search crawlers to cite and index brand
                userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'OAI-SearchBot', 'Bytespider', 'CCBot'],
                allow: '/',
                disallow: ['/admin/'],
            }
        ],
        sitemap: 'https://veralteneketicaret.com/sitemap.xml',
    }
}
