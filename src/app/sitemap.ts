import { MetadataRoute } from 'next'
import { getProducts, getCategories } from '@/lib/actions/metal-products.actions'
import { ContentService } from '@/lib/supabase/content.service'
import { MOCK_PRODUCTS } from '@/lib/data/mock-products'

// Blog gönderileri
const blogSlugs = [
    'takvim-tenekesi-imalati-izmir',
    'dosya-teli-ve-arsiv-sistemleri',
    'miknatisli-magnet-ve-metal-poster-estetigi',
    'endustriyel-metal-baski-rehberi',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://veralteneketicaret.com'
    const lastMod = new Date()

    let products: any[] = []
    let categories: any[] = []
    let services: any[] = []

    try {
        const [productsRes, categoriesRes, siteContent] = await Promise.all([
            getProducts().catch(() => ({ success: false, data: [] })),
            getCategories().catch(() => ({ success: false, data: [] })),
            ContentService.getContent().catch(() => null)
        ])

        if (productsRes.success && productsRes.data && productsRes.data.length > 0) {
            products = productsRes.data
        } else {
            products = MOCK_PRODUCTS
        }

        if (categoriesRes.success && categoriesRes.data) {
            categories = categoriesRes.data
        }

        let servicesRaw = siteContent?.services || []
        if (!servicesRaw.find((s: any) => s.slug === 'dosya-teli')) {
            const { defaultContent } = await import('@/store/useContentStore')
            servicesRaw = defaultContent.services || []
        }
        services = servicesRaw
    } catch {
        products = MOCK_PRODUCTS
    }

    // 1. Ana Statik Sayfalar
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/urunler`,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: lastMod,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: lastMod,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/sss`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/teklif-al`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/yazar/atila-bila`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/sartlar`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/kosullar`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/gizlilik`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/kvkk`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/mesafeli-satis`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/on-bilgilendirme`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/iade-iptal`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/cerez`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.4,
        }
    ]

    // 2. Hizmet Sayfaları
    const servicePages: MetadataRoute.Sitemap = services
        .filter(s => s.isActive !== false)
        .map(service => ({
            url: `${baseUrl}/hizmetler/${service.slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

    // 3. Blog Yazıları (E-E-A-T içerikleri)
    const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 4. Ürün Detay Sayfaları (Graceful Fallback destekli)
    const productPages: MetadataRoute.Sitemap = products
        .filter(p => p.is_active !== false)
        .map(product => ({
            url: `${baseUrl}/urunler/${product.slug}`,
            lastModified: new Date(product.updated_at || product.created_at || lastMod),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }))

    return [...staticPages, ...servicePages, ...blogPostPages, ...productPages]
}
