// =====================================================
// METAL PRODUCTS SHOWCASE PAGE
// Landing Page with Scroll-Triggered Animations
// Route: /metal-showcase
// =====================================================

import "@/app/metal-art.css"
import { getProducts } from "@/lib/actions/metal-products.actions"
import { ProductShowcase } from "@/components/landing"
import { CollectionSidebar, CollectionButton } from "@/components/cart/CollectionSidebar"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Metal Art Atelier | Premium Metal Ürünler",
    description: "Endüstriyel kalite, sanatsal tasarım. Tel, etiket ve mıknatıs çözümlerinde güvenilir partneriniz.",
    keywords: ["metal", "endüstriyel", "tel", "etiket", "mıknatıs", "premium"],
}

// Revalidate every 60 seconds for fresh data
export const revalidate = 60

export default async function MetalShowcasePage() {
    // Fetch products from Supabase using server action
    const result = await getProducts(true)

    const products: MetalProduct[] = result.success && result.data
        ? result.data
        : []

    return (
        <main className="min-h-screen bg-zinc-950">
            <ProductShowcase products={products} />

            {/* Cart Components */}
            <CollectionSidebar />
            <CollectionButton />
        </main>
    )
}
