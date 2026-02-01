import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/supabase/content.service';
import * as LucideIcons from "lucide-react";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

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
        <div className="min-h-screen bg-white">
            {/* Dynamic Hero Section */}
            <section className="bg-black text-white pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="container mx-auto max-w-[1200px] relative z-10">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[var(--color-brand-safety-orange)] transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> TÜM HİZMETLER
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Icon className="w-8 h-8 text-[var(--color-brand-safety-orange)]" />
                                </div>
                                <div className="bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-xs uppercase tracking-widest">
                                    INDUSTRIAL SERVICE
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                {service.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl">
                                {service.shortDescription}
                            </p>
                        </div>

                        <div className="hidden lg:block pb-2">
                            <div className="text-[120px] font-black leading-none text-white/[0.03] select-none italic">
                                {String(service.order).padStart(2, '0')}
                            </div>
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
                        <div className="lg:col-span-8 space-y-16">
                            {/* Detailed Description */}
                            <div className="space-y-8">
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--color-brand-safety-orange)] flex items-center gap-3">
                                    <span className="w-8 h-px bg-[var(--color-brand-safety-orange)]" /> HİZMET KAPSAMI
                                </h2>
                                <div className="text-xl md:text-2xl text-black/80 font-medium leading-relaxed whitespace-pre-line">
                                    {service.fullDescription}
                                </div>
                            </div>

                            {/* Application Areas */}
                            <div className="space-y-8">
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--color-brand-safety-orange)] flex items-center gap-3">
                                    <span className="w-8 h-px bg-[var(--color-brand-safety-orange)]" /> KULLANIM ALANLARI
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.applicationAreas?.map((area: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4 p-6 bg-[#F8F8F8] border border-black/5 group hover:border-black/10 transition-colors">
                                            <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                                            <span className="font-bold text-black uppercase tracking-wider">{area}</span>
                                        </div>
                                    ))}
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

            {/* Other Services (Internal Linking) */}
            <section className="py-24 px-6 bg-[#0A0A0A] text-white">
                <div className="container mx-auto max-w-[1200px]">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                                DİĞER ÜRETİM<br />HİZMETLERİMİZ ÖZETİ
                            </h2>
                            <p className="text-lg text-white/40 max-w-xl">
                                VERAL bünyesinde sunduğumuz diğer endüstriyel çözümler ve metal işleme uzmanlıklarımızı inceleyin.
                            </p>
                        </div>
                        <Link href="/hizmetler" className="text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors border-b border-white/20 pb-2">
                            TÜMÜNÜ GÖR
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {otherServices.map((other: any) => {
                            const OtherIcon = (LucideIcons as any)[other.icon] || LucideIcons.Settings;
                            return (
                                <Link
                                    key={other.id}
                                    href={`/hizmetler/${other.slug}`}
                                    className="group bg-white/5 border border-white/5 p-8 transition-all hover:bg-white hover:border-white"
                                >
                                    <OtherIcon className="w-8 h-8 text-[var(--color-brand-safety-orange)] mb-8 transition-transform group-hover:scale-110" />
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white group-hover:text-black transition-colors">
                                        {other.title}
                                    </h3>
                                    <p className="text-sm text-white/40 font-medium leading-relaxed group-hover:text-black/60 transition-colors">
                                        {other.shortDescription}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
