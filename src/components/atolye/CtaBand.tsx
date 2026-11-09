"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrassRule } from "@/components/atolye/BrassRule";
import { Reveal } from "@/components/motion/Reveal";

type CtaBandProps = { title?: string; description?: string };

export function CtaBand({
    title = "Projeniz için teklif alın",
    description = "Teknik çizim, numune veya ölçü bilgisini gönderin; malzeme, adet ve termin bilgisiyle dönüş yapalım.",
}: CtaBandProps) {
    return (
        <section className="atl-workshop-lit-warm border-b border-atl-line py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                <Reveal>
                    <BrassRule className="mb-7 sm:mb-10" />
                    <div className="flex flex-col gap-5 sm:gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <h2 className="font-display text-[1.85rem] leading-tight text-atl-text sm:text-4xl md:text-5xl">{title}</h2>
                            <p className="mt-2.5 text-sm leading-relaxed text-atl-muted sm:mt-4 sm:text-base md:text-lg">{description}</p>
                        </div>
                        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                            <Link href="/teklif-al" className="inline-flex min-h-12 items-center justify-center gap-2 bg-atl-brass px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light sm:h-14 sm:px-8">
                                Teklif formu <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="/iletisim" className="inline-flex min-h-12 items-center justify-center border border-atl-line px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass sm:h-14 sm:px-8">
                                İletişim
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
