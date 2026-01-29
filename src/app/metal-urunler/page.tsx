import "@/app/metal-art.css"
import { getProducts } from "@/lib/actions/metal-products.actions"
import { ProductShowcase } from "@/components/landing"
import { CollectionSidebar, CollectionButton } from "@/components/cart/CollectionSidebar"
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Metal Atölyesi | VERAL Metal Works",
    description: "Endüstriyel ürünler özel serisi.",
}

export const revalidate = 60

export default async function MetalUrunlerPage() {
    const result = await getProducts()
    const products: MetalProduct[] = result.success && result.data ? result.data : []

    return (
        <main className="min-h-screen bg-zinc-950">
            <Navigation />
            <div className="pt-20">
                <ProductShowcase products={products} />
            </div>
            <Footer />
            <CollectionSidebar />
            <CollectionButton />
        </main>
    )
}
