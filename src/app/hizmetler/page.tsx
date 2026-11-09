import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ServiceCard } from "@/components/atolye/ServiceCard";
import {
    ArrowRight,
    CheckCircle2,
    Phone,
    FileText,
    Layers,
    Scissors,
    Disc,
    Bell,
    Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
    title: {
        absolute: "İzmir Dosya Teli, Takvim Tenekesi ve Metal İmalat Hizmetleri | Veral Alsancak",
    },
    description:
        "İzmir Alsancak'ta toptan dosya teli imalatı, takvim tenekesi üretimi, giyotin sac kesim, rulo dilimleme, tef zili ve UV baskılı metal poster. Teklif ve numune için hemen iletişime geçin.",
    keywords: [
        "izmir dosya teli",
        "toptan dosya teli imalatı",
        "takvim tenekesi üreticisi izmir",
        "alsancak metal imalat",
        "giyotin sac kesim izmir",
        "uv metal poster imalatı",
        "tef zili üretimi",
    ],
    alternates: {
        canonical: "https://veralteneketicaret.com/hizmetler",
    },
    openGraph: {
        title: "İzmir Alsancak Metal Üretim Hatları | Veral Teneke Ticaret",
        description:
            "Dosya teli, takvim tenekesi, sac kesim ve UV metal baskı — İzmir Alsancak atölyesinden Türkiye geneline toptan imalat.",
        url: "https://veralteneketicaret.com/hizmetler",
        locale: "tr_TR",
        type: "website",
    },
};

const serviceCards = [
    {
        id: "dosya-teli",
        slug: "dosya-teli",
        title: "Toptan Dosya Teli İmalatı İzmir",
        badge: "İzmir Alsancak",
        capacity: "Toptan sevkiyat",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        description:
            "Kırtasiye, arşiv ve dosya üreticileri için İzmir merkezli toptan dosya teli üretimi. Ölçü ve adede göre teklif hazırlanır.",
        specs: [
            { label: "Kullanım", val: "Dosya & arşiv" },
            { label: "Sipariş", val: "Toptan / seri" },
        ],
        icon: FileText,
    },
    {
        id: "takvim-tenekesi",
        slug: "takvim-tenekesi",
        title: "Takvim Tenekesi Üretimi",
        badge: "Matbaa tedariki",
        capacity: "Askılı / askısız",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        description:
            "Duvar ve gemici takvimleri için teneke çıta imalatı. Matbaa ve yayınevlerine İzmir’den seri üretim ve sevkiyat.",
        specs: [
            { label: "Hedef", val: "Matbaa & yayınevi" },
            { label: "Tip", val: "Askılı / askısız" },
        ],
        icon: Layers,
    },
    {
        id: "giyotin-kesim",
        slug: "giyotin-kesim",
        title: "Giyotin Sac Kesim İzmir",
        badge: "Fason kesim",
        capacity: "Ölçüye özel",
        image: "/images/services/giyotin-kesim.webp",
        description:
            "Alsancak atölyesinde giyotin sac ve teneke ebatlama. Proje ölçülerinize göre fason kesim ve hızlı teslim.",
        specs: [
            { label: "Hizmet", val: "Fason ebatlama" },
            { label: "Lokasyon", val: "Alsancak / İzmir" },
        ],
        icon: Scissors,
    },
    {
        id: "rulo-dilimleme",
        slug: "rulo-dilimleme",
        title: "Rulo Sac Dilimleme",
        badge: "Şerit üretim",
        capacity: "Fason dilme",
        image: "/images/services/rulo-dilimleme.webp",
        description:
            "Rulo sac dilimleme ve şerit açma hizmeti. Üretim hatlarınıza uygun en ve boy planlamasıyla teslim.",
        specs: [
            { label: "Hizmet", val: "Dilme & sarım" },
            { label: "Sipariş", val: "Teklif usulü" },
        ],
        icon: Disc,
    },
    {
        id: "tef-zili",
        slug: "tef-zili",
        title: "Tef Zili İmalatı",
        badge: "Enstrüman sektörü",
        capacity: "Seri pres",
        image: "/images/services/tef-zili-38mm.webp",
        description:
            "Müzik aleti üreticileri için tef zili ve metal pul pres imalatı. İzmir’den toptan tedarik.",
        specs: [
            { label: "Sektör", val: "Müzik aleti" },
            { label: "Üretim", val: "Seri pres" },
        ],
        icon: Bell,
    },
    {
        id: "miknatisli-magnet",
        slug: "miknatisli-magnet",
        title: "UV Baskılı Metal Poster İzmir",
        badge: "Tabela & dekor",
        capacity: "Seri / özel",
        image: "/images/services/metal-tabelalar.webp",
        description:
            "Mıknatıslı metal poster ve kurumsal tabela için UV baskılı metal levha. Kafe, ofis ve promosyon projelerine uygun.",
        specs: [
            { label: "Ürün", val: "Metal poster" },
            { label: "Montaj", val: "Mıknatıslı" },
        ],
        icon: Sparkles,
    },
];

