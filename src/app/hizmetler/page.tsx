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
    ShieldCheck,
    Phone,
    SlidersHorizontal,
    FileText,
    Layers,
    Scissors,
    Disc,
    Bell,
    Sparkles,
    Download
} from "lucide-react";

export const metadata: Metadata = {
    title: "Üretim Hatları ve Metal İşleme Hizmetlerimiz | Veral Teneke Ticaret İzmir",
    description: "İzmir Alsancak tesislerimizde toptan dosya teli, takvim tenekesi, giyotin sac kesim, rulo dilimleme, tef zili ve UV baskılı mıknatıslı metal levha imalatı. DIN EN 10202 standartlarında seri üretim.",
    alternates: {
        canonical: "https://veralteneketicaret.com/hizmetler",
    },
    openGraph: {
        title: "Endüstriyel Üretim Hatlarımız | Veral Teneke Ticaret İzmir",
        description: "İzmir Alsancak'ta metal presleme, giyotin kesim ve toptan tel imalatı.",
        url: "https://veralteneketicaret.com/hizmetler",
    },
};

const serviceCards = [
    {
        id: "dosya-teli",
        slug: "dosya-teli",
        title: "Toptan Dosya Teli İmalatı",
        badge: "DIN EN 10202 • 0.20-0.35 mm",
        capacity: "50.000 ADET / GÜN",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        description: "Çift taraflı bükülebilir polimer kaplı veya nikelajlı yüksek elastikiyetli çelik tel. Büro kırtasiye ve arşiv standartlarına %100 uyumludur.",
        specs: [
            { label: "Yüzey Kaplama", val: "Polimer / Parlak Nikelaj" },
            { label: "Ambalaj", val: "1.000'lik Koliler & Paletli Sevkiyat" },
        ],
        icon: FileText,
    },
    {
        id: "takvim-tenekesi",
        slug: "takvim-tenekesi",
        title: "Takvim Tenekesi & Çıtası İmalatı",
        badge: "TH-415 / TH-550 • ETP",
        capacity: "ASKILI / ASKISIZ",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        description: "Duvar takvimlerinin (özellikle gemici ve yapraklı blok takvimlerin) karton veya sert zeminlerine, üst veya alt kısımlarına geçirilen, takvimin duvarda dik ve düzgün durmasını sağlayan, kenarlarını koruyan ve asma deliği barındıran metal çıta / profil parçasıdır. Toptan / seri üretim.",
        specs: [
            { label: "Hammadde", val: "ETP Elektrolitik Teneke" },
            { label: "Üretim", val: "Toptan / Seri Üretim" },
            { label: "Standart Boylar", val: "20 cm - 100 cm Boy Kesim" },
        ],
        icon: Layers,
    },
    {
        id: "giyotin-kesim",
        slug: "giyotin-kesim",
        title: "Giyotin Sac & Teneke Ebatlama",
        badge: "0.15 - 3.00 mm Kalınlık",
        capacity: "TOLERANS ±0.05 MM",
        image: "/images/services/giyotin-kesim.webp",
        description: "CNC dijital arka dayamalı giyotin makas hatlarımız ile çapaksız, gönyesinde ve sacın düzlemsel geometrisini bozmadan hassas levha kesimi.",
        specs: [
            { label: "Maksimum Ebat", val: "3.000 mm Boy Kesim" },
            { label: "Kenar Kalitesi", val: "Sıfır Çapak & Dik Gönye" },
            { label: "Malzeme Türü", val: "Teneke, Galvaniz, Paslanmaz, DKP" },
        ],
        icon: Scissors,
    },
    {
        id: "rulo-dilimleme",
        slug: "rulo-dilimleme",
        title: "Rulo Sac Dilimleme & Şerit Açma",
        badge: "Min. 8 mm Dilme Eni",
        capacity: "RULO ŞERİT SAC",
        image: "/images/services/rulo-dilimleme.webp",
        description: "Hassas dairesel çelik bıçaklı slitting hatlarında, müşteri teknik şartnamesine uygun mikron toleranslı şerit rulo açma, dilme ve sarım.",
        specs: [
            { label: "Genişlik Hassasiyeti", val: "±0.08 mm Tolerans" },
            { label: "İç Çap Seçenekleri", val: "Ø300 mm / Ø400 mm / Ø508 mm" },
            { label: "Ambalaj Güvencesi", val: "Neme Dayanıklı Çemberli Palet" },
        ],
        icon: Disc,
    },
    {
        id: "tef-zili",
        slug: "tef-zili",
        title: "Tef Zili & Metal Pul Pres İmalatı",
        badge: "Yüksek Hızlı Eksantrik",
        capacity: "AKUSTİK PERFORMANS",
        image: "/images/services/tef-zili-38mm.webp",
        description: "Müzik aleti üreticileri ve enstrüman atölyeleri için paslanmaz pirinç veya teneke alaşımlı, yüksek rezonans tınlamalı seri pres üretimi.",
        specs: [
            { label: "Hammadde", val: "Pirinç (MS-63), Teneke, Çelik" },
            { label: "Çap Ölçüsü", val: "Ø38 mm Çap" },
            { label: "Yüzey Formu", val: "Polisajlı Parlak / Çapaksız Delik" },
        ],
        icon: Bell,
    },
    {
        id: "miknatisli-magnet",
        slug: "miknatisli-magnet",
        title: "Mıknatıslı UV Baskılı Metal Levha & Poster",
        badge: "1.5 mm Çelik Sac • 4K UV",
        capacity: "SERİ & ÖZEL BASKI",
        image: "/images/services/metal-tabelalar.webp",
        description: "Endüstriyel 1200 DPI piezoelektrik UV baskı ve çizilmeye dayanıklı çift kat mat vernik kürleme. Duvarı delmeden tutan N35 neodimyum mıknatıs askı kiti.",
        specs: [
            { label: "Baskı Teknolojisi", val: "4K Endüstriyel UV Kürleme" },
            { label: "Askı Sistemi", val: "3M VHB Manyetik Neodimyum" },
            { label: "Ömür Garantisi", val: "10 Yıl Güneş Işığında Solmama" },
        ],
        icon: Sparkles,
    },
];

