// =====================================================
// PRODUCT DETAIL COMPONENT
// Gallery-Style Presentation with Metal Art Aesthetic
// =====================================================
"use client"

import * as React from "react"
import { m } from 'framer-motion'
import Link from "next/link"
import {
    ArrowLeft, ShoppingBag, Share2, Heart,
    Zap, Shield, Package, Truck, Check
} from "lucide-react"
import { MetalImage } from "@/components/landing/MetalImage"
import { useCartStore } from "@/store/useCollectionStore"
import { cn, formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"

interface ProductDetailProps {
    product: MetalProduct
}

// Dynamic icon mapping
const FEATURE_ICONS: Record<string, React.ElementType> = {
    Shield, Zap, Package, Truck, Check
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const { addItem, openCart, hasItem } = useCartStore()
    const { toast } = useToast()
    const [isAdded, setIsAdded] = React.useState(false)

    const handleAddToCollection = () => {
        addItem(product)
        setIsAdded(true)

        // Success Toast
        toast({
            title: "Sepete Eklendi",
            description: `${product.name} koleksiyonunuza eklendi.`,
            variant: "default", // or a custom 'success' variant if available, default is fine
            duration: 3000,
        })

        setTimeout(() => {
            openCart()
            setIsAdded(false)
        }, 800) // Slightly longer delay to let user see the button change
    }

    const sortedFeatures = product.features?.sort((a, b) => a.display_order - b.display_order) || []
    const inCart = hasItem(product.id)

    return (
        <main className="min-h-screen bg-[#FAFAFA] font-syne">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-zinc-900">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/urunler"
                        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-black uppercase tracking-[0.2em] font-mono">Kataloga Dön</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="p-2 border-2 border-zinc-900 shadow-[2px_2px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] bg-white transition-all">
                            <Heart className="w-5 h-5 text-zinc-900" />
                        </button>
                        <button className="p-2 border-2 border-zinc-900 shadow-[2px_2px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] bg-white transition-all">
                            <Share2 className="w-5 h-5 text-zinc-900" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 pb-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* Left: Product Image */}
                        <m.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="sticky top-24"
                        >
                            <div
                                className={cn(
                                    "aspect-square rounded-none overflow-hidden",
                                    "border-2 border-zinc-900 bg-white",
                                    "flex items-center justify-center",
                                    "relative shadow-[8px_8px_0_0_#18181b]"
                                )}
                            >
                                {/* Ambient Glow overlay removed for pure white brutalist style */}

                                {product.image_url ? (
                                    <MetalImage
                                        src={product.image_url}
                                        alt={product.name}
                                        backgroundColor="transparent"
                                        className="w-full h-full p-12 mix-blend-multiply"
                                        priority
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-zinc-100 border-2 border-dashed border-zinc-300" />
                                )}

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={cn(
                                        "inline-flex items-center gap-2 px-3 py-1.5",
                                        "text-xs font-black uppercase tracking-[0.2em] font-mono",
                                        "bg-industrial-gold border-2 border-zinc-900 text-zinc-900 shadow-[2px_2px_0_0_#18181b]"
                                    )}>
                                        {product.category?.name}
                                    </span>
                                </div>

                                {/* Stock Badge */}
                                {product.stock_quantity > 0 && (
                                    <div className="absolute top-4 right-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5",
                                            "text-xs font-black uppercase tracking-[0.2em] font-mono",
                                            "bg-emerald-400 border-2 border-zinc-900 text-zinc-900 shadow-[2px_2px_0_0_#18181b]"
                                        )}>
                                            <span className="w-2 h-2 rounded-full bg-white border-2 border-zinc-900 animate-pulse" />
                                            Stokta
                                        </span>
                                    </div>
                                )}
                            </div>
                        </m.div>

                        {/* Right: Product Info */}
                        <m.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-8 pt-8 lg:pt-0"
                        >
                            {/* Title */}
                            <div>
                                <h1 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black uppercase italic text-zinc-900 mb-6 tracking-tighter leading-[0.9]">
                                    {product.name}
                                </h1>

                                {product.description && (
                                    <p className="text-base text-zinc-600 leading-relaxed font-mono font-medium border-l-4 border-industrial-gold pl-4">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* Price & CTA */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="px-6 py-4 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                                    <span className="text-[10px] font-black uppercase font-mono tracking-[0.3em] text-zinc-400 block mb-1">Birim Fiyat</span>
                                    <span className="text-3xl font-black text-zinc-900 italic tracking-tighter">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                <m.button
                                    onClick={handleAddToCollection}
                                    disabled={inCart}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-3 px-8 py-5",
                                        "rounded-none font-black text-sm uppercase tracking-[0.2em] font-mono",
                                        "transition-all duration-200 border-2 border-zinc-900",
                                        inCart
                                            ? "bg-emerald-400 text-zinc-900 shadow-[1px_1px_0_0_#18181b] translate-x-[3px] translate-y-[3px]"
                                            : "bg-industrial-gold text-zinc-900 shadow-[6px_6px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[5px] hover:translate-y-[5px]"
                                    )}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {inCart ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            KOLEKSİYONDA
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            {isAdded ? "EKLENDİ!" : "SEPETE EKLE"}
                                        </>
                                    )}
                                </m.button>
                            </div>

                            {/* Features */}
                            {sortedFeatures.length > 0 && (
                                <div className="pt-6 border-t-2 border-zinc-200">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] font-mono text-zinc-800 mb-4">
                                        Özellikler
                                    </h3>
                                    <div className="space-y-3">
                                        {sortedFeatures.map((feature, index) => (
                                            <m.div
                                                key={feature.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3",
                                                    "bg-white border-2 border-zinc-900 shadow-[2px_2px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 flex items-center justify-center shrink-0 border-r-2 border-zinc-900 pr-4 mr-2"
                                                )}>
                                                    {feature.feature_icon && FEATURE_ICONS[feature.feature_icon] ? (
                                                        React.createElement(FEATURE_ICONS[feature.feature_icon], {
                                                            className: "w-5 h-5 text-industrial-gold"
                                                        })
                                                    ) : (
                                                        <Zap className="w-5 h-5 text-industrial-gold" />
                                                    )}
                                                </div>
                                                <span className="text-zinc-800 font-bold text-sm">{feature.feature_text}</span>
                                            </m.div>
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
                                            "bg-zinc-50 border-2 border-zinc-900 shadow-[3px_3px_0_0_#18181b]"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5 text-industrial-gold shrink-0 border-r-2 border-zinc-900 pr-2 mr-1 w-8" />
                                        <div>
                                            <p className="text-sm font-black text-zinc-800 uppercase tracking-tight">{item.text}</p>
                                            <p className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </m.div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetail
