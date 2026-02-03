import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/_next/',
                    '/static/',
                    '/*.json$',
                ],
            },
            {
                // GEO Focus: Allow AI crawlers to index content for AI Search recommendations
                userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'OAI-SearchBot'],
                allow: '/',
            }
        ],
        sitemap: 'https://veralteneketicaret.com/sitemap.xml',
    }
}
