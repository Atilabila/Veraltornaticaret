// =====================================================
// PRODUCT DETAIL CLIENT COMPONENT
// Gallery-Style Presentation with Metal Art Aesthetic
// =====================================================
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
    ArrowLeft, ShoppingBag, Share2, Heart,
    Zap, Shield, Package, Truck, Check
} from "lucide-react"
import { MetalImage } from "@/components/landing/MetalImage"
import { useCartStore } from "@/store/useCartStore"
import { useToast } from "@/components/ui/use-toast"
import { cn, formatPrice } from "@/lib/utils"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"
import { useRouter } from "next/navigation"

interface ProductDetailClientProps {
    product: MetalProduct
}

// Dynamic icon mapping
const FEATURE_ICONS: Record<string, React.ElementType> = {
    Shield, Zap, Package, Truck, Check
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addItem, items } = useCartStore()
    const { toast } = useToast()
    const router = useRouter()
    const [isAdding, setIsAdding] = React.useState(false)

    const inCart = items.some(item => item.productId === product.id)

    const handleAddToCart = (redirect: boolean = false) => {
        setIsAdding(true)
        const result = addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image_url || "/placeholder.png",
            size: "Standart (45x60cm)",
            orientation: "vertical"
        })

        if (result.success) {
            toast({
                title: "Başarılı",
                description: "Ürün sepetinize eklendi!",
            })
            if (redirect) {
                router.push("/sepet")
            }
        } else {
            toast({
                title: "Hata",
                description: result.error,
                variant: "destructive"
            })
        }
        setIsAdding(false)
    }

    const sortedFeatures = product.features?.sort((a, b) => a.display_order - b.display_order) || []

    return (
        <main className="min-h-screen bg-zinc-950">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/metal-showcase"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Geri</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-sm hover:bg-zinc-800 transition-colors">
                            <Heart className="w-5 h-5 text-zinc-400" />
                        </button>
                        <button className="p-2 rounded-sm hover:bg-zinc-800 transition-colors">
                            <Share2 className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 pb-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* Left: Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="sticky top-24"
                        >
                            <div
                                className={cn(
                                    "aspect-square rounded-sm overflow-hidden",
                                    "border border-zinc-800",
                                    "flex items-center justify-center",
                                    "relative"
                                )}
                                style={{ backgroundColor: product.background_color }}
                            >
                                {/* Ambient Glow */}
                                <div
                                    className="absolute inset-0 blur-3xl opacity-30"
                                    style={{ backgroundColor: product.background_color }}
                                />

                                {product.image_url ? (
                                    <MetalImage
                                        src={product.image_url}
                                        alt={product.name}
                                        backgroundColor={product.background_color}
                                        className="w-full h-full p-12"
                                        priority
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-sm bg-zinc-800" />
                                )}

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={cn(
                                        "inline-flex items-center gap-2 px-3 py-1.5",
                                        "text-xs font-bold uppercase tracking-wider",
                                        "rounded-sm bg-black/50 backdrop-blur-sm text-white/80"
                                    )}>
                                        {product.category?.name}
                                    </span>
                                </div>

                                {/* Stock Badge */}
                                {product.stock_quantity > 0 && (
                                    <div className="absolute top-4 right-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 px-2 py-1",
                                            "text-xs font-medium",
                                            "rounded-sm bg-emerald-500/20 text-emerald-400"
                                        )}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Stokta
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Right: Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-8 pt-8 lg:pt-0"
                        >
                            {/* Title */}
                            <div>
                                <h1 className="font-['Syne',sans-serif] text-4xl md:text-5xl font-bold text-white mb-4">
                                    {product.name}
                                </h1>

                                {product.description && (
                                    <p className="text-lg text-zinc-400 leading-relaxed">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* Price & CTA */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="px-6 py-4 rounded-sm bg-zinc-900 border border-zinc-800">
                                    <span className="text-3xl font-bold text-white">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <motion.button
                                        onClick={() => handleAddToCart()}
                                        disabled={inCart || isAdding}
                                        className={cn(
                                            "flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4",
                                            "rounded-sm font-bold text-sm uppercase tracking-wider",
                                            "transition-all duration-300",
                                            inCart
                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                : "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700",
                                            "shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]"
                                        )}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {inCart ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Koleksiyonda
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingBag className="w-5 h-5" />
                                                {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
                                            </>
                                        )}
                                    </motion.button>

                                    <motion.button
                                        onClick={() => handleAddToCart(true)}
                                        disabled={isAdding}
                                        className={cn(
                                            "flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-4",
                                            "rounded-sm font-bold text-sm uppercase tracking-wider",
                                            "transition-all duration-300",
                                            "bg-gradient-to-r from-[var(--color-brand-safety-orange)] to-amber-500 text-black",
                                            "hover:brightness-110",
                                            "shadow-[0_4px_20px_-4px_rgba(255,103,0,0.4)]"
                                        )}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Zap className="w-5 h-5 fill-current" />
                                        Şimdi Al
                                    </motion.button>
                                </div>
                            </div>

                            {/* Features */}
                            {sortedFeatures.length > 0 && (
                                <div className="pt-6 border-t border-zinc-800">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">
                                        Özellikler
                                    </h3>
                                    <div className="space-y-3">
                                        {sortedFeatures.map((feature, index) => (
                                            <motion.div
                                                key={feature.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3",
                                                    "rounded-sm bg-zinc-900/50 border border-zinc-800"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-sm flex items-center justify-center shrink-0",
                                                    "bg-gradient-to-br from-zinc-700 to-zinc-800"
                                                )}>
                                                    {feature.feature_icon && FEATURE_ICONS[feature.feature_icon] ? (
                                                        React.createElement(FEATURE_ICONS[feature.feature_icon], {
                                                            className: "w-5 h-5 text-zinc-300"
                                                        })
                                                    ) : (
                                                        <Zap className="w-5 h-5 text-zinc-300" />
                                                    )}
                                                </div>
                                                <span className="text-zinc-300">{feature.feature_text}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                {[
                                    { icon: Truck, text: "Ücretsiz Kargo", sub: "₺500 üzeri" },
                                    { icon: Shield, text: "10 Yıl Garanti", sub: "Tüm ürünlerde" },
                                    { icon: Package, text: "Güvenli Paket", sub: "Özel ambalaj" },
                                    { icon: Zap, text: "Hızlı Üretim", sub: "3-5 iş günü" }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3",
                                            "rounded-sm bg-zinc-900/30 border border-zinc-800/50"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5 text-zinc-500 shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-zinc-300">{item.text}</p>
                                            <p className="text-xs text-zinc-500">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </main>
    )
}
