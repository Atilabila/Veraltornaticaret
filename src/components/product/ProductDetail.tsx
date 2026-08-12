"use client"

import * as React from "react"
import { m } from 'framer-motion'
import Link from "next/link"
import {
    ArrowLeft, ShoppingBag, Share2, Heart,
    Zap, Shield, Package, Truck, Check,
    Info, Ruler, FileText, Factory, ArrowRight, Phone, MessageCircle
} from "lucide-react"
import { MetalImage } from "@/components/landing/MetalImage"
import { useCartStore } from "@/store/useCartStore"
import { useContentStore } from "@/store/useContentStore"
import { useToast } from "@/components/ui/use-toast"
import { cn, formatPrice } from "@/lib/utils"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { PageContainer } from "@/components/layout/PageContainer"
import { CART_ENABLED } from "@/lib/commerce"
import {
    toTelHref,
    buildProductWhatsAppUrl,
    resolveFooterPhone,
    resolveWhatsappNumber,
} from "@/lib/contact"

interface ProductDetailProps {
    product: MetalProduct
    relatedProducts?: MetalProduct[]
}

const FEATURE_ICONS: Record<string, React.ElementType> = {
    Shield, Zap, Package, Truck, Check, Info, Ruler, FileText, Factory
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts = [] }) => {
    const { addItem, items } = useCartStore()
    const { content } = useContentStore()
    const { toast } = useToast()
    const router = useRouter()
    const [isAdding, setIsAdding] = React.useState(false)

    const tel = toTelHref(resolveFooterPhone(content.footerPhone))
    const wa = buildProductWhatsAppUrl({
        whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
        productName: product.name,
        baseMessage: content.whatsappMessage,
    })

    const inCart = items.some(item => item.productId === product.id)
    const isRetail = product.price > 0 && product.stock_quantity > 0

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
            toast({ title: "Baþarýlý", description: "Ürün sepetinize eklendi!" })
            if (redirect) router.push("/sepet")
        } else {
            toast({ title: "Hata", description: result.error, variant: "destructive" })
        }
        setIsAdding(false)
    }

    const sortedFeatures = product.features?.sort((a, b) => a.display_order - b.display_order) || []

    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-[#f4f4f4] text-[#161616] pt-28 lg:pt-32 pb-16 selection:bg-[var(--color-brand-accent)] selection:text-white">
                <PageContainer>
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#c6c6c6]">
                        <Link
                            href="/urunler"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#525252] hover:text-[var(--color-brand-accent)] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kataloða dön
                        </Link>
                        <div className="flex items-center gap-2">
                            <button type="button" className="p-2 border border-[#c6c6c6] bg-white hover:border-[var(--color-brand-accent)] transition-colors" aria-label="Favorilere ekle">
                                <Heart className="w-4 h-4" />
                            </button>
                            <button type="button" className="p-2 border border-[#c6c6c6] bg-white hover:border-[var(--color-brand-accent)] transition-colors" aria-label="Paylaþ">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:sticky lg:top-32"
                        >
                            <div className="aspect-square overflow-hidden border border-[#c6c6c6] bg-white flex items-center justify-center p-4 relative">
                                {product.image_url ? (
                                    <MetalImage src={product.image_url} alt={product.name} backgroundColor="transparent" className="w-full h-full p-6" priority />
                                ) : (
                                    <div className="w-32 h-32 bg-[#f4f4f4] border border-dashed border-[#c6c6c6]" />
                                )}
                                {product.category?.name && (
                                    <span className="absolute top-4 left-4 text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 bg-[var(--color-brand-accent)] text-white">
                                        {product.category.name}
                                    </span>
                                )}
                                {isRetail && (
                                    <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        Stokta
                                    </span>
                                )}
                            </div>
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="space-y-8"
                        >
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="text-xs font-mono text-[#525252] uppercase tracking-wider px-2 py-1 bg-[#f4f4f4] border border-[#c6c6c6]">
                                        SKU: {product.sku || product.id.slice(0, 8)}
                                    </span>
                                    {product.is_showcase && (
                                        <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200">
                                            Vitrin ürünü
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-[#161616] mb-4 leading-tight">
                                    {product.name}
                                </h1>
                                {product.description && (
                                    <p className="text-lg text-[#525252] leading-relaxed border-l-4 border-[var(--color-brand-accent)] pl-4">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {isRetail ? (
                                <div className="p-6 bg-white border border-[#c6c6c6] space-y-6">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-bold text-[#161616]">{formatPrice(product.price)}</span>
                                        <span className="text-xs text-[#525252] uppercase tracking-wider">KDV dahil</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {CART_ENABLED ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddToCart()}
                                                    disabled={inCart || isAdding}
                                                    className={cn(
                                                        "flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold transition-colors border",
                                                        inCart
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : "bg-white text-[#161616] border-[#c6c6c6] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)]"
                                                    )}
                                                >
                                                    {inCart ? <><Check className="w-4 h-4" /> Sepette</> : <><ShoppingBag className="w-4 h-4" /> {isAdding ? "..." : "Sepete ekle"}</>}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddToCart(true)}
                                                    disabled={isAdding}
                                                    className="flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold bg-[var(--color-brand-accent)] text-white hover:bg-[#0043ce] transition-colors"
                                                >
                                                    <Zap className="w-4 h-4" /> Hemen al
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <a
                                                    href={tel}
                                                    className="flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold bg-[var(--color-brand-accent)] text-white hover:bg-[#0043ce] transition-colors"
                                                >
                                                    <Phone className="w-4 h-4" /> Ara
                                                </a>
                                                <a
                                                    href={wa}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold border border-[#c6c6c6] hover:border-[var(--color-brand-accent)] transition-colors"
                                                >
                                                    <MessageCircle className="w-4 h-4" /><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                                                <Link href="/teklif-al" className="flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold border border-[#c6c6c6] hover:border-[var(--color-brand-accent)] transition-colors">
                                                    <FileText className="w-4 h-4" /> Teklif al
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    <p className="flex items-center gap-2 text-xs text-[#525252] justify-center">
                                        <Shield className="w-4 h-4 text-[var(--color-brand-accent)]" />
                                        Güvenli ödeme & SSL korumasý
                                    </p>
                                </div>
                            ) : (
                                <div className="p-6 bg-white border border-[#c6c6c6] space-y-4">
                                    <div className="flex items-center gap-2 text-[var(--color-brand-accent)]">
                                        <Info className="w-5 h-5" />
                                        <span className="font-semibold text-[#161616]">Özel üretim / proje ürünü</span>
                                    </div>
                                    <p className="text-[#525252] leading-relaxed">
                                        Bu ürün stoktan satýþa kapalýdýr. Toptan teklif veya özel imalat için formu doldurun.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link href="/teklif-al" className="flex-1 flex items-center justify-center gap-2 h-12 bg-[var(--color-brand-accent)] text-white text-sm font-semibold hover:bg-[#0043ce] transition-colors">
                                            <FileText className="w-4 h-4" /> Teklif al
                                        </Link>
                                        <a
                                            href={wa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 h-12 border border-[#c6c6c6] text-sm font-semibold hover:border-[var(--color-brand-accent)] transition-colors"
                                        ><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                                    </div>
                                </div>
                            )}

                            <Tabs defaultValue="features" className="w-full">
                                <TabsList className="w-full grid grid-cols-3 bg-[#f4f4f4] border border-[#c6c6c6] rounded-none p-0 h-auto">
                                    {["features", "shipping", "warranty"].map((tab, i) => (
                                        <TabsTrigger
                                            key={tab}
                                            value={tab}
                                            className={cn(
                                                "text-sm font-semibold rounded-none py-3 data-[state=active]:bg-[var(--color-brand-accent)] data-[state=active]:text-white text-[#525252]",
                                                i > 0 && "border-l border-[#c6c6c6]"
                                            )}
                                        >
                                            {tab === "features" ? "Özellikler" : tab === "shipping" ? "Teslimat" : "Garanti"}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="features" className="mt-6 space-y-4">
                                    {sortedFeatures.map((feature, index) => (
                                        <div key={index} className="flex gap-4 p-4 bg-white border border-[#c6c6c6]">
                                            {feature.feature_icon && FEATURE_ICONS[feature.feature_icon]
                                                ? React.createElement(FEATURE_ICONS[feature.feature_icon], { className: "w-5 h-5 text-[var(--color-brand-accent)] shrink-0 mt-0.5" })
                                                : <Zap className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0 mt-0.5" />}
                                            <p className="text-[#525252]">{feature.feature_text}</p>
                                        </div>
                                    ))}
                                    {sortedFeatures.length === 0 && (
                                        <p className="text-sm text-[#525252] italic">Ek teknik özellik girilmemiþtir.</p>
                                    )}
                                    <div className="pt-4 border-t border-[#c6c6c6] space-y-3">
                                        <h4 className="font-bold text-[#161616]">Teknik detaylar</h4>
                                        {[
                                            ["Malzeme", product.material || "1.5mm DKP Sac"],
                                            ["Boya", product.paint || "Elektrostatik toz"],
                                            ["Montaj", product.installation || "Hazýr aský sistemi"],
                                            ["Menþei", product.origin || "Yerli üretim (Ýzmir)"],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex justify-between text-sm border-b border-[#e0e0e0] pb-2">
                                                <span className="text-[#525252]">{label}</span>
                                                <span className="font-semibold text-[#161616]">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="shipping" className="mt-6">
                                    <div className="p-6 bg-white border border-[#c6c6c6] space-y-4 text-[#525252] text-sm leading-relaxed">
                                        <p><strong className="text-[#161616]">Standart teslimat:</strong> Onay sonrasý 2–4 iþ günü içinde kargoya verilir.</p>
                                        <p><strong className="text-[#161616]">Paketleme:</strong> Darbelere dayanýklý özel kutularda gönderilir.</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="warranty" className="mt-6">
                                    <div className="p-6 bg-white border border-[#c6c6c6] space-y-4 text-[#525252] text-sm leading-relaxed">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Shield className="w-8 h-8 text-[var(--color-brand-accent)]" />
                                            <span className="font-bold text-[#161616] text-lg">10 yýl solmazlýk garantisi</span>
                                        </div>
                                        <p>Ýç mekan kullanýmýnda solmaya ve deformasyona karþý garanti sunuyoruz. Ýade/deðiþim için 14 gün içinde iletiþime geçebilirsiniz.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </m.div>
                    </div>
                </PageContainer>

                {relatedProducts.length > 0 && (
                    <section className="mt-16 pt-12 border-t border-[#c6c6c6]">
                        <PageContainer>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-[#161616]">Benzer ürünler</h2>
                                <Link href="/urunler" className="text-sm font-semibold text-[var(--color-brand-accent)] inline-flex items-center gap-1 hover:underline">
                                    Tümünü gör <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedProducts.map((relProduct) => (
                                    <Link
                                        key={relProduct.id}
                                        href={`/urunler/${relProduct.slug}`}
                                        className="group block bg-white border border-[#c6c6c6] hover:border-[var(--color-brand-accent)] transition-colors overflow-hidden"
                                    >
                                        <div className="aspect-square bg-[#f4f4f4] relative overflow-hidden">
                                            {relProduct.image_url ? (
                                                <MetalImage src={relProduct.image_url} alt={relProduct.name} backgroundColor="transparent" className="w-full h-full p-6 group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><Zap className="w-8 h-8 text-[#8d8d8d]" /></div>
                                            )}
                                            {relProduct.price > 0 && (
                                                <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 bg-[var(--color-brand-accent)] text-white">
                                                    {formatPrice(relProduct.price)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-[#161616] truncate group-hover:text-[var(--color-brand-accent)] transition-colors">{relProduct.name}</h3>
                                            <p className="text-xs text-[#525252] mt-1 truncate">{relProduct.category?.name || "Katalog"}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </PageContainer>
                    </section>
                )}
            </main>
            <Footer />
        </>
    )
}
