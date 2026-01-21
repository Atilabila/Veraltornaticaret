"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const ArchiveHero = () => {
    return (
        <section className="relative pt-32 pb-12 overflow-hidden">
            <div className="container-brutal relative z-10">
                <div className="card-premium p-8 md:p-16 bg-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                        {/* LEFT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="lg:col-span-6 flex flex-col gap-8"
                        >
                            <div className="flex flex-col gap-4">
                                <span className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">
                                    METAL POSTER // LIMITED SERIES
                                </span>

                                <h1 className="text-4xl md:text-7xl font-extrabold text-[#111827] leading-[1] tracking-tighter uppercase">
                                    PREMIUM METAL <br />
                                    <span className="text-gray-900/40">POSTER</span> <br />
                                    KOLEKSİYONU
                                </h1>

                                <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-[550px]">
                                    1.5mm alüminyum üzerine UV dijital baskı. Canlı renkler, keskin detaylar, duvarın için galeri kalitesi.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="/urunler"
                                    className="bg-[#111827] text-white px-10 py-5 rounded-xl font-bold text-sm tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
                                >
                                    KOLEKSİYONU İNCELE
                                </Link>
                                <Link
                                    href="#products"
                                    className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-xl font-bold text-sm tracking-widest hover:border-gray-900 transition-all"
                                >
                                    BESTSELLER'I GÖR
                                </Link>
                            </div>

                            {/* STATS - Image 1 Style */}
                            <div className="flex items-center gap-10 pt-10 border-t border-gray-100 mt-4">
                                {[
                                    { val: "24-48h", label: "HIZLI KARGO" },
                                    { val: "1.5mm", label: "ALUMİNYUM" },
                                    { val: "UV", label: "DIJITAL BASKI" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-xl font-extrabold text-gray-900">{stat.val}</span>
                                        <span className="text-[9px] font-black text-gray-300 tracking-widest uppercase">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT VISUAL - PREMIUM MOCKUP */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="lg:col-span-6 relative"
                        >
                            <div className="relative aspect-[3/4] w-full max-w-[500px] mx-auto group">
                                {/* Decorative Elements */}
                                <div className="absolute -inset-4 border border-gray-100 rounded-[2rem] pointer-events-none" />

                                {/* Main Framed Image */}
                                <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop"
                                        alt="Hero Product"
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                    />
                                    {/* Label Bubble */}
                                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">DOKUYU HİSSET</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};
