import { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { ArrowLeft } from 'lucide-react';
import { ContentService } from '@/lib/supabase/content.service';

export const metadata: Metadata = {
    title: 'B2B Hizmetler | İzmir Alsancak Metal İşleme & Özel Üretim',
    description: 'İzmir Alsancak merkezli CNC torna, özel metal üretim, seri imalat ve metal etiket hizmetleri. Endüstriyel kalite, hassas toleranslar.',
};

export default async function HizmetlerPage() {
    const content = await ContentService.getContent();
    const stats = content?.serviceStats || [
        { value: "±0.01mm", label: "Hassasiyet Toleransı" },
        { value: "24 Saat", label: "Teklif Dönüş Süresi" },
        { value: "15+ Yıl", label: "Sektör Deneyimi" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 px-4 relative">
                <Link
                    href="/"
                    className="absolute top-8 left-4 md:left-8 text-white/50 hover:text-white flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors z-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Ana Sayfa
                </Link>
                <div className="max-w-6xl mx-auto pt-8">
                    <div className="inline-block bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-xs uppercase mb-4">
                        B2B HİZMETLER — İZMİR ALSANCAK
                    </div>
                    <h1 className="font-[Archivo_Black] text-4xl md:text-6xl uppercase mb-6">
                        ENDÜSTRİYEL METAL<br />İŞLEME HİZMETLERİ
                    </h1>
                    <p className="font-mono text-lg text-white/80 max-w-2xl">
                        İzmir Alsancak tesislerimizde CNC torna, özel metal üretim ve seri imalat çözümleri sunuyoruz. Hassas toleranslar, kurumsal disiplin.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SERVICES.map((service) => (
                            <Link
                                key={service.id}
                                href={`/hizmetler/${service.slug}`}
                                className="group border-4 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-4xl">{service.icon}</span>
                                    <div className="bg-[var(--color-brand-safety-orange)] text-black px-3 py-1 font-mono font-black text-xs uppercase">
                                        TEKLİF AL
                                    </div>
                                </div>

                                <h2 className="font-[Archivo_Black] text-2xl uppercase mb-3 text-[#0A0A0A] group-hover:text-white">
                                    {service.name}
                                </h2>

                                <p className="font-mono text-sm leading-relaxed mb-4 text-[#0A0A0A]/80 group-hover:text-white/80">
                                    {service.shortDescription}
                                </p>

                                <div className="flex items-center gap-2 font-mono font-bold text-sm text-[#0A0A0A] group-hover:text-white">
                                    <span>DETAYLI BİLGİ</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[var(--color-brand-safety-orange)] py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-[Archivo_Black] text-3xl md:text-4xl uppercase mb-4 text-[#0A0A0A]">
                        ÖZEL PROJENİZ İÇİN TEKLİF ALIN
                    </h2>
                    <p className="font-mono text-lg mb-8 text-[#0A0A0A]/90">
                        Teknik çizimlerinizi gönderin, 24 saat içinde detaylı teklif alın.
                    </p>
                    <Link
                        href="/teklif-al"
                        className="inline-block bg-black text-white px-8 py-4 font-mono font-black text-lg uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                        TEKLİF FORMU →
                    </Link>
                </div>
            </section>

            {/* Trust Signals */}
            <section className="py-12 px-4 border-t-4 border-black">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {stats.map((stat: any, i: number) => (
                            <div key={i}>
                                <div className="font-[Archivo_Black] text-4xl mb-2 text-[#0A0A0A]">{stat.value}</div>
                                <div className="font-mono text-sm uppercase text-[#0A0A0A]/70">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
