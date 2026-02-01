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

interface ProductDetailClientProps {
    product: MetalProduct
    relatedProducts?: any[]
}

// Dynamic icon mapping
const FEATURE_ICONS: Record<string, React.ElementType> = {
    Shield, Zap, Package, Truck, Check, Info, Ruler, FileText, Factory
}

export default function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
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
        <main className="min-h-screen bg-zinc-950">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/urunler"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Kataloğa Dön</span>
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
            <div className="pt-24 pb-32">
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
                                {isRetail && (
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
                            {/* Title & SKU */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                                        SKU: {product.sku || product.id.slice(0, 8)}
                                    </span>
                                    {product.is_showcase && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase">
                                            Vitrin Ürünü
                                        </span>
                                    )}
                                </div>
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
                            {isRetail ? (
                                <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-6">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-4xl font-bold text-white">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-sm text-zinc-500 font-medium bg-zinc-800 px-2 py-1 rounded">
                                            KDV Dahil
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <motion.button
                                            onClick={() => handleAddToCart()}
                                            disabled={inCart || isAdding}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-3 px-8 py-4",
                                                "rounded-lg font-bold text-sm uppercase tracking-wider",
                                                "transition-all duration-300",
                                                inCart
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700",
                                            )}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {inCart ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    Sepette
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag className="w-5 h-5" />
                                                    {isAdding ? "..." : "Sepete Ekle"}
                                                </>
                                            )}
                                        </motion.button>

                                        <motion.button
                                            onClick={() => handleAddToCart(true)}
                                            disabled={isAdding}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-3 px-10 py-4",
                                                "rounded-lg font-bold text-sm uppercase tracking-wider",
                                                "transition-all duration-300",
                                                "bg-[var(--color-brand-safety-orange)] text-white",
                                                "hover:bg-orange-600",
                                                "shadow-lg shadow-orange-500/20"
                                            )}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Zap className="w-5 h-5 fill-current" />
                                            Hemen Al
                                        </motion.button>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                                        <Shield className="w-3 h-3" />
                                        <span>Güvenli Ödeme &SSL Koruması</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                                        <Info className="w-5 h-5" />
                                        <span className="font-bold uppercase tracking-wider">Özel Üretim / Proje Ürünü</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm">
                                        Bu ürün stoktan satışa kapalıdır. Projeleriniz için özel üretim olarak talep edebilirsiniz.
                                    </p>
                                    <a
                                        href={`https://wa.me/905071651315?text=Merhaba, ${encodeURIComponent(product.name)} (SKU: ${product.sku}) için fiyat teklifi almak istiyorum.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center justify-center gap-3 px-8 py-4 w-full",
                                            "rounded-lg font-bold text-sm uppercase tracking-wider",
                                            "bg-white text-black hover:bg-zinc-200 transition-colors"
                                        )}
                                    >
                                        <FileText className="w-5 h-5" />
                                        Fiyat Teklifi İste
                                    </a>
                                </div>
                            )}

                            {/* Detailed Info Tabs */}
                            <div className="pt-8">
                                <Tabs defaultValue="features" className="w-full">
                                    <TabsList className="w-full grid grid-cols-3 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                                        <TabsTrigger value="features" className="data-[state=active]:bg-zinc-800">Özellikler</TabsTrigger>
                                        <TabsTrigger value="shipping" className="data-[state=active]:bg-zinc-800">Teslimat</TabsTrigger>
                                        <TabsTrigger value="warranty" className="data-[state=active]:bg-zinc-800">Garanti</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="features" className="mt-6 space-y-4">
                                        <div className="grid grid-cols-1 gap-3">
                                            {sortedFeatures.map((feature, index) => (
                                                <div key={index} className="flex gap-4 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50">
                                                    <div className="mt-1">
                                                        {feature.feature_icon && FEATURE_ICONS[feature.feature_icon] ? (
                                                            React.createElement(FEATURE_ICONS[feature.feature_icon], { className: "w-5 h-5 text-zinc-500" })
                                                        ) : <Zap className="w-5 h-5 text-zinc-500" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-zinc-300 text-sm mb-1">{product.category?.name || "Özellik"}</h4>
                                                        <p className="text-zinc-400 text-sm">{feature.feature_text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Default Specs if none */}
                                            {sortedFeatures.length === 0 && (
                                                <div className="text-zinc-500 text-sm italic p-4">Bu ürün için ek teknik özellik girilmemiştir.</div>
                                            )}

                                            {/* Common Specs */}
                                            <div className="grid grid-cols-2 gap-3 mt-4">
                                                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                                                    <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Malzeme</span>
                                                    <span className="text-sm text-zinc-300">{product.material || "1.5mm DKP Çelik"}</span>
                                                </div>
                                                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                                                    <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Boya</span>
                                                    <span className="text-sm text-zinc-300">{product.paint || "Elektrostatik Toz"}</span>
                                                </div>
                                                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                                                    <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Montaj</span>
                                                    <span className="text-sm text-zinc-300">{product.installation || "Hazır Askı Sistemi"}</span>
                                                </div>
                                                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                                                    <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Menşei</span>
                                                    <span className="text-sm text-zinc-300">{product.origin || "Yerli Üretim (İzmir)"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="shipping" className="mt-6">
                                        <div className="space-y-4 text-zinc-400 text-sm leading-relaxed p-4 bg-zinc-900/30 rounded-lg border border-zinc-800">
                                            <p><strong className="text-white">Standart Teslimat:</strong> Siparişiniz, onaylandıktan sonraki 2-4 iş günü içerisinde kargoya teslim edilir.</p>
                                            <p><strong className="text-white">Özenli Paketleme:</strong> Tüm metal posterlerimiz, darbelere dayanıklı özel kutularda ve koruyucu strafor destekli olarak gönderilir.</p>
                                            <p className="text-xs text-zinc-500">*Resmi tatiller ve kampanya dönemlerinde teslimat sürelerinde değişiklik olabilir.</p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="warranty" className="mt-6">
                                        <div className="space-y-4 text-zinc-400 text-sm leading-relaxed p-4 bg-zinc-900/30 rounded-lg border border-zinc-800">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Shield className="w-6 h-6 text-emerald-500" />
                                                <span className="text-white font-bold">10 Yıl Solmazlık Garantisi</span>
                                            </div>
                                            <p>VERAL Metal Works ürünleri, en yüksek kalitede malzemeler ve boya teknolojisi kullanılarak üretilir. İç mekan kullanımında solmaya, paslanmaya ve deformasyona karşı 10 yıl garanti sunuyoruz.</p>
                                            <p>İade ve değişim işlemleriniz için 14 gün içerisinde müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts && relatedProducts.length > 0 && (
                <section className="py-24 border-t border-zinc-900">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-2xl font-bold font-['Syne',sans-serif] text-white">
                                Benzer Ürünler
                            </h2>
                            <Link
                                href="/urunler"
                                className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
                            >
                                Tümünü Gör <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relProduct) => (
                                <Link
                                    key={relProduct.id}
                                    href={`/urunler/${relProduct.slug}`}
                                    className="group block"
                                >
                                    <div
                                        className="aspect-square rounded-sm overflow-hidden mb-4 relative"
                                        style={{ backgroundColor: relProduct.background_color }}
                                    >
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                        {relProduct.image_url ? (
                                            <MetalImage
                                                src={relProduct.image_url}
                                                alt={relProduct.name}
                                                backgroundColor={relProduct.background_color}
                                                className="w-full h-full p-8 transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
                                                <Zap className="w-8 h-8" />
                                            </div>
                                        )}

                                        {relProduct.price > 0 && (
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
                                                {formatPrice(relProduct.price)}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-white font-bold truncate group-hover:text-amber-500 transition-colors">
                                        {relProduct.name}
                                    </h3>
                                    <p className="text-sm text-zinc-500 truncate">
                                        {relProduct.category?.name || "Metal Tablo"}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )
            }

        </main >
    )
}
