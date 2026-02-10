"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SystemLabel } from '@/components/ui/Industrial';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { m } from 'framer-motion';
import { DynamicLucideIcon } from '@/components/ui/DynamicLucideIcon';

import { useContentStore } from '@/store/useContentStore';

export default function HakkimizdaPage() {
    const { content } = useContentStore();
    const milestones = content.milestones || [];
    const stats = content.aboutStats || [];

    return (
        <main className="min-h-screen bg-white selection:bg-[#D4AF37] selection:text-white">
            <Navigation />

            {/* Hero Section - WHITE */}
            <section className="pt-40 pb-24 border-b border-black/10 bg-white text-black overflow-hidden relative z-10">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                <SystemLabel text="KRONOLOJİK KAYIT" active />
                                <SystemLabel text="LOC: İZMİR" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-space uppercase leading-none text-black whitespace-pre-line">
                                {content.aboutTitle || "Yarım Asırlık Metal Hafızası"}
                            </h1>
                            <p className="text-xl text-black/60 font-medium leading-relaxed max-w-[500px]">
                                {content.aboutSubtitle || "1980'den bugüne, Alsancak'taki atölyemizde metale şekil veriyor, usta-çırak geleneğini modern teknolojiyle harmanlıyoruz."}
                            </p>
                        </div>
                        <div className="relative border border-black/10 aspect-video bg-black/5 overflow-hidden grayscale group">
                            <img
                                src={content.aboutImage || "/alsancak-mockup.png"}
                                alt="Atölye"
                                className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section - BLACK */}
            <section className="py-24 border-b border-white/10 bg-[#0A0A0A] text-white relative z-10">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <h2 className="text-4xl font-black font-space uppercase text-white tracking-tighter italic">HİKAYEMİZ</h2>
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
                            <div className="whitespace-pre-line">
                                {content.aboutContent || `Veral Torna & Teneke, İzmir'in endüstriyel kalbi Alsancak'ta temelleri atılmış bir aile işletmesidir. Kuruluşumuzdan bu yana temel ilkemiz; "Hassas işçilik, dürüst ticaret" olmuştur.

Bugün 3. kuşağın yönetiminde, geleneksel torna işleme tekniklerini, son teknoloji UV baskı ve CNC form verme sistemleriyle birleştiriyoruz. Sadece bir üretici değil, müşterilerimizin projelerinde teknik çözüm ortağı olarak konumlanıyoruz.`}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 pt-12">
                                {stats.length > 0 ? (
                                    stats.map((stat, idx) => (
                                        <div key={idx} className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                            <DynamicLucideIcon name="check-circle-2" className="text-[#D4AF37] mb-6 relative z-10" size={40} />
                                            <h4 className="font-black text-white uppercase mb-3 relative z-10 text-xl tracking-tighter italic">{stat.label}</h4>
                                            <p className="text-4xl text-white font-black relative z-10 tracking-tighter">{stat.value}</p>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                            <DynamicLucideIcon name="shield-check" className="text-[#D4AF37] mb-6 relative z-10" size={40} />
                                            <h4 className="font-black text-white uppercase mb-3 relative z-10 text-xl tracking-tighter italic">Kalite Protokolü</h4>
                                            <p className="text-sm text-white/50 relative z-10 font-medium uppercase tracking-wider leading-relaxed">Her birim, atölyemizden çıkmadan önce manuel ve dijital kontrol süreçlerinden geçer.</p>
                                        </div>
                                        <div className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                            <DynamicLucideIcon name="history" className="text-[#D4AF37] mb-6 relative z-10" size={40} />
                                            <h4 className="font-black text-white uppercase mb-3 relative z-10 text-xl tracking-tighter italic">Süreklilik</h4>
                                            <p className="text-sm text-white/50 relative z-10 font-medium uppercase tracking-wider leading-relaxed">40 yılı aşkın süredir aynı lokasyonda, aynı disiplinle hizmet vermeye devam ediyoruz.</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - WHITE */}
            <section className="py-24 bg-white text-black overflow-hidden relative border-b border-black/10 z-10">
                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col gap-4 mb-24 text-center items-center">
                        <SystemLabel text="SİSTEM EVRİMİ" active />
                        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase leading-none italic">
                            TARİHSEL <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal">Gelişim Kördüğümü</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-0 border border-black/10">
                        {milestones.map((item, idx) => (
                            <div key={idx} className="p-12 border-r border-black/10 last:border-r-0 hover:bg-black/5 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <span className="text-6xl font-black text-[#D4AF37]/40 block mb-8 tracking-tighter group-hover:text-[#D4AF37] transition-colors">{item.year}</span>
                                <DynamicLucideIcon
                                    name={item.icon}
                                    fallbackName="help-circle"
                                    className="mb-8 text-black/20 group-hover:text-[#D4AF37] transition-all duration-500"
                                    size={32}
                                />
                                <h3 className="font-black uppercase text-xl mb-4 text-black tracking-tighter italic">{item.title}</h3>
                                <p className="text-black/40 text-sm font-medium uppercase tracking-wider leading-relaxed group-hover:text-black/60 transition-colors">{item.desc}</p>
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
