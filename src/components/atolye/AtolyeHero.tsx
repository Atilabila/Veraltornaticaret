import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FACTS = ["ETP teneke · DIN EN 10202", "0.15 – 3.00 mm sac", "Toptan / seri üretim"];

export function AtolyeHero() {
    return (
        <section className="atl-grain relative overflow-hidden border-b border-atl-line bg-atl-bg">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pb-20 pt-32 lg:grid-cols-12 lg:items-center lg:px-12 lg:pb-28 lg:pt-40">
                <div className="lg:col-span-6">
                    <span className="atl-rise font-mono text-[11px] uppercase tracking-[0.3em] text-atl-brass">İzmir · Alsancak atölyesi</span>
                    <h1 className="atl-rise atl-rise-2 mt-5 font-display text-5xl leading-[1.02] text-atl-text sm:text-6xl xl:text-7xl">
                        İzmir Alsancak&apos;ta <span className="text-atl-brass-light">teneke ve tel</span> imalatı
                    </h1>
                    <p className="atl-rise atl-rise-3 mt-6 max-w-xl text-lg leading-relaxed text-atl-muted">
                        Dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve rulo dilimleme. Toptan ve seri üretim; teknik çizim veya numuneyle teklif.
                    </p>
                    <div className="atl-rise atl-rise-3 mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link href="/teklif-al" className="inline-flex h-14 items-center justify-center gap-2 bg-atl-brass px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light">
                            Teklif al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler" className="inline-flex h-14 items-center justify-center border border-atl-line px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass">
                            Üretim hatları
                        </Link>
                    </div>
                    <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-atl-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-atl-muted">
                        {FACTS.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                </div>
                <figure className="atl-rise atl-rise-2 relative lg:col-span-6">
                    <div className="relative aspect-[4/3] overflow-hidden border border-atl-line bg-atl-surface">
                        <Image
                            src="/images/services/giyotin-kesim.webp"
                            alt="Giyotin sac kesim hattı"
                            fill
                            priority
                            sizes="(min-width: 1024px) 640px, 92vw"
                            className="object-cover"
                        />
                        <span aria-hidden className="absolute left-3 top-3 h-5 w-5 border-l border-t border-atl-brass" />
                        <span aria-hidden className="absolute right-3 top-3 h-5 w-5 border-r border-t border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-atl-brass" />
                    </div>
                    <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-atl-muted">Giyotin sac kesim</figcaption>
                </figure>
            </div>
        </section>
    );
}
