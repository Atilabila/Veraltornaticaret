import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { absUrl, SITE_HOURS_LABEL, SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { AtolyeHero } from "@/components/atolye/AtolyeHero";
import { ProductGroupsSection } from "@/components/atolye/ProductGroupsSection";
import { AboutTrustBand } from "@/components/atolye/AboutTrustBand";
import { ProcessSteps } from "@/components/atolye/ProcessSteps";
import { ProductionModelBand } from "@/components/atolye/ProductionModelBand";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { CtaBand } from "@/components/atolye/CtaBand";
import { HomeFaqBand } from "@/components/atolye/HomeFaqBand";

export const metadata: Metadata = {
    title: {
        absolute: "İzmir Dosya Teli ve Takvim Tenekesi İmalatı | Veral Alsancak",
    },
    description:
        "İzmir Alsancak atölyesinde dosya teli, takvim tenekesi, tef zili, sac kesim ve UV metal levha. Teklif için yazın.",
    keywords: [
        "izmir dosya teli",
        "toptan dosya teli imalatı",
        "takvim tenekesi üreticisi",
        "alsancak metal imalat",
        "veral teneke ticaret",
        "uv metal poster izmir",
    ],
    alternates: {
        canonical: absUrl("/"),
    },
    openGraph: {
        title: "İzmir Alsancak Dosya Teli ve Teneke İmalatı | Veral",
        description:
            "Toptan dosya teli, takvim tenekesi ve metal imalat — İzmir Alsancak atölyesinden Türkiye geneline sevkiyat.",
        url: absUrl("/"),
        siteName: "Veral Torna & Teneke Ticaret",
        locale: "tr_TR",
        type: "website",
        images: [
            {
                url: "/images/services/dosya-teli-plastik-takim.webp",
                width: 1200,
                height: 900,
                alt: "Veral dosya telleri, Alsancak atölyesi",
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

const homeProductionRows = [
    {
        area: "Dosya Teli İmalatı",
        href: "/hizmetler/dosya-teli",
        scope: "Kırtasiye, arşiv ve dosya üreticileri için toptan dosya teli üretimi",
        orderModel: "Toptan / seri — Türkiye geneline sevkiyat",
    },
    {
        area: "Takvim Tenekesi",
        href: "/hizmetler/takvim-tenekesi",
        scope: "Duvar ve gemici takvimleri için askılı ve askısız teneke çıta imalatı",
        orderModel: "Matbaa ve yayınevlerine teklif usulü seri üretim",
    },
    {
        area: "Giyotin Sac Kesim",
        href: "/hizmetler/giyotin-kesim",
        scope: "Proje ölçülerine göre fason sac ve teneke ebatlama",
        orderModel: "Ölçüye özel fason kesim — Alsancak / İzmir",
    },
    {
        area: "Rulo, Alüminyum ve Bakır Dilimleme",
        href: "/hizmetler/rulo-dilimleme",
        scope: "Rulo sac dilimleme, şerit açma; alüminyum ve bakır şerit ebatlama",
        orderModel: "Ölçü ve en bilgisi teklifte netleşir",
    },
    {
        area: "Tef Zili İmalatı",
        href: "/hizmetler/tef-zili",
        scope: "Müzik aleti üreticileri için tef zili ve metal pul seri pres imalatı",
        orderModel: "Toptan tedarik — teklif usulü",
    },
    {
        area: "UV Baskılı Metal Levha",
        href: "/hizmetler/miknatisli-magnet",
        scope: "Mıknatıslı metal poster ve kurumsal tabela üretimi",
        orderModel: "Seri veya özel proje — teklif usulü",
    },
];

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    alternateName: "Veral Torna & Teneke Ticaret",
    inLanguage: "tr-TR",
    publisher: {
        "@id": `${SITE_ORIGIN}/#atolye`,
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_ORIGIN}/#breadcrumb`,
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: SITE_ORIGIN,
        },
    ],
};

const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_ORIGIN}/#webpage`,
    url: SITE_ORIGIN,
    name: "İzmir Dosya Teli ve Takvim Tenekesi İmalatı | Veral Alsancak",
    description:
        "İzmir Alsancak atölyesinde dosya teli, takvim tenekesi, tef zili, sac kesim ve UV metal levha. Teklif için yazın.",
    inLanguage: "tr-TR",
    dateModified: "2026-11-25",
    isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
    },
    about: {
        "@id": `${SITE_ORIGIN}/#atolye`,
    },
    author: {
        "@type": "Person",
        "@id": `${absUrl("/yazar/oguzcan-veral")}#person`,
        name: "Oğuzcan Veral",
        jobTitle: "Atölye sahibi",
        url: absUrl("/yazar/oguzcan-veral"),
    },
    publisher: {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#atolye`,
        name: "Veral Torna & Teneke Ticaret",
        url: SITE_ORIGIN,
        logo: {
            "@type": "ImageObject",
            url: absUrl("/veral-logo.png"),
        },
    },
    breadcrumb: {
        "@id": `${SITE_ORIGIN}/#breadcrumb`,
    },
};

