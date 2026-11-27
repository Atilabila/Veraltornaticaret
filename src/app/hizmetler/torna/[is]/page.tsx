import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { absUrl, SITE_ORIGIN, SITE_PHONE_DISPLAY, SITE_PHONE_E164, SITE_WHATSAPP } from "@/lib/site";
import { findTornaService, TORNA_SERVICES, tornaHref } from "@/lib/public-copy";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type PageProps = { params: Promise<{ is: string }> };

export function generateStaticParams() {
    return TORNA_SERVICES.map((item) => ({ is: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { is } = await params;
    const service = findTornaService(is);
    if (!service) return { title: "Sayfa bulunamadı" };
    const description = `${service.intro} Adres: 1471 Sokak No:12/A, Alsancak / İzmir.`.slice(0, 160);
    return {
        title: `${service.title} | Alsancak`,
        description,
        alternates: { canonical: absUrl(tornaHref(service.slug)) },
        openGraph: {
            title: `${service.title} | Veral Torna ve Teneke`,
            description,
            url: absUrl(tornaHref(service.slug)),
        },
    };
}

export default async function TornaServicePage({ params }: PageProps) {
    const { is } = await params;
    const service = findTornaService(is);
    if (!service) notFound();

    const others = TORNA_SERVICES.filter((item) => item.slug !== service.slug && !service.related.includes(item.slug));
    const related = service.related
        .map((slug) => findTornaService(slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
    const whatsapp = buildWhatsAppUrl({
        phoneNumber: SITE_WHATSAPP,
        message: `Merhaba, ${service.title} için fiyat talebi.`,
    });

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.intro,
        url: absUrl(tornaHref(service.slug)),
        areaServed: "Alsancak, İzmir",
        provider: {
            "@type": "LocalBusiness",
            name: "Veral Torna & Teneke Ticaret",
            url: SITE_ORIGIN,
            telephone: SITE_PHONE_E164,
            address: {
                "@type": "PostalAddress",
                streetAddress: "1471 Sokak No:12/A",
                addressLocality: "Alsancak / Konak",
                addressRegion: "İzmir",
                postalCode: "35220",
                addressCountry: "TR",
            },
        },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Navigation />
            <article className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
                <Breadcrumb
                    items={[
                        { name: "Ana Sayfa", url: "/" },
                        { name: "Torna", url: "/hizmetler/torna" },
                        { name: service.title, url: tornaHref(service.slug) },
                    ]}
                />
                <h1 className="mt-2 font-display text-3xl text-atl-text sm:text-4xl">{service.title}</h1>
                <p className="mt-4 text-base leading-relaxed text-atl-muted">{service.intro}</p>

                <h2 className="mt-10 text-xl font-semibold">Hangi işler için</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-atl-muted">
                    {service.uses.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <h2 className="mt-10 text-xl font-semibold">Nasıl çalışılır</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-atl-muted">
                    {service.steps.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ol>

                <h2 className="mt-10 text-xl font-semibold">Kısa sorular</h2>
                <dl className="mt-3 space-y-4">
                    {service.faqs.map((item) => (
                        <div key={item.question}>
                            <dt className="font-semibold text-atl-text">{item.question}</dt>
                            <dd className="mt-1 text-base leading-relaxed text-atl-muted">{item.answer}</dd>
                        </div>
                    ))}
                </dl>

                <p className="mt-10 text-base leading-relaxed text-atl-muted">
                    Adres: 1471 Sokak No:12/A, Alsancak / İzmir. Telefon: {SITE_PHONE_DISPLAY}.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-emerald-600 px-6 text-sm font-semibold text-white">
                        WhatsApp ile yazışma
                    </a>
                    <a href={`tel:${SITE_PHONE_E164}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-atl-line px-5 text-sm font-semibold">
                        <Phone className="h-4 w-4" />
                        {SITE_PHONE_DISPLAY}
                    </a>
                    <Link href="/teklif-al?hizmet=torna" className="inline-flex min-h-12 items-center justify-center bg-atl-brass px-6 text-sm font-semibold text-atl-bg">
                        Fiyat isteği
                    </Link>
                </div>

                <h2 className="mt-12 text-xl font-semibold">İlgili işler</h2>
                <ul className="mt-3 space-y-1">
                    {related.map((item) => (
                        <li key={item.slug}>
                            <Link href={tornaHref(item.slug)} className="inline-flex min-h-11 items-center text-atl-brass-light">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/hizmetler/torna" className="inline-flex min-h-11 items-center text-atl-brass-light">
                            Torna ve yedek parça imalatı
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="inline-flex min-h-11 items-center text-atl-brass-light">
                            Ana sayfa
                        </Link>
                    </li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">Diğer torna işleri</h2>
                <ul className="mt-3 space-y-1">
                    {others.map((item) => (
                        <li key={item.slug}>
                            <Link href={tornaHref(item.slug)} className="inline-flex min-h-11 items-center text-atl-brass-light">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </article>
            <Footer />
        </main>
    );
}
