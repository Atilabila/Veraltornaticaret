import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ContentService } from '@/lib/supabase/content.service';
import { DynamicLucideIcon } from '@/components/ui/DynamicLucideIcon';

export default async function HizmetlerPage() {
    const data = await ContentService.getContent();
    const services = (data?.services || []).filter((s: any) => s.isActive !== false).sort((a: any, b: any) => a.order - b.order);
    const header = data?.servicesPageHeader || { title: 'Endüstriyel Hizmetlerimiz', subtitle: 'Metal işleme ve tasarımda 20 yıllık tecrübe ile kurumsal çözümler.' };

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            {/* SEO Focused Hero */}
            <section className="bg-black text-white pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="container mx-auto max-w-[1200px] relative z-10">
                    <div className="inline-block bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-xs uppercase mb-8">
                        VERAL — METAL İŞLEME & ÜRETİM MERKEZİ
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                        {header.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl font-medium leading-relaxed">
                        {header.subtitle}
                    </p>
                </div>
            </section>

            {/* Services Listing */}
            <section className="py-24 px-6 bg-white relative">
                {/* Global Grid System (Subtle on White) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                <div className="container mx-auto max-w-[1200px] relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service: any) => {
                            return (
                                <Link
                                    key={service.id}
                                    href={`/hizmetler/${service.slug}`}
                                    className="group relative bg-[#F8F8F8] border border-black/5 p-12 overflow-hidden transition-all duration-500 hover:bg-black hover:border-black"
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-12">
                                            <div className="w-16 h-16 bg-white flex items-center justify-center border border-black/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <DynamicLucideIcon
                                                    name={service.icon}
                                                    fallbackName="settings"
                                                    className="w-8 h-8 text-black"
                                                />
                                            </div>
                                            <div className="bg-[var(--color-brand-safety-orange)] text-black px-3 py-1 font-mono font-black text-[10px] uppercase tracking-widest">
                                                Hizmet Kodu: #{service.id}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-black group-hover:text-white transition-colors">
                                            {service.title}
                                        </h2>

                                        <p className="text-lg text-black/60 font-medium leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
                                            {service.shortDescription}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-8 border-t border-black/5 group-hover:border-white/10">
                                            <div className="flex items-center gap-2 font-mono font-black text-xs uppercase tracking-[0.2em] text-black group-hover:text-white transition-colors">
                                                DETAYLI İNCELE <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                            <div className="font-mono font-bold text-[10px] text-black/30 group-hover:text-white/20 uppercase">
                                                İşlem Garantili
                                            </div>
                                        </div>
                                    </div>

                                    {/* Industrial Number Overlay */}
                                    <div className="absolute bottom-[-20px] right-[-20px] text-[160px] font-black leading-none text-black/[0.02] group-hover:text-white/[0.02] transition-colors pointer-events-none select-none italic">
                                        {String(service.order).padStart(2, '0')}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[var(--color-brand-safety-orange)] py-20 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-[1200px] relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 text-black">
                            PROJENİZ İÇİN TEKNİK<br />TEKLİF ALMAK İSTER MİSİNİZ?
                        </h2>
                        <p className="text-lg text-black font-medium opacity-80">
                            Teknik çizimleriniz ekibimiz tarafından incelenir ve 24 saat içinde detaylandırılmış fiyatlandırma tarafınıza iletilir.
                        </p>
                    </div>
                    <Link
                        href="/teklif-al"
                        className="bg-black text-white px-12 py-5 font-black text-lg uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-4 group shrink-0"
                    >
                        TEKLİF İSTE <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
