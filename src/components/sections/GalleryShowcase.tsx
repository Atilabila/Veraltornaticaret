"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const showcases = [
    {
        id: "SC_01",
        title: "YASAM ALANI",
        location: "MODERN KONUT",
        image: "/mockup_living.png",
        specs: "40x60 CM // METAL DOKU"
    },
    {
        id: "SC_02",
        title: "CALISMA ALANI",
        location: "STUDYO",
        image: "/mockup_office.png",
        specs: "20x30 CM // MINI BOY"
    }
];

export const GalleryShowcase = () => {
    return (
        <section id="showcase" className="py-24">
            <div className="container-brutal">
                {/* Header - Image 1 Style */}
                <div className="mb-16">
                    <span className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase mb-4 block">
                        MEKAN ÖRNEKLERİ
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111827] uppercase leading-none tracking-tighter">
                        DUVARINDA <span className="text-gray-300">NASIL DURUR?</span>
                    </h2>
                </div>

                {/* Grid - Matching Reference Image 1 */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {[
                        {
                            id: "01",
                            title: "YAŞAM ALANI",
                            desc: "MODERN KONUT SERİSİ",
                            img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2574&auto=format&fit=crop"
                        },
                        {
                            id: "02",
                            title: "ÇALIŞMA ALANI",
                            desc: "STUDYO & OFİS SERİSİ",
                            img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2543&auto=format&fit=crop"
                        }
                    ].map((sc) => (
                        <div key={sc.id} className="group relative overflow-hidden rounded-2xl aspect-[16/10] bg-gray-50 flex items-end">
                            <img
                                src={sc.img}
                                alt={sc.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                            {/* Content Over Image - Matching Image 1 */}
                            <div className="relative z-10 p-8 w-full flex justify-between items-end">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                                        {sc.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">
                                        {sc.desc}
                                    </span>
                                </div>
                                <Link
                                    href="/urunler"
                                    className="text-[10px] font-black text-white hover:text-[#ff6b00] transition-colors flex items-center gap-2 uppercase tracking-widest"
                                >
                                    DETAY <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        NOT: GÖRSELLER ÖRNEK AMAÇLIDIR. ÜRÜN GERÇEK METAL DOKUSUNA SAHİPTİR.
                    </p>
                </div>
            </div>
        </section>
    );
};


