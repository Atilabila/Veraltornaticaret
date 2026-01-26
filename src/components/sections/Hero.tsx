"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContentStore } from "@/store/useContentStore";

export const Hero = () => {
    const { content } = useContentStore();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    // Filter out empty strings and provide fallback
    const rawImages = content.heroImages && content.heroImages.length > 0 ? content.heroImages : [content.heroImage];
    const images = rawImages.filter(img => img && img.trim() !== '');
    const fallbackImage = "/products/arabalar-plaka/3000x1500.webp";
    const displayImages = images.length > 0 ? images : [fallbackImage];

    React.useEffect(() => {
        if (displayImages.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [displayImages.length]);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white">
            {/* GRID_PATTERN_BACKGROUND */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left Content */}
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-black/80"
                    >
                        <span>KAĞIT POSTERLERİ UNUTUN.</span>
                        <span>BÜKÜLMEZ, SOLMAZ VE ŞIK</span>
                        <span className="text-[var(--color-brand-safety-orange)]">METAL TABLOLARLA TANIŞIN</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <h1 className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-black leading-[0.8] tracking-tighter uppercase flex flex-col">
                            <span className="text-black">YAŞAM</span>
                            <span className="text-gold-gradient italic font-serif opacity-80 pl-4 md:pl-8">ALANINIZ</span>
                            <div className="flex items-baseline gap-4">
                                <span className="text-black opacity-80">İÇİN</span>
                                <span className="text-black">YENİ</span>
                            </div>
                            <span className="text-gold-gradient italic font-serif opacity-80">NESİL</span>
                            <span className="text-gold-gradient italic font-serif opacity-80 pl-8 md:pl-16">DEKOR</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm md:text-base font-black text-black/60 max-w-lg uppercase tracking-wider"
                    >
                        {content.heroSubtitle}
                    </motion.p>

                    <div className="flex flex-wrap gap-6 pt-4">
                        <Link href="/urunler" className="group relative px-10 py-5 bg-black text-white font-black text-sm uppercase tracking-[0.2em] overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                Koleksiyonu Keşfet <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-[var(--color-brand-safety-orange)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>

                        <div className="flex items-center gap-4 px-6 border border-black/10 bg-slate-50">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                                ))}
                            </div>
                            <div className="text-[10px] font-bold text-black/40 uppercase tracking-tighter">
                                <span className="text-black block">5000+ MÜŞTERİ</span>
                                <span>MEMNUNİYETİ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Technical Blueprint / Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] md:aspect-[3/4] bg-white p-4 shadow-[0_40px_80px_rgba(0,0,0,0.1)] border border-black/5 group">
                        <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 text-[10px] font-black z-20 uppercase tracking-widest">
                            SERIES // NOBLE
                        </div>

                        <div className="relative w-full h-full overflow-hidden bg-slate-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.8, ease: "anticipate" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={displayImages[currentImageIndex]}
                                        alt="Product Showcase"
                                        fill
                                        priority
                                        className="object-contain p-4 transition-transform duration-[2000ms] group-hover:scale-105"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Technical Overlay */}
                            <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5" />
                            <div className="absolute top-8 left-8 bottom-8 right-8 border border-black/5 pointer-events-none" />
                        </div>

                        {/* Slider Controls */}
                        <div className="absolute bottom-10 right-10 flex gap-2 z-30">
                            {displayImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-1 transition-all duration-500 ${idx === currentImageIndex ? 'w-8 bg-black' : 'w-4 bg-black/20'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-black/10 -z-10" />
                    <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-black/10 -z-10" />
                </motion.div>
            </div>
        </section>
    );
};

const StatusPill = ({ label, value }: { label: string, value: string }) => (
    <div className="border-2 border-black p-4 bg-[#E5E7EB] font-mono hover:bg-[#FFD700] transition-none group text-left">
        <div className="text-base font-black text-black/40">{label}</div>
        <div className="text-xl font-black">{value}</div>
    </div>
);
