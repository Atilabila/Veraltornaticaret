"use client";

import Image from "next/image";
import Link from "next/link";
import { Wrench, Tag, Music } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { normalizeImagePath } from "@/lib/utils";
import { DirectEdit } from "@/components/admin/DirectEdit";

const icons = [
    <Wrench key="wrench" className="w-6 h-6" />,
    <Tag key="tag" className="w-6 h-6" />,
    <Music key="music" className="w-6 h-6" />
];

export const OtherServices = () => {
    const { content } = useContentStore();

    return (
        <DirectEdit tab="other-services">
            <section id="other-services" className="py-12 lg:py-20 xl:py-24">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-[var(--color-brand-accent)] text-white px-4 py-1 font-mono text-xs font-bold mb-4 uppercase tracking-widest">
                                1. Hat · Seri İmalat
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase text-[#161616]">
                                {content.servicesTitle}
                            </h2>
                        </div>
                        <p className="font-mono text-sm font-medium max-w-md border-l-4 border-[var(--color-brand-accent)] pl-5 text-[#525252] leading-relaxed">
                            {content.servicesSubtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {content.serviceItems.map((service, index) => (
                            <Link
                                key={index}
                                href={service.exploreUrl || "/hizmetler"}
                                className="flex flex-col border border-[#c6c6c6] bg-white group hover:border-[var(--color-brand-accent)] transition-colors"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden border-b border-[#c6c6c6] bg-[#f4f4f4]">
                                    <Image
                                        src={normalizeImagePath(service.image)}
                                        alt={service.title}
                                        fill
                                        quality={55}
                                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute top-0 right-0 bg-white border-l border-b border-[#c6c6c6] text-[var(--color-brand-accent)] p-3">
                                        {icons[index % icons.length]}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-[10px] font-mono font-bold text-[#525252] mb-2 uppercase tracking-widest">
                                        Modül {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <h3 className="text-xl font-black mb-3 uppercase leading-tight text-[#161616] group-hover:text-[var(--color-brand-accent)] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-[#525252] mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {service.features.map((feature, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-[#f4f4f4] border border-[#c6c6c6] text-[#161616] text-[10px] font-mono font-bold uppercase"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
