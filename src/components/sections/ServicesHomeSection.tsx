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
        badge: "DIN EN 10202 • 0.20-0.35 mm",
        capacity: "50.000 ADET / GÜN",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        description: "Çift taraflı bükülebilir polimer kaplı veya parlak nikelajlı çelik tel. Büro kırtasiye ve resmi arşiv mukavemet standartlarına %100 uyumludur.",
        metric: null,
    },
    {
        id: "takvim-tenekesi",
        slug: "takvim-tenekesi",
        title: "Takvim Tenekesi & Çıtası İmalatı",
        badge: "TH-415 / TH-550 • ETP",
        capacity: "ASKILI / ASKISIZ",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        description: "Duvar takvimlerinin (özellikle gemici ve yapraklı blok takvimlerin) karton veya sert zeminlerine, üst veya alt kısımlarına geçirilen, takvimin duvarda dik ve düzgün durmasını sağlayan, kenarlarını koruyan ve asma deliği barındıran metal çıta / profil parçasıdır. Toptan / seri üretim.",
        metric: "Toptan / Seri Üretim",
    },
    {
        id: "giyotin-kesim",
        slug: "giyotin-kesim",
        title: "Giyotin Sac & Teneke Kesim",
        badge: "0.15 - 3.00 mm Kalınlık",
        capacity: "TOLERANS ±0.05 MM",
        image: "/images/services/giyotin-kesim.webp",
        description: "CNC dijital arka dayamalı giyotin makas hatlarımız ile çapaksız, gönyesinde ve sacın düzlemsel geometrisini bozmadan hassas levha kesimi.",
        metric: "Sıfır Çapak & Dik Gönye",
    },
    {
        id: "rulo-dilimleme",
        slug: "rulo-dilimleme",
        title: "Rulo Sac Dilimleme & Şerit Açma",
        badge: "Min. 8 mm Dilme Eni",
        capacity: "RULO ŞERİT SAC",
        image: "/images/services/rulo-dilimleme.webp",
        description: "Hassas dairesel çelik bıçaklı slitting hatlarında, müşteri teknik şartnamesine uygun mikron toleranslı şerit rulo açma, dilme ve sarım.",
        metric: "±0.08 mm Genişlik Toleransı",
    },
    {
        id: "tef-zili",
        slug: "tef-zili",
        title: "Tef Zili Pres İmalatı",
        badge: "Yüksek Hızlı Eksantrik",
        capacity: "AKUSTİK PERFORMANS",
        image: "/images/services/tef-zili-38mm.webp",
        description: "Enstrüman üreticileri için paslanmaz pirinç veya teneke alaşımlı, yüksek rezonans tınlamalı seri formlanmış pres üretimi.",
        metric: "Ø38 mm Çap",
    },
    {
        id: "miknatisli-magnet",
        slug: "miknatisli-magnet",
        title: "Mıknatıslı UV Baskılı Metal Levha",
        badge: "1.5 mm Sac • 4K UV",
        capacity: "SERİ & ÖZEL BASKI",
        image: "/images/services/metal-tabelalar.webp",
        description: "Endüstriyel 1200 DPI piezoelektrik UV baskı ve çizilmeye dayanıklı çift kat mat vernik. Mıknatıslı montaj sistemi ile seri kurumsal üretim.",
        metric: "10 Yıl Renk Canlılığı",
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
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {serviceCards.map((service) => (
                            <ServiceCard key={service.id} {...service} ctaLabel="Fiyat Teklifi Al" />
                        ))}
                    </div>
                    <p className="mt-10 border-t border-atl-line pt-6 font-mono text-xs text-atl-muted">
                        Hammadde: DIN EN 10202 normlu elektrolitik teneke (ETP). Ölçü ve kalınlık, numune üzerinden birlikte doğrulanır.
                    </p>
                </div>
            </section>
        </DirectEdit>
    );
};
