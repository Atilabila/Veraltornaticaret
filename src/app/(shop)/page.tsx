import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { StitchHero } from "@/components/sections/StitchHero";
import { StitchAssurance } from "@/components/sections/StitchAssurance";
import { StitchCatalog } from "@/components/sections/StitchCatalog";
import { FAQSchema } from "@/components/seo/FAQSchema";
import dynamic from "next/dynamic";

const ServicesHomeSection = dynamic(() =>
    import("@/components/sections/ServicesHomeSection").then((mod) => mod.ServicesHomeSection)
);
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(mod => mod.ProcessSection));
const BlueprintShowcase = dynamic(() => import("@/components/sections/BlueprintShowcase").then(mod => mod.BlueprintShowcase));
const CustomerReviews = dynamic(() => import("@/components/sections/CustomerReviews").then(mod => mod.CustomerReviews));

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
                url: "/hero-izmir-metal-poster.jpg",
                width: 880,
                height: 734,
                alt: "İzmir Saat Kulesi Mıknatıslı Metal Poster - Veral Teneke İmalatı",
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
    {
        question: "Özel ölçü metal levha ve fason UV baskı siparişi verebilir miyim?",
        answer: "Evet, mimari projeler, kafe-restoran tabelaları ve kurumsal promosyonlar için özel ölçü kesim, kenar büküm ve UV kürleme fason imalat hizmeti veriyoruz.",
    },
];

export default function ShopHomePage() {
    return (
        <main className="home-page min-h-screen bg-[#fafafa] text-[#161616] selection:bg-amber-600 selection:text-white pb-24 lg:pb-0 relative z-10">
            <FAQSchema items={homeFaqs} />

            {/* GLOBAL NAVIGATION */}
            <Navigation />

            {/* 1. STITCH LUXURY INDUSTRIAL HERO (İzmir Metal Poster Art) */}
            <StitchHero />

            {/* 2. STITCH 4-COLUMN ASSURANCE PROTOCOL (NO JARGON) */}
            <StitchAssurance />

            {/* 3. TREND METAL POSTER CATALOG */}
            <StitchCatalog />

            {/* 5. HİZMETLER & İMALAT HATLARI */}
            <section className="bg-[#f8f9fa] text-[#161616] relative z-10 border-b border-[#e5e7eb]">
                <ServicesHomeSection />
            </section>

            {/* 6. SERİ İMALAT SÜRECİ */}
            <section className="bg-white text-[#161616] relative z-0 border-b border-[#e5e7eb]">
                <ProcessSection />
            </section>

            {/* 7. 35.000+ SİPARİŞ DENEYİMİ & YORUMLAR */}
            <section className="bg-[#f8f9fa] text-[#161616] relative border-b border-[#e5e7eb]">
                <CustomerReviews />
            </section>

            {/* 8. TEKNİK ŞEMATİK / RETRO BLUEPRINT CATALOG */}
            <section className="bg-white text-[#161616] relative z-0 border-b border-[#e5e7eb]">
                <BlueprintShowcase />
            </section>

            {/* GLOBAL FOOTER */}
            <Footer />

            {/* INTERACTION LAYER */}
            <MobileStickyBar />
        </main>
    );
}
