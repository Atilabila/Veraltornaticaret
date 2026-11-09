"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { SERVICE_IMAGES, serviceImageAlt } from "@/lib/service-stock-images";

const ROTATOR = [
    "İzmir dosya teli imalatı",
    "Takvim tenekesi üretimi",
    "Giyotin sac kesim",
    "UV metal poster baskı",
];

const HERO_SLIDES = [
    { src: SERVICE_IMAGES.giyotinCut, caption: "Giyotin sac kesim" },
    { src: SERVICE_IMAGES.dosyaTeli, caption: "Dosya teli imalatı" },
    { src: SERVICE_IMAGES.takvimTeneke, caption: "Takvim tenekesi" },
    { src: SERVICE_IMAGES.takvimTenekeSade, caption: "Takvim tenekesi seri" },
    { src: SERVICE_IMAGES.coilSlit, caption: "Rulo dilimleme" },
    { src: SERVICE_IMAGES.tefZili, caption: "Tef zili üretimi" },
    { src: SERVICE_IMAGES.magnetPoster, caption: "UV metal tabela" },
] as const;

const STATS = [
    { label: "Lokasyon", value: "İzmir Alsancak" },
    { label: "Hizmet", value: "Toptan imalat" },
    { label: "Sipariş", value: "Teklif usulü" },
    { label: "Sevkiyat", value: "Türkiye geneli" },
];

export function AtolyeHero() {
    const reduceMotion = useReducedMotion();
    const [textIndex, setTextIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) return;
        const textId = window.setInterval(() => {
            setTextIndex((current) => (current + 1) % ROTATOR.length);
        }, 2800);
        const slideId = window.setInterval(() => {
            setSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
        }, 4200);
        return () => {
            window.clearInterval(textId);
            window.clearInterval(slideId);
        };
    }, [reduceMotion]);

    const activeSlide = HERO_SLIDES[slideIndex];

    return (
        <section className="atl-grain relative overflow-hidden border-b border-atl-line">
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-atl-brass/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-atl-brass/5 blur-3xl" />
            </div>

            <div className="relative mx-auto grid max-w-[1400px] gap-5 px-4 pb-6 pt-20 sm:gap-8 sm:px-6 sm:pb-8 sm:pt-28 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:pb-14 lg:pt-40">
                <div className="order-2 lg:order-1 lg:col-span-6">
                    <span className="atl-rise inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-atl-brass sm:text-[11px] sm:tracking-[0.32em]">
                        <span className="h-px w-6 bg-atl-brass sm:w-8" aria-hidden />
                        İzmir Alsancak metal imalat
                    </span>
                    <h1 className="atl-rise atl-rise-2 mt-3 font-display text-[2.15rem] leading-[1.05] text-atl-text sm:mt-5 sm:text-5xl xl:text-[4.75rem] xl:leading-[0.98]">
                        İzmir&apos;de toptan{" "}
                        <em className="not-italic text-atl-brass-light">dosya teli</em>{" "}
                        ve teneke imalatı
                    </h1>
                    <p className="atl-rise atl-rise-3 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-atl-muted sm:mt-5 sm:text-lg">
                        Veral Torna & Teneke Ticaret; Alsancak atölyesinde dosya teli, takvim tenekesi, tef zili, giyotin kesim ve UV baskılı metal levha üretimi yapar. Türkiye geneline toptan sevkiyat; ölçü veya numuneyle teklif alın.
                    </p>
                    <div className="atl-rise atl-rise-3 mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-4">
                        <Link href="/teklif-al" className="btn-brass w-full min-h-12 sm:w-auto">
                            İzmir imalat teklifi al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler" className="btn-ghost-metal w-full min-h-12 sm:w-auto">
                            Üretim hatlarını gör
                        </Link>
                    </div>
                    <div className="atl-rise atl-rise-4 mt-5 flex min-h-[2.25rem] flex-wrap items-center gap-x-3 gap-y-1 border-t border-atl-line pt-4 sm:mt-8 sm:pt-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-atl-muted">Aranan hizmet</span>
                        <span aria-hidden className="hidden text-atl-line sm:inline">|</span>
                        {reduceMotion ? (
                            <span className="font-display text-xl text-atl-brass-light sm:text-2xl">{ROTATOR[0]}</span>
                        ) : (
                            <AnimatePresence mode="wait">
                                <m.span
                                    key={ROTATOR[textIndex]}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.28 }}
                                    className="font-display text-xl text-atl-brass-light sm:text-2xl"
                                >
                                    {ROTATOR[textIndex]}
                                </m.span>
                            </AnimatePresence>
                        )}
                    </div>
                </div>

                <figure className="atl-rise atl-rise-2 relative order-1 lg:order-2 lg:col-span-6">
                    <div className="atl-vignette relative aspect-[16/10] overflow-hidden border border-atl-line bg-atl-surface sm:aspect-[4/3]">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={activeSlide.src}
                                initial={reduceMotion ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={reduceMotion ? undefined : { opacity: 0 }}
                                transition={{ duration: 0.55 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeSlide.src}
                                    alt={serviceImageAlt(activeSlide.src, activeSlide.caption)}
                                    fill
                                    priority={slideIndex === 0}
                                    sizes="(min-width: 1024px) 640px, 92vw"
                                    className="object-cover"
                                />
                            </m.div>
                        </AnimatePresence>
                        <span aria-hidden className="absolute left-3 top-3 z-[2] h-5 w-5 border-l border-t border-atl-brass" />
                        <span aria-hidden className="absolute right-3 top-3 z-[2] h-5 w-5 border-r border-t border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 left-3 z-[2] h-5 w-5 border-b border-l border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 right-3 z-[2] h-5 w-5 border-b border-r border-atl-brass" />
                        <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3.5 sm:p-5">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-atl-brass-light">
                                {activeSlide.caption}
                            </p>
                            <div className="mt-2.5 flex gap-1.5" role="tablist" aria-label="Atölye görselleri">
                                {HERO_SLIDES.map((slide, i) => (
                                    <button
                                        key={slide.src}
                                        type="button"
                                        role="tab"
                                        aria-selected={i === slideIndex}
                                        onClick={() => setSlideIndex(i)}
                                        className={`h-1.5 flex-1 transition-colors ${i === slideIndex ? "bg-atl-brass" : "bg-white/25"}`}
                                        aria-label={slide.caption}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </figure>
            </div>

            <div className="atl-band-lift relative border-t border-atl-line">
                <dl className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-atl-line sm:grid-cols-4 sm:divide-y-0">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="px-3.5 py-4 sm:px-6 sm:py-6 lg:px-12">
                            <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-atl-muted sm:text-[10px]">{stat.label}</dt>
                            <dd className="mt-1 font-display text-lg text-atl-text sm:mt-1.5 sm:text-xl md:text-2xl">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
