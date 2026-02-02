"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

export const ShowcaseGrid = () => {
    const { content } = useContentStore();
    const showcaseItems = content.metalShowcaseItems || [];

    return (
        <DirectEdit tab="showcase">
            <section className="py-24 relative overflow-hidden bg-transparent">
                {/* Industrial Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/site-pattern.jpg')] bg-repeat" style={{ backgroundSize: '400px' }} />

                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-[2px] bg-[#D4AF37]" />
                                <span className="text-sm font-black text-[#D4AF37] tracking-[0.4em] uppercase font-sans">
                                    METAL SHOWCASE
                                </span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-[0.9] mb-4 font-display max-w-4xl"
                            >
                                {content.metalShowcaseTitle.split(' ').map((word, i) => (
                                    <React.Fragment key={i}>
                                        {word}{' '}
                                        {i === 0 && <br />}
                                    </React.Fragment>
                                ))}
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/hizmetler"
                                className="group flex items-center gap-6 px-12 py-6 bg-[#0A0A0A] text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-700 relative overflow-hidden"
                            >
                                <span className="relative z-10">TÜMÜNÜ GÖR</span>
                                <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {(content.productCategories || []).slice(0, 3).map((item, idx) => (
                            <motion.div
                                key={item.id || idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="group"
                            >
                                <Link href={item.ctaLink || `/urunler?category=${item.slug}`} className="block space-y-8">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-2xl border border-black/5">
                                        {/* Subtle Image Vignette */}
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <Image
                                            src={item.coverImage || "/images/placeholder-category.jpg"}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                        />

                                        {/* Industrial Overlay Grid */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                                        {/* Category Tag - More Industrial */}
                                        <div className="absolute top-8 left-8 bg-black text-white px-5 py-2.5 font-sans text-[10px] font-black tracking-[0.2em] uppercase z-20">
                                            {item.slug?.replace(/-/g, ' ')}
                                        </div>

                                        {/* Corner Accents - Sharper */}
                                        <div className="absolute top-0 right-0 w-16 h-16 border-t-[1px] border-r-[1px] border-black/10 group-hover:border-[#D4AF37] z-20 transition-all duration-700 group-hover:w-20 group-hover:h-20" />
                                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[1px] border-l-[1px] border-black/10 group-hover:border-[#D4AF37] z-20 transition-all duration-700 group-hover:w-20 group-hover:h-20" />
                                    </div>

                                    <div className="space-y-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                            <h3 className="text-3xl font-black text-[#0A0A0A] uppercase tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-500 font-display">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm font-medium text-[#0A0A0A]/60 uppercase leading-relaxed tracking-wider font-sans line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="pt-4 flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-[#D4AF37] uppercase font-sans">
                                            <span>{item.ctaLabel || "DETAYLARI İNCELE"}</span>
                                            <div className="flex-1 h-[1px] bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/50 transition-colors duration-700" />
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
