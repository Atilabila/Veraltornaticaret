import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { AtolyeHero } from "@/components/atolye/AtolyeHero";
import { ProcessSteps } from "@/components/atolye/ProcessSteps";
import { MetalBaskiBand } from "@/components/atolye/MetalBaskiBand";
import { LatestPosts } from "@/components/atolye/LatestPosts";
import { CtaBand } from "@/components/atolye/CtaBand";
import { ServicesHomeSection } from "@/components/sections/ServicesHomeSection";

export const metadata: Metadata = {
    title: "Veral Teneke & Metal Poster İmalatı | İzmir Alsancak Seri Üretim",
    description: "İzmir Alsancak'ta toptan dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve UV baskılı metal levha imalatı. Teknik çizim veya numuneyle teklif.",
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
        answer: "Üretim tesisimiz İzmir Alsancak'tadır (1471 Sokak No:12/A).",
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
        <main className="home-page min-h-screen bg-atl-bg pb-24 text-atl-text lg:pb-0">
            <FAQSchema items={homeFaqs} />
            <Navigation />
            <AtolyeHero />
            <ServicesHomeSection />
            <ProcessSteps />
            <MetalBaskiBand />
            <LatestPosts />
            <CtaBand />
            <Footer />
            <MobileStickyBar />
        </main>
    );
}
