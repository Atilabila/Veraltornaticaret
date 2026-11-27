"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Wordmark } from "@/components/brand/Wordmark";

const POINTS = [
    "Ölçüyü paylaşırsanız fiyatı birlikte bakarız",
    "Atölye Alsancak'ta",
    "Telefon: 0507 165 13 15",
];

export function ProductionModelBand() {
    return (
        <section className="border-b border-atl-line bg-atl-bg">
            <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
                <Reveal className="flex items-center bg-atl-surface px-8 py-16" y={0}>
                    <Wordmark className="h-24 w-auto text-atl-text" />
                </Reveal>
                <Reveal delay={0.1} className="atl-workshop-lit-subtle flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-16 lg:py-16">
                    <span className="text-xs font-semibold uppercase tracking-normal text-atl-brass">Atölye</span>
                    <h2 className="mt-2 font-display text-[1.85rem] leading-tight text-atl-text sm:mt-3 sm:text-4xl md:text-5xl">
                        Fiyat için yazabilirsiniz
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-atl-muted sm:mt-5 sm:text-base">
                        Torna, yedek parça ve teneke ürünleri yapıyoruz.
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
                            Metal poster
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
