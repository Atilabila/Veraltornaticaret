"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContentStore } from "@/store/useContentStore";

export const Hero = () => {
    const { content } = useContentStore();

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 border-b-8 border-black overflow-hidden bg-transparent">
            {/* GRID_PATTERN_BACKGROUND */}
            <div className="absolute inset-0 grid-terminal opacity-30" />

            <div className="container-brutal grid lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Left: Terminal Input */}
                <div className="lg:col-span-7 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block bg-black text-white px-6 py-2 font-mono text-lg font-bold tracking-tighter"
                    >
                        {content.heroTagline}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-[Archivo Black] leading-[0.9] md:leading-[0.85] tracking-tighter uppercase"
                    >
                        {content.heroTitle}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl md:text-2xl font-mono font-bold max-w-2xl border-l-8 border-black pl-8"
                    >
                        {content.heroSubtitle}
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-0 border-4 border-black shadow-brutal max-w-fit overflow-hidden">
                        <Link href="/urunler" className="btn-mechanical !border-0 bg-[var(--color-brand-safety-orange)] text-white border-b-4 sm:border-b-0 sm:border-r-4 !border-black hover:bg-black hover:text-[var(--color-brand-safety-orange)] text-lg sm:text-xl px-10 sm:px-14 py-5 sm:py-6 font-black">
                            ÜRÜNLERİ GÖR <ArrowRight className="ml-4 w-6 h-6 sm:w-7 sm:h-7" />
                        </Link>
                        <Link href="#production" className="btn-mechanical !border-0 !shadow-none bg-white text-black hover:bg-[#E5E7EB] text-lg sm:text-xl px-10 sm:px-14 py-5 sm:py-6 font-black">
                            {content.heroButton2Text}
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-12">
                        <StatusPill label="MALZEME" value="AL 1.5mm" />
                        <StatusPill label="BASKI" value="UV DİJİTAL" />
                        <StatusPill label="DAYANIKLILIK" value="ARŞİVSEL" />
                    </div>
                </div>

                {/* Right: Technical Blueprint */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-5 relative"
                >
                    <div className="border-industrial p-4 bg-white shadow-brutal-orange relative">
                        <div className="absolute -top-4 -left-4 bg-black text-white px-2 py-1 text-base font-mono font-bold z-20">
                            TASLAK v4.5
                        </div>
                        <div className="relative aspect-[2/3] bg-black border-4 border-black group">
                            <Image
                                src={content.heroImage || "/hero-mockup.png"}
                                alt="Industrial Metal Poster"
                                fill
                                priority
                                className="object-cover transition-none"
                                sizes="(max-width: 768px) 100vw, 500px"
                            />
                            {/* Overlay Scanlines */}
                            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20" />

                            <div className="absolute bottom-4 left-4 right-4 bg-white border-2 border-black p-4 font-mono">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-base font-black text-black/50">BAŞLANGIÇ FİYATI</span>
                                    <span className="text-lg font-black text-[var(--color-brand-safety-orange)]">● KALİBRE EDİLDİ</span>
                                </div>
                                <div className="text-4xl font-[Archivo Black]">{content.heroPrice}</div>
                            </div>
                        </div>

                        {/* Technical Markings */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 border-b-8 border-r-8 border-black" />
                        <div className="absolute -top-8 -left-8 w-24 h-24 border-t-8 border-l-8 border-black" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const StatusPill = ({ label, value }: { label: string, value: string }) => (
    <div className="border-2 border-black p-4 bg-[#E5E7EB] font-mono hover:bg-[#FFD700] transition-none group text-left">
        <div className="text-base font-black text-black/40">{label}</div>
        <div className="text-xl font-black">{value}</div>
    </div>
);
