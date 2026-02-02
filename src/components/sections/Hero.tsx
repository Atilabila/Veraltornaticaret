"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Ruler, Factory, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/store/useContentStore";
import * as LucideIcons from "lucide-react";

export const Hero = () => {
    const { content } = useContentStore();

    return (
        <section className="relative min-h-[90vh] flex items-center bg-[#FAFBFF] overflow-hidden">
            {/* Background Texture - Industrial Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Typography & CTAs */}
                    <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3"
                        >
                            <span className="h-[2px] w-8 bg-black/80" />
                            <span className="text-sm font-bold tracking-[0.2em] uppercase text-black/70">
                                {content.heroSubtitle || "Yerli üretim metal tablolar, teneke ürünler ve özel baskı çözümleri"}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-black"
                        >
                            <span dangerouslySetInnerHTML={{ __html: content.heroTitle?.replace(/\n/g, '<br/>') || "METAL TABLO &<br/>TENEKELERDE<br/>YENİ NESİL<br/>DEKOR VE ÜRETİM" }} />
                        </motion.h1>

                        {/* Supporting Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="border-l-4 border-black pl-6 py-2"
                        >
                            <p className="font-mono text-sm md:text-base font-medium text-black/70 uppercase tracking-widest leading-relaxed">
                                {content.heroTagline || "0.30MM ENDÜSTRİYEL METAL PLAKALAR · UV DİJİTAL KALİBRASYON · SIFIR YUVARLAK KÖŞE"}
                            </p>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="h-16 px-8 text-base font-black tracking-widest uppercase rounded-none bg-black hover:bg-gray-800 transition-all duration-300"
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
                                className="h-16 px-8 text-base font-black tracking-widest uppercase rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/80 focus-visible:ring-offset-2 disabled:opacity-100 disabled:bg-white disabled:text-black disabled:border-black/40 transition-all duration-300"
                            >
                                <Link href={content.heroButton2Url || "/urunler"}>
                                    {content.heroButton2Text || "KATALOG"}
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-black/10"
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
                        className="lg:col-span-5 relative block mt-10 lg:mt-0"
                    >
                        <div className="relative aspect-[3/4] bg-gray-100 max-w-[420px] mx-auto lg:max-w-none">
                            {/* Main Visual */}
                            <Image
                                src={content.heroImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1587&auto=format&fit=crop"}
                                alt="Industrial Metal Production"
                                fill
                                className="object-cover grayscale-0 transition-[filter] duration-200 [@media(hover:hover)_and_(pointer:fine)]:grayscale [@media(hover:hover)_and_(pointer:fine)]:hover:grayscale-0"
                                priority
                            />

                            {/* Technical Overlay */}
                            <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none" />

                            {/* Floating Card */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-[240px] border-l-4 border-black">
                                <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Technical Specs</div>
                                <div className="text-3xl font-black text-black">0.30<span className="text-sm align-top">mm</span></div>
                                <div className="text-sm font-bold text-gray-800 mt-1">Industrial Grade Steel</div>
                            </div>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-black/5" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


const TrustItem = ({ iconName, text }: { iconName: string, text: string }) => {
    // Dynamically retrieve the icon component, default to ShieldCheck if not found
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.ShieldCheck;

    return (
        <div className="flex flex-col items-center sm:items-start md:flex-row gap-3">
            <div className="p-2 bg-black/5 rounded-none">
                <IconComponent className="w-5 h-5 text-black/80" />
            </div>
            <span className="text-xs font-bold uppercase tracking-tight leading-tight text-gray-600 max-w-[100px] text-center sm:text-left">
                {text}
            </span>
        </div>
    );
};
