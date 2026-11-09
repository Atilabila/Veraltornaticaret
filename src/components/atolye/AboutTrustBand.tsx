import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { BrassRule } from "@/components/atolye/BrassRule";

const BULLETS = [
    "İzmir Alsancak üretim atölyesi",
    "Eksantrik pres ve giyotin hatları",
    "Butik numune ve yüksek adetli seri üretim",
    "Türkiye geneline sevkiyat",
];

export function AboutTrustBand() {
    return (
        <section className="border-b border-atl-line bg-atl-surface py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:items-start lg:gap-16 lg:px-12">
                <div className="lg:col-span-6">
                    <SectionHeading
                        eyebrow="İzmir Alsancak atölyesi"
                        title="Yerel üretim, Türkiye geneline toptan sevkiyat"
                        description="Veral Torna & Teneke Ticaret; İzmir Alsancak’ta dosya teli, takvim tenekesi ve metal imalat yapan aile atölyesidir."
                    />
                    <BrassRule className="my-8 max-w-xs" />
                    <p className="max-w-xl text-base leading-relaxed text-atl-muted">
                        1471 Sokak No:12/A adresindeki üretimimizde talep analizi, numune ve seri imalat aynı çatı altında yürür. Ölçü veya numuneyle teklif alın.
                    </p>
                    <Link
                        href="/hakkimizda"
                        className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light transition-colors hover:text-atl-text"
                    >
                        Devamı <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <ul className="grid gap-3 lg:col-span-6">
                    {BULLETS.map((item, index) => (
                        <li
                            key={item}
                            className="flex items-start gap-4 border border-atl-line bg-atl-bg px-5 py-5 text-sm text-atl-text transition-colors hover:border-atl-brass/50"
                        >
                            <span className="font-mono text-[11px] text-atl-brass">{String(index + 1).padStart(2, "0")}</span>
                            <span className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-atl-brass" />
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
