"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Ruler, Factory, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/store/useContentStore";
import * as LucideIcons from "lucide-react";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

import { DirectEdit } from "@/components/admin/DirectEdit";
import { TextInspector } from "@/components/admin/TextInspector";

export const Hero = () => {
    const { content } = useContentStore();
    const { shouldReduceVisuals } = usePerformanceDetection();

    return (
        <DirectEdit tab="hero">
            <section className="hero-section relative min-h-[32vh] sm:min-h-[36vh] lg:min-h-[48vh] xl:min-h-[52vh] flex items-center bg-white overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-16">
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Left Column: Typography & CTAs */}
                        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 min-w-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <span className="h-[2px] w-8 bg-black/80" />
                                <TextInspector label="Hero-Eyebrow">
                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-black/70">
                                        {content.heroSubtitle || "Yerli üretim metal tablolar, teneke ürünler ve özel baskı çözümleri"}
                                    </span>
                                </TextInspector>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight sm:leading-[0.98] tracking-tight lg:tracking-tighter uppercase text-black break-words"
                            >
                                <TextInspector label="Hero-Headline">
                                    <span dangerouslySetInnerHTML={{ __html: content.heroTitle?.replace(/\n/g, '<br/>') || "METAL TABLO &<br/>TENEKELERDE<br/>YENİ NESİL<br/>DEKOR VE ÜRETİM" }} />
                                </TextInspector>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="border-l-4 border-[#d8b24c] pl-4 py-0.5"
                            >
                                <TextInspector label="Hero-Tagline">
                                    <p className="text-[#d8b24c] font-semibold tracking-[0.25em] uppercase text-sm md:text-base leading-relaxed">
                                        {content.heroTagline || "UV BASKI YENİ NESİL TENEKE PLAKALAR"}
                                    </p>
                                </TextInspector>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 px-8 sm:px-10 text-[13px] sm:text-[14px] font-black tracking-[0.18em] sm:tracking-[0.24em] uppercase rounded-none bg-black hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto justify-center"
                                >
                                    <Link href={content.heroButton1Url || "/urunler"}>
                                        <span className="flex items-center gap-3">
                                            {content.heroButton1Text || "Koleksiyonu Keşfet"}
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="h-14 px-8 sm:px-10 text-[13px] sm:text-[14px] font-black tracking-[0.18em] sm:tracking-[0.24em] uppercase rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
                                >
                                    <Link href={content.heroButton2Url || "/urunler"}>
                                        {content.heroButton2Text || "KATALOG"}
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6 pt-6 border-t border-black/10"
                            >
                                {(content.metalShowcaseTrustBadges || []).map((badge, index) => (
                                    <TrustItem key={index} iconName={badge.icon} text={badge.text} />
                                ))}
                                {(!content.metalShowcaseTrustBadges || content.metalShowcaseTrustBadges.length === 0) && (
                                    <>
                                        <TrustItem iconName="Zap" text="Hızlı Üretim" />
                                        <TrustItem iconName="Award" text="+44 Yıl Deneyim" />
                                        <TrustItem iconName="ShieldCheck" text="Premium Kalite" />
                                    </>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column: Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="col-span-12 lg:col-span-5 relative w-full min-w-0"
                        >
                            <div className="relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5] bg-gray-100/80 w-full shadow-2xl rounded-3xl overflow-hidden">
                                <Image
                                    src={content.heroImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1587&auto=format&fit=crop"}
                                    alt="Industrial Metal Production"
                                    fill
                                    className="object-cover"
                                    priority
                                    fetchPriority="high"
                                    sizes="(min-width:1280px) 560px, (min-width:1024px) 480px, (min-width:768px) 60vw, 94vw"
                                    quality={shouldReduceVisuals ? 40 : 55}
                                />
                                <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none" />
                            </div>
                            <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 bg-white p-5 shadow-2xl border-l-8 border-black z-20 w-full max-w-[260px]">
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Technical Specs</div>
                                <div className="text-3xl font-black text-black">0.30<span className="text-[12px] align-top ml-1">mm</span></div>
                                <div className="text-[13px] font-bold text-gray-800 mt-1">Industrial Grade Steel</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};

const TrustItem = ({ iconName, text }: { iconName: string, text: string }) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.ShieldCheck;
    return (
        <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm p-5 md:p-6 flex flex-col items-start gap-3 hover:border-[#d8b24c]/30 transition-all duration-300">
            <div className="p-3 bg-black/5 rounded-lg">
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-black/80" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wide leading-tight text-gray-800">
                {text}
            </span>
        </div>
    );
};
