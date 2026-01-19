"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SystemLabel } from '@/components/ui/Industrial';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { History, Target, Users, Factory, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HakkimizdaPage() {
    const milestones = [
        {
            year: "1980",
            title: "Temeller",
            desc: "İzmir Alsancak’ta torna ve metal işleme atölyesinin kuruluşu.",
            icon: Factory
        },
        {
            year: "1995",
            title: "Teneke İmalat Hattı",
            desc: "Takvim tenekesi ve dosya teli seri üretimi için ilk otomatik hatların devreye alınması.",
            icon: Target
        },
        {
            year: "2010",
            title: "2. Nesil Dönüşümü",
            desc: "Üretim süreçlerinde modernizasyon ve kurumsal kimlik çalışmaları.",
            icon: Users
        },
        {
            year: "2024",
            title: "3. Nesil & Dijitalleşme",
            desc: "UV baskı teknolojisi ve küresel pazarlar için endüstriyel arşiv sisteminin lansmanı.",
            icon: Award
        }
    ];

    return (
        <main className="min-h-screen bg-paper-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-40 pb-24 border-b border-fog-gray bg-white overflow-hidden">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                <SystemLabel text="KRONOLOJİK KAYIT" active />
                                <SystemLabel text="LOC: İZMİR" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-space uppercase leading-none">
                                Yarım Asırlık <br />
                                <span className="text-hazard-orange">Metal Hafızası</span>
                            </h1>
                            <p className="text-xl text-steel-gray font-source-sans leading-relaxed max-w-[500px]">
                                1980'den bugüne, Alsancak'taki atölyemizde metale şekil veriyor, usta-çırak geleneğini modern teknolojiyle harmanlıyoruz.
                            </p>
                        </div>
                        <div className="relative border border-near-black aspect-video bg-fog-gray overflow-hidden grayscale group">
                            <img src="/alsancak-mockup.png" alt="Atölye" className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-near-black/10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 border-b border-fog-gray">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <h2 className="text-2xl font-bold font-space uppercase">Biz Kimiz?</h2>
                            <div className="w-12 h-1 bg-hazard-orange" />
                        </div>
                        <div className="lg:col-span-8 space-y-8 text-lg text-steel-gray font-source-sans leading-relaxed">
                            <p>
                                Veral Torna & Teneke, İzmir’in endüstriyel kalbi Alsancak’ta temelleri atılmış bir aile işletmesidir.
                                Kuruluşumuzdan bu yana temel ilkemiz; "Hassas işçilik, dürüst ticaret" olmuştur.
                            </p>
                            <p>
                                Bugün 3. kuşağın yönetiminde, geleneksel torna işleme tekniklerini, son teknoloji UV baskı ve CNC form verme sistemleriyle birleştiriyoruz.
                                Sadece bir üretici değil, müşterilerimizin projelerinde teknik çözüm ortağı olarak konumlanıyoruz.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8 pt-12">
                                <div className="p-8 border border-fog-gray bg-white">
                                    <ShieldCheck className="text-hazard-orange mb-4" size={32} />
                                    <h4 className="font-bold text-near-black uppercase mb-2">Kalite Protokolü</h4>
                                    <p className="text-sm">Her birim, atölyemizden çıkmadan önce manuel ve dijital kontrol süreçlerinden geçer.</p>
                                </div>
                                <div className="p-8 border border-fog-gray bg-white">
                                    <History className="text-hazard-orange mb-4" size={32} />
                                    <h4 className="font-bold text-near-black uppercase mb-2">Süreklilik</h4>
                                    <p className="text-sm">40 yılı aşkın süredir aynı lokasyonda, aynı disiplinle hizmet vermeye devam ediyoruz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-near-black text-paper-white overflow-hidden relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col gap-4 mb-20 text-center items-center">
                        <SystemLabel text="SİSTEM EVRİMİ" active />
                        <h2 className="text-4xl font-bold font-space uppercase">Tarihsel Gelişim Kaydı</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-0 border border-steel-gray">
                        {milestones.map((item, idx) => (
                            <div key={idx} className="p-12 border-r border-steel-gray last:border-r-0 hover:bg-steel-gray transition-colors group">
                                <span className="text-5xl font-bold font-space text-hazard-orange block mb-6">{item.year}</span>
                                <item.icon className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity" size={24} />
                                <h3 className="font-bold uppercase text-lg mb-4">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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
