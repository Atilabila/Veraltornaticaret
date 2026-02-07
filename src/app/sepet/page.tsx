"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2, ShoppingCart, Star } from "lucide-react";
import { useCartStore, useCartItemCount } from "@/store/useCartStore";
import { useContentStore } from "@/store/useContentStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/lib/actions/metal-products.actions";
import { MetalProduct } from "@/lib/supabase/metal-products.types";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
};

const CartProgressBar = ({ step }: { step: number }) => {
    const steps = [
        { id: 1, label: "Sepet" },
        { id: 2, label: "Adres" },
        { id: 3, label: "Ödeme" },
        { id: 4, label: "Tamamlandı" }
    ];

    return (
        <div className="mb-12">
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                {/* Connection Lines */}
                <div className="absolute top-5 left-0 w-full h-[1px] bg-zinc-200 z-0" />
                <div
                    className="absolute top-5 left-0 h-[1px] bg-black z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((s) => (
                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${s.id <= step
                                ? "bg-black border-black text-white"
                                : "bg-white border-zinc-200 text-zinc-400"
                                }`}
                        >
                            {s.id < step ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                <span className="font-mono text-sm">{s.id.toString().padStart(2, '0')}</span>
                            )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${s.id <= step ? "text-black" : "text-zinc-400"}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RecommendedProductCard = ({ product }: { product: MetalProduct }) => {
    return (
        <Link href={`/metal-urunler/${product.slug}`} className="group block">
            <div className="aspect-[3/4] bg-white border border-zinc-100 rounded-[2rem] mb-6 overflow-hidden relative group-hover:border-zinc-300 transition-all duration-500 shadow-sm group-hover:shadow-xl">
                <img
                    src={product.image_url || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />

                {product.is_showcase && (
                    <div className="absolute top-6 left-6 px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                        POPÜLER
                    </div>
                )}

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                        <Plus className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="px-4 text-center">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    {product.category?.name || "METAL POSTER"}
                </p>
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tight mb-2 truncate group-hover:text-black transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm font-black italic tracking-tighter text-zinc-800">
                    {formatPrice(product.price)}
                </p>
            </div>
        </Link>
    );
};

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal, clearCart, isHydrated } = useCartStore();
    const { content } = useContentStore();
    const [relatedProducts, setRelatedProducts] = React.useState<MetalProduct[]>([]);
    const [loadingProducts, setLoadingProducts] = React.useState(true);

    const cartCMS = content.cartPage;

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getProducts();
                if (response.success && response.data) {
                    // Filter out products already in cart and take first 4
                    const cartSlugs = items.map(item => item.slug);
                    const suggested = response.data
                        .filter(p => !cartSlugs.includes(p.slug))
                        .slice(0, 4);
                    setRelatedProducts(suggested);
                }
            } catch (error) {
                console.error("Failed to fetch related products:", error);
            } finally {
                setLoadingProducts(false);
            }
        }
        fetchProducts();
    }, [items]);

    if (!isHydrated) {
        return (
            <>
                <Navigation />
                <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
                    <div className="container max-w-7xl mx-auto px-4">
                        <div className="animate-pulse space-y-12">
                            <div className="h-10 bg-zinc-200 rounded w-48" />
                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-4">
                                    {[1, 2, 3].map(i => <div key={i} className="h-40 bg-zinc-200 rounded-3xl" />)}
                                </div>
                                <div className="h-80 bg-zinc-200 rounded-3xl" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (items.length === 0) {
        return (
            <>
                <Navigation />
                <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center bg-white p-16 rounded-[3rem] border border-zinc-100 shadow-xl max-w-xl w-full mx-4"
                    >
                        <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-100 shadow-inner">
                            <ShoppingBag className="w-10 h-10 text-zinc-300" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight mb-4 uppercase">{cartCMS?.emptyTitle || "SEPETİNİZ BOŞ"}</h1>
                        <p className="text-zinc-500 mb-10 text-sm tracking-wide leading-relaxed uppercase">
                            {cartCMS?.emptyDescription || "HENÜZ SEPETİNİZE ÜRÜN EKLEMEDİNİZ. KOLEKSİYONUMUZU KEŞFEDİN."}
                        </p>
                        <Link href="/metal-urunler">
                            <Button size="lg" className="px-12 h-16 rounded-full bg-black hover:bg-zinc-800 text-white font-bold tracking-widest text-[10px] uppercase shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                                {cartCMS?.continueShoppingText || "ALIŞVERİŞE DEVAM ET"}
                            </Button>
                        </Link>
                    </motion.div>
                </main>
                <Footer />
            </>
        );
    }

    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    const threshold = cartCMS?.freeShippingThreshold || 1000;
    const isFreeShipping = subtotal >= threshold;
    const diff = threshold - subtotal;
    const progress = Math.min((subtotal / threshold) * 100, 100);

    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
                <div className="container max-w-7xl mx-auto px-4">
                    <CartProgressBar step={1} />

                    <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">{cartCMS?.title || "SEPETİNİZ"}</h1>
                            <p className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                                TOPLAM {items.length} KALEM ÜRÜN BULUNUYOR
                            </p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="text-[10px] font-bold text-zinc-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors pb-1 border-b border-transparent hover:border-red-500"
                        >
                            <Trash2 className="w-3 h-3" />
                            SEPETİ TEMİZLE
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-8 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={`${item.id}-${item.size}-${item.orientation}`}
                                        className="bg-white border border-zinc-200/60 rounded-[2.5rem] p-8 group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 relative overflow-hidden"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center gap-8">
                                            <div className="w-40 h-40 bg-zinc-50 rounded-3xl overflow-hidden flex-shrink-0 flex items-center justify-center p-4 border border-zinc-100 group-hover:bg-white transition-colors">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-black text-zinc-900 group-hover:text-black transition-colors uppercase tracking-tight">{item.name}</h3>
                                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-2">
                                                            <span className="text-[10px] font-black text-zinc-400 border border-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">{item.size}</span>
                                                            <span className="text-[10px] font-black text-zinc-400 border border-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">{item.orientation === 'vertical' ? 'DİKEY' : 'YATAY'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-black italic tracking-tighter text-zinc-900">{formatPrice(item.price)}</p>
                                                        {item.quantity > 1 && (
                                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                                                                {item.quantity} ADET: {formatPrice(item.price * item.quantity)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-50">
                                                    <div className="flex items-center bg-zinc-50 rounded-2xl p-1 border border-zinc-100">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-white rounded-xl transition-all"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-12 text-center font-black text-sm text-zinc-900">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-white rounded-xl transition-all"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-500 text-[10px] font-black tracking-widest uppercase transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        SİL
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Shipping Incentive */}
                            <div className="bg-zinc-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-1000" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                                                {isFreeShipping ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <LucideIcons.Zap className="w-6 h-6 text-yellow-400" />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black tracking-tight uppercase">
                                                    {isFreeShipping
                                                        ? "TEBRİKLER! ÜCRETSİZ KARGO HAKKI KAZANDINIZ"
                                                        : (cartCMS?.shippingIncentiveText?.replace("{amount}", formatPrice(diff)) || `HARİKA! ÜCRETSİZ KARGOYA SADECE ${formatPrice(diff)} KALDI`)}
                                                </h3>
                                                <p className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase mt-1">ÖZEL SEVKİYAT PROTOKOLÜ</p>
                                            </div>
                                        </div>
                                    </div>

                                    {cartCMS?.showProgressBar && (
                                        <div className="space-y-3">
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    className={`h-full transition-all duration-1000 ${isFreeShipping ? "bg-emerald-500" : "bg-white"}`}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em]">
                                                <span className="text-zinc-500">BAŞLANGIÇ</span>
                                                <span className={isFreeShipping ? "text-emerald-400" : "text-white"}>ÜCRETSİZ KARGO {threshold}₺</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-6">
                                <div className="bg-white border border-zinc-200/60 rounded-[3rem] p-10 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />

                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-50 relative z-10">ÖDEME DETAYLARI</h2>

                                    <div className="space-y-6 mb-10 relative z-10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ARA TOPLAM</span>
                                            <span className="font-black text-lg text-zinc-900 tracking-tighter">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">KARGO ÜCRETİ</span>
                                            {isFreeShipping ? (
                                                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">ÜCRETSİZ</span>
                                            ) : (
                                                <span className="font-black text-lg text-zinc-900 tracking-tighter">{formatPrice(shipping)}</span>
                                            )}
                                        </div>
                                        <div className="h-[1px] bg-zinc-50 my-6" />
                                        <div className="flex justify-between items-center text-4xl font-black italic">
                                            <span className="text-zinc-900 tracking-tighter uppercase">TOPLAM</span>
                                            <span className="text-zinc-900 tracking-tighter">{formatPrice(getTotal())}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-10 relative z-10">
                                        <Link href="/odeme">
                                            <Button size="lg" className="w-full bg-black hover:bg-zinc-800 text-white h-20 rounded-2xl flex items-center justify-center gap-4 group transition-all relative overflow-hidden">
                                                <span className="font-black tracking-widest uppercase text-xs relative z-10">{cartCMS?.checkoutButtonText || "ÖDEMEYE GEÇ"}</span>
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform relative z-10">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                                <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                            </Button>
                                        </Link>
                                        <Link href="/metal-urunler" className="block text-center text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors py-2">
                                            {cartCMS?.continueShoppingText || "ALIŞVERİŞE DEVAM ET"}
                                        </Link>
                                    </div>

                                    {/* Advantage Blocks */}
                                    <div className="space-y-6 pt-10 border-t border-zinc-50 relative z-10">
                                        {cartCMS?.advantageBlocks?.map((block: any, i: number) => (
                                            <div key={i} className="flex items-center gap-6 group/item">
                                                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover/item:bg-black group-hover/item:text-white transition-all duration-300">
                                                    <IconComponent name={block.icon} className="w-5 h-5" />
                                                </div>
                                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">
                                                    {block.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <section className="mt-28">
                        <div className="flex flex-col items-center mb-16">
                            <div className="w-12 h-1 bg-black mb-6" />
                            <h2 className="text-4xl font-black tracking-tighter uppercase text-center">{cartCMS?.relatedProductsTitle || "SİZİN İÇİN SEÇTİKLERİMİZ"}</h2>
                            <p className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase mt-4">KÜRATÖR SEÇİMİ</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {loadingProducts ? (
                                [1, 2, 3, 4].map((i) => (
                                    <div key={i} className="space-y-4 animate-pulse">
                                        <div className="aspect-[3/4] bg-zinc-200 rounded-[2rem]" />
                                        <div className="h-4 bg-zinc-200 rounded-full w-2/3 mx-auto" />
                                        <div className="h-3 bg-zinc-200 rounded-full w-1/2 mx-auto" />
                                    </div>
                                ))
                            ) : (
                                relatedProducts.map((product) => (
                                    <RecommendedProductCard key={product.id} product={product} />
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
