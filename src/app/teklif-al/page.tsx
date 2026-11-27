import React from 'react';
import type { Metadata } from 'next';
import { absUrl } from '@/lib/site';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { ContentProvider } from '@/components/layout/ContentProvider';
import { ContentService } from '@/lib/supabase/content.service';
import { ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Teklif Al",
    description: "Toptan dosya teli, takvim tenekesi, giyotin sac kesim ve UV metal poster siparişleriniz için teknik fiyatlandırma ve numune desteği. İzmir Alsancak doğrudan imalatçı fiyatı.",
    alternates: {
        canonical: absUrl("/teklif-al"),
    },
    openGraph: {
        title: "Teklif Al | Veral Teneke Ticaret İzmir",
        description: "Özel metal üretim, toptan tel ve teneke projeleriniz için doğrudan atölyeden fiyat teklifi alın.",
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
                            Fiyat ve numune teklifi
                        </h1>
                        <p className="text-base md:text-lg text-atl-muted leading-relaxed font-normal">
                            Toptan dosya teli, takvim tenekesi, fason giyotin kesim ve mıknatıslı UV metal poster projeleriniz için teknik resminizi yükleyin veya ölçülerinizi belirtin. İmalat ekibimiz detaylı teklif föyünüzü hazırlasın.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-atl-muted">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-atl-brass" />
                                <span>Yazılı Teklif</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-atl-brass" />
                                <span>CAD / DXF / PDF Desteği</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-atl-brass" />
                                <span>Doğrudan Fabrika Fiyatı</span>
                            </div>
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
