// Product Card Component using UI Kit
"use client"

import Link from "next/link"
import { ArrowUpRight, Shield, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MetalProduct } from "@/lib/supabase/metal-products.types"
import { cn, formatPrice } from "@/lib/utils"

interface ProductCardProps {
    product: MetalProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div
            className="group relative flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50"
        >
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-muted/20">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        <Sparkles className="w-12 h-12 opacity-20" />
                    </div>
                )}

                {/* Overlay Text / Icons */}
                <div className="absolute top-3 inset-x-3 flex justify-between items-start">
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                        <Badge variant="destructive" className="uppercase text-[10px] tracking-wider font-bold">
                            Son {product.stock_quantity}
                        </Badge>
                    )}
                    {product.stock_quantity === 0 && (
                        <Badge variant="outline" className="bg-background/80 backdrop-blur text-foreground uppercase text-[10px] tracking-wider font-bold">
                            Stokta Yok
                        </Badge>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-5 space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                        <span className="shrink-0 font-mono font-bold text-primary">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    {product.category && (
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            {product.category.name}
                        </p>
                    )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Features (Mini) */}
                {product.features && product.features.length > 0 && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                        {product.features.slice(0, 3).map((f) => (
                            <div key={f.id} className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider bg-secondary/50 px-2 py-1 rounded">
                                {f.feature_icon === 'Shield' && <Shield className="w-3 h-3" />}
                                {f.feature_icon === 'Zap' && <Zap className="w-3 h-3" />}
                                {f.feature_icon === 'Sparkles' && <Sparkles className="w-3 h-3" />}
                                <span>{f.feature_text}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-2">
                    <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Link href={`/urunler/${product.slug}`}>
                            İncele <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
