import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { PageContainer } from "@/components/layout/PageContainer";

type LegalPageLayoutProps = {
    title: string;
    eyebrow?: string;
    updatedAt?: string;
    children: React.ReactNode;
};

export function LegalPageLayout({ title, eyebrow = "Yasal metin", updatedAt, children }: LegalPageLayoutProps) {
    return (
        <PageShell variant="muted">
            <PageContainer className="max-w-3xl">
                <header className="mb-10 space-y-3 border-b border-atl-line pb-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">{eyebrow}</p>
                    <h1 className="font-display text-4xl leading-tight text-atl-text md:text-5xl">{title}</h1>
                    {updatedAt && <p className="text-sm text-atl-muted">Son güncelleme: {updatedAt}</p>}
                </header>
                <div className="atl-prose space-y-8 text-sm">{children}</div>
            </PageContainer>
        </PageShell>
    );
}
