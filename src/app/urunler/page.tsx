import { Metadata } from "next"
import { MetalProduct } from "@/lib/supabase/metal-products.types"

export const metadata: Metadata = {
    title: "Ürün Kataloğu | VERAL Metal Ürünler & Endüstriyel Levhalar",
    description: "VERAL metal ürün kataloğu; endüstriyel levhalar, borular ve özel üretim metal parçalar. İzmir Alsancak güvencesiyle yüksek kalite standartları.",
};

import { getProducts } from "@/lib/actions/metal-products.actions"
import { ProductGrid } from "@/components/product/ProductGrid"
import { Button } from "@/components/ui/button"

export default async function ProductsPage() {
    const { data: products } = await getProducts()


    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-muted/10 border-b border-border py-12 md:py-20">
                <div className="container px-4 md:px-6">
                    <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                        Ürün Kataloğu
                    </h1>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Endüstriyel standartlarda üretilen yüksek kaliteli metal ürünlerimiz.
                        Dayanıklılık ve estetik bir arada.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container px-4 md:px-6 py-12">
                {/* Filters (Mock) */}
                <div className="flex flex-wrap gap-4 mb-10 overflow-x-auto pb-4">
                    <Button variant="default" className="rounded-full">Tümü</Button>
                    <Button variant="outline" className="rounded-full">Endüstriyel</Button>
                    <Button variant="outline" className="rounded-full">Levhalar</Button>
                    <Button variant="outline" className="rounded-full">Borular</Button>
                </div>

                <ProductGrid products={products || []} />
            </div>
        </div>
    )
}
