"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Check, Info, ShoppingCart, ChevronLeft, ChevronRight, Settings, Sliders } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const sizes = [
    { id: "xs", name: "10x20 CM", priceAdd: -100, desc: "MİNİ PLAKA", ratio: 0.5 },
    { id: "m", name: "30x45 CM", priceAdd: 200, desc: "STANDART KAYIT", ratio: 0.67 },
    { id: "l", name: "45x60 CM", priceAdd: 500, desc: "GENİŞ ALAN", ratio: 0.75 },
    { id: "xl", name: "60x90 CM", priceAdd: 1000, desc: "MAKS YÜK", ratio: 0.67 },
];

export const ProductConfigurator = () => {
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(sizes[1]); // Default to 30x45
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const product = PRODUCTS[selectedProductIndex];
    const totalPrice = product.price + selectedSize.priceAdd;

    const handleAddToCart = () => {
        addItem({
            id: product.id + "_" + selectedSize.id + "_" + orientation,
            name: product.name,
            size: (orientation === 'landscape'
                ? `${selectedSize.name.split('x')[1].split(' ')[0]}x${selectedSize.name.split('x')[0]} CM`
                : selectedSize.name) + ` (${orientation === 'portrait' ? 'DİKEY' : 'YATAY'})`,
            price: totalPrice,
            image: product.image,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const nextProduct = () => setSelectedProductIndex((prev) => (prev + 1) % PRODUCTS.length);
    const prevProduct = () => setSelectedProductIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);

    return (
        <section id="configurator" className="py-24 bg-transparent grid-terminal">
            <div className="container-brutal">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col lg:grid lg:grid-cols-12 gap-0 border-8 border-black shadow-brutal bg-white overflow-hidden"
                >
                    {/* LEFT_IFACE: VISUAL_FEED */}
                    <div className="lg:col-span-6 relative border-b-8 lg:border-b-0 lg:border-r-8 border-black bg-black p-6 md:p-12 flex flex-col justify-center">
                        <div className="absolute top-8 left-8 z-30 flex items-center gap-3 bg-[var(--color-brand-safety-orange)] text-white px-4 py-2 font-mono text-xs font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Settings className="w-4 h-4 animate-spin" /> CANLI ÖNİZLEME_TERMİNALİ
                        </div>

                        <div
                            className="relative w-full max-w-sm mx-auto border-8 border-white bg-zinc-950 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-500"
                            style={{
                                aspectRatio: orientation === 'portrait' ? `1 / ${1 / selectedSize.ratio}` : `${1 / selectedSize.ratio} / 1`
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${product.id}-${orientation}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="relative w-full h-full"
                                >
                                    {/* Background Blur Fill */}
                                    <Image
                                        src={product.image}
                                        alt=""
                                        fill
                                        className="object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                                    />
                                    {/* Main Image */}
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 90vw, 500px"
                                        className="object-contain z-10"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Manual Controls */}
                            <button
                                onClick={prevProduct}
                                className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black border-4 border-black flex items-center justify-center hover:bg-[#FFD700] transition-none z-40"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                onClick={nextProduct}
                                className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black border-4 border-black flex items-center justify-center hover:bg-[#FFD700] transition-none z-40"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>

                        {/* DATA_STREAM Thumbs */}
                        <div className="mt-12 flex gap-3 overflow-x-auto pb-4 scrollbar-hide border-t-4 border-white/10 pt-8">
                            {PRODUCTS.map((p, idx) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedProductIndex(idx)}
                                    className={`relative w-20 h-20 shrink-0 border-4 transition-none active:scale-90 ${selectedProductIndex === idx
                                        ? 'border-[var(--color-brand-safety-orange)] scale-110 z-10'
                                        : 'border-white/20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT_IFACE: CONTROL_PANEL */}
                    <div className="lg:col-span-6 p-8 md:p-16 flex flex-col bg-[#F3F4F6] relative">
                        {/* Top corner tech label */}
                        <div className="absolute top-0 right-0 bg-black text-[#00FF41] px-4 py-1 text-[10px] font-mono font-black border-b-4 border-l-4 border-black">
                            SYS_STAT: OK // v4.5.11
                        </div>

                        <div className="mb-12">
                            <div className="flex items-center gap-3 text-[var(--color-brand-safety-orange)] font-mono font-black text-xs mb-4 tracking-widest uppercase">
                                <span className="bg-[var(--color-brand-safety-orange)] text-white px-2 py-0.5">{product.category}</span>
                                <span className="text-black/30">//</span>
                                <span>BİRİM_VERİ_KAYDI</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[Archivo Black] leading-[0.9] mb-6 uppercase tracking-tighter">
                                {product.name.split('|')[1]?.trim() || product.name}
                            </h2>
                            <p className="font-mono text-base leading-relaxed text-black/70 mb-10 border-l-8 border-black pl-8 italic text-justify">
                                {product.description}
                            </p>

                            <div className="flex items-end">
                                <div className="bg-black text-white p-6 shadow-brutal border-l-8 border-[var(--color-brand-safety-orange)]">
                                    <span className="text-[10px] font-mono block text-white/50 mb-1 uppercase font-black">HESAPLANAN BİRİM MALİYET</span>
                                    <span className="text-5xl font-[Archivo Black] leading-none">₺{totalPrice}</span>
                                </div>
                                <div className="ml-4 mb-1 font-mono text-[10px] font-bold text-black/40 uppercase">
                                    KDV DAHİL <br /> TERMİNAL FİYATI
                                </div>
                            </div>
                        </div>

                        {/* CONFIG_FIELDS */}
                        <div className="space-y-10 flex-grow">
                            <div>
                                <label className="flex items-center gap-3 text-base font-black uppercase text-black mb-6 font-mono">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
                                        <Sliders className="w-4 h-4" />
                                    </div>
                                    BOYUT VE YÖNELİM YAPILANDIRMASI
                                </label>
                                {/* ORIENTATION TOGGLE */}
                                <div className="flex gap-4 mb-6">
                                    <button
                                        onClick={() => setOrientation('portrait')}
                                        className={`flex-1 py-3 font-mono text-xs font-black border-4 border-black transition-none ${orientation === 'portrait' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FFD700]'}`}
                                    >
                                        DİKEY
                                    </button>
                                    <button
                                        onClick={() => setOrientation('landscape')}
                                        className={`flex-1 py-3 font-mono text-xs font-black border-4 border-black transition-none ${orientation === 'landscape' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FFD700]'}`}
                                    >
                                        YATAY
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-0 border-4 border-black bg-black">
                                    {sizes.map((size) => (
                                        <button
                                            key={size.id}
                                            onClick={() => setSelectedSize(size)}
                                            className={`p-6 text-left transition-none border-4 border-transparent ${selectedSize.id === size.id
                                                ? 'bg-[var(--color-brand-safety-orange)] text-white !border-black'
                                                : 'bg-white text-black hover:bg-[#FFD700]'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-black font-mono text-sm leading-none">
                                                    {orientation === 'landscape'
                                                        ? `${size.name.split('x')[1].split(' ')[0]}x${size.name.split('x')[0]} CM`
                                                        : size.name}
                                                </span>
                                                {selectedSize.id === size.id && <Check className="w-5 h-5" />}
                                            </div>
                                            <p className="text-[10px] font-bold opacity-70 mb-2 uppercase">{size.desc}</p>
                                            {size.priceAdd > 0 ? (
                                                <p className="text-lg font-[Archivo Black] leading-none">+₺{size.priceAdd}</p>
                                            ) : size.priceAdd < 0 ? (
                                                <p className="text-lg font-[Archivo Black] leading-none">-₺{Math.abs(size.priceAdd)}</p>
                                            ) : (
                                                <p className="text-lg font-[Archivo Black] leading-none">BASE</p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-3 p-4 bg-white border-2 border-dashed border-black/20 font-mono text-[10px] font-black uppercase">
                                    <Info className="w-4 h-4 text-[var(--color-brand-safety-orange)]" />
                                    <span>İSTEĞE BAĞLI ÖZEL ÖLÇÜLER İÇİN WHATSAPP TERMİNALİNİ KULLANIN</span>
                                </div>
                            </div>
                        </div>

                        {/* SYSTEM_ACTION */}
                        <div className="mt-12 flex items-center gap-4">
                            <button
                                className={`flex-grow h-20 text-2xl font-[Archivo Black] uppercase shadow-[8px_8px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none border-4 border-black transition-none flex items-center justify-center gap-4 ${added ? "bg-[#4CAF50] text-white" : "bg-black text-white hover:bg-[var(--color-brand-safety-orange)]"
                                    }`}
                                onClick={handleAddToCart}
                                disabled={added}
                            >
                                {added ? (
                                    <>SİSTEME KAYDEDİLDİ <Check className="w-8 h-8" /></>
                                ) : (
                                    <>SEPETE EKLE <ShoppingCart className="w-8 h-8" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
