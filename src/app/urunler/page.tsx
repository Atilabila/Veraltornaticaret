import { Suspense } from "react"
import { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/actions/metal-products.actions"
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { CatalogContainer } from "@/components/product/CatalogContainer"

export const metadata: Metadata = {
    title: "Katalog | VERAL Metal Works",
    description: "Endüstriyel metal tablo ve dekorasyon koleksiyonu.",
};

export const revalidate = 0; // Disable cache for debugging or set to 60

export default async function ProductsPage() {
    const [{ data: products }, { data: categories }] = await Promise.all([
        getProducts(false),
        getCategories()
    ])

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-black">Yükleniyor...</div>}>
                <CatalogContainer
                    products={products || []}
                    categories={categories || []}
                />
            </Suspense>

            <Footer />
        </main>
    )
}

