"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { ServiceCard } from "@/components/atolye/ServiceCard";

const serviceCards = [
    {
        id: "dosya-teli",
        slug: "dosya-teli",
        title: "Toptan Dosya Teli İmalatı",
        badge: "14–24 cm ve akrep tel",
        capacity: "Teklif usulü",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        description: "Dosya teli. Boylar: 14, 15, 17, 21, 24 cm ve akrep tel.",
        metric: null,
    },
    {
        id: "takvim-tenekesi",
        slug: "takvim-tenekesi",
        title: "Takvim Tenekesi & Çıtası İmalatı",
        badge: "31, 33 ve 48 cm",
        capacity: "ASKILI / ASKISIZ",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        description: "Takvim tenekesi. Boylar: 31, 33 ve 48 cm.",
        metric: "Toptan / Seri Üretim",
    },
    {
        id: "giyotin-kesim",
        slug: "giyotin-kesim",
        title: "Giyotin Sac & Teneke Kesim",
        badge: "Ölçüye göre",
        capacity: "Teklif usulü",
        image: "/images/services/giyotin-kesim.webp",
        description: "Sac ve tenekeyi ölçüye göre keseriz.",
        metric: "Sıfır Çapak & Dik Gönye",
    },
    {
        id: "rulo-dilimleme",
        slug: "rulo-dilimleme",
        title: "Rulo Sac Dilimleme & Şerit Açma",
        badge: "Eni siz yazın",
        capacity: "RULO ŞERİT SAC",
        image: "/images/services/rulo-dilimleme.webp",
        description: "Rulo sacı şerit halinde dilimleriz.",
        metric: "Teklif usulü",
    },
    {
        id: "tef-zili",
        slug: "tef-zili",
        title: "Tef Zili Pres İmalatı",
        badge: "Yüksek Hızlı Eksantrik",
        capacity: "AKUSTİK PERFORMANS",
        image: "/images/services/tef-zili-38mm.webp",
        description: "Tef zili. Sitedeki ölçüde çap 38 mm.",
        metric: "Ø38 mm Çap",
    },
    {
        id: "miknatisli-magnet",
        slug: "miknatisli-magnet",
        title: "Mıknatıslı UV Baskılı Metal Levha",
        badge: "1.5 mm Sac • 4K UV",
        capacity: "SERİ & ÖZEL BASKI",
        image: "/images/services/metal-tabelalar.webp",
        description: "Metal levhaya baskı. Mıknatıslı poster de vardır.",
        metric: "Teklif usulü",
    },
];

export const ServicesHomeSection = () => {
    return (
        <DirectEdit tab="other-services">
            <section id="hizmetler" className="scroll-mt-24 border-b border-atl-line bg-atl-bg py-20 lg:py-28">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="Üretim hatlarımız"
                            title="Hassas Metal İşleme & Toptan İmalat"
                            description="İzmir Alsancak atölyemizde dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve UV baskılı metal levha üretiyoruz."
                        />
                        <Link href="/hizmetler" className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light hover:text-atl-text md:self-auto">
                            Tüm hatlar ve spekler <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
                        {serviceCards.map((service) => (
                            <ServiceCard key={service.id} {...service} ctaLabel="Fiyat Teklifi Al" />
                        ))}
                    </div>
                    <p className="mt-10 border-t border-atl-line pt-6 font-mono text-xs text-atl-muted">
                        Ölçüyü ve adedi yazın. Fiyatı söyleyelim.
                    </p>
                </div>
            </section>
        </DirectEdit>
    );
};
