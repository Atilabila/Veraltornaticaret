import { MetadataRoute } from 'next'
import { ContentService } from '@/lib/supabase/content.service'
import type { SiteContent } from '@/store/useContentStore'
import { blogPosts } from '@/lib/blog-posts'
import { SITE_ORIGIN } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_ORIGIN
    // Sabit lastmod yok: gerçek derleme/yayın anı (CDN cache ayrı konu)
    const lastMod = new Date()

    let services: SiteContent['services'] = []

    try {
        const siteContent = await ContentService.getContent().catch(() => null)

        let servicesRaw = siteContent?.services || []
        if (!servicesRaw.find((s) => s.slug === 'dosya-teli')) {
            const { defaultContent } = await import('@/store/useContentStore')
            servicesRaw = defaultContent.services || []
        }
        services = servicesRaw
    } catch {
        services = []
    }

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: lastMod, changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/hizmetler`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
        { url: `${baseUrl}/blog`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
        { url: `${baseUrl}/sss`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/teklif-al`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.85 },
        { url: `${baseUrl}/hakkimizda`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/iletisim`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/yazar/oguzcan-veral`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/sartlar`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/gizlilik`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/kvkk`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/mesafeli-satis`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/on-bilgilendirme`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/iade-iptal`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
        { url: `${baseUrl}/cerez`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.4 },
    ]

    const servicePages: MetadataRoute.Sitemap = services
        .filter((s) => s.isActive !== false)
        .map((service) => ({
            url: `${baseUrl}/hizmetler/${service.slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

    const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...servicePages, ...blogPostPages]
}
