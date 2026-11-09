import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { AtolyeHero } from "@/components/atolye/AtolyeHero";
import { ProductGroupsSection } from "@/components/atolye/ProductGroupsSection";
import { AboutTrustBand } from "@/components/atolye/AboutTrustBand";
import { ProcessSteps } from "@/components/atolye/ProcessSteps";
import { ProductionModelBand } from "@/components/atolye/ProductionModelBand";
import { CtaBand } from "@/components/atolye/CtaBand";
import { HomeFaqBand } from "@/components/atolye/HomeFaqBand";

export const metadata: Metadata = {
    title: {
        absolute: "İzmir Dosya Teli ve Takvim Tenekesi İmalatı | Veral Alsancak",
    },
    description:
        "İzmir Alsancak'ta toptan dosya teli imalatı, takvim tenekesi üretimi, giyotin sac kesim ve UV baskılı metal poster. Veral Torna & Teneke Ticaret — teklif ve numune için iletişime geçin.",
    keywords: [
        "izmir dosya teli",
        "toptan dosya teli imalatı",
        "takvim tenekesi üreticisi",
        "alsancak metal imalat",
        "veral teneke ticaret",
        "uv metal poster izmir",
    ],
    alternates: {
        canonical: "https://veralteneketicaret.com",
    },
    openGraph: {
        title: "İzmir Alsancak Dosya Teli ve Teneke İmalatı | Veral",
        description:
            "Toptan dosya teli, takvim tenekesi ve metal imalat — İzmir Alsancak atölyesinden Türkiye geneline sevkiyat.",
        url: "https://veralteneketicaret.com",
        siteName: "Veral Torna & Teneke Ticaret",
        locale: "tr_TR",
        type: "website",
        images: [
            {
                url: "/images/services/giyotin-kesim.webp",
                width: 1200,
                height: 900,
                alt: "İzmir Alsancak Veral metal imalat atölyesi",
            },
        ],
    },
};

const homeFaqs = [
    {
        question: "İzmir'de toptan dosya teli imalatı nerede yapılır?",
        answer: "Veral Torna & Teneke Ticaret, İzmir Alsancak 1471 Sokak No:12/A adresindeki atölyesinde toptan dosya teli imalatı yapar.",
    },
    {
        question: "Takvim tenekesi siparişi nasıl verilir?",
        answer: "Ölçü, adet ve askılı/askısız tercihinizi teklif formundan veya WhatsApp üzerinden iletin; yazılı fiyat ve termin bildirilir.",
    },
    {
        question: "Mıknatıslı metal posterler nasıl monte edilir?",
        answer: "Duvara yapıştırılan manyetik tutucu ped ile çivi çakmadan asılır; kafe, ofis ve dekorasyon projelerine uygundur.",
    },
    {
        question: "İzmir dışına sevkiyat yapıyor musunuz?",
        answer: "Evet, Alsancak atölyesinden Türkiye geneline kargo veya ambar ile toptan sevkiyat yapılır.",
    },
];

export default function ShopHomePage() {
    return (
        <main className="home-page min-h-screen bg-atl-bg pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-atl-text lg:pb-0" style={{ backgroundColor: "#121110", color: "#ece6da" }}>
            <FAQSchema items={homeFaqs} />
            <Navigation />
            <AtolyeHero />
            <ProductGroupsSection />
            <AboutTrustBand />
            <ProcessSteps />
            <ProductionModelBand />
            <HomeFaqBand />
            <CtaBand
                title="Metal parça üretimi için güvenilir bir çözüm ortağı mı arıyorsunuz?"
                description="Dosya teli, takvim tenekesi, sac kesim veya UV metal baskı talepleriniz için bizimle iletişime geçin. Projenize uygun üretimi birlikte planlayalım."
            />
            <Footer />
            <MobileStickyBar />
        </main>
    );
}
