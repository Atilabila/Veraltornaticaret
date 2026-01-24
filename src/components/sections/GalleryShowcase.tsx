"use client";

import React from 'react';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const GalleryShowcase = () => {
    return (
        <section id="showcase" className="py-16 lg:py-24 bg-transparent relative overflow-hidden">
            {/* Background gradient shows through from body */}

            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-4 mb-16">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">MEKAN ANALİZİ</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none italic">
                        ESTETİK <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">VE MEKAN</span>
                    </h2>
                    <p className="text-[#0A0A0A]/50 text-lg font-medium max-w-lg">IŞIK VE FORMUN DEKORASYONLA UYUMUNU GÖRÜN.</p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-10">
                    {[
                        {
                            id: "01",
                            title: "YAŞAM ALANI",
                            desc: "MODERN KONUT SERİSİ // NOBLE",
                            img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2574&auto=format&fit=crop"
                        },
                        {
                            id: "02",
                            title: "OFİS & STÜDYO",
                            desc: "PROFESYONEL ÇALIŞMA ALANLARI",
                            img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2543&auto=format&fit=crop"
                        }
                    ].map((sc, idx) => (
                        <motion.div
                            key={sc.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className="group relative overflow-hidden bg-[#0A0A0A] aspect-[16/10] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]"
                        >
                            <img
                                src={sc.img}
                                alt={sc.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            {/* Gold Border Overlay on Hover */}
                            <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 transition-all duration-700 pointer-events-none" />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-80" />

                            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                                <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                    {sc.desc}
                                </span>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">
                                        {sc.title}
                                    </h3>
                                    <Link
                                        href="/urunler"
                                        className="w-16 h-16 bg-[#D4AF37] text-black flex items-center justify-center hover:bg-white transition-all duration-500 shadow-2xl"
                                    >
                                        <ArrowRight className="w-6 h-6" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
