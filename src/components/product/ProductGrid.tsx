"use client"

import { MetalProduct } from "@/lib/supabase/metal-products.types"
import ProductCard from "./ProductCard"
import { EmptyState } from "@/components/ui/empty-state"
import { PackageOpen } from "lucide-react"

interface ProductGridProps {
    products: MetalProduct[]
    loading?: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-[400px] bg-muted/10 rounded-lg animate-pulse" />
                ))}
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="py-12">
                <EmptyState
                    title="Ürün Bulunamadı"
                    description="Aradığınız kriterlere uygun ürün mevcut değil."
                    icon={<PackageOpen className="w-12 h-12 opacity-50" />}
                />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
