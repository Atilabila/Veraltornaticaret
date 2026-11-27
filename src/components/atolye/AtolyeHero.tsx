"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { SERVICE_IMAGES, serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";
import { ImageLightbox } from "@/components/media/ImageLightbox";

const HERO_SLIDES = [
    { src: SERVICE_IMAGES.dosyaTeli, caption: "Dosya teli" },
    { src: SERVICE_IMAGES.takvimTeneke, caption: "Takvim tenekesi" },
    { src: SERVICE_IMAGES.coilSlit, caption: "Rulo dilme" },
    { src: SERVICE_IMAGES.tefZili, caption: "Tef zili" },
] as const;

const STATS = [
    { label: "Yer", value: "İzmir Alsancak" },
    { label: "Kuruluş", value: "1986" },
    { label: "İş", value: "Torna ve teneke" },
    { label: "Telefon", value: "0507 165 13 15" },
];

export function AtolyeHero() {
    const reduceMotion = useReducedMotion();
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) return;
        const slideId = window.setInterval(() => {
            setSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
        }, 4200);
        return () => {
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
                    <span className="atl-rise inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-brass">
                        <span className="h-px w-6 bg-atl-brass sm:w-8" aria-hidden />
                        Alsancak, 1986
                    </span>
                    <h1 className="atl-rise atl-rise-2 mt-3 font-display text-4xl text-atl-text sm:mt-5 sm:text-5xl xl:text-6xl">
                        Torna, yedek parça ve teneke
                    </h1>
                    <p className="atl-rise atl-rise-3 mt-4 max-w-xl text-base leading-relaxed text-atl-muted sm:mt-5 sm:text-lg">
                        Veral Torna ve Teneke Ticaret, 1986&apos;dan beri Alsancak&apos;ta çalışır. Torna, yedek parça ve teneke ürünleri yapıyoruz. Dosya teli, takvim tenekesi, tef zili, sac kesim ve metal poster de yapıyoruz.
                    </p>
                    <div className="atl-rise atl-rise-3 mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-4">
                        <Link href="/teklif-al" className="btn-brass w-full min-h-12 sm:w-auto">
                            Fiyat isteği <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler" className="btn-ghost-metal w-full min-h-12 sm:w-auto">
                            Ne yapıyoruz
                        </Link>
                    </div>

                </div>

                <figure className="atl-rise atl-rise-2 relative order-1 lg:order-2 lg:col-span-6">
                    <div className="atl-vignette relative aspect-[16/10] overflow-hidden border border-atl-line bg-atl-surface sm:aspect-[4/3]">
                        <ImageLightbox
                            src={activeSlide.src}
                            alt={serviceImageAlt(activeSlide.src, activeSlide.caption)}
                            className="absolute inset-0 z-0 h-full"
                        >
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
                                        className={serviceImageFit(activeSlide.src)}
                                    />
                                </m.div>
                            </AnimatePresence>
                        </ImageLightbox>
                        <span aria-hidden className="pointer-events-none absolute left-3 top-3 z-[2] h-5 w-5 border-l border-t border-atl-brass" />
                        <span aria-hidden className="pointer-events-none absolute right-3 top-3 z-[2] h-5 w-5 border-r border-t border-atl-brass" />
                        <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 z-[2] h-5 w-5 border-b border-l border-atl-brass" />
                        <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 z-[2] h-5 w-5 border-b border-r border-atl-brass" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3.5 sm:p-5">
                            <p className="font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-brass-light">
                                {activeSlide.caption}
                            </p>
                            <div className="pointer-events-auto mt-1 flex gap-1" role="tablist" aria-label="Atölye görselleri">
                                {HERO_SLIDES.map((slide, i) => (
                                    <button
                                        key={slide.src}
                                        type="button"
                                        role="tab"
                                        aria-selected={i === slideIndex}
                                        onClick={() => setSlideIndex(i)}
                                        className="flex min-h-11 min-w-11 flex-1 items-center"
                                        aria-label={slide.caption}
                                    >
                                        <span className={`block h-1.5 w-full ${i === slideIndex ? "bg-atl-brass" : "bg-white/25"}`} />
                                    </button>
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
                            <dt className="font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-muted">{stat.label}</dt>
                            <dd className="mt-1 font-display text-lg text-atl-text sm:mt-1.5 sm:text-xl md:text-2xl">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
