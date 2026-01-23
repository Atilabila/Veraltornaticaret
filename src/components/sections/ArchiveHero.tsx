"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContentStore } from '@/store/useContentStore';

export const ArchiveHero = () => {
    const { content } = useContentStore();

    return (
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* LEFT CONTENT: NOBLE TYPOGRAPHY */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-7 flex flex-col gap-12"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-[1px] bg-[#D4AF37]" />
                                <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">
                                    {content.heroTagline}
                                </span>
                            </div>

                            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-[#0A0A0A] leading-[0.9] tracking-[-0.04em] uppercase">
                                {content.heroTitle.split(' ')[0]} <br />
                                <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">
                                    {content.heroTitle.split(' ').slice(1).join(' ') || 'Asalet'}
                                </span>
                            </h1>

                            <p className="text-xl sm:text-2xl text-[#0A0A0A]/60 font-medium leading-relaxed max-w-xl">
                                {content.heroSubtitle}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <Link
                                href={content.heroButton1Url || "/urunler"}
                                className="h-20 px-12 bg-[#0A0A0A] text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] transition-all duration-700 shadow-2xl relative overflow-hidden group flex items-center justify-center"
                            >
                                <span className="relative z-10">{content.heroButton1Text}</span>
                                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            </Link>
                            <Link
                                href={content.heroButton2Url || "/urunler"}
                                className="h-20 px-12 border border-[#0A0A0A]/10 text-[12px] font-black uppercase tracking-[0.4em] text-[#0A0A0A] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 flex items-center justify-center"
                            >
                                {content.heroButton2Text}
                            </Link>
                        </div>

                        <div className="flex items-center gap-12 lg:gap-20 pt-10 border-t border-[#D4AF37]/20">
                            {(content.heroStats || []).map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <span className="text-3xl font-black text-[#0A0A0A] italic">{stat.value}</span>
                                    <span className="text-xs font-black text-[#D4AF37] tracking-[0.2em] uppercase">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT VISUAL: MUSEUM MOCKUP */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="lg:col-span-12 xl:col-span-5 relative"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-[500px] mx-auto group">
                            {/* Decorative Gold Frame (Outer) */}
                            <div className="absolute -inset-8 border-[1px] border-[#D4AF37]/20 transition-all duration-1000 group-hover:scale-105" />

                            {/* Main Product Frame */}
                            <div className="w-full h-full bg-white relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[10px] border-white group-hover:shadow-[0_80px_150px_-30px_rgba(212,175,55,0.2)] transition-all duration-1000">
                                <img
                                    src={content.heroImage}
                                    alt="Lüks Metal Tablo"
                                    className="w-full h-full object-cover"
                                />
                                {/* Gloss effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
                            </div>

                            {/* Technical Markings */}
                            <div className="absolute top-[-40px] right-0 flex items-center gap-4 opacity-30">
                                <span className="text-[9px] font-black text-[#0A0A0A] uppercase tracking-[0.5em]">SERIES // NOBLE</span>
                                <div className="w-12 h-[1px] bg-[#0A0A0A]" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
