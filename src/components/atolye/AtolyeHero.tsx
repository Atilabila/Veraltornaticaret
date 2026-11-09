"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

const FACTS = ["ETP teneke · DIN EN 10202", "0.15 – 3.00 mm sac", "Toptan / seri üretim"];

const ROTATOR = ["Dosya Teli", "Takvim Tenekesi", "Tef Zili", "UV Metal Baskı"];

const STATS = [
    { label: "Üretim", value: "İzmir Alsancak" },
    { label: "Model", value: "Toptan / seri" },
    { label: "Süreç", value: "Teklif usulü" },
    { label: "Sevkiyat", value: "Türkiye geneli" },
];

export function AtolyeHero() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) return;
        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % ROTATOR.length);
        }, 2800);
        return () => window.clearInterval(id);
    }, [reduceMotion]);

    return (
        <section className="atl-grain relative overflow-hidden border-b border-atl-line">
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-atl-brass/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-atl-brass/5 blur-3xl" />
            </div>

            <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 pb-10 pt-32 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:pb-14 lg:pt-40">
                <div className="lg:col-span-6">
                    <span className="atl-rise inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-atl-brass">
                        <span className="h-px w-8 bg-atl-brass" aria-hidden />
                        İzmir · Alsancak atölyesi
                    </span>
                    <h1 className="atl-rise atl-rise-2 mt-6 font-display text-5xl leading-[0.98] text-atl-text sm:text-6xl xl:text-[4.75rem]">
                        İzmir Alsancak&apos;ta{" "}
                        <em className="not-italic text-atl-brass-light">teneke ve tel</em>{" "}
                        imalatı
                    </h1>
                    <p className="atl-rise atl-rise-3 mt-6 max-w-xl text-lg leading-relaxed text-atl-muted">
                        Dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve rulo dilimleme. Toptan ve seri üretim; teknik çizim veya numuneyle teklif.
                    </p>
                    <div className="atl-rise atl-rise-3 mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link href="/teklif-al" className="btn-brass">
                            Teklif al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler" className="btn-ghost-metal">
                            Üretim hatları
                        </Link>
                    </div>
                    <div className="atl-rise atl-rise-4 mt-10 flex min-h-[2.75rem] items-center gap-3 border-t border-atl-line pt-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-atl-muted">Üretim hattı</span>
                        <span aria-hidden className="text-atl-line">|</span>
                        {reduceMotion ? (
                            <span className="font-display text-2xl text-atl-brass-light">{ROTATOR.join(" · ")}</span>
                        ) : (
                            <AnimatePresence mode="wait">
                                <m.span
                                    key={ROTATOR[index]}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.28 }}
                                    className="font-display text-2xl text-atl-brass-light"
                                >
                                    {ROTATOR[index]}
                                </m.span>
                            </AnimatePresence>
                        )}
                    </div>
                    <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-atl-muted">
                        {FACTS.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                </div>

                <figure className="atl-rise atl-rise-2 relative lg:col-span-6">
                    <div className="atl-vignette relative aspect-[4/3] overflow-hidden border border-atl-line bg-atl-surface">
                        <Image
                            src="/images/services/giyotin-kesim.webp"
                            alt="Giyotin sac kesim hattı"
                            fill
                            priority
                            sizes="(min-width: 1024px) 640px, 92vw"
                            className="object-cover"
                        />
                        <span aria-hidden className="absolute left-3 top-3 z-[2] h-5 w-5 border-l border-t border-atl-brass" />
                        <span aria-hidden className="absolute right-3 top-3 z-[2] h-5 w-5 border-r border-t border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 left-3 z-[2] h-5 w-5 border-b border-l border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 right-3 z-[2] h-5 w-5 border-b border-r border-atl-brass" />
                        <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-atl-brass-light">Atölye · Giyotin sac kesim</p>
                        </div>
                    </div>
                </figure>
            </div>

            <div className="relative border-t border-atl-line bg-atl-surface">
                <dl className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-atl-line sm:grid-cols-4 sm:divide-y-0">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="px-6 py-7 lg:px-12">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-atl-muted">{stat.label}</dt>
                            <dd className="mt-2 font-display text-xl text-atl-text md:text-2xl">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
