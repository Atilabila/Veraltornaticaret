import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";

const GROUPS = [
    {
        title: "Dosya Teli",
        href: "/hizmetler/dosya-teli",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        badge: "DIN EN 10202",
        description: "Büro kırtasiye ve arşiv için polimer kaplı veya nikelajlı çelik dosya teli. Toptan ve seri üretim.",
    },
    {
        title: "Takvim Tenekesi",
        href: "/hizmetler/takvim-tenekesi",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        badge: "TH-415 / TH-550",
        description: "Askılı ve askısız takvim çıtaları; matbaa ve yayınevleri için seri teneke imalatı.",
    },
    {
        title: "Sac Kesim & Dilimleme",
        href: "/hizmetler",
        image: "/images/services/giyotin-kesim.webp",
        badge: "0.15 – 3.00 mm",
        description: "Giyotin sac kesim ve rulo dilimleme hatlarıyla ölçüye özel, çapaksız levha ve şerit üretim.",
    },
    {
        title: "Özel / UV Metal Baskı",
        href: "/hizmetler/miknatisli-magnet",
        image: "/images/services/metal-tabelalar.webp",
        badge: "4K UV",
        description: "Kurumsal tabela ve mıknatıslı metal poster için UV baskı; teklif usulüyle özel ve seri iş.",
    },
];

export function ProductGroupsSection() {
    return (
        <section id="urun-gruplari" className="atl-grain scroll-mt-24 border-b border-atl-line py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <SectionHeading
                        eyebrow="Ürün gruplarımız"
                        title="Farklı sektörlere özel metal üretim çözümleri"
                        description="Dosya telinden takvim tenekesine, sac kesiminden UV metal baskıya kadar toptan imalat hatlarımız."
                    />
                    <Link href="/hizmetler" className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light transition-colors hover:text-atl-text md:self-auto">
                        Tüm üretim hatları <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {GROUPS.map((group, i) => (
                        <article
                            key={group.href + group.title}
                            className="group flex flex-col border border-atl-line bg-atl-surface transition-colors duration-300 hover:border-atl-brass/70"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                                <Image
                                    src={group.image}
                                    alt={serviceImageAlt(group.image, group.title)}
                                    fill
                                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw"
                                    className={serviceImageFit(group.image)}
                                    priority={i < 2}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                                <span className="absolute left-4 top-4 border border-atl-brass/50 bg-atl-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-atl-brass-light backdrop-blur-sm">
                                    {group.badge}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="font-display text-2xl leading-tight text-atl-text">{group.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-atl-muted">{group.description}</p>
                                <div className="mt-auto pt-6">
                                    <Link
                                        href={group.href}
                                        className="flex h-11 w-full items-center justify-between border border-atl-line px-4 text-xs font-semibold uppercase tracking-[0.14em] text-atl-text transition-colors group-hover:border-atl-brass group-hover:bg-atl-brass group-hover:text-atl-bg"
                                    >
                                        <span>Kategoriye git</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
