import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { TornaServices } from "@/components/atolye/TornaServices";
import { absUrl, SITE_ORIGIN, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from "@/lib/site";
import { TORNA_SERVICES, WORKSHOP_BLURB } from "@/lib/public-copy";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Torna",
    description: "Torna, yedek parça ve teneke ürünleri yapıyoruz. Alsancak, 1471 Sokak No:12/A.",
    alternates: { canonical: absUrl("/hizmetler/torna") },
    openGraph: {
        title: "Torna | Veral Torna ve Teneke",
        description: "Torna, yedek parça ve teneke ürünleri yapıyoruz.",
        url: absUrl("/hizmetler/torna"),
    },
};

export default function TornaPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Torna",
        description: WORKSHOP_BLURB,
        url: absUrl("/hizmetler/torna"),
        areaServed: "TR",
        provider: {
            "@type": "LocalBusiness",
            name: "Veral Torna & Teneke Ticaret",
            url: SITE_ORIGIN,
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Torna işleri",
            itemListElement: TORNA_SERVICES.map((item) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: item.title,
                    description: item.text,
                },
            })),
        },
    };

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <Navigation />
            <div className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-6 lg:px-12">
                <Breadcrumb
                    items={[
                        { name: "Ana Sayfa", url: "/" },
                        { name: "Torna", url: "/hizmetler/torna" },
                    ]}
                />
                <h1 className="mt-2 font-display text-3xl text-atl-text sm:text-4xl">Torna</h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-atl-muted">
                    Torna, yedek parça ve teneke ürünleri yapıyoruz.
                </p>
            </div>
            <TornaServices intro={false} />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 pb-16 sm:flex-row sm:px-6 lg:px-12">
                <Link href="/teklif-al?hizmet=torna" className="inline-flex min-h-12 items-center justify-center bg-atl-brass px-6 text-sm font-semibold text-atl-bg">
                    Fiyat isteği
                </Link>
                <a href={`tel:${SITE_PHONE_E164}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-atl-line px-5 text-sm font-semibold">
                    <Phone className="h-4 w-4" />
                    {SITE_PHONE_DISPLAY}
                </a>
            </div>
            <Footer />
        </main>
    );
}
