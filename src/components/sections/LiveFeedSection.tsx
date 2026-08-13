"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

const StatsMarquee = dynamic(() =>
    import("@/components/sections/StatsMarquee").then((mod) => mod.StatsMarquee)
);

/** Production stats band — Instagram marquee removed for B2B imalat positioning */
export const LiveFeedSection = () => {
    const { shouldReduceVisuals, isReady } = usePerformanceDetection();
    const disableHeavyVisuals = !isReady || shouldReduceVisuals;

    if (disableHeavyVisuals) return null;

    return (
        <section className="bg-[#f4f4f4] text-[#161616] relative border-y border-[#c6c6c6] py-2">
            <StatsMarquee />
        </section>
    );
};
