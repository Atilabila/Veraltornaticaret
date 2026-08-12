import { Suspense } from "react"
import { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/actions/metal-products.actions"
import { PageShell } from "@/components/layout/PageShell"
import { CatalogContainer } from "@/components/product/CatalogContainer"

export const metadata: Metadata = {
    title: "Katalog | VERAL Metal Works",
    description: "Endüstriyel metal tablo ve dekorasyon koleksiyonu.",
    alternates: {
        canonical: "/urunler",
    },
};

export const revalidate = 0; // Disable cache for debugging or set to 60

export default async function ProductsPage() {
    const [
        { data: products },
        { data: categories },
        { data: showcase }
    ] = await Promise.all([
        getProducts(false),
        getCategories(),
        getProducts(true)
    ])

    return (
        <PageShell variant="light" padded={false}>
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-[#161616]">Yükleniyor...</div>}>
                <CatalogContainer
                    products={products || []}
                    showcaseProducts={showcase || []}
                    categories={categories || []}
                />
            </Suspense>
        </PageShell>
    )
}
