"use client";

import React from 'react';
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

export const ProcessSection = () => {
    const { content } = useContentStore();
    const steps = content.processItems || [];

    return (
        <DirectEdit tab="content">
            <section id="process" className="py-16 lg:py-24 bg-transparent">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="flex flex-col gap-4 mb-16">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-[#D4AF37]" />
                            <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">ÜRETİM PROTOKOLÜ</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none italic">
                            {content.processTitle}{" "}
                            <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">
                                {content.processSubtitle}
                            </span>
                        </h2>
                        <p className="text-[#0A0A0A]/50 text-lg font-medium max-w-lg">
                            {content.processDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-[#0A0A0A]/5">
                        {steps.map((step, idx) => (
                            <div key={idx} className={`group relative p-12 bg-[#FDFBF7] border-r border-[#0A0A0A]/5 last:border-r-0 hover:bg-[#0A0A0A] transition-all duration-700 ${step.title === 'HASSAS İŞÇİLİK' ? 'hide-on-mobile-force' : ''}`}>
                                <span className="text-xs font-black text-[#D4AF37] tracking-[0.3em] mb-8 block">
                                    {step.stepNumber}
                                </span>
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black text-[#0A0A0A] group-hover:text-white uppercase tracking-tighter italic leading-none transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs font-black text-[#D4AF37] uppercase tracking-widest leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
