import { MetadataRoute } from 'next'
import { getProducts, getCategories } from '@/lib/actions/metal-products.actions'
import { ContentService } from '@/lib/supabase/content.service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://veralteneketicaret.com'
    const lastMod = new Date()

    // Fetch dynamic data
    const [productsRes, categoriesRes, siteContent] = await Promise.all([
        getProducts(), // Fetches active products by default
        getCategories(),
        ContentService.getContent()
    ])

    const products = productsRes.success && productsRes.data ? productsRes.data : []
    const categories = categoriesRes.success && categoriesRes.data ? categoriesRes.data : []
    const services = siteContent?.services || []

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/urunler`,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/metal-urunler`,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: lastMod,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/teklif-al`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/sartlar`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/kosullar`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/gizlilik`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/kvkk`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/mesafeli-satis`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/on-bilgilendirme`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/iade-iptal`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/cerez`,
            lastModified: lastMod,
            changeFrequency: 'yearly',
            priority: 0.5,
        }
    ]

    // Service pages
    const servicePages: MetadataRoute.Sitemap = services
        .filter(s => s.isActive)
        .map(service => ({
            url: `${baseUrl}/hizmetler/${service.slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly',
            priority: 0.8,
        }))

    // Category pages (Katalog filters)
    const categoryPages: MetadataRoute.Sitemap = categories
        .filter(c => c.is_active)
        .map(cat => ({
            url: `${baseUrl}/urunler?cat=${cat.slug}`,
            lastModified: new Date(cat.updated_at || cat.created_at),
            changeFrequency: 'weekly',
            priority: 0.8,
        }))

    // Product detail pages
    const productPages: MetadataRoute.Sitemap = products
        .filter(p => p.is_active)
        .map(product => ({
            url: `${baseUrl}/urunler/${product.slug}`,
            lastModified: new Date(product.updated_at || product.created_at),
            changeFrequency: 'weekly',
            priority: 0.8,
        }))

    return [...staticPages, ...servicePages, ...categoryPages, ...productPages]
}
