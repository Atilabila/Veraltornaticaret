"use client"

import * as React from "react"
import { m } from 'framer-motion'
import { ArrowDown, Zap, FileText, Factory, Ruler, MapPin } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { FeatureItem } from "./FeatureItem"
import { MetalImage } from "./MetalImage"
import { formatPrice, slugify, cn, normalizeImagePath } from "@/lib/utils"
import Link from "next/link"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"

interface ProductSectionProps {
    product: MetalProduct
    index: number
    isLast?: boolean
}

// Determine if background is dark
const isDarkBackground = (color: string): boolean => {
    if (color.startsWith("bg-")) {
        return color.includes("900") || color.includes("800") || color.includes("950") || color.includes("zinc") || color.includes("slate")
    }
    if (color.startsWith("#")) {
        const hex = color.replace("#", "")
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        return (r * 299 + g * 587 + b * 114) / 1000 < 128
    }
    return true
}

// Get ambient glow color
const getAmbientGlow = (bg: string): string => {
    if (bg.includes("f0f4f8") || bg.includes("ffffff")) return "rgba(212, 175, 55, 0.4)"
    if (bg.includes("1a1a2e") || bg.includes("16213e")) return "rgba(59, 130, 246, 0.3)"
    if (bg.includes("533483")) return "rgba(139, 92, 246, 0.3)"
    return "rgba(161, 161, 170, 0.2)"
}

