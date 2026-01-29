"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SystemLabel } from '@/components/ui/Industrial';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

import { useContentStore } from '@/store/useContentStore';

export default function HakkimizdaPage() {
    const { content } = useContentStore();
    const milestones = content.milestones || [];

    return (
        <main className="min-h-screen bg-[#0A0A0A] selection:bg-[#D4AF37] selection:text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-40 pb-24 border-b border-white/5 bg-transparent overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-metal opacity-10" />
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                <SystemLabel text="KRONOLOJİK KAYIT" active />
                                <SystemLabel text="LOC: İZMİR" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-space uppercase leading-none text-white">
                                Yarım Asırlık <br />
                                <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal border-b-4 border-[#D4AF37]/30">Metal Hafızası</span>
                            </h1>
                            <p className="text-xl text-white/60 font-medium leading-relaxed max-w-[500px]">
                                1980'den bugüne, Alsancak'taki atölyemizde metale şekil veriyor, usta-çırak geleneğini modern teknolojiyle harmanlıyoruz.
                            </p>
                        </div>
                        <div className="relative border border-white/10 aspect-video bg-white/5 overflow-hidden grayscale group">
                            <img src="/alsancak-mockup.png" alt="Atölye" className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 border-b border-white/5 bg-transparent">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <h2 className="text-4xl font-black font-space uppercase text-white tracking-tighter italic">Biz Kimiz?</h2>
                            <div className="w-20 h-1 bg-[#D4AF37]" />

                            {/* Brand Logo and Name */}
                            <div className="flex items-center gap-4 mt-8 opacity-40 group hover:opacity-100 transition-opacity">
                                <img
                                    src={content.headerLogo || "/veral-logo.webp"}
                                    alt={content.siteName}
                                    className="h-16 w-16 object-contain invert"
                                />
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-white tracking-widest uppercase">{content.siteName}</span>
                                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Torna & Teneke Ti̇caret</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 space-y-8 text-xl text-white/70 font-medium leading-relaxed">
                            <p>
                                Veral Torna & Teneke, İzmir’in endüstriyel kalbi Alsancak’ta temelleri atılmış bir aile işletmesidir.
                                Kuruluşumuzdan bu yana temel ilkemiz; "Hassas işçilik, dürüst ticaret" olmuştur.
                            </p>
                            <p>
                                Bugün 3. kuşağın yönetiminde, geleneksel torna işleme tekniklerini, son teknoloji UV baskı ve CNC form verme sistemleriyle birleştiriyoruz.
                                Sadece bir üretici değil, müşterilerimizin projelerinde teknik çözüm ortağı olarak konumlanıyoruz.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8 pt-12">
                                <div className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                    <LucideIcons.ShieldCheck className="text-[#D4AF37] mb-6 relative z-10" size={40} />
                                    <h4 className="font-black text-white uppercase mb-3 relative z-10 text-xl tracking-tighter italic">Kalite Protokolü</h4>
                                    <p className="text-sm text-white/50 relative z-10 font-medium uppercase tracking-wider leading-relaxed">Her birim, atölyemizden çıkmadan önce manuel ve dijital kontrol süreçlerinden geçer.</p>
                                </div>
                                <div className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                    <LucideIcons.History className="text-[#D4AF37] mb-6 relative z-10" size={40} />
                                    <h4 className="font-black text-white uppercase mb-3 relative z-10 text-xl tracking-tighter italic">Süreklilik</h4>
                                    <p className="text-sm text-white/50 relative z-10 font-medium uppercase tracking-wider leading-relaxed">40 yılı aşkın süredir aynı lokasyonda, aynı disiplinle hizmet vermeye devam ediyoruz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative border-b border-white/5">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-grid-metal opacity-20 pointer-events-none" />

                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col gap-4 mb-24 text-center items-center">
                        <SystemLabel text="SİSTEM EVRİMİ" active />
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none italic">
                            TARİHSEL <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal">Gelişim Kördüğümü</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-0 border border-white/10">
                        {milestones.map((item, idx) => (
                            <div key={idx} className="p-12 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <span className="text-6xl font-black text-[#D4AF37]/40 block mb-8 tracking-tighter group-hover:text-[#D4AF37] transition-colors">{item.year}</span>
                                {(() => {
                                    const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
                                    return <IconComponent className="mb-8 text-white/20 group-hover:text-[#D4AF37] transition-all duration-500" size={32} />;
                                })()}
                                <h3 className="font-black uppercase text-xl mb-4 text-white tracking-tighter italic">{item.title}</h3>
                                <p className="text-white/40 text-sm font-medium uppercase tracking-wider leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}
