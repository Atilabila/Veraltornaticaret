import React from 'react';
import { Metadata } from 'next';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { GlobalGrid } from '@/components/layout/GlobalGrid';
import { ContentProvider } from '@/components/layout/ContentProvider';
import { ContentService } from '@/lib/supabase/content.service';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const fallbackQuotePage = {
    title: "Teklif Formu",
    subtitle: "Projeniz İçin Teknik Analiz ve Fiyatlandırma",
    description:
        "İzmir merkezli atölyemizde endüstriyel metal tasarımı, CNC kesim ve özel üretim projeleriniz için teknik değerlendirme ve teklif sunuyoruz.",
    seoTitle: "Teklif Al | Özel Metal Üretim ve Tasarım - VERAL Metal Works",
    seoDescription:
        "Endüstriyel metal projeleriniz, CNC kesim ve özel tasarım talepleriniz için hemen teklif alın.",
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const dbContent = await ContentService.getContent();
    const config = dbContent?.quotePage || fallbackQuotePage;

    return {
        title: config.seoTitle || "Teklif Al | VERAL Metal Works",
        description: config.seoDescription || "Özel metal üretim projeleriniz için teklif alın.",
    };
}

export default async function QuotePage() {
    const dbContent = await ContentService.getContent();
    // Client store already starts with defaults; passing DB content is enough for hydration.
    const config = dbContent?.quotePage || fallbackQuotePage;

    if (!config) return null;

    return (
        <ContentProvider initialContent={dbContent || undefined}>
            <main className="relative min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
                <Navigation />
                {/* Global Background Systems */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <GlobalGrid />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>

                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
                    {/* HERO SECTION */}
                    <div className="max-w-4xl mb-20 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-orange-500" />
                            <span className="text-sm font-black text-orange-500 tracking-[0.3em] uppercase">{config.subtitle}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                            {config.title}
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                            {config.description}
                        </p>
                    </div>

                    {/* FORM SECTION */}
                    <QuoteForm />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />
                <Footer />
            </main>
        </ContentProvider>
    );
}

// Ensure the page is server-side rendered with fresh data
export const revalidate = 0;
