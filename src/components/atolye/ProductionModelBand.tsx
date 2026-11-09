import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                    <Image
                        src={IMAGE}
                        alt={serviceImageAlt(IMAGE, "UV baskılı metal tabelalar")}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center px-6 py-16 lg:px-16">
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">Üretim modeli</span>
                    <h2 className="mt-3 font-display text-4xl leading-tight text-atl-text md:text-5xl">
                        Projenize uygun üretim modeli oluşturuyoruz
                    </h2>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-atl-muted">
                        Butik numuneden yüksek adetli seri üretime kadar ihtiyaca göre planlıyoruz. UV metal baskı ve mıknatıslı poster işleri de aynı teklif sürecine dahil.
                    </p>
                    <ul className="mt-8 space-y-3">
                        {POINTS.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-sm text-atl-text">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-atl-brass" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/teklif-al"
                            className="inline-flex h-12 items-center gap-2 bg-atl-brass px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light"
                        >
                            Hemen teklif al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/hizmetler/miknatisli-magnet"
                            className="inline-flex h-12 items-center border border-atl-line px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass"
                        >
                            UV metal baskı
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
