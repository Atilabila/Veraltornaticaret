import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const ServicesHomeSection = dynamic(() =>
    import("@/components/sections/ServicesHomeSection").then((mod) => mod.ServicesHomeSection)
);
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(mod => mod.ProcessSection));
const BlueprintShowcase = dynamic(() => import("@/components/sections/BlueprintShowcase").then(mod => mod.BlueprintShowcase));
const CustomerReviews = dynamic(() => import("@/components/sections/CustomerReviews").then(mod => mod.CustomerReviews));

export const metadata = {
    title: "Toptan Dosya Teli İmalatı | Veral Teneke Ticaret",
    description: "İmalatçıdan halka: seri toptan dosya teli üretimi, takvim tenekesi imalatı ve endüstriyel metal çözümler. İzmir merkezli sevkiyat.",
    alternates: {
        canonical: "/",
    },
};

export default function ShopHomePage() {
    return (
        <main className="home-page min-h-screen bg-[#f4f4f4] text-[#161616] selection:bg-[var(--color-brand-accent)] selection:text-white pb-24 lg:pb-0 relative z-10">
            {/* GLOBAL_NAV */}
            <Navigation />

            {/* HERO */}
            <section className="bg-white text-[#161616] relative z-0 border-b border-[#c6c6c6]">
                <Hero />
            </section>

            {/* HİZMETLER — 2. ekran (/hizmetler içeriği) */}
            <section className="bg-[#f4f4f4] text-[#161616] relative z-10 border-b border-[#c6c6c6]">
                <ServicesHomeSection />
            </section>

            {/* SERİ İMALAT */}
            <section className="bg-white text-[#161616] relative z-0 border-b border-[#c6c6c6]">
                <ProcessSection />
            </section>

            {/* SOCIAL_PROOF */}
            <section className="bg-white text-[#161616] relative border-b border-[#c6c6c6]">
                <CustomerReviews />
            </section>

            {/* RETAIL CATALOG (demoted) */}
            <section className="bg-[#f4f4f4] text-[#161616] relative z-0 border-b border-[#c6c6c6]">
                <BlueprintShowcase />
            </section>

            {/* GLOBAL_FOOTER */}
            <Footer />

            {/* INTERACTION_LAYER */}
            <MobileStickyBar />
        </main>
    );
}
