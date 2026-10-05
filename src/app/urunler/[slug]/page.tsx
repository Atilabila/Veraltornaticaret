import "@/app/metal-art.css"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/actions/metal-products.actions"
import { ProductDetail } from "@/components/product/ProductDetail"
import { ProductSchema } from "@/components/seo/ProductSchema"
import { FAQSchema } from "@/components/seo/FAQSchema"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { MOCK_PRODUCTS } from "@/lib/data/mock-products"

interface PageProps {
    params: Promise<{ slug: string }>
}

// Generate static paths
export async function generateStaticParams() {
    try {
        const result = await getProducts()
        if (result.success && result.data && result.data.length > 0) {
            return result.data
                .filter(p => p.is_active)
                .map(product => ({
                    slug: product.slug
                }))
        }
    } catch {
        // Fallback
    }

    return MOCK_PRODUCTS.map(p => ({ slug: p.slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    let product: any = null

    try {
        const result = await getProductBySlug(slug)
        if (result.success && result.data) {
            product = result.data
        }
    } catch {
        // Fallback
    }

    if (!product) {
        product = MOCK_PRODUCTS.find(p => p.slug === slug)
    }

    if (!product) {
        return {
            title: "Ürün Bulunamadı | Veral Torna & Teneke",
            description: "Aradığınız metal ürün bulunamadı."
        }
    }

    const description = product.description || `${product.name} - İzmir Alsancak atölyemizde 1200 DPI UV baskı veya torna kalıp standardında üretilmiştir.`

    return {
        title: `${product.name} | Veral Ticaret`,
        description: description.substring(0, 155),
        alternates: {
            canonical: `https://veralteneketicaret.com/urunler/${product.slug}`,
        },
        openGraph: {
            title: `${product.name} | Veral Ticaret`,
            description: description.substring(0, 155),
            images: product.image_url ? [product.image_url] : undefined,
            type: "website",
            url: `https://veralteneketicaret.com/urunler/${product.slug}`,
        },
        other: {
            "product:price:amount": product.price.toString(),
            "product:price:currency": "TRY",
            "product:availability": product.stock_quantity > 0 ? "instock" : "oos",
            "product:brand": "VERAL"
        }
    }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params
    let product: any = null

    try {
        const result = await getProductBySlug(slug)
        if (result.success && result.data) {
            product = result.data
        }
    } catch {
        // Fallback
    }

    if (!product) {
        product = MOCK_PRODUCTS.find(p => p.slug === slug)
    }

    if (!product) {
        notFound()
    }

    // Fetch related products
    let relatedProducts: any[] = []
    try {
        if (product.category_id) {
            const relatedRes = await getRelatedProducts(product.category_id, product.id)
            if (relatedRes.success && relatedRes.data) {
                relatedProducts = relatedRes.data
            }
        }
    } catch {
        relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)
    }

    if (relatedProducts.length === 0) {
        relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)
    }

    const absoluteProductUrl = `https://veralteneketicaret.com/urunler/${product.slug}`;

    const productFaqs = [
        {
            question: `${product.name} nasıl monte edilir?`,
            answer: "Ürünümüzle birlikte gönderilen 3M VHB manyetik tutucu tabaka duvara yapıştırılır. N35 neodimyum mıknatıs sistemi sayesinde duvarı delmeden, çivi kullanmadan 30 saniyede monte edilir."
        },
        {
            question: "Baskı kalitesi ve solmama garantisi var mıdır?",
            answer: "1200 DPI endüstriyel UV baskı ve çizilmez mat vernik katmanı uygulanmaktadır. Doğrudan güneş ışığı ve neme karşı 10 yıl renk solmama garantisi altındadır."
        },
        {
            question: "Kargo süreci ve hasar koruması nasıl sağlanır?",
            answer: "Özel sertleştirilmiş ambalaj ve köşe tamponları ile Türkiye'nin her yerine sigortalı gönderilir. Olası kargo hasarlarında 48 saat içinde yenisi ücretsiz sevk edilir."
        }
    ]

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Ürün Kataloğu", url: "/urunler" },
        { name: product.name, url: `/urunler/${product.slug}` }
    ]

    return (
        <>
            <ProductSchema product={{
                name: product.name,
                description: product.description || "",
                image: product.image_url || "",
                sku: product.sku || product.id,
                price: product.price,
                availability: product.stock_quantity > 0 ? "InStock" : "OutOfStock",
                url: absoluteProductUrl
            }} />
            <FAQSchema items={productFaqs} />

            <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            <ProductDetail product={product} relatedProducts={relatedProducts} />
        </>
    )
}
