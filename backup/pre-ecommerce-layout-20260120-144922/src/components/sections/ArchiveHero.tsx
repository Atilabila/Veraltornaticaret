"use client";

import React from 'react';
import { ArrowRight, Settings } from 'lucide-react';
import { PrimaryButton, SecondaryButton, SystemLabel } from '@/components/ui/Industrial';
import { motion } from 'framer-motion';

export const ArchiveHero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden border-b border-fog-gray">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--color-near-black) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <SystemLabel text="KAYIT GİRİŞİ" active />
                            <SystemLabel text="İZMİR / ALSANCAK" />
                        </div>
                        <h1 className="text-near-black">
                            TORNA & TENEKE İMALATI<br />
                            <span className="text-hazard-orange">ENDÜSTRİYEL ARŞİV</span>
                        </h1>
                        <p className="text-xl text-steel-gray max-w-[600px] font-source-sans">
                            1980’den beri İzmir Alsancak’ta usta-çırak geleneğini 3. kuşağa taşıyoruz.
                            Özel imalat metal çözümleri ve seri üretim protokolleri.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <PrimaryButton label="Teklif İste" iconRight={ArrowRight} size="lg" />
                        <SecondaryButton label="Ürünleri Gör" href="/urunler" />
                    </div>

                    <div className="flex items-center gap-8 pt-8 border-t border-fog-gray">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-space">40+</span>
                            <span className="text-xs text-steel-gray uppercase font-ibm-plex">Yıllık Tecrübe</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-space">100k+</span>
                            <span className="text-xs text-steel-gray uppercase font-ibm-plex">Üretim Kaydı</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-space">LOCAL</span>
                            <span className="text-xs text-steel-gray uppercase font-ibm-plex">İzmir Menşeli</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative aspect-square lg:aspect-auto lg:h-[600px] border border-near-black bg-fog-gray overflow-hidden group"
                >
                    <div className="absolute top-4 left-4 z-10">
                        <SystemLabel text="MODÜL: ATÖLYE_GÖRÜNÜMÜ" />
                    </div>
                    <img
                        src="/alsancak-mockup.png"
                        alt="Veral Atölye"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-4 right-4 z-10 bg-near-black p-4 text-paper-white flex flex-col gap-1 border-t-2 border-hazard-orange">
                        <span className="font-ibm-plex text-[10px] uppercase opacity-60">Status</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-acid-green animate-pulse" />
                            <span className="font-space font-bold text-xs">SİSTEM AKTİF</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
