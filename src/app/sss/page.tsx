import React from "react";
import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ArrowRight, HelpCircle, Phone, Sparkles } from "lucide-react";
import { SssAccordion } from "@/components/atolye/SssAccordion";
import { PUBLIC_FAQS } from "@/lib/public-copy";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular",
    description: "Dosya teli, takvim tenekesi, tef zili ve sac işi için kısa yanıtlar. Atölye: 1471 Sokak No:12/A, Alsancak.",
    alternates: {
        canonical: absUrl("/sss"),
    },
    openGraph: {
        title: "Sıkça Sorulan Sorular | Veral Teneke Ticaret İzmir",
        description: "Sipariş, boylar ve atölye adresi.",
        url: absUrl("/sss"),
    },
};

const faqData = PUBLIC_FAQS;

export default function SSSPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Sıkça Sorulan Sorular", url: "/sss" },
    ];

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <FAQSchema items={faqData} />
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-5xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            <section className="px-4 md:px-8 max-w-5xl mx-auto pb-20 pt-4">
                <div className="mb-12 text-center sm:text-left">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-atl-brass-tint text-atl-brass border border-atl-brass/20 shadow-sm mb-4">
                        <HelpCircle className="w-3.5 h-3.5 text-atl-brass" /> Kısa yanıtlar
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-atl-text tracking-tight mb-4">
                        Sıkça Sorulan Sorular
                    </h1>
                    <p className="text-base md:text-lg text-atl-muted max-w-2xl font-normal leading-relaxed">
                        Ürün, boy ve atölye.
                    </p>
                </div>

                <div className="mb-16">
                    <SssAccordion items={faqData} />
                </div>

                {/* CALL TO ACTION BOX */}
                <div className="rounded-3xl border border-atl-line bg-atl-surface p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="block font-sans text-xs font-semibold tracking-normal text-atl-brass">
                            Doğrudan usta desteği
                        </span>
                        <h2 className="text-xl md:text-2xl font-display text-atl-text flex items-center gap-2 justify-center md:justify-start">
                            <Sparkles className="w-5 h-5 text-atl-brass" /> Başka bir sorunuz veya özel şartnameniz mi var?
                        </h2>
                        <p className="text-sm text-atl-muted max-w-md">
                            Arayın ya da formu doldurun.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/teklif-al"
                            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-atl-brass px-6 font-sans text-sm font-semibold tracking-normal text-atl-bg shadow-sm transition-colors hover:bg-atl-brass-light"
                        >
                            <span>Hızlı Teklif Al</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="https://wa.me/905071651315"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-atl-line px-5 font-sans text-sm font-semibold tracking-normal text-atl-text transition-colors hover:bg-atl-surface-2"
                        >
                            <Phone className="w-4 h-4 text-emerald-600" />
                            <span>WhatsApp&apos;tan fiyat sor</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
