import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, SERVICES } from '@/data/services';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return {
            title: 'Hizmet Bulunamadı',
        };
    }

    return {
        title: `${service.name} | B2B Hizmetler`,
        description: service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-black text-white py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 font-mono text-sm mb-6 hover:text-[var(--color-brand-safety-orange)] transition-colors"
                    >
                        ← Tüm Hizmetler
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{service.icon}</span>
                        <div className="bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-xs uppercase">
                            B2B HİZMET
                        </div>
                    </div>

                    <h1 className="font-[Archivo_Black] text-4xl md:text-5xl uppercase mb-4">
                        {service.name}
                    </h1>
                    <p className="font-mono text-lg text-white/80">
                        {service.shortDescription}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Description */}
                            <div>
                                <h2 className="font-[Archivo_Black] text-2xl uppercase mb-4 border-b-4 border-black pb-2 text-[#0A0A0A]">
                                    HİZMET DETAYI
                                </h2>
                                <p className="font-mono leading-relaxed text-[#0A0A0A]/80">
                                    {service.fullDescription}
                                </p>
                            </div>

                            {/* Use Cases */}
                            <div>
                                <h2 className="font-[Archivo_Black] text-2xl uppercase mb-4 border-b-4 border-black pb-2 text-[#0A0A0A]">
                                    KULLANIM ALANLARI
                                </h2>
                                <ul className="space-y-3">
                                    {service.useCases.map((useCase, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-[var(--color-brand-safety-orange)] font-black">▸</span>
                                            <span className="font-mono text-[#0A0A0A]/80">{useCase}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Technical Notes */}
                            <div className="border-4 border-black p-6">
                                <h3 className="font-[Archivo_Black] text-lg uppercase mb-4 text-[#0A0A0A]">
                                    TEKNİK ÖZELLİKLER
                                </h3>
                                <ul className="space-y-2">
                                    {service.technicalNotes.map((note, index) => (
                                        <li key={index} className="font-mono text-sm text-[#0A0A0A]/80">
                                            • {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="bg-[var(--color-brand-safety-orange)] p-6 border-4 border-black">
                                <h3 className="font-[Archivo_Black] text-xl uppercase mb-3 text-[#0A0A0A]">
                                    TEKLİF ALIN
                                </h3>
                                <p className="font-mono text-sm mb-4 text-[#0A0A0A]/80">
                                    Bu hizmet için özel teklif almak ister misiniz?
                                </p>
                                <Link
                                    href={`/teklif-al?service=${service.slug}`}
                                    className="block w-full bg-black text-white text-center py-3 font-mono font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                >
                                    FORMU DOLDUR →
                                </Link>
                            </div>

                            {/* Trust Signal */}
                            <div className="border-4 border-black p-6">
                                <div className="text-center">
                                    <div className="font-[Archivo_Black] text-3xl mb-2 text-[#0A0A0A]">24 SAAT</div>
                                    <div className="font-mono text-xs uppercase text-[#0A0A0A]/70">Teklif Dönüş Garantisi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Services */}
            <section className="py-12 px-4 bg-black text-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-[Archivo_Black] text-2xl uppercase mb-6">
                        DİĞER HİZMETLERİMİZ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {SERVICES.filter(s => s.slug !== service.slug).map((otherService) => (
                            <Link
                                key={otherService.id}
                                href={`/hizmetler/${otherService.slug}`}
                                className="border-2 border-white p-4 hover:bg-white hover:text-black transition-colors"
                            >
                                <div className="text-2xl mb-2">{otherService.icon}</div>
                                <h3 className="font-[Archivo_Black] text-lg uppercase mb-2">
                                    {otherService.name}
                                </h3>
                                <p className="font-mono text-xs opacity-80">
                                    {otherService.shortDescription.substring(0, 60)}...
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
