import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrassRule } from "@/components/atolye/BrassRule";

type CtaBandProps = { title?: string; description?: string };

export function CtaBand({
    title = "Projeniz için teklif alın",
    description = "Teknik çizim, numune veya ölçü bilgisini gönderin; malzeme, adet ve termin bilgisiyle dönüş yapalım.",
}: CtaBandProps) {
    return (
        <section className="atl-grain border-b border-atl-line bg-atl-surface py-20 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <BrassRule className="mb-12" />
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-4xl leading-tight text-atl-text md:text-5xl">{title}</h2>
                        <p className="mt-4 text-base leading-relaxed text-atl-muted md:text-lg">{description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/teklif-al" className="inline-flex h-14 items-center gap-2 bg-atl-brass px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light">
                            Teklif formu <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/iletisim" className="inline-flex h-14 items-center border border-atl-line px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass">
                            İletişim
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
