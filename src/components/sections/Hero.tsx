"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { m } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/store/useContentStore";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";
import { normalizeImagePath } from "@/lib/utils";

import { DirectEdit } from "@/components/admin/DirectEdit";
import { TextInspector } from "@/components/admin/TextInspector";

export const Hero = () => {
    const { content } = useContentStore();
    const { shouldReduceVisuals } = usePerformanceDetection();
    const heroImage = normalizeImagePath(content.heroImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1587&auto=format&fit=crop");
    const safeTitle = (content.heroTitle || "DOSYA TELİ\nSERİ İMALAT")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>");

    return (
        <DirectEdit tab="hero">
            <section className="hero-section relative min-h-[32vh] sm:min-h-[36vh] lg:min-h-[48vh] xl:min-h-[52vh] flex items-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-16">
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Left Column: Typography & CTAs */}
                        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 min-w-0">
                            <m.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <span className="h-[3px] w-12 bg-industrial-gold" />
                                <TextInspector label="Hero-Eyebrow">
                                    <span className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-[#525252]">
                                        {content.heroSubtitle || "İzmir — toptan dosya teli ve metal imalat"}
                                    </span>
                                </TextInspector>
                            </m.div>

                            <m.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight uppercase text-[#161616] break-words animate-fade-in-up"
                                style={{ animationDelay: '0.1s' }}
                            >
                                <TextInspector label="Hero-Headline">
                                    <span dangerouslySetInnerHTML={{ __html: safeTitle }} />
                                </TextInspector>
                            </m.h1>

                            <m.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="space-y-3 max-w-2xl"
                            >
                                <TextInspector label="Hero-Tagline">
                                    <p className="text-[#525252] text-base md:text-lg leading-relaxed">
                                        {content.heroProductLine || "Ölçü netleşir, termin konuşulur, sevkiyat planlanır."}
                                    </p>
                                </TextInspector>
                            </m.div>

                            <m.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 w-full"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 px-8 text-sm font-bold tracking-wide rounded-none bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-muted)] transition-colors w-full sm:w-auto justify-center text-white"
                                >
                                    <Link href={content.heroButton1Url || "/teklif-al"}>
                                        <span className="flex items-center gap-2">
                                            {content.heroButton1Text || "Teklif Al"}
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </Link>
                                </Button>
                                <Link
                                    href="/#hizmetler"
                                    className="text-sm font-semibold text-[#525252] hover:text-[var(--color-brand-accent)] transition-colors underline-offset-4 hover:underline"
                                >
                                    Üretim hatlarını incele
                                </Link>
                            </m.div>

                            {(content.metalShowcaseTrustBadges || []).length > 0 && (
                            <m.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-6 border-t border-[#c6c6c6] text-sm text-[#525252] list-none"
                            >
                                {(content.metalShowcaseTrustBadges || []).slice(0, 3).map((badge, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="text-[var(--color-brand-accent)]">·</span>
                                        {badge.text}
                                    </li>
                                ))}
                            </m.ul>
                            )}
                        </div>

                        {/* Right Column: Visual */}
                        <div
                            className="col-span-12 lg:col-span-5 relative w-full min-w-0"
                        >
                            <Link href="/hizmetler/dosya-teli" className="block">
                                <div className="relative aspect-[4/5] bg-[#f4f4f4] w-full border border-[#c6c6c6] overflow-hidden">
                                    <Image
                                        src={heroImage}
                                        alt="Toptan dosya teli seri imalatı"
                                        fill
                                        className="object-cover"
                                        priority
                                        fetchPriority="high"
                                        sizes="(min-width:1280px) 560px, (min-width:1024px) 480px, (min-width:768px) 60vw, 94vw"
                                        quality={55}
                                    />
                                </div>
                            </Link>
                            <m.div
                                whileHover={{ x: 4, y: -4 }}
                                className="mt-6 lg:mt-0 lg:absolute lg:-bottom-4 lg:-left-4 bg-white p-5 border border-[#c6c6c6] border-l-4 border-l-[var(--color-brand-accent)] z-20 w-full max-w-[260px]"
                            >
                                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#525252] mb-1">Toptan MOQ</div>
                                <div className="text-3xl font-black text-[#161616]">Seri İmalat</div>
                                <div className="text-sm text-[#525252] mt-1">Özel ölçü dosya teli</div>
                            </m.div>
                        </div>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
