"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { MetalProduct } from "@/lib/supabase/metal-products.types"
import { ImageViewer } from "@/components/product/ImageViewer"
import { ProductVariants, VariantState } from "@/components/product/ProductVariants"
import { ProductInfoBlocks, ProductFAQ } from "@/components/product/ProductInfo"

interface ProductDetailClientProps {
    product: MetalProduct
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
    const [variant, setVariant] = React.useState<VariantState>({ size: '45x60', orientation: 'vertical' })
    const [price, setPrice] = React.useState(product.price)

    // Simulate price change based on size
    React.useEffect(() => {
        const multipliers: Record<string, number> = {
            '30x45': 0.8,
            '45x60': 1,
            '50x70': 1.2,
            '70x100': 1.6
        }
        setPrice(product.price * multipliers[variant.size])
    }, [variant.size, product.price])

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Breadcrumb / Nav */}
            <div className="container px-4 py-6">
                <Link href="/urunler" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kataloğa Dön
                </Link>
            </div>

            <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Visuals - Now interactive */}
                <div className="space-y-4">
                    {product.image_url ? (
                        <ImageViewer src={product.image_url} alt={product.name} />
                    ) : (
                        <div className="aspect-square bg-muted/20 rounded-2xl animate-pulse" />
                    )}
                    <p className="text-center text-xs text-muted-foreground">
                        Görsele tıklayarak yakınlaştırabilirsiniz
                    </p>
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="uppercase tracking-widest text-[10px]">
                                {product.category?.name || "Kategorisiz"}
                            </Badge>
                            {product.stock_quantity > 0 ? (
                                <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                                    Stokta Var
                                </Badge>
                            ) : (
                                <Badge variant="secondary">Tükendi</Badge>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-mono text-primary font-bold">
                            {formatPrice(price)}
                        </p>
                    </div>

                    {/* Interactive Variants */}
                    <ProductVariants onChange={setVariant} />

                    {/* Static Desc */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    {/* Features List */}
                    {product.features && product.features.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
                            {product.features.map(f => (
                                <div key={f.id} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">{f.feature_text}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        <Button size="lg" className="w-full text-lg h-14 uppercase tracking-wider font-bold">
                            Hemen Satın Al ({variant.size})
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            Kurumsal alım ve toplu siparişler için iletişime geçin.
                        </p>
                    </div>

                    {/* Blocks */}
                    <ProductInfoBlocks />

                    {/* FAQ */}
                    <ProductFAQ />

                </div>
            </div>
        </div>
    )
}