const dinSpecs = [
    {
        temper: "TH-415 (T-52)",
        hardness: "52 ± 4",
        yield: "350 - 450",
        coating: "1.1 / 1.1 - 2.8 / 2.8",
        tolerance: "± 0.005 mm",
        usage: "Dosya teli, derin çekme kapaklar, bükümlü sac klipsler",
        stock: "Alsancak Hazır Stok",
    },
    {
        temper: "TH-520 (T-61)",
        hardness: "61 ± 4",
        yield: "450 - 550",
        coating: "2.8 / 2.8 - 5.6 / 5.6",
        tolerance: "± 0.006 mm",
        usage: "Takvim tenekesi, kıvırma profilleri, koruyucu gövdeler",
        stock: "Alsancak Hazır Stok",
    },
    {
        temper: "TH-550 (T-65)",
        hardness: "65 ± 4",
        yield: "520 - 620",
        coating: "5.6 / 5.6 - 11.2 / 11.2",
        tolerance: "± 0.007 mm",
        usage: "Tef zili, mukavim konserve gövdesi, yaylı parçalar",
        stock: "Alsancak Hazır Stok",
    },
    {
        temper: "TFS / ECCS",
        hardness: "57 - 65",
        yield: "420 - 580",
        coating: "Krom / Krom Oksit",
        tolerance: "± 0.005 mm",
        usage: "Endüstriyel kapaklar, laklı paneller, özel pres parçalar",
        stock: "Sipariş Üzerine",
    },
];

