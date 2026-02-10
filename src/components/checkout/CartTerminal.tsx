"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from 'framer-motion';

interface CartTerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartTerminal = ({ isOpen, onClose }: CartTerminalProps) => {
    const { items, total, removeItem } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex justify-end no-transition">
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-md bg-white border-l-8 border-black h-full flex flex-col shadow-brutal"
                    >
                        {/* Header */}
                        <div className="bg-black text-white p-6 flex justify-between items-center shadow-brutal">
                            <div className="flex items-center gap-4">
                                <ShoppingCart className="w-8 h-8 text-[var(--color-brand-safety-orange)]" />
                                <span className="font-[Archivo Black] text-xl uppercase italic">SEPET_GİRİŞİ</span>
                            </div>
                            <button onClick={onClose} className="hover:bg-[var(--color-brand-safety-orange)] p-1 transition-none">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 grayscale">
                                    <ShoppingCart className="w-24 h-24" />
                                    <p className="font-mono font-black text-xl">SEPETİNİZ BOŞ_</p>
                                    <button
                                        onClick={onClose}
                                        className="btn-mechanical bg-black text-white px-8 py-3 font-mono font-bold"
                                    >
                                        KATALOĞA DÖN
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="border-4 border-black p-4 flex gap-4 relative bg-[#f3f4f6] group">
                                        <div className="relative w-20 h-20 bg-black shrink-0 border-2 border-black overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <h4 className="font-[Archivo Black] text-sm uppercase leading-none">{item.name}</h4>
                                            <p className="font-mono text-[11px] md:text-[10px] font-black text-black/40 uppercase">{item.size}</p>
                                            <div className="flex justify-between items-end">
                                                <span className="font-[Archivo Black] text-lg text-[var(--color-brand-safety-orange)]">₺{item.price}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-2 right-2 p-1 text-black/20 hover:text-red-500 transition-none"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Summary */}
                        {items.length > 0 && (
                            <div className="p-8 border-t-8 border-black bg-white space-y-8">
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[12px] md:text-[10px] font-black text-black/40">TOPLAM MALİYET</span>
                                        <span className="text-4xl font-[Archivo Black]">₺{total}</span>
                                    </div>
                                    <div className="text-right font-mono text-[12px] md:text-[10px] font-bold opacity-40">
                                        KDV DAHİL <br /> TERMİNAL FİYATI
                                    </div>
                                </div>

                                <Link
                                    href="/odeme"
                                    onClick={onClose}
                                    className="w-full h-20 bg-black text-white flex items-center justify-center gap-4 text-2xl font-[Archivo Black] uppercase shadow-[8px_8px_0px_0px_var(--color-brand-safety-orange)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-none group border-4 border-black"
                                >
                                    SİPARİŞİ TAMAMLA <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-none" />
                                </Link>

                                <p className="text-[12px] md:text-[10px] font-mono font-black text-center opacity-30 italic">
                                    GÜVENLİ ÖDEME TERMİNALİNE AKTARILACAKSINIZ
                                </p>
                            </div>
                        )}
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
};
