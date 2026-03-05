"use client";

import React from "react";
import { MousePointerClick, SlidersHorizontal, Printer, Package, Truck } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

export const ProcessSection = () => {
    const { content } = useContentStore();
    const steps = content.processItems || [];
    const stepIcons = [MousePointerClick, SlidersHorizontal, Printer, Package, Truck];

    return (
        <DirectEdit tab="content">
            <section id="process" className="py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="flex flex-col gap-4 mb-16">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-[#D4AF37]" />
                            <span className="text-sm font-black tracking-[0.35em] uppercase font-mono text-zinc-600">
                                ÜRETİM PROTOKOLÜ
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-black text-zinc-900 tracking-tighter uppercase leading-[0.95]">
                            {content.processTitle} <span className="italic">{content.processSubtitle}</span>
                        </h2>

                        <p className="text-zinc-700 text-base lg:text-lg font-semibold max-w-2xl uppercase tracking-wider">
                            {content.processDescription}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="pointer-events-none absolute -inset-6 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />

                        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0 border-2 border-zinc-800 bg-zinc-900">
                            {steps.map((step, idx) => {
                                const Icon = stepIcons[idx % stepIcons.length];
                                const isLastCol = idx === steps.length - 1;

                                return (
                                    <div
                                        key={idx}
                                        className={[
                                            "group relative p-8 lg:p-10 bg-zinc-900 text-white",
                                            "border-zinc-800",
                                            "border-b-2 md:border-b-0",
                                            isLastCol ? "md:border-r-0" : "md:border-r-2",
                                            "hover:bg-[#D4AF37] hover:text-black transition-colors duration-300",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="flex flex-col gap-2 min-w-0">
                                                <span className="text-xs font-black tracking-[0.35em] uppercase font-mono text-zinc-200 group-hover:text-black/70">
                                                    {step.stepNumber}
                                                </span>
                                                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-white group-hover:text-black leading-tight">
                                                    {step.title}
                                                </h3>
                                            </div>

                                            <div className="h-10 w-10 shrink-0 border-2 border-zinc-600 group-hover:border-black flex items-center justify-center">
                                                <Icon className="h-5 w-5 text-zinc-200 group-hover:text-black" />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="h-[2px] w-10 bg-[#D4AF37] group-hover:bg-black" />
                                            <p className="mt-4 text-sm font-mono font-bold uppercase tracking-wider text-zinc-100 group-hover:text-black/80 transition-opacity duration-300 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-[0.35em] text-zinc-300 group-hover:text-black/60">
                                            <span>DURUM</span>
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-none bg-[#D4AF37] group-hover:bg-black" />
                                                HAZIR
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
