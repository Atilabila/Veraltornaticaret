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
            <section className="py-2.5 bg-[#0A0A0A] border-b border-[#D4AF37]/5 relative overflow-hidden select-none cursor-pointer">
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
                        animate={{
                            x: ["-50%", "0%"] // Scrolling to the RIGHT
                        }}
                        transition={{
                            duration: 80, // Much Slower
                            ease: "linear",
                            repeat: Infinity
                        }}
                        style={{ width: "fit-content" }}
                    >
                        {marqueeItems.map((item, idx) => {
                            // Dynamically resolve Lucide icon
                            const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Activity;

                            return (
                                <div key={idx} className="flex items-center gap-4 group">
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
                    </motion.div>
                </div>

                {/* Soft Side Masks */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            </section>
        </DirectEdit>
    );
};
