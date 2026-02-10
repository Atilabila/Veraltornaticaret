// =====================================================
// PRODUCT SHOWCASE - METAL ART EDITION
// Main Landing Page with Industrial Aesthetic
// =====================================================
"use client"

import * as React from "react"
import { m } from 'framer-motion'
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


    // If data is undefined/loading (though this is typically handled by Suspense in newer Next.js)
    if (!products) {
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

    // If result arrived but no active products found
    if (activeProducts.length === 0) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
                <div className="text-center bg-zinc-900/50 border border-zinc-800 p-12 rounded-2xl max-w-lg mx-auto">
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-zinc-800 flex items-center justify-center">
                        <ArrowDown className="w-10 h-10 text-zinc-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 italic">HENÜZ ÜRÜN BULUNMUYOR</h3>
                    <p className="text-zinc-500 mb-8 leading-relaxed">
                        Aradığınız kategoride henüz aktif bir ürün bulunmamaktadır.
                        Lütfen daha sonra tekrar kontrol ediniz.
                    </p>
                    <a
                        href="/"
                        className="inline-block px-8 py-3 bg-zinc-100 text-zinc-900 font-bold uppercase text-xs tracking-widest hover:bg-white transition-all"
                    >
                        ANASAYFAYA DÖN
                    </a>
                </div>
            </section>
        )
    }

    return (
        <div className="relative bg-zinc-950">
            {/* Top Space for Navigation */}
            <div className="h-10" />

            {/* Product Sections */}
            {activeProducts.map((product, index) => (
                <ProductSection
                    key={product.id}
                    product={product}
                    index={index}
                    isLast={index === activeProducts.length - 1}
                />
            ))}

            {/* Industrial Info Section - Relocated to bottom and shrunk per user request */}
            <div className="border-t border-zinc-900">
                <HeroSection productCount={activeProducts.length} />
            </div>

            {/* Footer CTA */}
            <FooterCTA />
        </div>
    )
}

// =====================================================
// HERO SECTION (RESIZED & RELOCATED)
// =====================================================
const HeroSection: React.FC<{ productCount: number }> = ({ productCount }) => {
    const { content } = useContentStore()

    return (
        <section className="py-16 relative overflow-hidden bg-zinc-950">
            {/* Ambient Light Effects - Subdued, hidden on mobile */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
                <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-zinc-500/5 blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Industrial Badge */}
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-3 px-4 py-1.5 mb-6 rounded-sm bg-zinc-900/80 border border-zinc-800"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {productCount} Üretim Modeli Aktif
                    </span>
                </m.div>

                {/* Title - Reduced Size */}
                <m.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-['Syne',sans-serif] text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                >
                    <span className="text-white">
                        {content.metalShowcaseTitle?.split(" ")[0] || "Metal"}
                    </span>
                    <span className="shimmer-steel mx-4">
                        {content.metalShowcaseTitle?.split(" ")[1] || "Art"}
                    </span>
                    <span className="text-zinc-600 block md:inline mt-2 md:mt-0">
                        {content.metalShowcaseTitle?.split(" ").slice(2).join(" ") || "Atelier"}
                    </span>
                </m.h2>

                {/* Subtitle - Reduced Size */}
                <m.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="text-base text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {content.metalShowcaseSubtitle || "İzmir Alsancak üretim tesisimizde, endüstriyel kalitede seri üretim hizmetleri sunuyoruz."}
                </m.p>

                {/* Trust Badges - Smaller Gap */}
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {content.metalShowcaseTrustBadges?.map((item, i) => {
                        const BadgeIcon = iconMap[item.icon] || HelpCircle
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-900/30 border border-zinc-800/50"
                            >
                                <BadgeIcon className="w-3 h-3 text-zinc-600" />
                                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                                    {item.text}
                                </span>
                            </div>
                        )
                    })}
                </m.div>
            </div>
        </section>
    )
}

// =====================================================
// FOOTER CTA - METAL ART EDITION
// =====================================================
const FooterCTA: React.FC = () => {
    return (
        <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden bg-zinc-950 border-t border-zinc-900">
            {/* Background Elements - Hidden on mobile */}
            <div className="absolute inset-0 bg-grid-metal opacity-10 pointer-events-none hidden lg:block" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/20 rounded-full blur-[150px] hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <m.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-['Syne',sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                    <span className="text-white">Projeniz İçin</span>
                    <br />
                    <span className="shimmer-gold">Özel Çözümler</span>
                </m.h2>

                <m.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="text-lg text-zinc-500 mb-10"
                >
                    İzmir üretim tesisimiz, kurumsal ve özel projeleriniz için hizmetinizdedir.
                </m.p>

                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="/metal-urunler"
                        className={cn(
                            "inline-flex items-center justify-center gap-2 px-8 py-4",
                            "rounded-sm font-bold text-sm uppercase tracking-wider",
                            "bg-gradient-to-r from-zinc-200 to-zinc-300 text-zinc-900",
                            "hover:from-zinc-100 hover:to-zinc-200",
                            "transition-all duration-300",
                            "shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)]"
                        )}
                    >
                        Özel Üretim Detayları
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
                </m.div>
            </div>
        </section>
    )
}

export default ProductShowcase
