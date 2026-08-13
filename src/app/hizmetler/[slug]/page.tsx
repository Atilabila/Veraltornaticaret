import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/supabase/content.service';
import { normalizeImagePath } from '@/lib/utils';
import { resolveServiceStockImage } from '@/lib/service-stock-images';
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

    return (
        <PageShell variant="light" padded={false}>
            {/* Hero */}
            <section className="relative bg-[#f4f4f4] border-b border-[#c6c6c6] pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt={service.title}
                        fill
                        className="object-cover opacity-20"
                        sizes="100vw"
                        priority
                    />
                </div>
                <PageContainer className="relative z-10">
                    <Link
                        href="/#hizmetler"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] hover:text-[var(--color-brand-accent)] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Tüm hizmetler
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-white border border-[#c6c6c6] flex items-center justify-center">
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
                            <h1 className="text-4xl md:text-5xl font-bold text-[#161616] leading-tight mb-4">
                                {service.title}
                            </h1>
                            <p className="text-lg text-[#525252] leading-relaxed max-w-2xl">
                                {service.shortDescription}
                            </p>
                        </div>
                        <Link
                            href={`/teklif-al?hizmet=${service.slug}`}
                            className="inline-flex items-center gap-2 h-12 px-6 bg-[var(--color-brand-accent)] text-white text-sm font-semibold hover:bg-[#0043ce] transition-colors shrink-0"
                        >
                            Teklif al <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </PageContainer>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-20 bg-white">
                <PageContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-8 space-y-12">
                            <p className="text-xl text-[#161616] leading-relaxed font-medium">
                                {service.fullDescription}
                            </p>

                            <div className="bg-[#f4f4f4] border border-[#c6c6c6] p-8 md:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-[#161616]">
                                            {service.title} ile seri üretim
                                        </h3>
                                        <p className="text-[#525252] leading-relaxed">
                                            Endüstriyel standartlarda üretim kapasitemiz ve uzman ekibimizle projenizi hayata geçirelim.
                                        </p>
                                        <Link
                                            href={`/teklif-al?hizmet=${service.slug}`}
                                            className="inline-flex items-center gap-2 h-11 px-5 border border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] text-sm font-semibold hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors"
                                        >
                                            Hemen teklif al <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <div className="relative h-[240px] w-full overflow-hidden border border-[#c6c6c6]">
                                        <Image src={imageSrc} alt={service.title} fill className="object-cover" />
                                    </div>
                                </div>
                            </div>

                            {service.images && service.images.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#161616]">Üretimden görseller</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {service.images.map((img: string, idx: number) => (
                                            <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden border border-[#c6c6c6] bg-[#f4f4f4]">
                                                <Image src={normalizeImagePath(img)} alt={`${service.title} görsel ${idx + 1}`} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {otherServices.length > 0 && (
                                <div className="space-y-6 pt-10 border-t border-[#c6c6c6]">
                                    <div className="flex items-end justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#161616] mb-2">
                                                {data?.serviceDetailFooterTitle || "Diğer hizmetler"}
                                            </h2>
                                            <p className="text-[#525252]">
                                                {data?.serviceDetailFooterDesc || "İlginizi çekebilecek diğer endüstriyel çözümlerimiz."}
                                            </p>
                                        </div>
                                        <Link href="/#hizmetler" className="text-xs font-semibold uppercase tracking-wider text-[#525252] hover:text-[var(--color-brand-accent)] whitespace-nowrap">
                                            {data?.serviceDetailFooterLinkText || "Tümünü gör"}
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {otherServices.map((other: typeof service) => (
                                            <Link
                                                key={other.id}
                                                href={`/hizmetler/${other.slug}`}
                                                className="group bg-[#f4f4f4] border border-[#c6c6c6] overflow-hidden hover:border-[var(--color-brand-accent)] transition-colors flex flex-col"
                                            >
                                                <div className="relative h-40 w-full overflow-hidden">
                                                    <Image src={normalizeImagePath(resolveServiceStockImage(other))} alt={other.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                </div>
                                                <div className="p-5 flex-1 flex flex-col">
                                                    <h3 className="text-lg font-bold text-[#161616] mb-2 group-hover:text-[var(--color-brand-accent)] transition-colors">
                                                        {other.title}
                                                    </h3>
                                                    <p className="text-sm text-[#525252] line-clamp-2">{other.shortDescription}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white border border-[#c6c6c6] border-l-4 border-l-[var(--color-brand-accent)] p-8">
                                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] mb-6 flex items-center gap-2">
                                    <DynamicLucideIcon name="cpu" className="w-4 h-4" /> Teknik parametreler
                                </h3>
                                <div className="space-y-4">
                                    {service.features?.map((feat: { key: string; value: string }, i: number) => (
                                        <div key={i} className="border-b border-[#c6c6c6] pb-3 last:border-0">
                                            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] mb-1">{feat.key}</div>
                                            <div className="text-base font-semibold text-[#161616]">{feat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#f4f4f4] border border-[#c6c6c6] p-8 flex flex-col items-center text-center">
                                <ShieldCheck className="w-10 h-10 text-[var(--color-brand-accent)] mb-3" />
                                <div className="text-xl font-bold text-[#161616] mb-1">{service.slaText}</div>
                                <div className="text-xs font-mono font-semibold text-[#525252] uppercase tracking-wider">
                                    Kurumsal üretim garantisi
                                </div>
                            </div>

                            <div className="bg-[var(--color-brand-accent)] p-8 text-white">
                                <h3 className="text-2xl font-bold leading-tight mb-4">{service.ctaTitle}</h3>
                                <Link
                                    href={`/teklif-al?hizmet=${service.slug}`}
                                    className="bg-white text-[var(--color-brand-accent)] w-full py-4 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#f4f4f4] transition-colors"
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
