"use client";

import { m } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { Wrench, Tag, Music, ArrowUpRight } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { normalizeImagePath } from "@/lib/utils";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

const icons = [
    <Wrench key="wrench" className="w-8 h-8" />,
    <Tag key="tag" className="w-8 h-8" />,
    <Music key="music" className="w-8 h-8" />
];

export const OtherServices = () => {
    const { content } = useContentStore();

    return (
        <DirectEdit tab="other-services">
            <section id="other-services" className="py-12 lg:py-20 xl:py-24 bg-transparent border-b-8 border-white/5">
                <div className="container-brutal">
                    {/* SYSTEM_HEADER */}
                    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-1 font-mono text-base font-black mb-6">
                                [ BİRİM: İMALAT GENİŞLEME ]
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-[Archivo Black] leading-none uppercase text-white">
                                {content.servicesTitle.split(" ").slice(0, 1)}<br />
                                <span className="text-[var(--color-brand-safety-orange)]">{content.servicesTitle.split(" ").slice(1).join(" ")}</span>
                            </h2>
                        </div>
                        <p className="font-mono text-lg font-bold max-w-sm border-l-8 border-zinc-700 pl-6 text-zinc-400">
                            {content.servicesSubtitle}
                        </p>
                    </div>

                    {/* PRODUCTION_GRID */}
                    <div className="grid md:grid-cols-3 gap-0 border-8 border-zinc-800 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                        {content.serviceItems.map((service, index) => (
                            <Link
                                key={index}
                                href={service.exploreUrl || "/metal-urunler"}
                                className="flex flex-col border-b-8 md:border-b-0 md:border-r-8 last:border-b-0 md:last:border-r-0 border-zinc-800 bg-zinc-900/50 group hover:bg-zinc-800 transition-none"
                            >
                                {/* VISUAL_ARRAY */}
                                <div className="relative aspect-square overflow-hidden border-b-8 border-zinc-800 bg-zinc-900">
                                    <Image
                                        src={normalizeImagePath(service.image)}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-none group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 grid-terminal opacity-30" />

                                    {/* Icon Module */}
                                    <div className="absolute top-0 right-0 bg-zinc-800 text-white p-4">
                                        {icons[index % icons.length]}
                                    </div>
                                </div>

                                {/* DATA_FIELDS */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-base font-black font-mono text-zinc-500 mb-2">MODÜL ID: 0x0{index + 1}</div>
                                    <h3 className="text-2xl font-[Archivo Black] mb-4 uppercase leading-tight text-white group-hover:text-[var(--color-brand-safety-orange)]">{service.title}</h3>
                                    <p className="font-mono text-lg font-bold text-zinc-400 mb-8 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* FEATURE_CHIPS */}
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {service.features.map((feature, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-zinc-800 text-zinc-300 text-base font-mono font-black"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>                            </Link>
                        ))}
                    </div>

                    {/* EXPLORE_BUTTON (Admin Configurable) */}
                    {content.servicesExploreText && (
                        <div className="flex justify-center mt-16">
                            <Link
                                href="/metal-urunler"
                                className="group relative inline-flex items-center gap-6 px-16 py-8 bg-[#D4AF37] text-black font-[Archivo Black] text-3xl uppercase transition-all shadow-[6px_6px_0px_0px_rgba(216,178,76,0.6)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
                            >
                                {content.servicesExploreText}
                                <ArrowUpRight className="w-10 h-10 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    )}

                    {/* MOD_CTA */}
                    <div className="mt-16 bg-zinc-900/50 border-4 border-zinc-800 p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                        <div className="font-mono font-black text-lg mb-4 md:mb-0 uppercase tracking-tighter text-white">
                            ÖZEL İMALAT TALEBİ BAŞLATMA
                        </div>
                        <a
                            href={`https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(content.whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-mechanical bg-[#D4AF37] text-black flex items-center gap-4 hover:bg-[#c2a03e]"
                        >
                            İLETİŞİME GEÇ <ArrowUpRight className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
