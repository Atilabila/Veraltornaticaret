"use client";

import React from "react";
import { ClipboardList, FileText, Factory, ShieldCheck, Truck } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

export const ProcessSection = () => {
    const { content } = useContentStore();
    const steps = content.processItems || [];
    const stepIcons = [ClipboardList, FileText, Factory, ShieldCheck, Truck];

    return (
        <DirectEdit tab="content">
            <section id="process" className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="flex flex-col gap-4 mb-14 lg:mb-20 max-w-3xl">
                        <p className="text-sm font-mono font-semibold uppercase tracking-widest text-[var(--color-brand-accent)]">
                            Üretim süreci
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#161616] leading-[1.05]">
                            {content.processTitle}{" "}
                            <span className="text-[var(--color-brand-accent)]">{content.processSubtitle}</span>
                        </h2>
                        <p className="text-lg md:text-xl text-[#525252] leading-relaxed">
                            {content.processDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {steps.map((step, idx) => {
                            const Icon = stepIcons[idx % stepIcons.length];
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col min-h-[240px] lg:min-h-[280px] p-8 lg:p-10 bg-[#f4f4f4] border border-[#c6c6c6]"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-8">
                                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252]">
                                            {step.stepNumber}
                                        </span>
                                        <div className="w-14 h-14 flex items-center justify-center bg-white border border-[#e0e0e0] text-[var(--color-brand-accent)]">
                                            <Icon className="h-7 w-7" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-[#161616] mb-4 leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-base lg:text-lg text-[#525252] leading-relaxed mt-auto">
                                        {step.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
