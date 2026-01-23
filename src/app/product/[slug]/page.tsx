// =====================================================
// PRODUCT DETAIL PAGE
// Gallery-Style Product Presentation
// Route: /product/[slug]
// =====================================================

import "@/app/metal-art.css"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts } from "@/lib/actions/metal-products.actions"
import ProductDetailClient from "./ProductDetailClient"

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
        title: `${product.name} | Metal Art Atelier`,
        description: product.description || `${product.name} - Premium metal ürün`,
        openGraph: {
            title: product.name,
            description: product.description || undefined,
            images: product.image_url ? [product.image_url] : undefined,
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.description || undefined,
            images: product.image_url ? [product.image_url] : undefined
        }
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params
    const result = await getProductBySlug(slug)

    if (!result.success || !result.data) {
        notFound()
    }

    return <ProductDetailClient product={result.data} />
}
