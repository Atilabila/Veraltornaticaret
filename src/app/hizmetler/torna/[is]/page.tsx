import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { absUrl, SITE_ORIGIN, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from "@/lib/site";
import { TORNA_SERVICES, tornaHref } from "@/lib/public-copy";
import { Phone } from "lucide-react";

type PageProps = { params: Promise<{ is: string }> };

export function generateStaticParams() {
    return TORNA_SERVICES.map((item) => ({ is: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { is } = await params;
    const service = TORNA_SERVICES.find((item) => item.slug === is);
    if (!service) return { title: "Sayfa bulunamadı" };
    const description = `${service.text} Adres: 1471 Sokak No:12/A, Alsancak / İzmir.`;
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
    const service = TORNA_SERVICES.find((item) => item.slug === is);
    if (!service) notFound();

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.text,
        url: absUrl(tornaHref(service.slug)),
        areaServed: "Alsancak, İzmir",
        provider: {
            "@type": "LocalBusiness",
            name: "Veral Torna & Teneke Ticaret",
            url: SITE_ORIGIN,
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

    const others = TORNA_SERVICES.filter((item) => item.slug !== service.slug);

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
                <p className="mt-4 text-base leading-relaxed text-atl-muted">{service.text}</p>
                <p className="mt-4 text-base leading-relaxed text-atl-muted">
                    Adresimiz 1471 Sokak No:12/A, Alsancak / İzmir. Telefonumuz 0507 165 13 15.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/teklif-al?hizmet=torna" className="inline-flex min-h-12 items-center justify-center bg-atl-brass px-6 text-sm font-semibold text-atl-bg">
                        Fiyat isteği
                    </Link>
                    <a href={`tel:${SITE_PHONE_E164}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-atl-line px-5 text-sm font-semibold">
                        <Phone className="h-4 w-4" />
                        {SITE_PHONE_DISPLAY}
                    </a>
                </div>
                <h2 className="mt-12 text-xl font-semibold">Diğer torna işleri</h2>
                <ul className="mt-4 space-y-2">
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
