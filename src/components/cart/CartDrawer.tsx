"use client";

import React, { useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useContentStore } from "@/store/useContentStore";
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
    const { content } = useContentStore();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setCartOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [setCartOpen]);

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    const total = getTotal();
    const FREE_SHIPPING_THRESHOLD = 500;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const diff = FREE_SHIPPING_THRESHOLD - subtotal;

    const handleWhatsAppCheckout = () => {
        if (items.length === 0) return;

        let message = "Merhaba, sepetimdeki ürünleri WhatsApp üzerinden sipariş vermek istiyorum:\n\n";
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (${item.size} - ${item.orientation === 'vertical' ? 'Dikey' : 'Yatay'})\n`;
            message += `   Adet: ${item.quantity} | Ara Tutar: ${formatPrice(item.price * item.quantity)}\n`;
        });

        message += `\n--- Sipariş özeti ---\n`;
        message += `Ara toplam: ${formatPrice(subtotal)}\n`;
        message += `Kargo: ${shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}\n`;
        message += `*Genel toplam: ${formatPrice(total)}*\n\n`;
        message += "Sipariş işlemleri için yardımcı olabilir misiniz?";

        window.open(`https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (!isHydrated) return null;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-[#c6c6c6] z-[101] flex flex-col shadow-xl"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-[#c6c6c6]">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-[var(--color-brand-accent)]" />
                                <h2 className="text-lg font-bold text-[#161616]">
                                    Sepetim <span className="text-[#525252] font-normal text-sm ml-1">({items.length})</span>
                                </h2>
                            </div>
                            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-[#f4f4f4] transition-colors" aria-label="Sepeti kapat">
                                <X className="w-5 h-5 text-[#525252]" />
                            </button>
                        </div>

                        <div className="p-6 bg-[#f4f4f4] border-b border-[#c6c6c6]">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Truck className={cn("w-4 h-4", progress >= 100 ? "text-emerald-600" : "text-[var(--color-brand-accent)]")} />
                                    <span className="text-xs font-semibold text-[#161616]">
                                        {progress >= 100 ? "Ücretsiz kargo kazandınız!" : `Ücretsiz kargoya ${formatPrice(diff)} kaldı`}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-[#525252]">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-[#c6c6c6] overflow-hidden">
                                <m.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className={cn("h-full", progress >= 100 ? "bg-emerald-500" : "bg-[var(--color-brand-accent)]")}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <ShoppingBag className="w-12 h-12 mb-4 text-[#c6c6c6]" />
                                    <p className="font-semibold text-[#161616] mb-2">Sepetiniz boş</p>
                                    <Link href="/urunler" onClick={() => setCartOpen(false)} className="text-sm text-[var(--color-brand-accent)] hover:underline">
                                        Kataloğa git
                                    </Link>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-5 border-b border-[#e0e0e0] last:border-0">
                                        <div className="relative w-20 h-20 bg-[#f4f4f4] border border-[#c6c6c6] overflow-hidden shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" sizes="80px" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-[#161616] leading-tight truncate">{item.name}</h3>
                                            <p className="text-xs text-[#525252] mt-1">{item.size} · {item.orientation === 'vertical' ? 'Dikey' : 'Yatay'}</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center border border-[#c6c6c6]">
                                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 px-2 hover:bg-[#f4f4f4]">
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 px-2 hover:bg-[#f4f4f4]">
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="font-semibold text-sm text-[#161616]">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeItem(item.id)} className="text-[#8d8d8d] hover:text-red-600 shrink-0" aria-label="Ürünü kaldır">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-[#c6c6c6] bg-[#f4f4f4] space-y-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-[#525252]">
                                        <span>Ara toplam</span>
                                        <span className="text-[#161616] font-semibold">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-[#525252]">
                                        <span>Kargo</span>
                                        <span>{shipping === 0 ? <span className="text-emerald-600 font-semibold">Ücretsiz</span> : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-[#c6c6c6]">
                                        <span className="font-bold text-[#161616]">Toplam</span>
                                        <span className="text-xl font-bold text-[var(--color-brand-accent)]">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/odeme"
                                    onClick={() => setCartOpen(false)}
                                    className="w-full h-12 bg-[var(--color-brand-accent)] text-white font-semibold text-sm hover:bg-[#0043ce] transition-colors flex items-center justify-center gap-2"
                                >
                                    Ödemeye geç <ArrowRight className="w-4 h-4" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full h-11 border border-[#c6c6c6] bg-white text-[#161616] font-semibold text-sm hover:border-[var(--color-brand-accent)] transition-colors"
                                >
                                    WhatsApp ile sipariş ver
                                </button>
                            </div>
                        )}
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
};
