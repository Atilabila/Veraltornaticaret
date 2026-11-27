import React from 'react';
import type { Metadata } from 'next';
import { absUrl } from '@/lib/site';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { ContentProvider } from '@/components/layout/ContentProvider';
import { ContentService } from '@/lib/supabase/content.service';
import { Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: "Teklif Al",
    description: "Önce ürün ve adet. Sonra ad ve telefon. E-posta zorunlu değil.",
    alternates: {
        canonical: absUrl("/teklif-al"),
    },
    openGraph: {
        title: "Teklif Al | Veral Teneke Ticaret İzmir",
        description: "Ürün, adet, ad ve telefon. E-posta isteğe bağlı.",
        url: absUrl("/teklif-al"),
    },
};

export default async function QuotePage() {
    const dbContent = await ContentService.getContent();

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Teklif al", url: "/teklif-al" },
    ];

    return (
        <ContentProvider initialContent={dbContent || undefined}>
            <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
                <Navigation />

                <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                    <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
                </div>

                <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 pt-4">
                    <div className="max-w-3xl mb-12 space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-atl-brass/20 bg-atl-brass-tint px-3.5 py-1.5 font-sans text-xs font-semibold tracking-normal text-atl-brass shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-atl-brass" />
                            İmalatçıdan doğrudan teklif
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-atl-text tracking-tight leading-tight">
                            Fiyat talebi
                        </h1>
                        <p className="text-base md:text-lg text-atl-muted leading-relaxed font-normal">
                            Önce ürün ve adet. Sonra ad ve telefon.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-sm text-atl-muted">
                            <Clock className="w-4 h-4 text-atl-brass" />
                            <span>Pazartesi–Cumartesi 08:30–18:30</span>
                        </div>
                    </div>

                    <QuoteForm />
                </section>

                <Footer />
            </main>
        </ContentProvider>
    );
}

export const revalidate = 0;
