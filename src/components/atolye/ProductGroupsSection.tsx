"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";

const GROUPS = [
    {
        title: "Dosya Teli İmalatı",
        href: "/hizmetler/dosya-teli",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        badge: "İzmir Alsancak",
        description: "Toptan dosya teli üretimi; kırtasiye, arşiv ve dosya üreticilerine İzmir merkezli sevkiyat.",
    },
    {
        title: "Takvim Tenekesi",
        href: "/hizmetler/takvim-tenekesi",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        badge: "Matbaa & yayınevi",
        description: "Askılı ve askısız takvim tenekesi imalatı; matbaa ve takvim üreticileri için seri üretim.",
    },
    {
        title: "Sac Kesim & Dilimleme",
        href: "/hizmetler",
        image: "/images/services/giyotin-kesim.webp",
        badge: "Fason kesim",
        description: "Giyotin sac kesim ve rulo dilimleme ile ölçüye özel levha ve şerit üretimi.",
    },
    {
        title: "UV Metal Baskı",
        href: "/hizmetler/miknatisli-magnet",
        image: "/images/services/metal-tabelalar.webp",
        badge: "Tabela & poster",
        description: "Mıknatıslı metal poster ve kurumsal tabela için UV baskılı metal levha imalatı.",
    },
];

export function ProductGroupsSection() {
    return (
        <section id="urun-gruplari" className="atl-workshop-lit scroll-mt-20 border-b border-atl-line py-10 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                <Reveal>
                    <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-10 sm:gap-5 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="İzmir metal üretim hatları"
                            title="Dosya teli, takvim tenekesi ve metal imalat çözümleri"
                            description="Alsancak atölyemizde toptan dosya teli imalatından UV metal baskıya kadar İzmir merkezli üretim hizmetleri."
                        />
                        <Link href="/hizmetler" className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light transition-colors hover:text-atl-text md:self-auto">
                            Tüm üretim hatları <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {GROUPS.map((group, i) => (
                        <Reveal key={group.href + group.title} as="article" delay={0.07 * i} className="h-full">
                            <div className="group flex h-full min-w-0 flex-col border border-atl-line bg-[#1a1815]/90 transition-colors duration-300 hover:border-atl-brass/70">
                                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                                    <Image
                                        src={group.image}
                                        alt={serviceImageAlt(group.image, group.title)}
                                        fill
                                        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw"
                                        className={`${serviceImageFit(group.image)} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                                        priority={i < 2}
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                                    <span className="absolute left-4 top-4 border border-atl-brass/50 bg-atl-bg/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-atl-brass-light backdrop-blur-sm">
                                        {group.badge}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <h3 className="font-display text-xl leading-tight text-atl-text sm:text-2xl">{group.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-atl-muted">{group.description}</p>
                                    <div className="mt-auto pt-6">
                                        <Link
                                            href={group.href}
                                            className="flex h-11 w-full items-center justify-between border border-atl-line px-4 text-xs font-semibold uppercase tracking-[0.12em] text-atl-text transition-colors group-hover:border-atl-brass group-hover:bg-atl-brass group-hover:text-atl-bg"
                                        >
                                            <span>Hizmeti incele</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
