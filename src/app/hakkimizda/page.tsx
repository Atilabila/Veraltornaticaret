import React from "react";
import type { Metadata } from "next";
import { absUrl, SITE_ORIGIN, SITE_PHONE_E164, SITE_PHONE_DISPLAY } from "@/lib/site";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ABOUT_PARAGRAPHS, FOUNDING_YEAR } from "@/lib/public-copy";
import { ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Hakkımızda",
    description: `Veral Torna ve Teneke Ticaret, ${FOUNDING_YEAR}'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir. Torna, yedek parça ve teneke ürünleri imalatı.`,
    alternates: {
        canonical: absUrl("/hakkimizda"),
    },
    openGraph: {
        title: "Hakkımızda | Veral Teneke Ticaret",
        description: `${FOUNDING_YEAR}'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir. Torna, yedek parça ve teneke ürünleri imalatı.`,
        url: absUrl("/hakkimizda"),
    },
};

export default function AboutPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Hakkımızda", url: "/hakkimizda" },
    ];

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Veral Torna & Teneke Ticaret",
        "foundingDate": FOUNDING_YEAR,
        "description": ABOUT_PARAGRAPHS.join(" "),
        "url": SITE_ORIGIN,
        "logo": absUrl("/veral-logo.png"),
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1471 Sokak No:12/A",
            "addressLocality": "Alsancak / Konak",
            "addressRegion": "İzmir",
            "postalCode": "35220",
            "addressCountry": "TR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "name": "Oğuzcan Veral",
            "telephone": SITE_PHONE_E164,
            "contactType": "customer service",
            "areaServed": "TR",
            "availableLanguage": "Turkish"
        }
    };

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-3xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            <section className="px-4 md:px-8 max-w-3xl mx-auto pb-20 pt-2">
                <h1 className="text-3xl sm:text-4xl font-display text-atl-text tracking-tight">
                    Hakkımızda
                </h1>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-atl-muted">
                    {ABOUT_PARAGRAPHS.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>

                <div className="mt-8 flex min-h-48 items-center rounded-2xl border border-atl-line bg-atl-surface px-8 py-10">
                    <Wordmark className="h-20 w-auto text-atl-text" />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/teklif-al"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-atl-brass px-6 text-sm font-semibold text-atl-bg hover:bg-atl-brass-light"
                    >
                        Fiyat isteği
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                        href={`tel:${SITE_PHONE_E164}`}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-atl-line px-5 text-sm font-semibold text-atl-text hover:bg-atl-surface-2"
                    >
                        <Phone className="h-4 w-4 text-atl-brass" />
                        {SITE_PHONE_DISPLAY}
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
