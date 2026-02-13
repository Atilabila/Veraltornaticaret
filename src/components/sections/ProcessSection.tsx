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
            <section id="process" className="py-16 lg:py-24 bg-white text-black">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="flex flex-col gap-4 mb-16">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-black" />
                            <span className="text-xs font-black text-black tracking-[0.35em] uppercase font-mono">
                                ÜRETİM PROTOKOLÜ
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-black text-black tracking-tighter uppercase leading-[0.95]">
                            {content.processTitle} <span className="italic">{content.processSubtitle}</span>
                        </h2>

                        <p className="text-black/60 text-sm lg:text-base font-semibold max-w-2xl uppercase tracking-wider">
                            {content.processDescription}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="pointer-events-none absolute -inset-6 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

                        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0 border-2 border-black bg-white">
                            {steps.map((step, idx) => {
                                const Icon = stepIcons[idx % stepIcons.length];
                                const isLastCol = idx === steps.length - 1;

                                return (
                                    <div
                                        key={idx}
                                        className={[
                                            "group relative p-8 lg:p-10 bg-white",
                                            "border-black",
                                            "border-b-2 md:border-b-0",
                                            isLastCol ? "md:border-r-0" : "md:border-r-2",
                                            "hover:bg-black hover:text-white transition-colors duration-300",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="flex flex-col gap-2 min-w-0">
                                                <span className="text-[10px] font-black tracking-[0.35em] uppercase font-mono text-black/70 group-hover:text-white/70">
                                                    {step.stepNumber}
                                                </span>
                                                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-black group-hover:text-white leading-tight">
                                                    {step.title}
                                                </h3>
                                            </div>

                                            <div className="h-10 w-10 shrink-0 border-2 border-black group-hover:border-white flex items-center justify-center">
                                                <Icon className="h-5 w-5 text-black group-hover:text-white" />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="h-[2px] w-10 bg-black group-hover:bg-white" />
                                            <p className="mt-4 text-[11px] font-mono font-bold uppercase tracking-wider text-black/65 group-hover:text-white/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-[0.35em] text-black/50 group-hover:text-white/50">
                                            <span>DURUM</span>
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-none bg-black group-hover:bg-white" />
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
