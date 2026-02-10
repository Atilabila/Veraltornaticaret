"use client";

import React, { useState } from 'react';
import { useConfiguratorStore, SIZES } from '@/store/useConfiguratorStore';
import { useCartStore } from '@/store/useCartStore';
import { Check, ShoppingCart, ShieldCheck, Truck, RotateCcw, CreditCard, Settings } from 'lucide-react';
import { Product } from '@/lib/products';
import { CartTerminal } from '@/components/checkout/CartTerminal';
import { m, AnimatePresence } from 'framer-motion';

export default function ConfigurationPanel({ product }: { product: Product }) {
    const { size: selectedSize, setSize, customImage } = useConfiguratorStore();
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const totalPrice = product.price + selectedSize.priceAdd;

    // Display size (Görsel oranına göre otomatik şekillenir)
    const getDisplaySize = (size: typeof SIZES[0]) => {
        return `${size.dimB}x${size.dimA} CM`; // Standart görünüm
    };

    const handleAddToCart = () => {
        addItem({
            id: product.id + "_" + selectedSize.id + "_smartfit",
            name: customImage ? "ÖZEL TASARIM METAL POSTER" : product.name,
            size: getDisplaySize(selectedSize) + " (SMART-FIT)",
            price: totalPrice,
            image: customImage || product.image,
        });

        setIsAdded(true);
        setIsCartOpen(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="space-y-8">
            <CartTerminal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* PRODUCT HEADER */}
            <div>
                <h1 className="text-3xl md:text-5xl font-black leading-[0.9] uppercase mb-1">
                    {customImage ? "SİZİN ÖZEL TASARIMINIZ" : product.name}
                </h1>
                <div className="font-mono text-xs font-bold text-black/40 uppercase tracking-[0.2em] mb-4">
                    {customImage ? "— SİZE ÖZEL METAL BASKI —" : "— HAYALİNDEKİ MEKANI TASARLA —"}
                </div>

                {/* RATING */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-[#D4AF37]">
                        {[1, 2, 3, 4, 5].map(i => (
                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-bold text-black/60">(48 Değerlendirme)</span>
                </div>

                {/* DESCRIPTION */}
                <p className="font-mono text-lg leading-relaxed border-l-4 border-[#D4AF37] pl-6 py-2 bg-slate-50 mb-8 italic">
                    {customImage ? "Yüklediğiniz bu harika görseli 1.5mm yüksek kalite alüminyum üzerine işleyip size gönderiyoruz!" : product.description}
                </p>
            </div>

            {/* SIZE SELECTION */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-base font-black uppercase text-black font-mono">
                        <Settings className="w-4 h-4" /> BOYUT VE YAPILANDIRMA
                    </label>
                    <div className="font-mono text-[9px] font-black text-[#D4AF37] animate-pulse">
                        ÖNERİLEN ÇÖZÜNÜRLÜK: 3000x2000 PX+
                    </div>
                </div>

                {/* MODE INDICATOR - AKILLI MOD */}
                <div className="border-4 border-black mb-4">
                    <div className="bg-black text-white py-4 font-mono text-xs font-black flex items-center justify-center gap-3">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                        SMART-FIT (DİNAMİK ORAN)
                    </div>
                </div>

                {/* SIZE GRID */}
                <div className="grid grid-cols-2 gap-0 border-4 border-black">
                    {SIZES.map((size, index) => (
                        <button
                            key={size.id}
                            onClick={() => setSize(size)}
                            className={`p-4 text-left transition-none border-b-2 ${index % 2 === 1 ? 'border-l-2' : ''} border-black ${selectedSize.id === size.id
                                ? 'bg-[#D4AF37] text-black'
                                : 'bg-white text-black hover:bg-[#D4AF37]/20'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-black font-mono text-sm">
                                    {size.name}
                                </span>
                                {selectedSize.id === size.id && (
                                    <Check className="w-4 h-4" />
                                )}
                            </div>
                            <div className="text-[10px] font-bold uppercase text-black/50 font-mono">
                                {size.desc}
                            </div>
                            <div className={`text-sm font-black mt-1 ${selectedSize.id === size.id ? 'text-black' : 'text-[#D4AF37]'}`}>
                                {size.priceAdd > 0 ? `+₺${size.priceAdd}` : size.priceAdd < 0 ? `-₺${Math.abs(size.priceAdd)}` : '—'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* PRICE & ADD TO CART */}
            <div className="border-4 border-black p-6 bg-white">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs font-bold text-black/50 uppercase">HESAPLANAN BİRİM MALİYET</span>
                    <span className="text-[#D4AF37] font-mono text-xs font-bold">● STOKTA MEVCUT</span>
                </div>
                <div className="text-5xl font-black mb-4">
                    ₺{totalPrice} <span className="text-lg font-normal text-black/50">/ ADET</span>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`w-full py-5 font-mono text-lg font-black uppercase transition-all ${isAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isAdded ? (
                            <m.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-4">
                                SEPETE EKLENDİ <Check size={24} />
                            </m.span>
                        ) : (
                            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4">
                                <ShoppingCart size={20} />
                                <span>SEPETE EKLE</span>
                            </m.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { icon: ShieldCheck, label: "GÜVENLİ ÖDEME" },
                    { icon: Truck, label: "HIZLI KARGO" },
                    { icon: RotateCcw, label: "KOLAY İADE" },
                    { icon: CreditCard, label: "TAKSİT İMKANI" }
                ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 border-2 border-dashed border-black/20 hover:border-[#D4AF37] transition-all">
                        <badge.icon size={16} className="text-[#D4AF37]" />
                        <span className="text-[10px] font-black text-black/60 uppercase tracking-widest">{badge.label}</span>
                    </div>
                ))}
            </div>

            {/* STOCK INFO */}
            <div className="bg-green-50 border-2 border-green-200 p-4 text-center">
                <span className="text-green-700 font-mono text-xs font-bold uppercase">
                    ● STOKTA MEVCUT (İZMİR DEPODAN GÖNDERİM)
                </span>
            </div>
        </div>
    );
}
