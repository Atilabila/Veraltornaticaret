"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

const InstagramMarquee = dynamic(() =>
    import("@/components/sections/InstagramMarquee").then((mod) => mod.InstagramMarquee)
);
const StatsMarquee = dynamic(() =>
    import("@/components/sections/StatsMarquee").then((mod) => mod.StatsMarquee)
);

export const LiveFeedSection = () => {
    const { shouldReduceVisuals, isReady } = usePerformanceDetection();
    const disableHeavyVisuals = !isReady || shouldReduceVisuals;

    if (disableHeavyVisuals) return null;

    return (
        <section className="bg-[#0A0A0A] text-white relative">
            <InstagramMarquee />
            <div className="hide-on-mobile-force">
                <StatsMarquee />
            </div>
        </section>
    );
};
