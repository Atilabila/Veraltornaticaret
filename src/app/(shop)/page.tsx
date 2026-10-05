import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { FAQSchema } from "@/components/seo/FAQSchema";
import dynamic from "next/dynamic";

const ServicesHomeSection = dynamic(() =>
    import("@/components/sections/ServicesHomeSection").then((mod) => mod.ServicesHomeSection)
);
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(mod => mod.ProcessSection));
const BlueprintShowcase = dynamic(() => import("@/components/sections/BlueprintShowcase").then(mod => mod.BlueprintShowcase));
const CustomerReviews = dynamic(() => import("@/components/sections/CustomerReviews").then(mod => mod.CustomerReviews));
const MetalArtCurator = dynamic(() =>
    import("@/components/interactive/MetalArtCurator").then((mod) => mod.MetalArtCurator)
);

export const metadata: Metadata = {
    title: "Veral Teneke & Metal Poster İmalatı | İzmir Alsancak Seri Üretim",
    description: "40 yılı aşkın tecrübeyle toptan dosya teli, takvim tenekesi ve 4K UV baskılı mıknatıslı metal poster imalatı. İzmir'den 81 ile doğrudan üreticiden sevkiyat.",
    alternates: {
        canonical: "https://veralteneketicaret.com",
    },
    openGraph: {
        title: "Veral Torna & Teneke Ticaret - Endüstriyel Metal İmalatı",
        description: "İzmir merkezli toptan dosya teli üretimi, takvim tenekesi ve yüksek çözünürlüklü UV baskılı metal poster imalatı.",
        url: "https://veralteneketicaret.com",
        siteName: "Veral Torna & Teneke Ticaret",
        images: [
            {
                url: "/alsancak-mockup.png",
                width: 1200,
                height: 630,
                alt: "Veral Torna ve Teneke İmalat Atölyesi",
            },
        ],
    },
};

const homeFaqs = [
    {
        question: "Veral Teneke Ticaret nerede üretim yapmaktadır?",
        answer: "Üretim tesisimiz 1980 yılından bu yana İzmir'in tarihi sanayi bölgesi Alsancak'ta (1471 Sokak No:12/A) aralıksız hizmet vermektedir.",
    },
    {
        question: "Toptan dosya teli ve takvim tenekesinde teslimat süreleri nedir?",
        answer: "Standart siparişler aynı gün veya 24 saat içinde ambara teslim edilir. Özel boy kesim ve kurumsal fason talepler 2-4 iş günü içinde sevk edilir.",
    },
    {
        question: "Mıknatıslı metal posterler nasıl monte edilir?",
        answer: "Özel 3M VHB yapışkanlı manyetik tutucu ped ve N35 neodimyum mıknatıs sistemi sayesinde duvar delmeden, çivi çakmadan 30 saniyede asılır.",
    },
];

export default function ShopHomePage() {
    return (
        <main className="home-page min-h-screen bg-[#f4f4f4] text-[#161616] selection:bg-[var(--color-brand-accent)] selection:text-white pb-24 lg:pb-0 relative z-10">
            <FAQSchema items={homeFaqs} />

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

            {/* AI ROOM & METAL POSTER CURATOR */}
            <section className="bg-zinc-950 text-white relative z-10 border-b border-zinc-800 py-12 px-4 sm:px-6 lg:px-12">
                <MetalArtCurator />
            </section>

            {/* SERİ İMALAT */}
            <section className="bg-white text-[#161616] relative z-0 border-b border-[#c6c6c6]">
                <ProcessSection />
            </section>

            {/* SOCIAL_PROOF & 35.000+ ORDER DENOMINATOR */}
            <section className="bg-white text-[#161616] relative border-b border-[#c6c6c6]">
                <CustomerReviews />
            </section>

            {/* RETAIL CATALOG */}
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
