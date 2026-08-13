import React from 'react';
import { Metadata } from 'next';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { ContentProvider } from '@/components/layout/ContentProvider';
import { ContentService } from '@/lib/supabase/content.service';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';

const fallbackQuotePage = {
    title: "Toptan Teklif Formu",
    subtitle: "Dosya Teli & İmalat İçin Fiyatlandırma",
    description:
        "İmalatçıdan halka: toptan dosya teli, takvim tenekesi ve seri metal imalat için 24 saat içinde teklif sunuyoruz.",
    seoTitle: "Teklif Al | Toptan Dosya Teli ve İmalat - VERAL",
    seoDescription:
        "Toptan dosya teli, takvim tenekesi ve endüstriyel metal imalat teklifi. İzmir üreticiden doğrudan fiyat.",
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const dbContent = await ContentService.getContent();
    const config = dbContent?.quotePage || fallbackQuotePage;
    return {
        title: config.seoTitle || "Teklif Al | VERAL",
        description: config.seoDescription || "Özel metal üretim projeleriniz için teklif alın.",
    };
}

export default async function QuotePage() {
    const dbContent = await ContentService.getContent();
    const config = dbContent?.quotePage || fallbackQuotePage;
    if (!config) return null;

    return (
        <ContentProvider initialContent={dbContent || undefined}>
            <PageShell variant="muted">
                <PageContainer>
                    <div className="max-w-3xl mb-12 space-y-4">
                        <p className="text-sm font-mono font-semibold uppercase tracking-widest text-[var(--color-brand-accent)]">
                            {config.subtitle}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#161616] leading-tight">
                            {config.title}
                        </h1>
                        <p className="text-lg text-[#525252] leading-relaxed">
                            {config.description}
                        </p>
                    </div>
                    <QuoteForm />
                </PageContainer>
            </PageShell>
        </ContentProvider>
    );
}

export const revalidate = 0;
