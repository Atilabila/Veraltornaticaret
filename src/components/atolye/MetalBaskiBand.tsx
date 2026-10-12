import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceImageAlt } from "@/lib/service-stock-images";

const IMAGE = "/images/services/metal-tabelalar.webp";

export function MetalBaskiBand() {
    return (
        <section className="border-b border-atl-line bg-atl-surface">
            <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                    <Image src={IMAGE} alt={serviceImageAlt(IMAGE, "UV baskılı metal tabelalar")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center px-6 py-16 lg:px-16">
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">İkincil hizmet · UV baskı</span>
                    <h2 className="mt-3 font-display text-4xl leading-tight text-atl-text md:text-5xl">Metal tabela ve mıknatıslı poster baskısı</h2>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-atl-muted">
                        Kafe, restoran, atölye ve kurumsal promosyon için UV baskılı metal levha. Seri ve özel tasarım siparişleri teklif usulüyle alınır.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/teklif-al?hizmet=miknatisli-magnet" className="inline-flex h-12 items-center gap-2 bg-atl-brass px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light">
                            Baskı teklifi al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler/miknatisli-magnet" className="inline-flex h-12 items-center border border-atl-line px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass">
                            Detaylar
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
