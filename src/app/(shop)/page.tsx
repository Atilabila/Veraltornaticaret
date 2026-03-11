import React from "react";
import "@/app/metal-art.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const ShowcaseGrid = dynamic(() => import("@/components/sections/ShowcaseGrid").then(mod => mod.ShowcaseGrid));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(mod => mod.ProcessSection));
const BlueprintShowcase = dynamic(() => import("@/components/sections/BlueprintShowcase").then(mod => mod.BlueprintShowcase));
const CustomerReviews = dynamic(() => import("@/components/sections/CustomerReviews").then(mod => mod.CustomerReviews));
const OtherServices = dynamic(() => import("@/components/sections/OtherServices").then(mod => mod.OtherServices));
const LiveFeedSection = dynamic(() => import("@/components/sections/LiveFeedSection").then(mod => mod.LiveFeedSection));

export const metadata = {
    title: "Metal Tablo ve Endüstriyel Dekor | Veral Teneke Ticaret",
    description: "Özel üretim UV baskılı metal tablolar, endüstriyel teneke plakalar ve kalaylı teneke levhalar. Yeni nesil teneke tasarımı.",
    alternates: {
        canonical: "/",
    },
};

export default function ShopHomePage() {
    return (
        <main className="home-page min-h-screen bg-white selection:bg-[#D4AF37] selection:text-white pb-24 lg:pb-0">
            {/* GLOBAL_NAV */}
            <Navigation />

            {/* HERO - WHITE */}
            <section className="bg-white text-black relative z-0">
                <Hero />
            </section>

            {/* SYSTEM_STATUS_STRIP - BLACK */}
            <section className="bg-[#0A0A0A] text-white relative z-0">
                <OtherServices />
            </section>

            {/* SHOWCASE_GRID - BLACK */}
            <section className="bg-[#0A0A0A] text-white relative z-0">
                <ShowcaseGrid />
            </section>

            {/* LIVE_FEED - BLACK (client-side only rendering based on device performance) */}
            <LiveFeedSection />

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

            {/* GLOBAL_FOOTER - BLACK */}
            <Footer />

            {/* INTERACTION_LAYER */}
            <MobileStickyBar />
        </main>
    );
}
