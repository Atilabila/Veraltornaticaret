"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { serviceImageAlt } from "@/lib/service-stock-images";

const POINTS = [
    "Özel ölçü ve forma uygun üretim",
    "Seri üretime uygun pres ve giyotin altyapısı",
    "Kalite kontrol odaklı süreç yönetimi",
    "Hızlı geri dönüş ve teklif usulü planlama",
];

const IMAGE = "/images/services/metal-tabelalar.webp";

export function ProductionModelBand() {
    return (
        <section className="border-b border-atl-line bg-atl-bg">
            <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
                <Reveal className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]" y={0}>
                    <Image
                        src={IMAGE}
                        alt={serviceImageAlt(IMAGE, "UV baskılı metal tabelalar")}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </Reveal>
                <Reveal delay={0.1} className="atl-workshop-lit-subtle flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-16 lg:py-16">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-atl-brass sm:text-[11px] sm:tracking-[0.28em]">Üretim modeli</span>
                    <h2 className="mt-2 font-display text-[1.85rem] leading-tight text-atl-text sm:mt-3 sm:text-4xl md:text-5xl">
                        Projenize uygun üretim modeli oluşturuyoruz
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-atl-muted sm:mt-5 sm:text-base">
                        Butik numuneden yüksek adetli seri üretime kadar ihtiyaca göre planlıyoruz. UV metal baskı ve mıknatıslı poster işleri de aynı teklif sürecine dahil.
                    </p>
                    <ul className="mt-5 space-y-2.5 sm:mt-8 sm:space-y-3">
                        {POINTS.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-sm text-atl-text">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-atl-brass" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                        <Link
                            href="/teklif-al"
                            className="inline-flex min-h-12 items-center justify-center gap-2 bg-atl-brass px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light"
                        >
                            Hemen teklif al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/hizmetler/miknatisli-magnet"
                            className="inline-flex min-h-12 items-center justify-center border border-atl-line px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass"
                        >
                            UV metal baskı
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
