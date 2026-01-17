"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wrench, Tag, Music, ArrowUpRight } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";

const icons = [
    <Wrench key="wrench" className="w-8 h-8" />,
    <Tag key="tag" className="w-8 h-8" />,
    <Music key="music" className="w-8 h-8" />
];

export const OtherServices = () => {
    const { content } = useContentStore();

    return (
        <section id="other-services" className="py-24 bg-white border-b-8 border-black">
            <div className="container-brutal">
                {/* SYSTEM_HEADER */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 font-mono text-base font-black mb-6">
                            [ BİRİM: İMALAT GENİŞLEME ]
                        </div>
                        <h2 className="text-6xl md:text-8xl font-[Archivo Black] leading-none uppercase">
                            {content.servicesTitle.split(" ").slice(0, 1)}<br />
                            <span className="text-[var(--color-brand-safety-orange)]">{content.servicesTitle.split(" ").slice(1).join(" ")}</span>
                        </h2>
                    </div>
                    <p className="font-mono text-lg font-bold max-w-sm border-l-8 border-black pl-6">
                        {content.servicesSubtitle}
                    </p>
                </div>

                {/* PRODUCTION_GRID */}
                <div className="grid md:grid-cols-3 gap-0 border-8 border-black shadow-brutal">
                    {content.serviceItems.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col border-b-8 md:border-b-0 md:border-r-8 last:border-b-0 md:last:border-r-0 border-black bg-white group hover:bg-[#E5E7EB] transition-none"
                        >
                            {/* VISUAL_ARRAY */}
                            <div className="relative aspect-square overflow-hidden border-b-8 border-black bg-black">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-none"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 grid-terminal opacity-30" />

                                {/* Icon Module */}
                                <div className="absolute top-0 right-0 bg-black text-white p-4">
                                    {icons[index % icons.length]}
                                </div>
                            </div>

                            {/* DATA_FIELDS */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="text-base font-black font-mono text-black/40 mb-2">MODÜL ID: 0x0{index + 1}</div>
                                <h3 className="text-2xl font-[Archivo Black] mb-4 uppercase leading-tight group-hover:text-[var(--color-brand-safety-orange)]">{service.title}</h3>
                                <p className="font-mono text-lg font-bold text-black/60 mb-8 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* FEATURE_CHIPS */}
                                <div className="mt-auto flex flex-wrap gap-2">
                                    {service.features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-black text-white text-base font-mono font-black"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MOD_CTA */}
                <div className="mt-16 bg-[#FFD700] border-4 border-black p-8 flex flex-col md:flex-row items-center justify-between shadow-brutal">
                    <div className="font-mono font-black text-lg mb-4 md:mb-0 uppercase tracking-tighter">
                        ÖZEL İMALAT TALEBİ BAŞLATMA
                    </div>
                    <a
                        href={`https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(content.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-mechanical bg-black text-white flex items-center gap-4 hover:bg-[var(--color-brand-safety-orange)]"
                    >
                        İLETİŞİME GEÇ <ArrowUpRight className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </section>
    );
};
