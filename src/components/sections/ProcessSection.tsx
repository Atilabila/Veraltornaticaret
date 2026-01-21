"use client";

import React from 'react';
import { ProcessStep, SystemLabel } from '@/components/ui/Industrial';

export const ProcessSection = () => {
    const steps = [
        {
            stepNumber: "ADIM/01",
            title: "Urunu Sec",
            desc: "Koleksiyondan favori tasarimini ve boyutunu belirle."
        },
        {
            stepNumber: "ADIM/02",
            title: "Baski Hazirligi",
            desc: "UV dijital baski icin goruntu ve renk kalibrasyonu yapilir."
        },
        {
            stepNumber: "ADIM/03",
            title: "Metal Uretim",
            desc: "1.5mm aluminyum uzerine baski ve koruyucu katman uygulanir."
        },
        {
            stepNumber: "ADIM/04",
            title: "Guvenli Paket",
            desc: "Kose korumali paketleme ile hasara karsi koruma saglanir."
        },
        {
            stepNumber: "ADIM/05",
            title: "Kargo ve Teslim",
            desc: "Siparis 24-48 saat icinde kargoya verilir, takip linki paylasilir."
        }
    ];

    return (
        <section id="process" className="py-24">
            <div className="container-brutal">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="text-[10px] font-black text-[#ff6b00] tracking-[0.3em] uppercase">
                        SİPARİŞ AKIŞI
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111827] uppercase tracking-tighter leading-none">
                        Üretim ve <span className="text-gray-400">Teslimat</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="card-premium p-8 bg-white relative group">
                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] font-black text-[#ff6b00] tracking-[0.3em] uppercase">
                                    {step.stepNumber}
                                </span>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-extrabold text-[#111827] uppercase tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Connector for desktop */}
                            {idx < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gray-100 z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
