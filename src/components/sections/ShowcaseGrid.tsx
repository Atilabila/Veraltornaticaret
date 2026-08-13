"use client";

import React from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { TextInspector } from "@/components/admin/TextInspector";
import { usePerformanceDetection } from '@/hooks/usePerformanceDetection';

export const ShowcaseGrid = () => {
    const { content } = useContentStore();
    const { shouldReduceVisuals } = usePerformanceDetection();
    const showcaseItems = content.metalShowcaseItems || [];

    return (
        <DirectEdit tab="showcase">
            <section id="features" className="py-12 lg:py-20 xl:py-24 overflow-hidden relative">
                {/* Industrial Background Pattern - Optimized */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                    <Image
                        src={content.metalShowcaseHeroImage || '/images/site-pattern.jpg'}
                        alt="Background Pattern"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        quality={60}
                        priority={false}
                    />
                </div>

                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
                    <div className="flex flex-col gap-6 mb-16 max-w-3xl">
                            <m.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-[2px] bg-[var(--color-brand-accent)]" />
                                <TextInspector label="Section Label">
                                    <span className="text-sm font-bold text-[var(--color-brand-accent)] tracking-[0.25em] uppercase font-mono">
                                        ÜRETİM HATLARI
                                    </span>
                                </TextInspector>
                            </m.div>
                            <m.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black text-[#161616] uppercase tracking-tighter leading-[0.95] mb-4 max-w-4xl"
                            >
                                <TextInspector label="Section Title">
                                    <span>
                                        {content.metalShowcaseTitle.split(' ').map((word, i) => (
                                            <React.Fragment key={i}>
                                                {word}{' '}
                                                {i === 0 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </TextInspector>
                            </m.h2>
                            <p className="text-[#525252] text-base leading-relaxed max-w-xl">
                                {content.metalShowcaseSubtitle}
                            </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {(content.productCategories || []).slice(0, 3).map((item, idx) => (
                            <m.div
                                key={item.id || idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="group"
                            >
                                <Link
                                    href={(item.slug === "ozel-uretim" || item.slug === "ozel") ? "/teklif-al" : (item.ctaLink || `/urunler?category=${item.slug}`)}
                                    className="block space-y-8"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f4] border border-[#c6c6c6] group-hover:border-[var(--color-brand-accent)] transition-colors">
                                        {/* Subtle Image Vignette */}
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <Image
                                            src={item.coverImage || "/images/placeholder-category.jpg"}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            quality={40}
                                            loading="lazy"
                                            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                        />

                                        {/* Industrial Overlay Grid */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                                        {/* Category Tag - More Industrial */}
                                        <div className="absolute top-4 left-4 bg-white border border-[#c6c6c6] text-[#525252] px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider uppercase z-20">
                                            {item.slug?.replace(/-/g, ' ')}
                                        </div>

                                        {/* Corner Accents - Sharper */}
                                        <div className="absolute top-0 right-0 w-16 h-16 border-t-[1px] border-r-[1px] border-white/20 group-hover:border-[var(--color-brand-accent)] z-20 transition-all duration-700 group-hover:w-20 group-hover:h-20" />
                                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[1px] border-l-[1px] border-white/20 group-hover:border-[var(--color-brand-accent)] z-20 transition-all duration-700 group-hover:w-20 group-hover:h-20" />
                                    </div>

                                    <div className="space-y-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-[var(--color-brand-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                            <h3 className="text-2xl font-black text-[#161616] uppercase tracking-tighter group-hover:text-[var(--color-brand-accent)] transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-[#525252] leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit >
    );
};
