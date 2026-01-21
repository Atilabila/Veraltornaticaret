"use client";

import React, { useState } from 'react';
import { useConfiguratorStore, SIZES, ORIENTATIONS } from '@/store/useConfiguratorStore';
import { useCartStore } from '@/store/useCartStore';
import { Check, ShoppingCart, ShieldCheck, Truck, RotateCcw, CreditCard, Info } from 'lucide-react';
import { Product } from '@/lib/products';
import { CartTerminal } from '@/components/checkout/CartTerminal';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfigurationPanel({ product }: { product: Product }) {
    const { size: selectedSize, orientation, setSize, setOrientation } = useConfiguratorStore();
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const totalPrice = product.price + selectedSize.priceAdd;

    const handleAddToCart = () => {
        const displaySize = orientation === 'landscape'
            ? `${selectedSize.name.split('x')[1].split(' ')[0]}x${selectedSize.name.split('x')[0]} CM`
            : selectedSize.name;

        addItem({
            id: product.id + "_" + selectedSize.id + "_" + orientation,
            name: product.name,
            size: displaySize + ` (${orientation === 'portrait' ? 'DİKEY' : 'YATAY'})`,
            price: totalPrice,
            image: product.image,
        });

        setIsAdded(true);
        setIsCartOpen(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 bg-white p-2 md:p-0">
            <CartTerminal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* PRODUCT TITLE & PRICE - Soft & Focused */}
            <div className="space-y-4">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-[#ff6b00] tracking-[0.2em] uppercase">
                        {product.category?.replace("_PLAKA", "")} // KOLEKSİYON
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-[1.1] uppercase tracking-tighter">
                        {product.name}
                    </h1>
                </div>

                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-[#111827]">{totalPrice} TL</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">KDV Dahil</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">STOKTA: AYNI GÜN KARGO</span>
                </div>
            </div>

            {/* CONFIGURATION SECTIONS */}
            <div className="space-y-10">
                {/* ORIENTATION - Soft Pill Toggle */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-400">01. GÖRÜNÜM</span>
                        <span className="text-[#111827]">{orientation === 'portrait' ? 'DİKEY' : 'YATAY'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                        {ORIENTATIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setOrientation(opt.id as 'portrait' | 'landscape')}
                                className={`h-12 rounded-xl text-xs font-bold transition-all uppercase ${orientation === opt.id
                                    ? 'bg-white text-[#111827] shadow-xl shadow-gray-200/50 border border-gray-100'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {opt.name === 'PORTRAIT' ? 'DİKEY' : 'YATAY'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SIZES - Minimalist Grid */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-400">02. BOYUT</span>
                        <span className="text-[#111827]">{selectedSize.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {SIZES.map((size) => (
                            <button
                                key={size.id}
                                onClick={() => setSize(size)}
                                className={`relative p-5 text-left rounded-[1.5rem] transition-all border-2 flex flex-col gap-1 ${selectedSize.id === size.id
                                    ? 'border-[#ff6b00] bg-white shadow-2xl shadow-orange-100/50 scale-[1.02]'
                                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                                    }`}
                            >
                                <span className={`text-sm font-black ${selectedSize.id === size.id ? 'text-[#111827]' : 'text-gray-500'}`}>
                                    {orientation === 'landscape'
                                        ? `${size.name.split('x')[1].split(' ')[0]}x${size.name.split('x')[0]} CM`
                                        : size.name}
                                </span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    {size.id === 'mini' ? 'MİNİ' : size.id === 'standard' ? 'ORTA' : size.id === 'wide' ? 'GENİŞ' : 'MAKSİ'}
                                </span>
                                {size.priceAdd !== 0 && (
                                    <span className={`text-[10px] mt-1 font-bold ${selectedSize.id === size.id ? 'text-[#ff6b00]' : 'text-gray-400'}`}>
                                        +{size.priceAdd} TL
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ACTION BUTTON - The "Only" Dark/Heavy Element */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`
                        w-full h-16 rounded-[1.5rem] flex items-center justify-center gap-4 text-lg font-black uppercase transition-all
                        ${isAdded
                            ? 'bg-green-600 text-white shadow-xl shadow-green-100'
                            : 'bg-[#111827] text-white hover:bg-black hover:shadow-2xl hover:shadow-gray-300 transition-all active:scale-[0.98]'
                        }
                    `}
                >
                    <AnimatePresence mode="wait">
                        {isAdded ? (
                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                SEPETE EKLENDİ
                            </motion.span>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                                <span>SEPETE EKLE</span>
                                <ShoppingCart className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                {/* WHATSAPP SUPPORT LİNE */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 text-center justify-center">
                    <Info className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Özel ölçü için Whatsapp hattını kullanın</span>
                </div>

                {/* TRUST BADGES - Clean Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: ShieldCheck, label: "GÜVENLİ ÖDEME" },
                        { icon: Truck, label: "HIZLI TESLİMAT" },
                        { icon: RotateCcw, label: "14 GÜN İADE" },
                        { icon: CreditCard, label: "TAKSİT İMKANI" }
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-gray-50 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <badge.icon className="w-5 h-5 text-[#ff6b00] opacity-80" />
                            <span className="text-[9px] font-black text-[#111827] uppercase leading-tight tracking-wider">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