export default function HizmetlerPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Üretim Hatlarımız", url: "/hizmetler" },
    ];

    return (
        <main className="min-h-screen bg-atl-bg text-atl-text">
            <Navigation />

            {/* Breadcrumb Bar */}
            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            {/* HERO SECTION WITH AUTHENTIC WORKSHOP ASSET */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16 pt-4">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        {/* Heritage Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-atl-brass/30 bg-atl-brass-tint text-atl-brass text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-atl-brass animate-pulse" />
                            İzmir Alsancak Atölyesi
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-atl-text tracking-tight leading-[1.1]">
                            Alsancak Atölyesinde Toptan Metal İmalatı
                        </h1>

                        <p className="text-base md:text-lg text-atl-muted font-normal leading-relaxed max-w-2xl">
                            İzmir Alsancak 1471 Sokak&apos;taki torna ve pres atölyemizde; ETP Elektrolitik Teneke ve DKP sac hammaddelerinden toptan dosya teli, takvim tenekesi, giyotin sac kesim, rulo dilimleme ve 4K UV baskılı metal levhalar üretiyoruz.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/teklif-al"
                                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold text-sm tracking-wider uppercase shadow-md shadow-black/20 transition-all hover:scale-[1.02]"
                            >
                                <span>Fiyat & Numune Teklifi Al</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <a
                                href="https://wa.me/905323794003"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl border border-atl-line bg-atl-surface hover:bg-atl-surface-2 text-atl-text font-semibold text-sm transition-colors shadow-sm"
                            >
                                <Phone className="w-4 h-4 text-emerald-600" />
                                <span>WhatsApp Usta Hattı</span>
                            </a>
                        </div>

                        {/* Assurance Badges */}
                        <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-atl-line text-xs font-mono text-atl-muted">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-atl-brass" />
                                <span>±0.005 mm Kalınlık Hassasiyeti</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-atl-brass" />
                                <span>DIN EN 10202 Akredite Hammadde</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-atl-brass" />
                                <span>Aynı Gün Numune Sevkiyatı</span>
                            </div>
                        </div>
                    </div>

                    {/* Authentic Workshop Photo (NO FAKE AI HANGAR) */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-atl-line bg-atl-surface shadow-xl p-2">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-atl-surface-2">
                                <Image
                                    src="/images/services/giyotin-kesim.webp"
                                    alt="Veral Teneke Ticaret İzmir Alsancak Giyotin Kesim ve Pres Hatları"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 500px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                                            ALSANCAK ATÖLYESİ · AKTİF İMALAT
                                        </span>
                                    </div>
                                    <p className="text-white text-xs font-medium leading-relaxed">
                                        1471 Sokak No:12/A Alsancak / İzmir · Mekanik torna ve CNC giyotin makas tezgahları
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    <div className="p-5 rounded-xl bg-atl-surface border border-atl-line shadow-sm">
                        <div className="text-xs font-mono font-bold text-atl-brass uppercase tracking-wider mb-1">GÜNLÜK ÜRETİM</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-atl-text">50.000+ Adet</div>
                        <div className="text-xs text-atl-muted mt-1">Dosya Teli & Pres Kapasitesi</div>
                    </div>
                    <div className="p-5 rounded-xl bg-atl-surface border border-atl-line shadow-sm">
                        <div className="text-xs font-mono font-bold text-atl-brass uppercase tracking-wider mb-1">AVRUPA STANDARDI</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-atl-text">DIN EN 10202</div>
                        <div className="text-xs text-atl-muted mt-1">Sertifikalı ETP Teneke Sac</div>
                    </div>
                    <div className="p-5 rounded-xl bg-atl-surface border border-atl-line shadow-sm">
                        <div className="text-xs font-mono font-bold text-atl-brass uppercase tracking-wider mb-1">MİKRON ARALIĞI</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-atl-text">0.14 - 0.49 mm</div>
                        <div className="text-xs text-atl-muted mt-1">Hassas Sac Kalınlık Skalası</div>
                    </div>
                    <div className="p-5 rounded-xl bg-atl-surface border border-atl-line shadow-sm">
                        <div className="text-xs font-mono font-bold text-atl-brass uppercase tracking-wider mb-1">STRATEJİK MERKEZ</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-atl-text">Alsancak / İzmir</div>
                        <div className="text-xs text-atl-muted mt-1">Tüm Türkiye&apos;ye Doğrudan Sevkiyat</div>
                    </div>
                </div>
            </section>

            {/* 6 BENTO CARDS: REAL WORKSHOP PHOTOS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-atl-line">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-atl-brass block mb-2">
                            ENDÜSTRİYEL İMALAT VE FASON KAPASİTE
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-atl-text tracking-tight">
                            Sektörel Standartlarda Metal Üretim Hatlarımız
                        </h2>
                    </div>
                    <span className="text-xs font-mono px-3 py-1.5 bg-atl-surface-2 rounded-lg border border-atl-line text-atl-muted font-semibold self-start md:self-auto">
                        STANDART: ETP / TFS / DKP SAC
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCards.map((service) => (
                        <ServiceCard key={service.id} {...service} ctaLabel="Fiyat / Numune Teklifi İste" />
                    ))}
                </div>
            </section>

            {/* DIN EN 10202 METALLURGICAL SPECIFICATIONS TABLE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-atl-line">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-atl-brass block mb-2">
                            METALURJİK STANDARTLAR VE SERTİFİKALAR
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-atl-text tracking-tight">
                            DIN EN 10202 Normları & Mekanik Değerler Tablosu
                        </h2>
                        <p className="text-sm text-atl-muted mt-1 max-w-2xl">
                            İzmir Alsancak atölyemizde işlenen elektrolitik teneke (ETP) ve TFS malzemelerin Rockwell HR30T sertlik ve kalay kaplama spekleri.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-atl-line bg-atl-surface overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-mono">
                            <thead>
                                <tr className="bg-atl-surface-2/80 border-b border-atl-line text-atl-text font-bold uppercase tracking-wider">
                                    <th className="p-4">TEMPER DERECESİ</th>
                                    <th className="p-4">SERTLİK (HR 30T)</th>
                                    <th className="p-4">AKMA DAYANIMI (MPa)</th>
                                    <th className="p-4">KAPLAMA AĞIRLIĞI (g/m²)</th>
                                    <th className="p-4">KALINLIK TOLERANSI</th>
                                    <th className="p-4">KULLANIM ALANI</th>
                                    <th className="p-4 text-right">STOK DURUMU</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-atl-line text-atl-muted">
                                {dinSpecs.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-atl-brass-tint/40 transition-colors">
                                        <td className="p-4 font-bold text-atl-brass flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-atl-brass" />
                                            {row.temper}
                                        </td>
                                        <td className="p-4 font-semibold text-atl-text">{row.hardness}</td>
                                        <td className="p-4">{row.yield}</td>
                                        <td className="p-4">{row.coating}</td>
                                        <td className="p-4">{row.tolerance}</td>
                                        <td className="p-4 font-sans text-xs text-atl-muted">{row.usage}</td>
                                        <td className="p-4 text-right">
                                            <span className="inline-block px-2.5 py-1 rounded bg-atl-surface-2 text-atl-text font-semibold text-[11px] border border-atl-line">
                                                {row.stock}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-atl-surface-2 border-t border-atl-line flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-atl-muted">
                        <span>* DIN EN 10202 standartlarına göre mikrometre ve Rockwell HR30T sertlik testleri uygulanır.</span>
                        <span className="font-semibold text-atl-text">Kalite Kontrol: Veral Alsancak Atölyesi</span>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION MODULE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">
                <div className="rounded-3xl border border-atl-line bg-atl-surface p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 max-w-2xl text-center lg:text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-atl-brass block">
                            ÖZEL TEKNİK ŞARTNAME & FASON İMALAT
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-atl-text">
                            Projeniz İçin Teknik Resim Gönderin, 24 Saatte Fiyatlandıralım
                        </h2>
                        <p className="text-sm text-atl-muted leading-relaxed font-normal">
                            CAD, DXF veya PDF teknik çizimlerinizi doğrudan teklif formumuzdan iletin; imalat mühendisimiz ve atölye şefimiz Oğuzcan Veral aynı gün tolerans ve fiyat analizi çıkarsın.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold text-sm tracking-wider uppercase shadow-md shadow-black/20 transition-all hover:scale-105"
                        >
                            <span>Teklif Formunu Doldur</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:+905323794003"
                            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-atl-line hover:bg-atl-surface-2 text-atl-text font-semibold text-sm transition-colors"
                        >
                            <Phone className="w-4 h-4 text-atl-brass" />
                            <span>0532 379 40 03</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
