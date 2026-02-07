import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/supabase/content.service';
import { normalizeImagePath } from '@/lib/utils';
import * as LucideIcons from "lucide-react";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const content = await ContentService.getContent();
    const service = content?.services?.find((s: any) => s.slug === slug);

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
    const data = await ContentService.getContent();
    const service = data?.services?.find((s: any) => s.slug === slug);

    if (!service || !service.isActive) {
        notFound();
    }

    const otherServices = (data?.services || [])
        .filter((s: any) => s.slug !== slug && s.isActive)
        .slice(0, 3);

    const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Settings;

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-white">
                {/* Dynamic Hero Section */}
                <section className="bg-black text-white pt-28 pb-10 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    </div>

                    <div className="container mx-auto max-w-[1200px] relative z-10">
                        <Link
                            href="/hizmetler"
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[var(--color-brand-safety-orange)] transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> TÜM HİZMETLER
                        </Link>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-4xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-[var(--color-brand-safety-orange)]" />
                                    </div>
                                    <div className="bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-[10px] uppercase tracking-widest">
                                        INDUSTRIAL SERVICE
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                                    {service.title}
                                </h1>
                                <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
                                    {service.shortDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Layout */}
                <section className="py-24 px-6 bg-white relative">
                    {/* Global Grid System */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                    <div className="container mx-auto max-w-[1200px] relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                            {/* Main Body */}
                            <div className="lg:col-span-8 space-y-12">
                                {/* Modern Description */}
                                <div className="prose prose-xl prose-slate max-w-none">
                                    <p className="text-2xl font-medium leading-relaxed text-slate-800">
                                        {service.fullDescription}
                                    </p>
                                </div>

                                {/* Service Promo Card */}
                                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                                        <div className="space-y-6">
                                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
                                                {service.title}<br />
                                                <span className="text-[var(--color-brand-safety-orange)]">İLE ÜRETİM</span>
                                            </h3>
                                            <p className="text-white/60 text-lg font-medium leading-relaxed">
                                                Endüstriyel standartlarda üretim kapasitemiz ve uzman ekibimizle projenizi hayata geçirelim.
                                            </p>
                                            <Link
                                                href={`/teklif-al?hizmet=${service.slug}`}
                                                className="inline-flex items-center gap-3 bg-[var(--color-brand-safety-orange)] text-black px-8 py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all transform hover:translate-x-1"
                                            >
                                                HEMEN TEKLİF AL <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>

                                        <div className="relative h-[300px] w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl rotate-2 group-hover:rotate-0 transition-all duration-500">
                                            <Image
                                                src={normalizeImagePath(service.image)}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Background Effects */}
                                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-20 pointer-events-none" />
                                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[var(--color-brand-safety-orange)] rounded-full blur-[100px] opacity-20" />
                                </div>

                                {/* OTHER SERVICES (RELOCATED) */}
                                <div className="space-y-8 pt-12 border-t border-slate-200">
                                    <div className="flex items-end justify-between gap-4">
                                        <div>
                                            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2">
                                                {data?.serviceDetailFooterTitle || "DİĞER HİZMETLER"}
                                            </h2>
                                            <p className="text-slate-500">
                                                {data?.serviceDetailFooterDesc || "İlginizi çekebilecek diğer endüstriyel çözümlerimiz."}
                                            </p>
                                        </div>
                                        <Link href="/hizmetler" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors border-b border-slate-200 hover:border-slate-900 pb-1 whitespace-nowrap">
                                            {data?.serviceDetailFooterLinkText || "TÜMÜNÜ GÖR"}
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {otherServices.map((other: any) => {
                                            const OtherIcon = (LucideIcons as any)[other.icon] || LucideIcons.Settings;
                                            return (
                                                <Link
                                                    key={other.id}
                                                    href={`/hizmetler/${other.slug}`}
                                                    className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all hover:bg-white hover:border-[var(--color-brand-safety-orange)] hover:shadow-xl flex flex-col"
                                                >
                                                    {/* Service Image */}
                                                    <div className="relative h-48 w-full overflow-hidden">
                                                        <Image
                                                            src={normalizeImagePath(other.image)}
                                                            alt={other.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                                                            <OtherIcon className="w-5 h-5 text-black" />
                                                        </div>
                                                    </div>

                                                    <div className="p-6 flex-1 flex flex-col">
                                                        <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-slate-900 group-hover:text-[var(--color-brand-safety-orange)] transition-colors">
                                                            {other.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 font-medium leading-relaxed group-hover:text-black/70 transition-colors line-clamp-2 mt-auto">
                                                            {other.shortDescription}
                                                        </p>

                                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-black transition-colors">
                                                                İNCELE
                                                            </span>
                                                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--color-brand-safety-orange)] group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* Sidebar */}
                            <div className="lg:col-span-4 space-y-8">
                                {/* Technical Specs Box */}
                                <div className="bg-black text-white p-10 border-l-8 border-[var(--color-brand-safety-orange)] relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-2">
                                            <LucideIcons.Cpu className="w-4 h-4" /> TEKNİK PARAMETRELER
                                        </h3>
                                        <div className="space-y-6">
                                            {service.features?.map((feat: any, i: number) => (
                                                <div key={i} className="border-b border-white/10 pb-4">
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">{feat.key}</div>
                                                    <div className="text-lg font-bold uppercase tracking-tight">{feat.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <LucideIcons.Zap className="absolute top-[-20px] right-[-20px] w-40 h-40 text-white/[0.03] group-hover:text-white/[0.05] transition-colors" />
                                </div>

                                {/* SLA / Guarantee */}
                                <div className="bg-[#F8F8F8] p-10 border border-black/5 flex flex-col items-center text-center">
                                    <ShieldCheck className="w-12 h-12 text-black mb-4" />
                                    <div className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                                        {service.slaText}
                                    </div>
                                    <div className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em]">
                                        KURUMSAL ÜRETİM GARANTİSİ
                                    </div>
                                </div>

                                {/* Sticky CTA Box */}
                                <div className="bg-[var(--color-brand-safety-orange)] p-10 relative overflow-hidden">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6 text-black">
                                        {service.ctaTitle}
                                    </h3>
                                    <Link
                                        href={`/teklif-al?hizmet=${service.slug}`}
                                        className="bg-black text-white w-full py-5 font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-4 group"
                                    >
                                        {service.ctaLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                    <div className="absolute top-0 right-0 p-4">
                                        <LucideIcons.MessageSquare className="w-12 h-12 text-black/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
