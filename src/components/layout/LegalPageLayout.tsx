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
                <header className="mb-10 space-y-3">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]">
                        {eyebrow}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#161616] leading-tight">{title}</h1>
                    {updatedAt && (
                        <p className="text-sm text-[#525252]">Son güncelleme: {updatedAt}</p>
                    )}
                </header>
                <div className="space-y-8 text-[#525252] text-sm leading-relaxed">{children}</div>
            </PageContainer>
        </PageShell>
    );
}
