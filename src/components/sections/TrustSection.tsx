"use client";

import React from 'react';
import { ShieldCheck, Clock, Layers, RotateCcw, Truck } from 'lucide-react';
import { m } from 'framer-motion';

export const TrustSection = () => {
    const safetySignals = [
        { icon: ShieldCheck, title: "GÜVENLİ ÖDEME", desc: "256-BIT SSL KORUMASI" },
        { icon: Clock, title: "HIZLI TESLİMAT", desc: "24-48 SAATTE KARGO" },
        { icon: Layers, title: "METAL KALİTESİ", desc: "1.5MM PREMIUM ÇELİK" },
        { icon: RotateCcw, title: "KOLAY İADE", desc: "14 GÜN DEĞİŞİM HAKKI" },
        { icon: Truck, title: "ÜCRETSİZ KARGO", desc: "750 TL ÜZERİ SİPARİŞ" }
    ];

    return (
        <section className="py-16 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-[1px] bg-[#D4AF37]/30" />
                        <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">
                            GÜVENCE PROTOKOLLERİ
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-none italic">
                        Neden <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">Biz?</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#0A0A0A]/5">
                    {safetySignals.map((signal, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group relative p-12 bg-white border-r border-[#0A0A0A]/5 last:border-r-0 hover:bg-[#0A0A0A] transition-all duration-700"
                        >
                            <div className="w-14 h-14 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500 mb-10">
                                <signal.icon size={28} strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="font-black text-[#0A0A0A] group-hover:text-white uppercase tracking-tighter text-xl leading-none transition-colors">
                                    {signal.title}
                                </span>
                                <span className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.15em] leading-relaxed">
                                    {signal.desc}
                                </span>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
