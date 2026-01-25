import { notFound } from "next/navigation"
import { MOCK_PRODUCTS } from "@/lib/data/mock-products"
import { ProductDetailClient } from "./ProductDetailClient"

async function getProduct(slug: string) {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_PRODUCTS.find(p => p.slug === slug)
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug)

    if (!product) {
        notFound()
    }

    return <ProductDetailClient product={product} />
}
