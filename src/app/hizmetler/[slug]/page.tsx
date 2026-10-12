import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/supabase/content.service';
import { normalizeImagePath } from '@/lib/utils';
import { resolveServiceStockImage, serviceImageAlt, serviceImageFit } from '@/lib/service-stock-images';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';
import { DynamicLucideIcon } from '@/components/ui/DynamicLucideIcon';
import { defaultContent } from '@/store/useContentStore';

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

    return {
        title: service.seoTitle || `${service.title} | VERAL`,
        description: service.seoDescription || service.shortDescription,
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

    const service = allServices.find((s: { slug: string }) => s.slug === slug);

    if (!service || service.isActive === false) {
        notFound();
    }

    const otherServices = allServices
        .filter((s: { slug: string; isActive?: boolean }) => s.slug !== slug && s.isActive !== false)
        .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
        .slice(0, 3);

    const imageSrc = normalizeImagePath(resolveServiceStockImage(service));
    const imageAlt = serviceImageAlt(imageSrc, service.title);

    return (
        <PageShell variant="light" padded={false}>
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
                    <Link
                        href="/#hizmetler"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-atl-muted hover:text-[var(--color-brand-accent)] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Tüm hizmetler
                    </Link>

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
                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]">
                                    Endüstriyel hizmet
                                </span>
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl text-atl-text leading-tight mb-4">
                                {service.title}
                            </h1>
                            <p className="text-lg text-atl-muted leading-relaxed max-w-2xl">
                                {service.shortDescription}
                            </p>
                        </div>
                        <Link
                            href={`/teklif-al?hizmet=${service.slug}`}
                            className="inline-flex items-center gap-2 h-12 px-6 bg-[var(--color-brand-accent)] text-atl-bg text-sm font-semibold hover:bg-atl-brass-light transition-colors shrink-0"
                        >
                            Teklif al <ArrowRight className="w-4 h-4" />
                        </Link>
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

                            <div className="bg-atl-bg border border-atl-line p-8 md:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-display text-atl-text">
                                            {service.title} ile seri üretim
                                        </h3>
                                        <p className="text-atl-muted leading-relaxed">
                                            Endüstriyel standartlarda üretim kapasitemiz ve uzman ekibimizle projenizi hayata geçirelim.
                                        </p>
                                        <Link
                                            href={`/teklif-al?hizmet=${service.slug}`}
                                            className="inline-flex items-center gap-2 h-11 px-5 border border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] text-sm font-semibold hover:bg-[var(--color-brand-accent)] hover:text-atl-bg transition-colors"
                                        >
                                            Hemen teklif al <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-atl-line">
                                        <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 768px) 400px, 92vw" className={serviceImageFit(imageSrc)} />
                                    </div>
                                </div>
                            </div>

                            {service.images && service.images.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-atl-text">Üretimden görseller</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {service.images.map((img: string, idx: number) => {
                                            const src = normalizeImagePath(img);
                                            return (
                                                <div key={idx} className="relative aspect-[4/5] w-full overflow-hidden border border-atl-line bg-atl-bg">
                                                    <Image src={src} alt={serviceImageAlt(src, `${service.title} görsel ${idx + 1}`)} fill sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 92vw" className={serviceImageFit(src)} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {otherServices.length > 0 && (
                                <div className="space-y-6 pt-10 border-t border-atl-line">
                                    <div className="flex items-end justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-display text-atl-text mb-2">
                                                {data?.serviceDetailFooterTitle || "Diğer hizmetler"}
                                            </h2>
                                            <p className="text-atl-muted">
                                                {data?.serviceDetailFooterDesc || "İlginizi çekebilecek diğer endüstriyel çözümlerimiz."}
                                            </p>
                                        </div>
                                        <Link href="/#hizmetler" className="text-xs font-semibold uppercase tracking-wider text-atl-muted hover:text-[var(--color-brand-accent)] whitespace-nowrap">
                                            {data?.serviceDetailFooterLinkText || "Tümünü gör"}
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {otherServices.map((other: typeof service) => {
                                            const otherSrc = normalizeImagePath(resolveServiceStockImage(other));
                                            return (
                                            <Link
                                                key={other.id}
                                                href={`/hizmetler/${other.slug}`}
                                                className="group bg-atl-bg border border-atl-line overflow-hidden hover:border-[var(--color-brand-accent)] transition-colors flex flex-col"
                                            >
                                                <div className="relative aspect-[4/5] w-full overflow-hidden">
                                                    <Image src={otherSrc} alt={serviceImageAlt(otherSrc, other.title)} fill sizes="(min-width: 768px) 360px, 92vw" className={`${serviceImageFit(otherSrc)} transition-transform duration-500 group-hover:scale-105`} />
                                                </div>
                                                <div className="p-5 flex-1 flex flex-col">
                                                    <h3 className="text-lg font-bold text-atl-text mb-2 group-hover:text-[var(--color-brand-accent)] transition-colors">
                                                        {other.title}
                                                    </h3>
                                                    <p className="text-sm text-atl-muted line-clamp-2">{other.shortDescription}</p>
                                                </div>
                                            </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-atl-surface border border-atl-line border-l-4 border-l-[var(--color-brand-accent)] p-8">
                                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-atl-muted mb-6 flex items-center gap-2">
                                    <DynamicLucideIcon name="cpu" className="w-4 h-4" /> Teknik parametreler
                                </h3>
                                <div className="space-y-4">
                                    {service.features?.map((feat: { key: string; value: string }, i: number) => (
                                        <div key={i} className="border-b border-atl-line pb-3 last:border-0">
                                            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-atl-muted mb-1">{feat.key}</div>
                                            <div className="text-base font-semibold text-atl-text">{feat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-atl-bg border border-atl-line p-8 flex flex-col items-center text-center">
                                <ShieldCheck className="w-10 h-10 text-[var(--color-brand-accent)] mb-3" />
                                <div className="text-xl font-bold text-atl-text mb-1">{service.slaText}</div>
                                <div className="text-xs font-mono font-semibold text-atl-muted uppercase tracking-wider">
                                    Kurumsal seri üretim
                                </div>
                            </div>

                            <div className="bg-[var(--color-brand-accent)] p-8 text-atl-bg">
                                <h3 className="text-2xl font-bold leading-tight mb-4">{service.ctaTitle}</h3>
                                <Link
                                    href={`/teklif-al?hizmet=${service.slug}`}
                                    className="bg-atl-surface text-[var(--color-brand-accent)] w-full py-4 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-atl-bg transition-colors"
                                >
                                    {service.ctaLabel} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </section>
        </PageShell>
    );
}
