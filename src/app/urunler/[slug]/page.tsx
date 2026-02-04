import "@/app/metal-art.css"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/actions/metal-products.actions"
import ProductDetailClient from "@/app/product/[slug]/ProductDetailClient"
import { ProductSchema } from "@/components/seo/ProductSchema"

interface PageProps {
    params: Promise<{ slug: string }>
}

// Generate static paths
export async function generateStaticParams() {
    const result = await getProducts()
    if (!result.success || !result.data) return []

    return result.data
        .filter(p => p.is_active)
        .map(product => ({
            slug: product.slug
        }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const result = await getProductBySlug(slug)

    if (!result.success || !result.data) {
        return {
            title: "Ürün Bulunamadı | Metal Art Atelier",
            description: "Aradığınız ürün bulunamadı."
        }
    }

    const product = result.data

    return {
        title: `${product.name} | VERAL Metal Works`,
        description: product.description || `${product.name} - Premium endüstriyel metal tasarım.`,
        openGraph: {
            title: product.name,
            description: product.description || undefined,
            images: product.image_url ? [product.image_url] : undefined,
            type: "website",
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
    const result = await getProductBySlug(slug)

    if (!result.success || !result.data) {
        notFound()
    }

    const product = result.data

    // Fetch related products
    let relatedProducts: any[] = []
    if (product.category_id) {
        const relatedRes = await getRelatedProducts(product.category_id, product.id)
        if (relatedRes.success && relatedRes.data) {
            relatedProducts = relatedRes.data
        }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://veralmetal.com';
    const absoluteProductUrl = `${baseUrl}/urunler/${product.slug}`;

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
            {/* Reuse the premium ProductDetailClient from the other route */}
            <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </>
    )
}
