"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

export const StatsMarquee = () => {
    const { content } = useContentStore();
    const stats = content.statsItems || [];

    // Duplicate for seamless loop
    const marqueeItems = [...stats, ...stats, ...stats, ...stats];

    if (stats.length === 0) return null;

    return (
        <DirectEdit tab="content">
            <section className="stats-marquee py-2.5 bg-transparent border-b border-[#D4AF37]/5 relative overflow-hidden select-none cursor-pointer">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes stats-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .stats-inner {
                        display: flex;
                        items-center: center;
                        gap: 64px;
                        width: max-content;
                        animation: stats-scroll 80s linear infinite reverse;
                        will-change: transform;
                    }
                `}} />
                <div className="flex overflow-hidden">
                    <div className="stats-inner">
                        {marqueeItems.map((item: any, idx: number) => {
                            // Dynamically resolve Lucide icon
                            const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Activity;

                            return (
                                <div key={idx} className="flex items-center gap-4 group" style={{ transform: 'translateZ(0)' }}>
                                    <IconComponent className="w-3.5 h-3.5 text-[#D4AF37]/40" />

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm md:text-base font-black text-white/70 tracking-tight uppercase">
                                            {item.value}
                                        </span>
                                        <span className="text-[8px] md:text-[9px] font-bold text-[#D4AF37]/30 tracking-[0.2em] uppercase">
                                            {item.label}
                                        </span>
                                    </div>

                                    {/* Minimal Separator */}
                                    <div className="ml-4 w-1 h-1 rounded-full bg-white/5" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Soft Side Masks - Updated to transparent */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />
            </section>
        </DirectEdit>
    );
};
