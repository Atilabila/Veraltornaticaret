// =====================================================
// PRODUCT SHOWCASE - METAL ART EDITION
// Main Landing Page with Industrial Aesthetic
// =====================================================
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowDown, Zap, Shield, Award, HelpCircle } from "lucide-react"
import { ProductSection } from "./ProductSection"
import { cn } from "@/lib/utils"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"
import { useContentStore } from "@/store/useContentStore"

// Icon mapping for trust badges
const iconMap: Record<string, any> = {
    Zap,
    Shield,
    Award,
    HelpCircle
}

interface ProductShowcaseProps {
    products: MetalProduct[]
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products }) => {
    const { content } = useContentStore()
    const activeProducts = products.filter(p => p.is_active)

    if (activeProducts.length === 0) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
                    </div>
                    <p className="text-zinc-500 tracking-wide">YÜKLENIYOR...</p>
                </div>
            </section>
        )
    }

    return (
        <div className="relative bg-zinc-950">
            {/* Product Sections */}
            {activeProducts.map((product, index) => (
                <ProductSection
                    key={product.id}
                    product={product}
                    index={index}
                    isLast={index === activeProducts.length - 1}
                />
            ))}

            {/* Info Section (Moved from top) */}
            <InfoSection productCount={activeProducts.length} />

            {/* Footer CTA */}
            <FooterCTA />
        </div>
    )
}

// =====================================================
// HERO SECTION - METAL ART EDITION
// =====================================================
const InfoSection: React.FC<{ productCount: number }> = ({ productCount }) => {
    const { content } = useContentStore()

    return (
        <section className="py-24 relative overflow-hidden bg-zinc-950 border-t border-zinc-900">
            {/* Background - Industrial Grid */}
            <div className="absolute inset-0 bg-grid-metal opacity-20" />

            {/* Ambient Light Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Steel Glow - Top */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-zinc-500/10 blur-[150px]" />
                {/* Warm Accent - Bottom */}
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-amber-500/5 blur-[120px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Industrial Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-3 px-5 py-2 mb-10 rounded-sm bg-zinc-900/80 border border-zinc-800"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {productCount} Premium Ürün
                    </span>
                </motion.div>

                {/* Main Title - Syne Font */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="font-['Syne',sans-serif] text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                >
                    <span className="text-white">
                        {content.metalShowcaseTitle?.split(" ")[0] || "Metal"}
                    </span>
                    <br />
                    <span className="shimmer-steel">
                        {content.metalShowcaseTitle?.split(" ")[1] || "Art"}
                    </span>
                    <span className="text-zinc-600 ml-4">
                        {content.metalShowcaseTitle?.split(" ").slice(2).join(" ") || "Atelier"}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    {content.metalShowcaseSubtitle}
                </motion.p>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-6 mb-16"
                >
                    {content.metalShowcaseTrustBadges?.map((item, i) => {
                        const BadgeIcon = iconMap[item.icon] || HelpCircle
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 rounded-sm bg-zinc-900/50 border border-zinc-800"
                            >
                                <BadgeIcon className="w-4 h-4 text-zinc-500" />
                                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    {item.text}
                                </span>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

// =====================================================
// FOOTER CTA - METAL ART EDITION
// =====================================================
const FooterCTA: React.FC = () => {
    return (
        <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-zinc-950">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-metal opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/20 rounded-full blur-[150px]" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-['Syne',sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                    <span className="text-white">Projeniz için</span>
                    <br />
                    <span className="shimmer-gold">doğru çözüm</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg text-zinc-500 mb-10"
                >
                    Özel gereksinimleriniz için bizimle iletişime geçin.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="/urunler"
                        className={cn(
                            "inline-flex items-center justify-center gap-2 px-8 py-4",
                            "rounded-sm font-bold text-sm uppercase tracking-wider",
                            "bg-gradient-to-r from-zinc-200 to-zinc-300 text-zinc-900",
                            "hover:from-zinc-100 hover:to-zinc-200",
                            "transition-all duration-300",
                            "shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)]"
                        )}
                    >
                        Tüm Ürünleri Gör
                    </a>
                    <a
                        href="https://wa.me/905071651315"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "inline-flex items-center justify-center gap-2 px-8 py-4",
                            "rounded-sm font-bold text-sm uppercase tracking-wider",
                            "bg-zinc-900 text-zinc-300 border border-zinc-700",
                            "hover:bg-zinc-800 hover:border-zinc-600",
                            "transition-all duration-300"
                        )}
                    >
                        İletişime Geç
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default ProductShowcase
