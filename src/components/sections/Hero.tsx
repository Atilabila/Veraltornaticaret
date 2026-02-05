"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Ruler, Factory, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/store/useContentStore";
import * as LucideIcons from "lucide-react";

import { DirectEdit } from "@/components/admin/DirectEdit";
import { TextInspector } from "@/components/admin/TextInspector";

export const Hero = () => {
    const { content } = useContentStore();

    return (
        <DirectEdit tab="hero">
            <section className="hero-section relative min-h-[38vh] lg:min-h-[48vh] xl:min-h-[52vh] flex items-center bg-white overflow-hidden py-10">
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-12 gap-10 items-center">
                        {/* Left Column: Typography & CTAs */}
                        <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
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
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.97] tracking-tighter uppercase text-black"
                            >
                                <TextInspector label="Hero-Headline">
                                    <span dangerouslySetInnerHTML={{ __html: content.heroTitle?.replace(/\n/g, '<br/>') || "METAL TABLO &<br/>TENEKELERDE<br/>YENİ NESİL<br/>DEKOR VE ÜRETİM" }} />
                                </TextInspector>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="border-l-4 border-black pl-4 py-0.5"
                            >
                                <TextInspector label="Hero-Tagline">
                                    <p className="font-mono text-sm md:text-base font-medium text-black/70 uppercase tracking-widest leading-relaxed">
                                        {content.heroTagline || "0.30MM ENDÜSTRİYEL METAL PLAKALAR · UV DİJİTAL KALİBRASYON · SIFIR YUVARLAK KÖŞE"}
                                    </p>
                                </TextInspector>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 pt-2"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 px-10 text-[14px] font-black tracking-[0.28em] uppercase rounded-none bg-black hover:bg-gray-800 transition-all duration-300"
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
                                    className="h-14 px-10 text-[14px] font-black tracking-[0.28em] uppercase rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
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
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-black/10"
                            >
                                {(content.metalShowcaseTrustBadges || []).map((badge, index) => (
                                    <TrustItem key={index} iconName={badge.icon} text={badge.text} />
                                ))}
                                {(!content.metalShowcaseTrustBadges || content.metalShowcaseTrustBadges.length === 0) && (
                                    <>
                                        <TrustItem iconName="Factory" text="Yerli Üretim" />
                                        <TrustItem iconName="Ruler" text="Özel Ölçü & Baskı" />
                                        <TrustItem iconName="Package" text="Kurumsal Sipariş" />
                                        <TrustItem iconName="ShieldCheck" text="Minimum Adet Bilgisi" />
                                    </>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column: Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="col-span-12 md:col-span-5 relative block"
                        >
                            <div className="relative aspect-[3/4] bg-gray-100 w-full shadow-2xl">
                                <Image
                                    src={content.heroImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1587&auto=format&fit=crop"}
                                    alt="Industrial Metal Production"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none" />
                                <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-2xl border-l-8 border-black z-20">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Technical Specs</div>
                                    <div className="text-3xl font-black text-black">0.30<span className="text-[12px] align-top ml-1">mm</span></div>
                                    <div className="text-[13px] font-bold text-gray-800 mt-1">Industrial Grade Steel</div>
                                </div>
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
        <div className="flex flex-col items-center md:items-start lg:flex-row gap-3">
            <div className="p-2 bg-black/5 rounded-none">
                <IconComponent className="w-5 h-5 text-black/80" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-tight leading-tight text-gray-600 max-w-[100px] text-center md:text-left">
                {text}
            </span>
        </div>
    );
};
