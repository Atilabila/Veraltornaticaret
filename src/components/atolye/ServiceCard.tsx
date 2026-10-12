import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";

type ServiceCardProps = {
    slug: string;
    title: string;
    badge: string;
    capacity: string;
    image: string;
    description: string;
    metric?: string | null;
    specs?: { label: string; val: string }[];
    icon?: LucideIcon;
    ctaLabel: string;
    priority?: boolean;
};

export function ServiceCard({ slug, title, badge, capacity, image, description, metric, specs, icon: Icon, ctaLabel, priority }: ServiceCardProps) {
    return (
        <article className="group flex flex-col border border-atl-line bg-atl-surface transition-colors duration-300 hover:border-atl-brass/70">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <Image
                    src={image}
                    alt={serviceImageAlt(image, title)}
                    fill
                    priority={priority}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
                    className={serviceImageFit(image)}
                />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-atl-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-atl-muted">{badge}</span>
                <span aria-hidden className="text-atl-line">/</span>
                <span className="text-atl-brass">{capacity}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-start gap-2 font-display text-2xl leading-tight text-atl-text">
                    {Icon && <Icon className="mt-1 h-5 w-5 shrink-0 text-atl-brass" />}
                    {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-atl-muted">{description}</p>
                {metric && (
                    <span className="mt-4 inline-flex w-fit items-center gap-1.5 border border-atl-brass/40 bg-atl-brass-tint px-2.5 py-1 font-mono text-[11px] text-atl-brass-light">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {metric}
                    </span>
                )}
                {specs && specs.length > 0 && (
                    <dl className="mt-5 space-y-2 border-t border-atl-line pt-4 font-mono text-xs">
                        {specs.map((spec) => (
                            <div key={spec.label} className="flex justify-between gap-4">
                                <dt className="text-atl-muted">{spec.label}:</dt>
                                <dd className="text-right text-atl-text">{spec.val}</dd>
                            </div>
                        ))}
                    </dl>
                )}
                <div className="mt-auto pt-6">
                    <Link
                        href={`/teklif-al?hizmet=${slug}`}
                        className="flex h-11 w-full items-center justify-between border border-atl-line px-4 text-xs font-semibold text-atl-text transition-colors group-hover:border-atl-brass group-hover:bg-atl-brass group-hover:text-atl-bg"
                    >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
