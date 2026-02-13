"use client";

import React from "react";
import "@/app/metal-art.css";
import { MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

import { Hero } from "@/components/sections/Hero";
import { ShowcaseGrid } from "@/components/sections/ShowcaseGrid";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

const ProcessSection = dynamic(() =>
    import("@/components/sections/ProcessSection").then((mod) => mod.ProcessSection)
);
const BlueprintShowcase = dynamic(() =>
    import("@/components/sections/BlueprintShowcase").then((mod) => mod.BlueprintShowcase)
);
const InstagramMarquee = dynamic(() =>
    import("@/components/sections/InstagramMarquee").then((mod) => mod.InstagramMarquee)
);
const StatsMarquee = dynamic(() =>
    import("@/components/sections/StatsMarquee").then((mod) => mod.StatsMarquee)
);
const CustomerReviews = dynamic(() =>
    import("@/components/sections/CustomerReviews").then((mod) => mod.CustomerReviews)
);
const OtherServices = dynamic(() =>
    import("@/components/sections/OtherServices").then((mod) => mod.OtherServices)
);
const LocalContactSection = dynamic(() =>
    import("@/components/sections/LocalContactSection").then((mod) => mod.LocalContactSection)
);

export default function ShopHomePage() {
    const { shouldReduceVisuals, isReady } = usePerformanceDetection();
    const disableHeavyVisuals = !isReady || shouldReduceVisuals;

    return (
        <MotionConfig reducedMotion={shouldReduceVisuals ? "always" : "never"}>
            <main className="home-page min-h-screen bg-white selection:bg-[#D4AF37] selection:text-white pb-24 lg:pb-0">
                {/* GLOBAL_NAV */}
                <Navigation />

                {/* HERO - WHITE */}
                <section className="bg-white text-black relative z-0">
                    <Hero />
                </section>

                {/* SYSTEM_STATUS_STRIP - BLACK */}
                <section className="bg-[#0A0A0A] text-white relative z-0">
                    <ShowcaseGrid />
                </section>

                {/* LIVE_FEED - BLACK (skip on low-power/mobile) */}
                {!disableHeavyVisuals && (
                    <section className="bg-[#0A0A0A] text-white relative">
                        <InstagramMarquee />
                        <div className="hide-on-mobile-force">
                            <StatsMarquee />
                        </div>
                    </section>
                )}

                {/* PRODUCTION_FLOW - WHITE */}
                <section className="bg-white text-black relative z-0">
                    <ProcessSection />
                </section>

                {/* PRODUCT_SHOWCASE (Blueprint) - WHITE */}
                <section className="bg-white text-black relative z-0">
                    <BlueprintShowcase />
                </section>

                {/* SOCIAL_PROOF - BLACK */}
                <section className="bg-[#0A0A0A] text-white relative">
                    <CustomerReviews />
                </section>

                {/* SERVICES_MODULE - BLACK */}
                <section className="bg-[#0A0A0A] text-white relative">
                    <OtherServices />
                </section>

                {/* CONTACT_TERMINAL - WHITE */}
                <section className="bg-white text-black relative">
                    <LocalContactSection />
                </section>

                {/* GLOBAL_FOOTER - BLACK */}
                <Footer />

                {/* INTERACTION_LAYER */}
                <MobileStickyBar />
            </main>
        </MotionConfig>
    );
}

