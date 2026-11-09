"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";
import { Reveal } from "@/components/motion/Reveal";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";

type ServiceCardProps = {
    slug: string;
    title: string;
    badge?: string;
    capacity?: string;
    image: string;
    description: string;
    metric?: string | null;
    specs?: { label: string; val: string }[];
    /** Lucide icon name string — never pass component refs from Server Components */
    iconName?: string;
    ctaLabel: string;
    priority?: boolean;
    href?: string;
    index?: number;
};

export function ServiceCard({
    slug,
    title,
    badge,
    capacity,
    image,
    description,
    specs,
    iconName,
    ctaLabel,
    priority,
    href,
    index = 0,
}: ServiceCardProps) {
    const detailHref = href ?? `/hizmetler/${slug}`;
    const ctaHref = href?.startsWith("/teklif") ? href : `/teklif-al?hizmet=${slug}`;
    const showMeta = Boolean(badge || capacity);

    return (
        <Reveal as="article" delay={0.05 * (index % 6)} className="h-full">
            <div className="group flex h-full min-w-0 flex-col border border-atl-line bg-atl-surface transition-colors duration-300 hover:border-atl-brass/70">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <Image
                        src={image}
                        alt={serviceImageAlt(image, title)}
                        fill
                        priority={priority}
                        sizes="(min-width: 1280px) 360px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 92vw"
                        className={`${serviceImageFit(image)} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                    />
                </div>
                {showMeta && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-atl-line px-5 py-3 text-[11px] font-medium uppercase tracking-[0.08em]">
                        {badge && <span className="text-atl-brass">{badge}</span>}
                        {badge && capacity && <span aria-hidden className="text-atl-line">·</span>}
                        {capacity && <span className="text-atl-muted">{capacity}</span>}
                    </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="flex items-start gap-2 font-display text-xl leading-tight text-atl-text sm:text-2xl">
                        {iconName && (
                            <DynamicLucideIcon
                                name={iconName}
                                className="mt-1 h-5 w-5 shrink-0 text-atl-brass"
                            />
                        )}
                        <Link href={detailHref} className="hover:text-atl-brass-light">
                            {title}
                        </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-atl-muted">{description}</p>
                    {specs && specs.length > 0 && (
                        <dl className="mt-5 space-y-2 border-t border-atl-line pt-4 text-xs">
                            {specs.map((spec) => (
                                <div key={spec.label} className="flex justify-between gap-4">
                                    <dt className="text-atl-muted">{spec.label}</dt>
                                    <dd className="text-right text-atl-text">{spec.val}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                    <div className="mt-auto pt-6">
                        <Link
                            href={ctaHref}
                            className="flex h-11 w-full items-center justify-between border border-atl-line px-4 text-xs font-semibold uppercase tracking-[0.12em] text-atl-text transition-colors group-hover:border-atl-brass group-hover:bg-atl-brass group-hover:text-atl-bg"
                        >
                            <span>{ctaLabel}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}