export default function ShopHomePage() {
    return (
        <main id="icerik" className="home-page min-h-screen bg-atl-bg pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-atl-text lg:pb-0" style={{ backgroundColor: "#121110", color: "#ece6da" }}>
            <LocalBusinessSchema />
            <FAQSchema items={homeFaqs} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navigation />
            <AtolyeHero />
            <ProductGroupsSection />
            <AboutTrustBand />
            <ProcessSteps />
            <ProductionModelBand />
            <section
                aria-label="İzmir Alsancak atölye üretim alanları"
                className="border-b border-atl-line bg-atl-bg py-10 sm:py-16 lg:py-20"
            >
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                    <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-8 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="Üretim özeti"
                            title="İzmir Alsancak atölye üretim alanları"
                            description="Mevcut hatlarımızda yürütülen toptan, seri ve fason metal işleme alanları."
                        />
                        <p className="font-mono text-xs text-atl-muted">
                            Güncelleme:{" "}
                            <time dateTime="2026-11-25" className="text-atl-brass-light">
                                25 Kasım 2026
                            </time>
                        </p>
                    </div>
                    <div className="overflow-x-auto border border-atl-line bg-[#1a1815]/90">
                        <table className="w-full border-collapse text-left text-sm">
                            <caption className="sr-only">
                                Veral Torna ve Teneke Ticaret İzmir Alsancak üretim alanları özeti
                            </caption>
                            <thead>
                                <tr className="border-b border-atl-line bg-atl-lift text-xs uppercase tracking-[0.06em] text-atl-brass-light">
                                    <th scope="col" className="px-4 py-3.5 font-sans font-semibold sm:px-6">
                                        Üretim Alanı
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 font-sans font-semibold sm:px-6">
                                        Kapsam ve Kullanım
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 font-sans font-semibold sm:px-6">
                                        Sipariş / Sevkiyat
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-atl-line">
                                {homeProductionRows.map((row) => (
                                    <tr key={row.href} className="transition-colors hover:bg-atl-lift/60">
                                        <th scope="row" className="whitespace-nowrap px-4 py-4 font-sans font-semibold text-atl-text sm:px-6">
                                            <Link
                                                href={row.href}
                                                className="text-atl-brass-light underline-offset-4 transition-colors hover:text-atl-text hover:underline"
                                            >
                                                {row.area}
                                            </Link>
                                        </th>
                                        <td className="px-4 py-4 text-atl-muted sm:px-6">{row.scope}</td>
                                        <td className="px-4 py-4 text-atl-text/90 sm:px-6">{row.orderModel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-atl-muted">
                        <span>Atölye: 1471 Sokak No:12/A, Alsancak / İzmir · {SITE_HOURS_LABEL}</span>
                        <span>Ölçü, adet ve termin yazılı teklifte netleşir.</span>
                    </p>
                </div>
            </section>
            <HomeFaqBand />
            <CtaBand
                title="Ölçü veya numune gönderin"
                description="Dosya teli, takvim tenekesi, sac kesim veya UV baskı için fiyat teklifte yazılır."
            />
            <Footer />
        </main>
    );
}
