"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';

import { useContentStore } from '@/store/useContentStore';

export const Footer = () => {
    const { content } = useContentStore();

    return (
        <footer className="bg-[#0A0A0A] pt-40 pb-20 border-t border-[#D4AF37]/20 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">

                    {/* LEFT: LOGO & ABOUT */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-10">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="h-16 w-16 transition-all duration-500 flex-shrink-0">
                                <img
                                    src={(content.footerLogo && content.footerLogo.length > 0) ? content.footerLogo : "/veral-logo.webp"}
                                    alt={content.siteName || "VERAL"}
                                    className="h-full w-full object-contain invert brightness-100 mix-blend-screen"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#D4AF37] tracking-[0.15em] uppercase">
                                    {content.siteName || "VERAL"}
                                </span>
                                <span className="text-[9px] font-bold text-white/80 tracking-[0.3em] uppercase">Torna & Teneke Ticaret</span>
                            </div>
                        </Link>
                        <p className="text-[#FDFBF7]/60 text-lg leading-relaxed max-w-sm">
                            Yaşam alanlarınıza değer katan, el yapımı titizliğinde üretilen premium metal sanat eserleri.
                        </p>
                        {/* SOCIAL ICONS */}
                        <div className="flex gap-6">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="w-12 h-12 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* MIDDLE: LINKS */}
                    <div className="lg:col-span-6 xl:col-span-3">
                        <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-10">NAVİGASYON</h4>
                        <ul className="flex flex-col gap-6">
                            {['Koleksiyon', 'Neden Biz?', 'Üretim Süreci', 'İletişim'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm font-bold text-white hover:text-[#D4AF37] transition-all flex items-center gap-2 group">
                                        {item}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT: NEWSLETTER */}
                    <div className="lg:col-span-6 xl:col-span-4 flex flex-col gap-10">
                        <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-0">BÜLTENE KATIL</h4>
                        <p className="text-sm text-[#FDFBF7]/50 font-medium">Yeni eserlerimizden ve özel davetlerimizden haberdar olun.</p>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="E-posta Adresiniz"
                                className="bg-transparent border-b border-[#D4AF37]/30 py-4 text-white text-lg focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-[#FDFBF7]/20"
                            />
                            <button className="h-16 bg-[#D4AF37] text-black font-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all cursor-pointer">
                                ABONE OL
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="pt-12 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[9px] font-black text-[#FDFBF7]/20 tracking-[0.2em] uppercase">
                        © 2024 METAL ART NOBLE COLLECTION - TÜM HAKLARI SAKLIDIR.
                    </p>
                    <div className="flex gap-10">
                        {['GİZLİLİK', 'ŞARTLAR', 'KVKK'].map((item) => (
                            <Link key={item} href="#" className="text-[9px] font-black text-[#FDFBF7]/20 hover:text-[#D4AF37] transition-colors tracking-[0.4em] uppercase">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
