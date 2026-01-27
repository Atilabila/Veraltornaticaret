import { Metadata } from 'next';
import { notFound } from "next/navigation"
import { MOCK_PRODUCTS } from "@/lib/data/mock-products"
import { ProductDetailClient } from "./ProductDetailClient"

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);

    if (!product) {
        return { title: 'Ürün Bulunamadı' };
    }

    return {
        title: `${product.name} | İzmir Alsancak Metal Ürünler`,
        description: product.description || `${product.name} endüstriyel metal ürün detayı ve teknik özellikleri.`,
    };
}

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