const geoHighlights = [
    {
        title: "İzmir Alsancak üretim",
        text: "Atölyemiz Alsancak’ta; yerinde numune, hızlı iletişim ve kısa sevkiyat mesafesi.",
    },
    {
        title: "Toptan imalat odaklı",
        text: "Dosya teli ve takvim tenekesinde toptan sipariş; ölçü ve adede göre planlı üretim.",
    },
    {
        title: "Türkiye geneli sevkiyat",
        text: "İzmir’den matbaa, kırtasiye ve sanayi müşterilerine kargo veya ambar ile teslim.",
    },
    {
        title: "Teklif + numune",
        text: "Teknik çizim, ölçü veya numune ile fiyatlandırma; WhatsApp ve teklif formu üzerinden.",
    },
];

export default function HizmetlerPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Üretim Hatlarımız", url: "/hizmetler" },
    ];

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Veral İzmir Metal Üretim Hizmetleri",
        itemListElement: serviceCards.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `https://veralteneketicaret.com/hizmetler/${service.slug}`,
            description: service.description,
        })),
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "İzmir Alsancak Metal İmalat Hizmetleri",
        provider: {
            "@type": "LocalBusiness",
            name: "Veral Torna & Teneke Ticaret",
            address: {
                "@type": "PostalAddress",
                streetAddress: "1471 Sokak No:12/A",
                addressLocality: "Alsancak / Konak",
                addressRegion: "İzmir",
                addressCountry: "TR",
            },
        },
        areaServed: {
            "@type": "Country",
            name: "Türkiye",
        },
        serviceType: [
            "Dosya teli imalatı",
            "Takvim tenekesi üretimi",
            "Giyotin sac kesim",
            "UV metal poster baskı",
        ],
        url: "https://veralteneketicaret.com/hizmetler",
    };

    return (
        <main className="min-h-screen bg-atl-bg text-atl-text">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Navigation />

            <div className="mx-auto max-w-7xl px-4 pb-4 pt-28 md:px-8">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 md:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-12">
                    <div className="space-y-6 lg:col-span-7">
                        <div className="inline-flex items-center gap-2 border border-atl-brass/30 bg-atl-brass-tint px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-atl-brass">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-atl-brass" />
                            İzmir Alsancak metal imalat
                        </div>

                        <h1 className="font-display text-3xl leading-[1.1] tracking-tight text-atl-text sm:text-4xl md:text-5xl lg:text-6xl">
                            İzmir&apos;de dosya teli, takvim tenekesi ve metal üretim hatları
                        </h1>

                        <p className="max-w-2xl text-base leading-relaxed text-atl-muted md:text-lg">
                            Veral Torna & Teneke Ticaret; Alsancak atölyesinde toptan dosya teli imalatı, takvim tenekesi üretimi, giyotin sac kesim, rulo dilimleme, tef zili ve UV baskılı metal poster hizmeti sunar. Türkiye geneline sevkiyat yapılır.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/teklif-al"
                                className="inline-flex items-center gap-2.5 bg-atl-brass px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-atl-bg transition-colors hover:bg-atl-brass-light"
                            >
                                <span>İmalat teklifi al</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <a
                                href="https://wa.me/905323794003"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 border border-atl-line bg-atl-surface px-5 py-3.5 text-sm font-semibold text-atl-text transition-colors hover:bg-atl-surface-2"
                            >
                                <Phone className="h-4 w-4 text-emerald-600" />
                                <span>WhatsApp ile sor</span>
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 border-t border-atl-line pt-4 text-sm text-atl-muted">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-atl-brass" />
                                <span>İzmir Alsancak üretim</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-atl-brass" />
                                <span>Toptan / fason imalat</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-atl-brass" />
                                <span>Numune ve teklif desteği</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative lg:col-span-5">
                        <div className="relative overflow-hidden border border-atl-line bg-atl-surface p-2 shadow-xl">
                            <div className="relative aspect-[4/3] overflow-hidden bg-atl-surface-2">
                                <Image
                                    src="/images/services/giyotin-kesim.webp"
                                    alt="İzmir Alsancak Veral metal imalat atölyesi giyotin kesim hattı"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 500px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5">
                                    <span className="mb-1 text-[11px] font-bold uppercase tracking-wider text-atl-brass">
                                        Alsancak / İzmir · Aktif üretim
                                    </span>
                                    <p className="text-xs font-medium leading-relaxed text-white">
                                        1471 Sokak No:12/A Alsancak — dosya teli ve teneke imalat atölyesi
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {geoHighlights.map((item) => (
                        <div key={item.title} className="border border-atl-line bg-atl-surface p-5 shadow-sm">
                            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-atl-brass">{item.title}</div>
                            <p className="text-sm leading-relaxed text-atl-muted">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl border-t border-atl-line px-4 py-16 md:px-8">
                <div className="mb-10 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
                    <div>
                        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-atl-brass">
                            Üretim hatlarımız
                        </span>
                        <h2 className="font-display text-2xl tracking-tight text-atl-text sm:text-4xl">
                            İzmir Alsancak metal imalat hizmetleri
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm text-atl-muted md:text-base">
                            Altı ana hat: dosya teli, takvim tenekesi, giyotin kesim, rulo dilimleme, tef zili ve UV metal baskı.
                        </p>
                    </div>
                    <Link
                        href="/teklif-al"
                        className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.16em] text-atl-brass-light hover:text-atl-text md:self-auto"
                    >
                        Teklif al <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {serviceCards.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            {...service}
                            priority={index < 3}
                            ctaLabel="Teklif iste"
                        />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
                <div className="flex flex-col items-center justify-between gap-8 border border-atl-line bg-atl-surface p-8 shadow-sm md:p-12 lg:flex-row">
                    <div className="max-w-2xl space-y-3 text-center lg:text-left">
                        <span className="block text-xs font-bold uppercase tracking-widest text-atl-brass">
                            İzmir metal imalat teklifi
                        </span>
                        <h2 className="font-display text-2xl text-atl-text sm:text-3xl">
                            Dosya teli veya takvim tenekesi siparişiniz için teklif alın
                        </h2>
                        <p className="text-sm leading-relaxed text-atl-muted">
                            Ölçü, adet veya numune bilgisini gönderin; Alsancak atölyemizden yazılı teklif ve termin dönüşü yapalım.
                        </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-4">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 bg-atl-brass px-8 py-4 text-sm font-bold uppercase tracking-wider text-atl-bg transition-colors hover:bg-atl-brass-light"
                        >
                            <span>Teklif formu</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                            href="tel:+905323794003"
                            className="inline-flex items-center gap-2 border border-atl-line px-6 py-4 text-sm font-semibold text-atl-text transition-colors hover:bg-atl-surface-2"
                        >
                            <Phone className="h-4 w-4 text-atl-brass" />
                            <span>0532 379 40 03</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
