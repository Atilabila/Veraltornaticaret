"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { resolveServiceStockImage } from "@/lib/service-stock-images";
import { normalizeImagePath } from "@/lib/utils";

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
                        {services.map((service, index) => {
                            const imageSrc = normalizeImagePath(
                                resolveServiceStockImage(service)
                            );

                            return (
                                <Link
                                    key={service.id}
                                    href={`/hizmetler/${service.slug}`}
                                    className="group relative flex flex-col bg-white border border-[#c6c6c6] border-l-4 border-l-transparent hover:border-l-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-[border-color] duration-300 overflow-hidden"
                                >
                                    <div className="relative w-full aspect-[16/9] bg-[#f4f4f4] border-b border-[#c6c6c6]">
                                        <Image
                                            src={imageSrc}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            sizes="(min-width:1024px) 560px, 94vw"
                                        />
                                        <span className="absolute top-3 right-3 text-xs font-mono font-semibold text-white tabular-nums bg-black/55 px-2 py-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <div className="flex flex-col flex-1 p-8 lg:p-10">
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
                                    </div>
                                </Link>
                            );
                        })}
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
