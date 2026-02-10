"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from 'framer-motion';
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Sliders, Box, HardDrive } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { CartTerminal } from "@/components/checkout/CartTerminal";

const sizes = [
    { id: "xs", name: "10x20 CM", priceAdd: -100, desc: "MİNİ TASARIM", ratio: 0.5 },
    { id: "m", name: "30x45 CM", priceAdd: 200, desc: "STANDART GALERİ", ratio: 0.67 },
    { id: "l", name: "45x60 CM", priceAdd: 500, desc: "GENİŞ SERGİLEYİCİ", ratio: 0.75 },
    { id: "xl", name: "60x90 CM", priceAdd: 1000, desc: "MAKSİMUM ETKİ", ratio: 0.67 },
];

export const ProductConfigurator = () => {
    const { products, fetchProducts } = useProductStore();
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(sizes[1]);
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    const product = products[selectedProductIndex] || (products.length > 0 ? products[0] : null);
    if (!product) return null;

    const totalPrice = product.price + selectedSize.priceAdd;

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            size: (orientation === 'landscape'
                ? `${selectedSize.name.split('x')[1].split(' ')[0]}x${selectedSize.name.split('x')[0]} CM`
                : selectedSize.name) + ` (${orientation === 'portrait' ? 'DİKEY' : 'YATAY'})`,
            price: totalPrice,
            image: product.image,
            orientation: orientation === 'portrait' ? 'vertical' : 'horizontal',
        });
        setAdded(true);
        setIsCartOpen(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const nextProduct = () => setSelectedProductIndex((prev) => (prev + 1) % products.length);
    const prevProduct = () => setSelectedProductIndex((prev) => (prev - 1 + products.length) % products.length);

    return (
        <section id="configurator" className="py-16 lg:py-24 bg-transparent">
            <CartTerminal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                <div className="flex flex-col gap-4 mb-16">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">Konfigüratör</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none italic">
                        Kendi <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">Sanatını Tasarla</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#0A0A0A]/5 shadow-2xl overflow-hidden bg-white">
                    {/* LEFT: VISUAL PREVIEW */}
                    <div className="lg:col-span-12 xl:col-span-7 bg-[#0A0A0A]/95 backdrop-blur-sm p-10 lg:p-20 relative flex flex-col items-center justify-center">
                        <div className="absolute top-10 left-10 flex items-center gap-4 text-[#D4AF37] opacity-60">
                            <Box className="w-4 h-4" />
                            <span className="text-xs font-black tracking-[0.3em] uppercase">Canlı Önizleme</span>
                        </div>

                        <div
                            className="relative w-full max-w-[400px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-white/5 bg-zinc-900 transition-all duration-700"
                            style={{ aspectRatio: orientation === 'portrait' ? `1 / ${1 / selectedSize.ratio}` : `${1 / selectedSize.ratio} / 1` }}
                        >
                            <AnimatePresence mode="wait">
                                <m.div key={`${product.id}-${orientation}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10" />
                                </m.div>
                            </AnimatePresence>

                            <button onClick={prevProduct} className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-[#D4AF37] transition-all"><ChevronLeft /></button>
                            <button onClick={nextProduct} className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-[#D4AF37] transition-all"><ChevronRight /></button>
                        </div>

                        {/* Thumbnail Selector */}
                        <div className="mt-16 flex gap-4 overflow-x-auto pb-6 w-full no-scrollbar border-t border-white/5 pt-10">
                            {products.map((p, idx) => (
                                <button key={p.id} onClick={() => setSelectedProductIndex(idx)} className={`group relative w-20 h-24 shrink-0 overflow-hidden border transition-all ${selectedProductIndex === idx ? 'border-[#D4AF37]' : 'border-white/10 opacity-40 hover:opacity-100'}`}>
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: CONFIG PANEL */}
                    <div className="lg:col-span-12 xl:col-span-5 p-10 lg:p-16 bg-[#FDFBF7]">
                        <div className="mb-12">
                            <h3 className="text-4xl font-black text-[#0A0A0A] uppercase tracking-tighter mb-4 italic">{product.name}</h3>
                            <p className="text-[#0A0A0A]/60 text-lg font-medium leading-relaxed mb-10 border-l border-[#D4AF37] pl-6">{product.description}</p>

                            <div className="flex items-end gap-4">
                                <div className="bg-[#0A0A0A] text-white p-8">
                                    <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase block mb-2">TOPLAM TUTAR</span>
                                    <span className="text-5xl font-black italic">{totalPrice} TL</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {/* ORIENTATION */}
                            <div>
                                <h4 className="flex items-center gap-3 text-xs font-black uppercase text-[#0A0A0A] mb-6 tracking-widest">
                                    <Sliders className="w-4 h-4 text-[#D4AF37]" /> Yönelim
                                </h4>
                                <div className="flex gap-4">
                                    {['portrait', 'landscape'].map((o) => (
                                        <button key={o} onClick={() => setOrientation(o as any)} className={`flex-1 h-14 text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${orientation === o ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]' : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A]/10 hover:border-[#D4AF37]'}`}>
                                            {o === 'portrait' ? 'DİKEY' : 'YATAY'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SIZE GRID */}
                            <div>
                                <h4 className="flex items-center gap-3 text-xs font-black uppercase text-[#0A0A0A] mb-6 tracking-widest">
                                    <HardDrive className="w-4 h-4 text-[#D4AF37]" /> Boyut Seçimi
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {sizes.map((size) => (
                                        <button key={size.id} onClick={() => setSelectedSize(size)} className={`p-6 text-left border transition-all ${selectedSize.id === size.id ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]' : 'bg-transparent text-[#0A0A0A] border-[#0A0A0A]/10 hover:border-[#D4AF37]'}`}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-black text-sm tracking-widest">{orientation === 'landscape' ? `${size.name.split('x')[1].split(' ')[0]}x${size.name.split('x')[0]} CM` : size.name}</span>
                                                {selectedSize.id === size.id && <Check className="w-4 h-4 text-[#D4AF37]" />}
                                            </div>
                                            <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">{size.desc}</span>
                                            <div className="mt-2 text-lg font-black">{size.priceAdd >= 0 ? `+${size.priceAdd}` : size.priceAdd} TL</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button onClick={handleAddToCart} className={`w-full h-20 text-[12px] font-black uppercase tracking-[0.5em] transition-all duration-500 ${added ? 'bg-green-600 text-white' : 'bg-[#0A0A0A] text-white hover:bg-[#D4AF37]'}`}>
                                {added ? 'SEPETE EKLENDİ' : 'KOLEKSİYONA EKLE'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
