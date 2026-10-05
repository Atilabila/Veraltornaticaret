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
            <section id="process" className="py-20 lg:py-28 bg-[#fafafa]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
                    <div className="flex flex-col gap-4 mb-14 lg:mb-20 max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm w-fit">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                            Üretim Sürecimiz
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 leading-[1.08] tracking-tight">
                            {content.processTitle || "Hammaddeden Sevkiyata"}{" "}
                            <span className="text-amber-700">{content.processSubtitle || "4 Aşamalı Kalite Protokolü"}</span>
                        </h2>
                        <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
                            {content.processDescription || "İzmir Alsancak atölyemizde teknik çizimden mikron toleranslı preslemeye, optik kalite kontrolden özel ambalajlamaya kadar tüm aşamalar tek çatı altında yürütülür."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {steps.map((step, idx) => {
                            const Icon = stepIcons[idx % stepIcons.length];
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col min-h-[240px] lg:min-h-[280px] p-8 lg:p-10 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-amber-500 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-8">
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-600/20">
                                            AŞAMA {step.stepNumber}
                                        </span>
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-50 border border-amber-600/20 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-amber-800 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm lg:text-base text-zinc-600 leading-relaxed mt-auto font-normal">
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
