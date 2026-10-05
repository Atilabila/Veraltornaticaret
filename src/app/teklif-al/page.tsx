import React from 'react';
import type { Metadata } from 'next';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { ContentProvider } from '@/components/layout/ContentProvider';
import { ContentService } from '@/lib/supabase/content.service';
import { ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "B2B Hızlı Fiyat Teklifi (RFQ) | Toptan Dosya Teli & Teneke İmalatı | Veral Ticaret",
    description: "Toptan dosya teli, takvim tenekesi, giyotin sac kesim ve UV metal poster siparişleriniz için 24 saat içinde teknik fiyatlandırma ve numune desteği. İzmir Alsancak doğrudan imalatçı fiyatı.",
    alternates: {
        canonical: "https://veralteneketicaret.com/teklif-al",
    },
    openGraph: {
        title: "B2B Hızlı Fiyat Teklifi | Veral Teneke Ticaret İzmir",
        description: "Özel metal üretim, toptan tel ve teneke projeleriniz için doğrudan atölyeden fiyat teklifi alın.",
        url: "https://veralteneketicaret.com/teklif-al",
    },
};

export default async function QuotePage() {
    const dbContent = await ContentService.getContent();

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Fiyat Teklifi Al (RFQ)", url: "/teklif-al" },
    ];

    return (
        <ContentProvider initialContent={dbContent || undefined}>
            <main className="min-h-screen bg-[#fafafa] text-[#161616]">
                <Navigation />

                <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                    <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
                </div>

                <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 pt-4">
                    <div className="max-w-3xl mb-12 space-y-4">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                            İMALATÇIDAN DOĞRUDAN TEKLİF · İZMİR ALSANCAK
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                            B2B Hızlı Fiyat & Numune Teklifi (RFQ)
                        </h1>
                        <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
                            Toptan dosya teli, takvim tenekesi, fason giyotin kesim ve mıknatıslı UV metal poster projeleriniz için teknik resminizi yükleyin veya ölçülerinizi belirtin. İmalat mühendislerimiz 24 saat içinde detaylı teklif föyünüzü hazırlasın.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-600">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-amber-600" />
                                <span>24 Saat İçinde Yanıt</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-amber-600" />
                                <span>CAD / DXF / PDF Desteği</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-amber-600" />
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
