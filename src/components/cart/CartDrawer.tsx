"use client";

import React, { useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const CartDrawer = () => {
    const {
        items,
        isCartOpen,
        setCartOpen,
        removeItem,
        updateQuantity,
        getSubtotal,
        getShippingCost,
        getTotal,
        isHydrated
    } = useCartStore();

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setCartOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [setCartOpen]);

    // Prevent scroll when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    const total = getTotal();
    const FREE_SHIPPING_THRESHOLD = 500;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const diff = FREE_SHIPPING_THRESHOLD - subtotal;

    if (!isHydrated) return null;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />

                    {/* Drawer Content */}
                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-[101] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/50">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-industrial-gold" />
                                <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">
                                    Sepetim <span className="text-industrial-gold/40 font-mono text-sm not-italic ml-2">[{items.length}]</span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Shipping Incentive */}
                        <div className="p-6 bg-white/5 border-b border-white/5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Truck className={cn("w-4 h-4", progress >= 100 ? "text-emerald-400" : "text-industrial-gold")} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">
                                        {progress >= 100 ? "ÜCRETSİZ KARGO KAZANDINIZ!" : `KARGOYA SON ${formatPrice(diff)}`}
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono text-zinc-500">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <m.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className={cn("h-full transition-colors duration-500 shadow-[0_0_10px_rgba(212,175,55,0.3)]", progress >= 100 ? "bg-emerald-500" : "bg-industrial-gold")}
                                />
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <ShoppingBag className="w-16 h-16 mb-4 text-zinc-700" />
                                    <p className="font-black uppercase tracking-widest text-xs">Sepetiniz Boş</p>
                                    <button
                                        onClick={() => setCartOpen(false)}
                                        className="mt-4 text-[10px] font-bold underline decoration-gold-metal/40 hover:text-gold-metal transition-colors"
                                    >
                                        ALIŞVERİŞE BAŞLA
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 bg-white/5 border border-white/10 overflow-hidden rounded-sm p-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain mix-blend-lighten p-2"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-sm font-black text-white uppercase leading-tight group-hover:text-industrial-gold transition-colors">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[8px] font-mono text-industrial-gold/60 border border-industrial-gold/20 px-1.5 py-0.5 rounded-none uppercase">
                                                        {item.size}
                                                    </span>
                                                    <span className="text-[8px] font-mono text-zinc-500 uppercase">
                                                        {item.orientation === 'vertical' ? 'DİKEY' : 'YATAY'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-white/10 rounded-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-white/5 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3 text-zinc-400" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-mono font-bold text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-white/5 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3 text-zinc-400" />
                                                    </button>
                                                </div>
                                                <p className="font-black text-sm text-white italic tracking-tighter">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1 h-fit text-zinc-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        <span>Ara Toplam</span>
                                        <span className="text-white">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        <span>Kargo Ücreti</span>
                                        <span>{shipping === 0 ? <span className="text-emerald-400">ÜCRETSİZ</span> : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="pt-4 flex justify-between border-t border-white/5">
                                        <span className="text-lg font-black text-white uppercase italic tracking-tighter">Toplam</span>
                                        <span className="text-2xl font-black text-industrial-gold italic tracking-tighter drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Link href="/sepet" onClick={() => setCartOpen(false)}>
                                    <button className="w-full h-16 bg-industrial-gold text-black font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-industrial-gold/90 transition-all group shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]">
                                        ÖDEME ADIMINA GEÇ
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>

                                <p className="text-[9px] text-center text-zinc-500 font-bold uppercase tracking-widest">
                                    GÜVENLİ ÖDEME // 256-BIT SSL ŞİFRELEME
                                </p>
                            </div>
                        )}
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
};
