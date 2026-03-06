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
import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";

import { DirectEdit } from "@/components/admin/DirectEdit";
import { TextInspector } from "@/components/admin/TextInspector";

export const Hero = () => {
    const { content } = useContentStore();
    const { shouldReduceVisuals } = usePerformanceDetection();
    const heroImage = normalizeImagePath(content.heroImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1587&auto=format&fit=crop");
    const safeTitle = (content.heroTitle || "METAL TABLO &\nTENEKELERDE\nYENİ NESİL\nDEKOR VE ÜRETİM")
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
                                    <span className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-zinc-200">
                                        {content.heroSubtitle || "Yerli üretim metal tablolar, teneke ürünler ve özel baskı çözümleri"}
                                    </span>
                                </TextInspector>
                            </m.div>

                            <m.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tighter uppercase text-zinc-900 break-words font-syne italic drop-shadow-2xl animate-fade-in-up"
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
                                className="space-y-4"
                            >
                                <div className="border-l-4 border-industrial-gold pl-5 py-1">
                                    <TextInspector label="Hero-Tagline">
                                        <p className="text-industrial-gold font-black tracking-[0.2em] uppercase text-base md:text-lg leading-relaxed">
                                            {content.heroTagline || "UV BASKI YENİ NESİL TENEKE PLAKALAR. Sınırsız Tasarım, Üretim"}
                                        </p>
                                    </TextInspector>
                                </div>
                                <m.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-zinc-900 font-black tracking-[0.12em] uppercase text-sm md:text-base leading-relaxed pl-1 drop-shadow-lg"
                                >
                                    Dosya Teli — Takvim Tenekesi — Teneke Tef Zil — Retro Teneke Poster — UV Baskılı Özel İmalat Ürünler
                                </m.p>
                            </m.div>

                            <m.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 px-8 sm:px-10 text-[13px] sm:text-[14px] font-black tracking-[0.18em] sm:tracking-[0.24em] uppercase rounded-none bg-industrial-gold hover:bg-industrial-gold-muted transition-all duration-300 w-full sm:w-auto justify-center shadow-[4px_4px_0px_0px_rgba(212,175,55,0.4)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-black"
                                >
                                    <Link href={content.heroButton1Url || "/urunler"}>
                                        <span className="flex items-center gap-3">
                                            {content.heroButton1Text || "Ürünü İncele"}
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="h-14 px-8 sm:px-10 text-[13px] sm:text-[14px] font-black tracking-[0.18em] sm:tracking-[0.24em] uppercase rounded-none border-2 border-industrial-gold/40 bg-transparent text-industrial-gold hover:bg-industrial-gold hover:text-black transition-all duration-300 w-full sm:w-auto justify-center shadow-[4px_4px_0px_0px_rgba(212,175,55,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                >
                                    <Link href={content.heroButton2Url || "/urunler"}>
                                        {content.heroButton2Text || "KATALOG"}
                                    </Link>
                                </Button>
                            </m.div>

                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 pt-6 border-t border-white/5"
                            >
                                {(content.metalShowcaseTrustBadges || []).slice(0, 4).map((badge, index) => (
                                    <TrustItem key={index} iconName={badge.icon} text={badge.text} />
                                ))}
                                {(!content.metalShowcaseTrustBadges || content.metalShowcaseTrustBadges.length === 0) && (
                                    <>
                                        <TrustItem iconName="Zap" text="Hızlı Üretim" />
                                        <TrustItem iconName="Award" text="+44 Yıl Deneyim" />
                                        <TrustItem iconName="ShieldCheck" text="Premium Kalite" />
                                        <TrustItem iconName="Clock" text="7/24 Destek" />
                                    </>
                                )}
                            </m.div>
                        </div>

                        {/* Right Column: Visual */}
                        <m.div
                            className="col-span-12 lg:col-span-5 relative w-full min-w-0 animate-fade-in-scale"
                            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                        >
                            <Link href="/urunler" className="group block">
                                <div className="relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5] bg-gray-100/80 w-full shadow-2xl rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                                    <Image
                                        src={heroImage}
                                        alt="Industrial Metal Production"
                                        fill
                                        className="object-cover"
                                        priority
                                        fetchPriority="high"
                                        sizes="(min-width:1280px) 560px, (min-width:1024px) 480px, (min-width:768px) 60vw, 94vw"
                                        quality={55}
                                    />
                                    <m.div
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1, duration: 1 }}
                                        className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                </div>
                            </Link>
                            <m.div
                                whileHover={{ x: 10, y: -10 }}
                                className="mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 bg-zinc-900 p-6 shadow-[0_0_40px_rgba(212,175,55,0.15)] border-l-8 border-industrial-gold z-20 w-full max-w-[280px] cursor-pointer transition-shadow hover:shadow-[0_0_60px_rgba(212,175,55,0.25)]"
                            >
                                <div className="text-xs font-black uppercase tracking-widest text-zinc-300 mb-2">Technical Specs</div>
                                <div className="text-4xl font-black text-white font-syne italic">0.30<span className="text-sm align-top ml-1">mm</span></div>
                                <div className="text-sm font-bold text-zinc-200 mt-2">Industrial Grade Steel</div>
                            </m.div>
                        </m.div>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};



const TrustItem = ({ iconName, text }: { iconName: string, text: string }) => (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-800/70 backdrop-blur-sm p-5 md:p-6 flex flex-col items-start gap-3 hover:border-industrial-gold/50 transition-all duration-300 group/trust">
        <div className="p-3 bg-zinc-700 rounded-lg group-hover/trust:bg-industrial-gold/20 transition-colors">
            <DynamicLucideIcon
                name={iconName}
                fallbackName="shield-check"
                className="w-8 h-8 md:w-10 md:h-10 text-industrial-gold"
            />
        </div>
        <span className="text-sm md:text-base font-black uppercase tracking-wide leading-tight text-zinc-100">
            {text}
        </span>
    </div>
);
