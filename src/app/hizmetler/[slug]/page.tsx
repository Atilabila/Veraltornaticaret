import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/supabase/content.service';
import { normalizeImagePath } from '@/lib/utils';
import { resolveServiceStockImage, serviceImageAlt, serviceImageFit } from '@/lib/service-stock-images';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { PageContainer } from '@/components/layout/PageContainer';
import { DynamicLucideIcon } from '@/components/ui/DynamicLucideIcon';
import { WorkshopZoomFrame } from '@/components/media/WorkshopZoomFrame';
import { defaultContent } from '@/store/useContentStore';
import { absUrl, SITE_ORIGIN } from '@/lib/site';
import { applyPublicServiceCopy, priceAskUrl } from '@/lib/public-copy';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const content = await ContentService.getContent();
    let service = content?.services?.find((s: { slug: string }) => s.slug === slug);

    if (!service) {
        service = defaultContent.services?.find((s: { slug: string }) => s.slug === slug);
    }

    if (!service) {
        return { title: 'Hizmet Bulunamadı' };
    }

    const copy = applyPublicServiceCopy(service);
    const image = normalizeImagePath(resolveServiceStockImage(copy));

    return {
        title: (copy.seoTitle || copy.title).replace(/\s*\|\s*VERAL\b.*$/i, "").trim() || copy.title,
        description: copy.seoDescription || copy.shortDescription,
        alternates: { canonical: absUrl(`/hizmetler/${copy.slug}`) },
        openGraph: {
            title: copy.title,
            description: copy.seoDescription || copy.shortDescription,
            url: absUrl(`/hizmetler/${copy.slug}`),
            images: [{ url: image, alt: serviceImageAlt(image, copy.title) }],
        },
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const dbData = await ContentService.getContent();
    const data = dbData as typeof defaultContent | null;
    const dbServices = data?.services || [];
    const dbSlugs = new Set(dbServices.map((s: { slug: string }) => s.slug));
    const defaultsNotInDb = defaultContent.services.filter(s => !dbSlugs.has(s.slug));
    const allServices = [...dbServices, ...defaultsNotInDb];

    const found = allServices.find((s: { slug: string }) => s.slug === slug);

    if (!found || found.isActive === false) {
        notFound();
    }

    const service = applyPublicServiceCopy(found);

    const otherServices = allServices
        .filter((s: { slug: string; isActive?: boolean }) => s.slug !== slug && s.isActive !== false)
        .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
        .slice(0, 3);

    const imageSrc = normalizeImagePath(resolveServiceStockImage(service));
    const imageAlt = serviceImageAlt(imageSrc, service.title);

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        url: absUrl(`/hizmetler/${service.slug}`),
        image: absUrl(imageSrc),
        areaServed: "TR",
        provider: {
            "@type": "LocalBusiness",
            name: "Veral Torna & Teneke Ticaret",
            url: SITE_ORIGIN,
        },
    };

    return (
        <PageShell variant="light" padded={false}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            {/* Hero */}
            <section className="relative bg-atl-bg border-b border-atl-line pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover opacity-20"
                        sizes="100vw"
                        priority
                    />
                </div>
                <PageContainer className="relative z-10">
                    <Breadcrumb
                        className="mb-6 mt-0"
                        items={[
                            { name: "Ana Sayfa", url: "/" },
                            { name: "Üretim", url: "/hizmetler" },
                            { name: service.title, url: `/hizmetler/${service.slug}` },
                        ]}
                    />

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-atl-surface border border-atl-line flex items-center justify-center">
                                    <DynamicLucideIcon
                                        name={service.icon}
                                        fallbackName="settings"
                                        className="w-6 h-6 text-[var(--color-brand-accent)]"
                                    />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]">
                                    Atölye
                                </span>
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl text-atl-text leading-tight mb-4">
                                {service.title}
                            </h1>
                            <p className="text-lg text-atl-muted leading-relaxed max-w-2xl">
                                {service.shortDescription}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <a
                                href={priceAskUrl(service.title)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                                WhatsApp&apos;tan fiyat sor
                            </a>
                            <Link
                                href={`/teklif-al?hizmet=${service.slug}`}
                                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-brand-accent)] px-6 text-sm font-semibold text-atl-bg hover:bg-atl-brass-light"
                            >
                                Teklif al <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-20 bg-atl-surface">
                <PageContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-8 space-y-12">
                            <p className="text-xl text-atl-text leading-relaxed font-medium">
                                {service.fullDescription}
                            </p>

                            <WorkshopZoomFrame
                                src={imageSrc}
                                alt={imageAlt}
                                sizes="(min-width: 768px) 640px, 92vw"
                                className="relative aspect-[4/5] w-full max-w-md overflow-hidden border border-atl-line"
                            />

                            {service.images && service.images.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-atl-text">Üretimden görseller</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {service.images.map((img: string, idx: number) => {
                                            const src = normalizeImagePath(img);
                                            return (
                                                <WorkshopZoomFrame
                                                    key={idx}
                                                    src={src}
                                                    alt={serviceImageAlt(src, `${service.title} görsel ${idx + 1}`)}
                                                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 92vw"
                                                    className="relative aspect-[4/5] w-full overflow-hidden border border-atl-line bg-atl-bg"
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-atl-surface border border-atl-line border-l-4 border-l-[var(--color-brand-accent)] p-8">
                                <h2 className="mb-6 text-sm font-semibold text-atl-muted">
                                    Kısa bilgi
                                </h2>
                                <div className="space-y-4">
                                    {service.features?.map((feat: { key: string; value: string }, i: number) => (
                                        <div key={i} className="border-b border-atl-line pb-3 last:border-0">
                                            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-atl-muted mb-1">{feat.key}</div>
                                            <div className="text-base font-semibold text-atl-text">{feat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[var(--color-brand-accent)] p-8 text-atl-bg">
                                <h3 className="text-2xl font-bold leading-tight mb-4">{service.ctaTitle}</h3>
                                <Link
                                    href={`/teklif-al?hizmet=${service.slug}`}
                                    className="bg-atl-surface text-[var(--color-brand-accent)] w-full py-4 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-atl-bg transition-colors focus-visible:outline-atl-bg"
                                >
                                    {service.ctaLabel} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {otherServices.length > 0 && (
                        <div className="mt-14 space-y-6 border-t border-atl-line pt-12 lg:mt-16">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="mb-2 font-display text-2xl text-atl-text">
                                        {data?.serviceDetailFooterTitle || "Diğer hizmetler"}
                                    </h2>
                                    <p className="text-atl-muted">
                                        Diğer işler.
                                    </p>
                                </div>
                                <Link
                                    href="/hizmetler"
                                    className="inline-flex min-h-11 items-center whitespace-nowrap font-sans text-sm font-semibold tracking-normal text-atl-muted hover:text-atl-brass-light"
                                >
                                    {data?.serviceDetailFooterLinkText || "Tümünü gör"}
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {otherServices.map((raw: typeof service) => {
                                    const other = applyPublicServiceCopy(raw);
                                    const otherSrc = normalizeImagePath(resolveServiceStockImage(other));
                                    return (
                                        <Link
                                            key={other.id}
                                            href={`/hizmetler/${other.slug}`}
                                            className="group flex flex-col overflow-hidden border border-atl-line bg-atl-bg transition-colors hover:border-[var(--color-brand-accent)]"
                                        >
                                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                                <Image
                                                    src={otherSrc}
                                                    alt={serviceImageAlt(otherSrc, other.title)}
                                                    fill
                                                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 45vw, 92vw"
                                                    className={`${serviceImageFit(otherSrc)} transition-transform duration-500 group-hover:scale-105`}
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-5">
                                                <h3 className="mb-2 text-lg font-bold text-atl-text transition-colors group-hover:text-[var(--color-brand-accent)]">
                                                    {other.title}
                                                </h3>
                                                <p className="line-clamp-2 text-sm text-atl-muted">{other.shortDescription}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PageContainer>
            </section>
        </PageShell>
    );
}
