// MP-07: B2B Services Landing Page

import { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = {
    title: 'B2B Hizmetler | Metal İşleme & Özel Üretim',
    description: 'CNC torna, özel metal üretim, seri imalat ve metal etiket hizmetleri. Endüstriyel kalite, hassas toleranslar.',
};

export default function HizmetlerPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-block bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-xs uppercase mb-4">
                        B2B HİZMETLER
                    </div>
                    <h1 className="font-[Archivo_Black] text-4xl md:text-6xl uppercase mb-6">
                        ENDÜSTRİYEL METAL<br />İŞLEME HİZMETLERİ
                    </h1>
                    <p className="font-mono text-lg text-white/80 max-w-2xl">
                        CNC torna, özel metal üretim, seri imalat. Hassas toleranslar, zamanında teslimat.
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
                        <div>
                            <div className="font-[Archivo_Black] text-4xl mb-2 text-[#0A0A0A]">±0.01mm</div>
                            <div className="font-mono text-sm uppercase text-[#0A0A0A]/70">Hassasiyet Toleransı</div>
                        </div>
                        <div>
                            <div className="font-[Archivo_Black] text-4xl mb-2 text-[#0A0A0A]">24 Saat</div>
                            <div className="font-mono text-sm uppercase text-[#0A0A0A]/70">Teklif Dönüş Süresi</div>
                        </div>
                        <div>
                            <div className="font-[Archivo_Black] text-4xl mb-2 text-[#0A0A0A]">15+ Yıl</div>
                            <div className="font-mono text-sm uppercase text-[#0A0A0A]/70">Sektör Deneyimi</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
