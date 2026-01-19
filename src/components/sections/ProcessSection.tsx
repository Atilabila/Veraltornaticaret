"use client";

import React from 'react';
import { ProcessStep, SystemLabel } from '@/components/ui/Industrial';

export const ProcessSection = () => {
    const steps = [
        {
            stepNumber: "PROSES/01",
            title: "İhtiyaç Analizi",
            desc: "Üretilecek parçanın teknik detaylarını, malzeme tipini ve adetlerini belirliyoruz."
        },
        {
            stepNumber: "PROSES/02",
            title: "Ölçü & Kalıplama",
            desc: "Hassas ölçümlendirme ve gerekliyse özel kalıp hazırlıklarını tamamlıyoruz."
        },
        {
            stepNumber: "PROSES/03",
            title: "Seri Üretim",
            desc: "Torna ve teneke hattımızda belirlenen protokoller eşliğinde üretime geçiyoruz."
        },
        {
            stepNumber: "PROSES/04",
            title: "Kalite Kontrol",
            desc: "Her bir parçayı endüstriyel standartlarımıza göre tek tek kontrol ediyoruz."
        },
        {
            stepNumber: "PROSES/05",
            title: "Teslimat",
            desc: "Alsancak merkezimizden veya lojistik ağımızla İzmir ve çevresine termininde teslimat."
        }
    ];

    return (
        <section id="process" className="bg-paper-white border-b border-fog-gray">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-16">
                    <SystemLabel text="PROSES VE TESLİMAT" active />
                    <h2 className="text-3xl font-bold font-space uppercase">Üretim Akış Şeması</h2>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-5 gap-0">
                    {steps.map((step, idx) => (
                        <ProcessStep key={idx} {...step} />
                    ))}
                </div>
            </div>
        </section>
    );
};
