"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, ShoppingCart, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { MetalProduct } from "@/lib/supabase/metal-products.types"
import { ImageViewer } from "@/components/product/ImageViewer"
import { ProductVariants, VariantState } from "@/components/product/ProductVariants"
import { ProductInfoBlocks, ProductFAQ } from "@/components/product/ProductInfo"
import { useCartStore } from "@/store/useCartStore"

interface ProductDetailClientProps {
    product: MetalProduct
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
    const router = useRouter()
    const addItem = useCartStore((state) => state.addItem)
    const [variant, setVariant] = React.useState<VariantState>({ size: '45x60', orientation: 'vertical' })
    const [price, setPrice] = React.useState(product.price)
    const [addedToCart, setAddedToCart] = React.useState(false)
    const [cartError, setCartError] = React.useState<string | null>(null)

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
        <div className="product-detail-page min-h-screen bg-[#FAFAFA] pb-20 font-syne">
            {/* Breadcrumb / Nav */}
            <div className="container px-4 py-8">
                <Link href="/urunler" className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 font-black uppercase tracking-[0.2em] font-mono transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Kataloğa Dön
                </Link>
            </div>

            <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Visuals - Now interactive */}
                <div className="space-y-4">
                    <div className="border-2 border-zinc-900 bg-white shadow-[8px_8px_0_0_#18181b] p-2">
                        {product.image_url ? (
                            <ImageViewer
                                src={product.image_url}
                                alt={product.name}
                                aspectRatio={variant.orientation === 'horizontal' ? "aspect-[3/2]" : "aspect-[2/3]"}
                            />
                        ) : (
                            <div className="aspect-[2/3] bg-zinc-100 animate-pulse border-2 border-dashed border-zinc-300" />
                        )}
                    </div>
                    <p className="text-center text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold mt-4">
                        Görsele tıklayarak yakınlaştırabilirsiniz
                    </p>
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] font-mono bg-industrial-gold border-2 border-zinc-900 text-zinc-900 shadow-[2px_2px_0_0_#18181b]">
                                {product.category?.name || "Kategorisiz"}
                            </span>
                            {product.stock_quantity > 0 ? (
                                <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] font-mono bg-emerald-400 border-2 border-zinc-900 text-zinc-900 shadow-[2px_2px_0_0_#18181b] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white border-2 border-zinc-900 animate-pulse" />
                                    Stokta Var
                                </span>
                            ) : (
                                <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] font-mono bg-zinc-200 border-2 border-zinc-900 text-zinc-500 shadow-[2px_2px_0_0_#18181b]">
                                    Tükendi
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic text-zinc-900 mb-6 tracking-tighter leading-[0.9]">
                            {product.name}
                        </h1>
                        <div className="inline-block px-6 py-4 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] mb-4">
                            <span className="text-[10px] font-black uppercase font-mono tracking-[0.3em] text-zinc-400 block mb-1">Fiyat</span>
                            <p className="text-3xl font-black text-zinc-900 italic tracking-tighter">
                                {formatPrice(price)}
                            </p>
                        </div>
                    </div>

                    {/* Interactive Variants */}
                    <ProductVariants onChange={setVariant} />

                    {/* Static Desc */}
                    <div className="text-base text-zinc-600 leading-relaxed font-mono font-medium border-l-4 border-industrial-gold pl-4">
                        <p>{product.description}</p>
                    </div>

                    {/* Features List */}
                    {product.features && product.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y-2 border-zinc-200">
                            {product.features.map(f => (
                                <div key={f.id} className="flex items-center gap-4 px-4 py-3 bg-white border-2 border-zinc-900 shadow-[2px_2px_0_0_#18181b]">
                                    <div className="w-8 h-8 flex items-center justify-center shrink-0 border-r-2 border-zinc-900 pr-3 mr-1">
                                        <Check className="w-5 h-5 text-industrial-gold" />
                                    </div>
                                    <span className="font-bold text-sm text-zinc-800">{f.feature_text}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        {/* Price & Stock Validation Warning */}
                        {(!price || price <= 0) && (
                            <div className="flex items-center gap-4 p-4 bg-red-50 border-2 border-red-500 shadow-[4px_4px_0_0_#ef4444]">
                                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-sm font-bold text-red-700 font-mono">Bu ürün şu an satışa kapalıdır. Lütfen iletişime geçin.</p>
                            </div>
                        )}

                        {product.stock_quantity <= 0 && (
                            <div className="flex items-center gap-4 p-4 bg-zinc-100 border-2 border-zinc-400 shadow-[4px_4px_0_0_#a1a1aa]">
                                <AlertTriangle className="w-6 h-6 text-zinc-500 flex-shrink-0" />
                                <p className="text-sm font-bold text-zinc-600 font-mono">Bu ürün şu an stokta bulunmamaktadır.</p>
                            </div>
                        )}

                        {cartError && (
                            <div className="flex items-center gap-4 p-4 bg-red-50 border-2 border-red-500 shadow-[4px_4px_0_0_#ef4444]">
                                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-sm font-bold text-red-700 font-mono">{cartError}</p>
                            </div>
                        )}

                        {addedToCart && (
                            <div className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-500 shadow-[4px_4px_0_0_#10b981]">
                                <Check className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <p className="text-sm font-bold text-emerald-800 font-mono">Ürün sepete eklendi!</p>
                                <Link href="/sepet" className="ml-auto text-sm font-black text-emerald-700 uppercase underline tracking-wider font-mono hover:text-emerald-900 transition-colors">
                                    Sepete Git
                                </Link>
                            </div>
                        )}

                        <button
                            disabled={!price || price <= 0 || product.stock_quantity <= 0}
                            onClick={() => {
                                setCartError(null)
                                const result = addItem({
                                    productId: product.id,
                                    name: product.name,
                                    slug: product.slug,
                                    size: variant.size,
                                    orientation: variant.orientation,
                                    price: price,
                                    image: product.image_url || '/products/arabalar-plaka/3000x1500.webp',
                                })
                                if (result.success) {
                                    setAddedToCart(true)
                                    setTimeout(() => setAddedToCart(false), 3000)
                                } else {
                                    setCartError(result.error || 'Ürün sepete eklenemedi')
                                }
                            }}
                            className="w-full h-16 flex items-center justify-center gap-3 bg-industrial-gold border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Sepete Ekle ({variant.size} - {variant.orientation === 'vertical' ? 'Dikey' : 'Yatay'})
                        </button>

                        <button
                            disabled={!price || price <= 0 || product.stock_quantity <= 0}
                            onClick={() => {
                                const result = addItem({
                                    productId: product.id,
                                    name: product.name,
                                    slug: product.slug,
                                    size: variant.size,
                                    orientation: variant.orientation,
                                    price: price,
                                    image: product.image_url || '/products/arabalar-plaka/3000x1500.webp',
                                })
                                if (result.success) {
                                    router.push('/odeme')
                                } else {
                                    setCartError(result.error || 'Ürün sepete eklenemedi')
                                }
                            }}
                            className="w-full h-14 flex items-center justify-center gap-3 bg-white border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Hemen Satın Al
                        </button>

                        <p className="text-[10px] text-center text-zinc-500 font-bold uppercase tracking-widest font-mono mt-2">
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
