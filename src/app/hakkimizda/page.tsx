"use client";

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { DynamicLucideIcon } from '@/components/ui/DynamicLucideIcon';
import { useContentStore } from '@/store/useContentStore';
import { m } from 'framer-motion';

export default function HakkimizdaPage() {
    const { content } = useContentStore();
    const milestones = content.milestones || [];
    const stats = content.aboutStats || [];

    return (
        <PageShell variant="light" padded={false}>
            <section className="bg-white border-b border-[#c6c6c6] pt-28 lg:pt-32 pb-12 lg:pb-16">
                <PageContainer>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6">
                            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]">
                                Hakkımızda · İzmir
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#161616] leading-tight whitespace-pre-line">
                                {content.aboutTitle || "Yarım asırlık metal hafızası"}
                            </h1>
                            <p className="text-lg text-[#525252] leading-relaxed max-w-lg">
                                {content.aboutSubtitle || "1980'den bugüne Alsancak'taki atölyemizde dosya teli, takvim tenekesi ve endüstriyel metal imalat."}
                            </p>
                        </div>
                        <div className="relative border border-[#c6c6c6] aspect-video bg-[#f4f4f4] overflow-hidden">
                            <img
                                src={content.aboutImage || "/alsancak-mockup.png"}
                                alt="Atölye"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </PageContainer>
            </section>

            <section className="py-16 lg:py-20 bg-[#f4f4f4] border-b border-[#c6c6c6]">
                <PageContainer>
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4 space-y-4">
                            <h2 className="text-2xl font-bold text-[#161616]">Hikayemiz</h2>
                            <div className="w-12 h-1 bg-[var(--color-brand-accent)]" />
                            <div className="flex items-center gap-3 pt-4 opacity-80">
                                <img src={content.headerLogo || "/veral-logo.webp"} alt={content.siteName} className="h-12 w-12 object-contain" />
                                <div>
                                    <span className="text-sm font-bold text-[#161616] uppercase tracking-wide block">{content.siteName}</span>
                                    <span className="text-xs text-[#525252]">Torna & Teneke Ticaret</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 space-y-8">
                            <div className="text-lg text-[#525252] leading-relaxed whitespace-pre-line">
                                {content.aboutContent || `Veral Torna & Teneke, İzmir'in endüstriyel kalbi Alsancak'ta temelleri atılmış bir aile işletmesidir.`}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {(stats.length > 0 ? stats : [
                                    { label: "Kalite protokolü", value: "Manuel + dijital kontrol" },
                                    { label: "Süreklilik", value: "40+ yıl aynı lokasyon" },
                                ]).map((stat, idx) => (
                                    <div key={idx} className="p-6 bg-white border border-[#c6c6c6]">
                                        <DynamicLucideIcon name="check-circle-2" className="text-[var(--color-brand-accent)] mb-3" size={28} />
                                        <h4 className="font-bold text-[#161616] mb-1">{stat.label}</h4>
                                        <p className="text-[#525252] text-sm">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {milestones.length > 0 && (
                <section className="py-16 lg:py-20 bg-white">
                    <PageContainer>
                        <div className="mb-12">
                            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)] mb-3">Kronoloji</p>
                            <h2 className="text-3xl font-bold text-[#161616]">Tarihsel gelişim</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {milestones.map((item, idx) => (
                                <div key={idx} className="p-6 border border-[#c6c6c6] hover:border-[var(--color-brand-accent)] transition-colors">
                                    <span className="text-3xl font-bold text-[var(--color-brand-accent)] block mb-4">{item.year}</span>
                                    <DynamicLucideIcon name={item.icon} fallbackName="help-circle" className="mb-3 text-[#525252]" size={24} />
                                    <h3 className="font-bold text-[#161616] mb-2">{item.title}</h3>
                                    <p className="text-sm text-[#525252] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </PageContainer>
                </section>
            )}

            <MobileStickyBar />
        </PageShell>
    );
}
