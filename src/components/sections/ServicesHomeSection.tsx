"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";

export const ServicesHomeSection = () => {
    const { content } = useContentStore();
    const header = content.servicesPageHeader;
    const services = (content.services || [])
        .filter((s) => s.isActive !== false)
        .sort((a, b) => a.order - b.order);

    return (
        <DirectEdit tab="other-services">
            <section
                id="hizmetler"
                className="min-h-[90vh] flex flex-col justify-center py-20 lg:py-28 scroll-mt-24"
            >
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="mb-14 lg:mb-20 max-w-3xl">
                        <p className="text-sm font-mono font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
                            {header?.badge || "Üretim hizmetleri"}
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#161616] leading-[1.05] mb-5">
                            {header?.title || "Üretim Hizmetlerimiz"}
                        </h2>
                        <p className="text-lg md:text-xl text-[#525252] leading-relaxed">
                            {header?.subtitle || "Dosya teli, takvim tenekesi, tef zili ve metal poster — ölçüye göre."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <Link
                                key={service.id}
                                href={`/hizmetler/${service.slug}`}
                                className="group relative flex flex-col min-h-[220px] lg:min-h-[260px] p-8 lg:p-10 bg-white border border-[#c6c6c6] border-l-4 border-l-transparent hover:border-l-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-[border-color] duration-300"
                            >
                                <div className="flex items-start justify-between gap-4 mb-8">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#f4f4f4] text-[var(--color-brand-accent)] group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-colors duration-300">
                                        <DynamicLucideIcon
                                            name={service.icon}
                                            fallbackName="settings"
                                            className="w-8 h-8 lg:w-10 lg:h-10"
                                        />
                                    </div>
                                    <span className="text-xs font-mono font-semibold text-[#a8a8a8] tabular-nums">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3 className="text-2xl lg:text-3xl font-bold text-[#161616] mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-base lg:text-lg text-[#525252] leading-relaxed flex-1">
                                    {service.shortDescription}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-accent)]">
                                    Detaylı incele
                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <p className="mt-12 text-base text-[#525252]">
                        Toptan fiyat için{" "}
                        <Link href="/teklif-al" className="font-semibold text-[var(--color-brand-accent)] hover:underline underline-offset-4">
                            teklif formunu doldurun
                        </Link>
                        .
                    </p>
                </div>
            </section>
        </DirectEdit>
    );
};
