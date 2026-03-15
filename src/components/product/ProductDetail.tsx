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
    Zap, Shield, Package, Truck, Check,
    Info, Ruler, FileText, Factory
} from "lucide-react"
import { MetalImage } from "@/components/landing/MetalImage"
import { useCartStore } from "@/store/useCartStore"
import { useToast } from "@/components/ui/use-toast"
import { cn, formatPrice } from "@/lib/utils"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailProps {
    product: MetalProduct
    relatedProducts?: any[]
}

// Dynamic icon mapping
const FEATURE_ICONS: Record<string, React.ElementType> = {
    Shield, Zap, Package, Truck, Check, Info, Ruler, FileText, Factory
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts = [] }) => {
    const { addItem, items } = useCartStore()
    const { toast } = useToast()
    const router = useRouter()
    const [isAdding, setIsAdding] = React.useState(false)

    const inCart = items.some(item => item.productId === product.id)
    const isRetail = product.price > 0 && product.stock_quantity > 0;

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
        <main className="min-h-screen bg-[#FAFAFA] font-syne">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-lg border-b-2 border-zinc-900 shadow-[0_4px_0_0_#18181b]">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/urunler"
                        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 font-black uppercase tracking-[0.2em] font-mono transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm">Kataloğa Dön</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="p-2 border-2 border-zinc-900 shadow-[2px_2px_0_0_#18181b] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                            <Heart className="w-5 h-5 text-zinc-900" />
                        </button>
                        <button className="p-2 border-2 border-zinc-900 shadow-[2px_2px_0_0_#18181b] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                            <Share2 className="w-5 h-5 text-zinc-900" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 pb-32">
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
                                    "aspect-square overflow-hidden",
                                    "border-2 border-zinc-900 bg-white",
                                    "flex items-center justify-center p-2",
                                    "relative shadow-[12px_12px_0_0_#18181b]"
                                )}
                            >
                                {product.image_url ? (
                                    <MetalImage
                                        src={product.image_url}
                                        alt={product.name}
                                        backgroundColor={"transparent"}
                                        className="w-full h-full p-8"
                                        priority
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-sm bg-zinc-100 border-2 border-dashed border-zinc-300" />
                                )}

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={cn(
                                        "inline-flex items-center gap-2 px-3 py-1.5",
                                        "text-xs lg:text-sm font-black uppercase tracking-[0.2em] font-mono",
                                        "bg-industrial-gold border-2 border-zinc-900 text-zinc-900 shadow-[2px_2px_0_0_#18181b]"
                                    )}>
                                        {product.category?.name}
                                    </span>
                                </div>

                                {/* Stock Badge */}
                                {isRetail && (
                                    <div className="absolute top-4 right-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5",
                                            "text-xs lg:text-sm font-black uppercase tracking-[0.2em] font-mono",
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
                            {/* Title & SKU */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs lg:text-sm font-black font-mono text-zinc-500 uppercase tracking-widest bg-zinc-200 border-2 border-zinc-900 px-3 py-2 shadow-[2px_2px_0_0_#18181b]">
                                        SKU: {product.sku || product.id.slice(0, 8)}
                                    </span>
                                    {product.is_showcase && (
                                        <span className="px-3 py-2 font-mono border-2 border-zinc-900 bg-amber-400 text-zinc-900 text-xs lg:text-sm font-black uppercase tracking-widest shadow-[2px_2px_0_0_#18181b]">
                                            Vitrin Ürünü
                                        </span>
                                    )}
                                </div>
                                <h1 className="font-syne text-5xl md:text-6xl lg:text-7xl font-black uppercase italic text-zinc-900 mb-6 tracking-tighter leading-[0.9]">
                                    {product.name}
                                </h1>
                                {product.description && (
                                    <p className="text-lg lg:text-xl text-zinc-700 leading-relaxed font-mono font-medium border-l-4 border-industrial-gold pl-5 py-2">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* Price & CTA */}
                            {isRetail ? (
                                <div className="p-8 bg-white border-2 border-zinc-900 space-y-8 shadow-[8px_8px_0_0_#18181b]">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-5xl font-black text-zinc-900 italic tracking-tighter">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-xs lg:text-sm font-black font-mono text-zinc-500 uppercase tracking-widest bg-zinc-100 border-2 border-zinc-900 px-3 py-1.5 shadow-[2px_2px_0_0_#18181b]">
                                            KDV Dahil
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <m.button
                                            onClick={() => handleAddToCart()}
                                            disabled={inCart || isAdding}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-3 px-8 py-5",
                                                "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
                                                "transition-all duration-300 border-2 border-zinc-900",
                                                inCart
                                                    ? "bg-emerald-400 text-zinc-900 shadow-[4px_4px_0_0_#10b981]"
                                                    : "bg-white text-zinc-900 shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]",
                                            )}
                                        >
                                            {inCart ? (
                                                <>
                                                    <Check className="w-6 h-6" />
                                                    Sepette
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag className="w-6 h-6" />
                                                    {isAdding ? "..." : "Sepete Ekle"}
                                                </>
                                            )}
                                        </m.button>

                                        <m.button
                                            onClick={() => handleAddToCart(true)}
                                            disabled={isAdding}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-3 px-10 py-5",
                                                "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
                                                "transition-all duration-300 border-2 border-zinc-900",
                                                "bg-industrial-gold text-zinc-900",
                                                "shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]"
                                            )}
                                        >
                                            <Zap className="w-6 h-6 fill-current" />
                                            Hemen Al
                                        </m.button>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs lg:text-sm font-black font-mono text-zinc-500 uppercase tracking-widest justify-center">
                                        <Shield className="w-5 h-5 text-industrial-gold" />
                                        <span>Güvenli Ödeme & SSL Koruması</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 bg-white border-2 border-zinc-900 space-y-6 shadow-[8px_8px_0_0_#18181b]">
                                    <div className="flex items-center gap-3 text-industrial-gold mb-2">
                                        <Info className="w-6 h-6" />
                                        <span className="font-black font-mono uppercase tracking-[0.2em] text-zinc-900">Özel Üretim / Proje Ürünü</span>
                                    </div>
                                    <p className="text-zinc-700 font-mono text-base lg:text-lg leading-relaxed border-l-4 border-industrial-gold pl-5 py-2">
                                        Bu ürün stoktan satışa kapalıdır. Projeleriniz için özel üretim olarak talep edebilirsiniz.
                                    </p>
                                    <a
                                        href={`https://wa.me/905071651315?text=Merhaba, ${encodeURIComponent(product.name)} (SKU: ${product.sku}) için fiyat teklifi almak istiyorum.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center justify-center gap-3 px-8 py-5 w-full",
                                            "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
                                            "bg-industrial-gold border-2 border-zinc-900 text-zinc-900 transition-all",
                                            "shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]"
                                        )}
                                    >
                                        <FileText className="w-6 h-6" />
                                        Fiyat Teklifi İste
                                    </a>
                                </div>
                            )}

                            {/* Detailed Info Tabs */}
                            <div className="pt-8">
                                <Tabs defaultValue="features" className="w-full">
                                    <TabsList className="w-full grid grid-cols-3 bg-zinc-100 border-2 border-zinc-900 rounded-none p-0 h-auto shadow-[4px_4px_0_0_#18181b]">
                                        <TabsTrigger value="features" className="font-black text-sm lg:text-base font-mono uppercase tracking-[0.1em] rounded-none py-5 data-[state=active]:bg-industrial-gold data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:shadow-none text-zinc-500 hover:text-zinc-900">Özellikler</TabsTrigger>
                                        <TabsTrigger value="shipping" className="font-black text-sm lg:text-base font-mono uppercase tracking-[0.1em] rounded-none py-5 border-l-2 border-zinc-900 data-[state=active]:bg-industrial-gold data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:shadow-none text-zinc-500 hover:text-zinc-900">Teslimat</TabsTrigger>
                                        <TabsTrigger value="warranty" className="font-black text-sm lg:text-base font-mono uppercase tracking-[0.1em] rounded-none py-5 border-l-2 border-zinc-900 data-[state=active]:bg-industrial-gold data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:shadow-none text-zinc-500 hover:text-zinc-900">Garanti</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="features" className="mt-8 space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            {sortedFeatures.map((feature, index) => (
                                                <div key={index} className="flex gap-4 p-5 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                                                    <div className="mt-1 border-r-2 border-zinc-900 pr-4 mr-1">
                                                        {feature.feature_icon && FEATURE_ICONS[feature.feature_icon] ? (
                                                            React.createElement(FEATURE_ICONS[feature.feature_icon], { className: "w-6 h-6 text-industrial-gold" })
                                                        ) : <Zap className="w-6 h-6 text-industrial-gold" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black font-mono tracking-widest uppercase text-zinc-900 text-xs lg:text-sm mb-2">{product.category?.name || "Özellik"}</h4>
                                                        <p className="text-zinc-700 font-medium text-base lg:text-lg border-l-2 border-zinc-300 pl-4">{feature.feature_text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Default Specs if none */}
                                            {sortedFeatures.length === 0 && (
                                                <div className="text-zinc-500 text-sm font-mono border-l-4 border-zinc-300 pl-4 py-2 bg-zinc-100 italic">Bu ürün için ek teknik özellik girilmemiştir.</div>
                                            )}

                                            {/* Common Specs - Refined Display */}
                                            <div className="mt-6 border-t-4 border-zinc-900 pt-6">
                                                <h4 className="font-syne font-black italic uppercase text-2xl lg:text-3xl text-zinc-900 mb-6 underline decoration-industrial-gold decoration-4 underline-offset-4">Teknik Detaylar</h4>
                                                <div className="space-y-4 font-mono text-base lg:text-lg">
                                                    <div className="flex justify-between items-center border-b-2 border-zinc-100 pb-2">
                                                        <span className="font-black text-zinc-500 uppercase tracking-widest text-xs lg:text-sm">Malzeme:</span>
                                                        <span className="font-bold text-zinc-900">{product.material || "1.5mm DKP Sac"}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b-2 border-zinc-100 pb-2">
                                                        <span className="font-black text-zinc-500 uppercase tracking-widest text-xs lg:text-sm">Boya:</span>
                                                        <span className="font-bold text-zinc-900">{product.paint || "Elektrostatik Toz"}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b-2 border-zinc-100 pb-2">
                                                        <span className="font-black text-zinc-500 uppercase tracking-widest text-xs lg:text-sm">Montaj:</span>
                                                        <span className="font-bold text-zinc-900">{product.installation || "Hazır Askı Sistemi"}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pb-2">
                                                        <span className="font-black text-zinc-500 uppercase tracking-widest text-xs lg:text-sm">Menşei:</span>
                                                        <span className="font-bold text-zinc-900">{product.origin || "Yerli Üretim (İzmir)"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="shipping" className="mt-8">
                                        <div className="space-y-6 text-zinc-700 text-base lg:text-lg font-medium font-mono p-8 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                                            <p className="border-l-4 border-industrial-gold pl-5 py-1"><strong className="text-zinc-900 uppercase tracking-wider text-sm lg:text-base block mb-2">Standart Teslimat:</strong> Siparişiniz, onaylandıktan sonraki 2-4 iş günü içerisinde kargoya teslim edilir.</p>
                                            <p className="border-l-4 border-industrial-gold pl-5 py-1"><strong className="text-zinc-900 uppercase tracking-wider text-sm lg:text-base block mb-2">Özenli Paketleme:</strong> Tüm metal posterlerimiz, darbelere dayanıklı özel kutularda ve koruyucu strafor destekli olarak gönderilir.</p>
                                            <p className="text-xs lg:text-sm text-zinc-500 uppercase font-black tracking-widest mt-8 bg-zinc-100 p-4 border-2 border-dashed border-zinc-300">*Resmi tatiller ve kampanya dönemlerinde teslimat sürelerinde değişiklik olabilir.</p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="warranty" className="mt-8">
                                        <div className="space-y-6 text-zinc-700 text-base lg:text-lg font-medium font-mono p-8 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                                            <div className="flex items-center gap-4 mb-8 border-b-2 border-zinc-100 pb-6">
                                                <Shield className="w-10 h-10 text-industrial-gold" />
                                                <span className="text-zinc-900 font-syne font-black italic uppercase text-2xl lg:text-3xl">10 Yıl Solmazlık Garantisi</span>
                                            </div>
                                            <p className="border-l-4 border-industrial-gold pl-5 py-2">VERAL Metal Works ürünleri, en yüksek kalitede malzemeler ve boya teknolojisi kullanılarak üretilir. İç mekan kullanımında solmaya, paslanmaya ve deformasyona karşı 10 yıl garanti sunuyoruz.</p>
                                            <p className="border-l-4 border-industrial-gold pl-5 py-2">İade ve değişim işlemleriniz için 14 gün içerisinde müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </m.div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts && relatedProducts.length > 0 && (
                <section className="py-24 border-t-4 border-zinc-900 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center justify-between mb-16 border-b-2 border-zinc-900 pb-4">
                            <h2 className="text-4xl md:text-5xl font-black font-syne uppercase italic text-zinc-900 tracking-tighter">
                                Benzer Ürünler
                            </h2>
                            <Link
                                href="/urunler"
                                className="text-sm font-black text-zinc-500 uppercase tracking-widest hover:text-industrial-gold transition-colors flex items-center gap-2 font-mono"
                            >
                                Tümünü Gör <ArrowLeft className="w-5 h-5 rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((relProduct) => (
                                <Link
                                    key={relProduct.id}
                                    href={`/urunler/${relProduct.slug}`}
                                    className="group block border-2 border-zinc-900 bg-[#FAFAFA] shadow-[8px_8px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[6px] hover:translate-y-[6px] transition-all p-3"
                                >
                                    <div
                                        className="aspect-square border-2 border-zinc-900 overflow-hidden mb-4 relative bg-white"
                                    >
                                        {relProduct.image_url ? (
                                            <MetalImage
                                                src={relProduct.image_url}
                                                alt={relProduct.name}
                                                backgroundColor="transparent"
                                                className="w-full h-full p-8 transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                                                <Zap className="w-8 h-8" />
                                            </div>
                                        )}

                                        {relProduct.price > 0 && (
                                            <div className="absolute top-0 right-0 border-l-2 border-b-2 border-zinc-900 bg-industrial-gold px-4 py-2 text-xs lg:text-sm font-black font-mono text-zinc-900">
                                                {formatPrice(relProduct.price)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-1 pb-3 pt-2">
                                        <h3 className="text-zinc-900 font-syne font-black uppercase text-xl lg:text-2xl truncate group-hover:text-industrial-gold transition-colors">
                                            {relProduct.name}
                                        </h3>
                                        <p className="text-xs lg:text-sm uppercase font-black tracking-widest text-zinc-500 font-mono mt-2 truncate">
                                            {relProduct.category?.name || "Metal Tablo"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </main>
    )
}