export const ProductSection: React.FC<ProductSectionProps> = ({
    product,
    index,
    isLast = false
}) => {
    const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: true })

    const isDark = isDarkBackground(product.background_color)
    const sortedFeatures = product.features?.sort((a, b) => a.display_order - b.display_order) || []
    const ambientGlow = getAmbientGlow(product.background_color)

    // Background style
    const bgStyle: React.CSSProperties = product.background_color.startsWith("bg-")
        ? {}
        : { backgroundColor: product.background_color }

    const bgClass = product.background_color.startsWith("bg-")
        ? product.background_color
        : ""

    const handleScrollDown = () => {
        const nextSection = (ref.current as HTMLElement)?.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={ref}
            className={cn(
                "min-h-screen w-full relative flex items-center justify-center overflow-hidden",
                bgClass
            )}
            style={bgStyle}
        >
            {/* Industrial Grid Pattern - Hidden on mobile for performance */}
            <div className={cn(
                "absolute inset-0 bg-grid-metal pointer-events-none",
                "hidden lg:block lg:opacity-30"
            )} />

            {/* Ambient Glow - Behind Product - Reduced on mobile */}
            <m.div
                className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none hidden lg:block"
                style={{ backgroundColor: ambientGlow }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Content Container */}
            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Product Image with Ambient Glow */}
                    <m.div
                        initial={{ opacity: 1 }} // Start visible to avoid inView flakiness on mobile
                        animate={isInView ? { opacity: 1 } : { opacity: 1 }} // Maintain visibility
                        transition={{ duration: 0.4 }}
                        className="relative order-2 lg:order-1"
                    >
                        {/* SKU Badge - Industrial Tag */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className={cn(
                                "absolute -top-4 -left-4 z-20",
                                "px-4 py-2 flex items-center justify-center gap-2",
                                // Sharp industrial style
                                "rounded-sm border-l-4 border-l-orange-500",
                                "font-mono text-xs font-bold tracking-widest uppercase",
                                // Metal surface
                                isDark
                                    ? "bg-zinc-900 border-y border-r border-zinc-800 text-zinc-300"
                                    : "bg-white border-y border-r border-zinc-200 text-zinc-900",
                                "shadow-xl"
                            )}
                        >
                            <Factory className="w-3 h-3 text-orange-500" />
                            {product.sku || `PRD-${String(index + 1).padStart(3, "0")}`}
                        </m.div>

                        {/* Image Container - Metal Frame */}
                        <Link
                            href={`/urunler/${product.slug || slugify(product.name)}`}
                            className={cn(
                                "relative aspect-square flex items-center justify-center",
                                "overflow-hidden block group/image",
                                // Sharp edges
                                "rounded-sm",
                                // Metal inset effect
                                isDark
                                    ? "bg-white/5 border border-white/10"
                                    : "bg-black/5 border border-black/10",
                                "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
                                "transition-all duration-500 hover:border-[#D4AF37]/50"
                            )}
                        >
                            {product.image_url ? (
                                <MetalImage
                                    src={normalizeImagePath(product.image_url)}
                                    alt={product.name}
                                    backgroundColor={product.background_color}
                                    className="w-full h-full p-2 md:p-8 object-contain transition-transform duration-700 group-hover/image:scale-110"
                                    showAmbientGlow={false}
                                    priority={index < 2}
                                />
                            ) : (
                                <div className={cn(
                                    "w-32 h-32 rounded-sm",
                                    isDark ? "bg-white/10" : "bg-black/10"
                                )} />
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                        </Link>

                        {/* Decorative Corner Rivets - Hidden on mobile */}
                        {["-top-1 -right-1", "-bottom-1 -right-1", "-bottom-1 -left-1"].map((pos, i) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.3, duration: 0.2 }}
                                className={cn(
                                    "absolute w-3 h-3 rounded-full hidden lg:block",
                                    pos,
                                    "bg-gradient-to-br from-zinc-400 to-zinc-600",
                                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                                )}
                            />
                        ))}
                    </m.div>

                    {/* Right: Product Info */}
                    <div className="order-1 lg:order-2 space-y-8">
                        {/* Category Badge - Industrial Tag */}
                        <m.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-4"
                        >
                            <span className={cn(
                                "inline-flex items-center gap-2 px-3 py-1",
                                "text-[10px] font-black uppercase tracking-[0.2em]",
                                "rounded-sm",
                                isDark
                                    ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                    : "bg-orange-600/10 text-orange-600 border border-orange-600/20"
                            )}>
                                <Zap className="w-3 h-3" />
                                SERİ ÜRETİM
                            </span>

                            <span className={cn(
                                "hidden md:inline-flex items-center gap-2 px-3 py-1",
                                "text-[10px] font-bold uppercase tracking-[0.1em] font-mono",
                                isDark ? "text-zinc-500" : "text-zinc-400"
                            )}>
                                <MapPin className="w-3 h-3" />
                                İZMİR / ALSANCAK
                            </span>
                        </m.div>

                        {/* Product Name - Display Font */}
                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <Link
                                href={`/urunler/${product.slug || slugify(product.name)}`}
                                className={cn(
                                    "text-4xl md:text-5xl lg:text-6xl font-bold leading-none block",
                                    "font-['Syne',sans-serif] tracking-tight hover:text-[#D4AF37] transition-colors duration-300",
                                    isDark ? "text-white" : "text-zinc-900"
                                )}
                            >
                                {product.name}
                            </Link>
                        </m.h2>

                        {/* Description */}
                        {product.description && (
                            <m.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className={cn(
                                    "text-lg leading-relaxed max-w-xl",
                                    isDark ? "text-zinc-400" : "text-zinc-600"
                                )}
                            >
                                {product.description}
                            </m.p>
                        )}

                        {/* Features - Grid Layout for Specs */}
                        {sortedFeatures.length > 0 && (
                            <div className="pt-4">
                                <h4 className={cn(
                                    "text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2",
                                    isDark ? "text-zinc-500" : "text-zinc-400"
                                )}>
                                    <Ruler className="w-4 h-4" />
                                    Teknik Özellikler & Varyasyonlar
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {sortedFeatures.map((feature, featureIndex) => (
                                        <FeatureItem
                                            key={feature.id}
                                            feature={feature}
                                            index={featureIndex}
                                            isInView={isInView}
                                            variant={isDark ? "light" : "dark"}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* B2B CTA - WhatsApp Button */}
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6"
                        >
                            <a
                                href={`https://wa.me/905071651315?text=Merhaba, ${encodeURIComponent(product.name)} modeli için üretim teklifi almak istiyorum.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "flex items-center gap-4 px-8 py-5",
                                    "font-black text-sm uppercase tracking-wider",
                                    "rounded-sm transition-all duration-300 w-full sm:w-auto",
                                    isDark
                                        ? "bg-[#D4AF37] text-zinc-900 hover:bg-[#F4CF57]"
                                        : "bg-zinc-900 text-white hover:bg-zinc-800",
                                    "shadow-[0_4px_20px_-4px_rgba(212,175,55,0.3)]",
                                    "hover:shadow-[0_8px_30px_-4px_rgba(212,175,55,0.4)]",
                                    "hover:-translate-y-1 relative overflow-hidden group"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <FileText className="w-5 h-5" />
                                    Teklif ve Bilgi Alın
                                </span>
                            </a>
                        </m.div>

                        <p className={cn(
                            "text-xs font-mono opacity-50",
                            isDark ? "text-zinc-500" : "text-zinc-400"
                        )}>
                            * Kurumsal ve toptan siparişler için özel fiyatlandırma mevcuttur.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {!isLast && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <m.div
                        onClick={handleScrollDown}
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={cn(
                            "p-3 rounded-sm cursor-pointer hover:bg-white/10 transition-colors",
                            isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"
                        )}
                    >
                        <ArrowDown className={cn(
                            "w-5 h-5",
                            isDark ? "text-zinc-500" : "text-zinc-600"
                        )} />
                    </m.div>
                </m.div>
            )}

            {/* Bottom Gradient Fade */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 h-32 pointer-events-none",
                "bg-gradient-to-t from-black/20 to-transparent"
            )} />
        </section>
    )
}

export default ProductSection
