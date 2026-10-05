import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
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
        description: "1980'den bu yana İzmir Alsancak'ta mikron toleranslı metal presleme, giyotin kesim ve toptan tel imalatı.",
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
        image: "/images/services/dosya-teli.jpg",
        description: "Çift taraflı bükülebilir polimer kaplı veya nikelajlı yüksek elastikiyetli çelik tel. Büro kırtasiye ve arşiv standartlarına %100 uyumludur.",
        specs: [
            { label: "Mekanik Direnç", val: "5.000+ Büküm Direnci" },
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
        image: "/images/services/takvim-teneke.jpg",
        description: "Duvar ve masa takvimleri için ETP tenekeden, kağıdı yırtmayan çift kanal koruyucu büküm radüsü. 20 cm'den 100 cm'ye kadar boy kesim.",
        specs: [
            { label: "Hammadde", val: "ETP Elektrolitik Teneke" },
            { label: "Kıvırma Profili", val: "Çift Kanal Kağıt Koruma" },
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
        image: "/images/services/tef-zili.jpg",
        description: "Müzik aleti üreticileri ve enstrüman atölyeleri için paslanmaz pirinç veya teneke alaşımlı, yüksek rezonans tınlamalı seri pres üretimi.",
        specs: [
            { label: "Hammadde", val: "Pirinç (MS-63), Teneke, Çelik" },
            { label: "Çap Ölçüleri", val: "Standart Ø40 mm, Ø45 mm, Ø50 mm" },
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
        image: "/images/services/magnet-poster.jpg",
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
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            <Navigation />

            {/* Breadcrumb Bar */}
            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            {/* HERO SECTION WITH AUTHENTIC WORKSHOP ASSET */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16 pt-4">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        {/* Heritage Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                            İzmir Alsancak Fabrikası • 1980&apos;den Günümüze
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1]">
                            Yarım Asırlık Zanaat, Mikron Hassasiyetinde Seri Üretim
                        </h1>

                        <p className="text-base md:text-lg text-zinc-600 font-normal leading-relaxed max-w-2xl">
                            İzmir Alsancak 1471 Sokak&apos;taki torna ve pres atölyemizde; ETP Elektrolitik Teneke ve DKP sac hammaddelerinden toptan dosya teli, takvim tenekesi, giyotin sac kesim, rulo dilimleme ve 4K UV baskılı metal levhalar üretiyoruz.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/teklif-al"
                                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02]"
                            >
                                <span>Fiyat & Numune Teklifi Al</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <a
                                href="https://wa.me/905323794003"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold text-sm transition-colors shadow-sm"
                            >
                                <Phone className="w-4 h-4 text-emerald-600" />
                                <span>WhatsApp Usta Hattı</span>
                            </a>
                        </div>

                        {/* Assurance Badges */}
                        <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-zinc-200 text-xs font-mono text-zinc-600">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                                <span>±0.005 mm Kalınlık Hassasiyeti</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-amber-600" />
                                <span>DIN EN 10202 Akredite Hammadde</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                                <span>Aynı Gün Numune Sevkiyatı</span>
                            </div>
                        </div>
                    </div>

                    {/* Authentic Workshop Photo (NO FAKE AI HANGAR) */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xl p-2">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100">
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
                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-1">GÜNLÜK ÜRETİM</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900">50.000+ Adet</div>
                        <div className="text-xs text-zinc-500 mt-1">Dosya Teli & Pres Kapasitesi</div>
                    </div>
                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-1">AVRUPA STANDARDI</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900">DIN EN 10202</div>
                        <div className="text-xs text-zinc-500 mt-1">Sertifikalı ETP Teneke Sac</div>
                    </div>
                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-1">MİKRON ARALIĞI</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900">0.14 - 0.49 mm</div>
                        <div className="text-xs text-zinc-500 mt-1">Hassas Sac Kalınlık Skalası</div>
                    </div>
                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-1">STRATEJİK MERKEZ</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900">Alsancak / İzmir</div>
                        <div className="text-xs text-zinc-500 mt-1">Tüm Türkiye&apos;ye Doğrudan Sevkiyat</div>
                    </div>
                </div>
            </section>

            {/* 6 BENTO CARDS: REAL WORKSHOP PHOTOS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-200">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-2">
                            ENDÜSTRİYEL İMALAT VE FASON KAPASİTE
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                            Sektörel Standartlarda Metal Üretim Hatlarımız
                        </h2>
                    </div>
                    <span className="text-xs font-mono px-3 py-1.5 bg-zinc-100 rounded-lg border border-zinc-300 text-zinc-700 font-semibold self-start md:self-auto">
                        STANDART: ETP / TFS / DKP SAC
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCards.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className="group flex flex-col justify-between bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300"
                            >
                                <div>
                                    {/* Real Local Image */}
                                    <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-200">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes="(min-width:1024px) 380px, 92vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-zinc-900 border border-zinc-200 shadow-sm">
                                            {service.badge}
                                        </div>
                                        <div className="absolute top-3 right-3 bg-amber-600 text-white px-2 py-1 rounded text-[10px] font-mono font-bold shadow-sm">
                                            {service.capacity}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon className="w-5 h-5 text-amber-600 shrink-0" />
                                            <h3 className="text-xl font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                                            {service.description}
                                        </p>

                                        {/* Specs Sub-list */}
                                        <div className="space-y-2 py-3 border-t border-b border-zinc-100 text-xs font-mono">
                                            {service.specs.map((spec, i) => (
                                                <div key={i} className="flex justify-between items-center text-zinc-600">
                                                    <span>{spec.label}:</span>
                                                    <span className="font-semibold text-zinc-900">{spec.val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <Link
                                        href={`/teklif-al?hizmet=${service.slug}`}
                                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-zinc-50 group-hover:bg-amber-600 group-hover:text-white text-zinc-900 font-semibold text-xs transition-colors"
                                    >
                                        <span>Fiyat / Numune Teklifi İste</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* DIN EN 10202 METALLURGICAL SPECIFICATIONS TABLE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-200">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-2">
                            METALURJİK STANDARTLAR VE SERTİFİKALAR
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                            DIN EN 10202 Normları & Mekanik Değerler Tablosu
                        </h2>
                        <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
                            İzmir Alsancak atölyemizde işlenen elektrolitik teneke (ETP) ve TFS malzemelerin Rockwell HR30T sertlik ve kalay kaplama spekleri.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-mono">
                            <thead>
                                <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-900 font-bold uppercase tracking-wider">
                                    <th className="p-4">TEMPER DERECESİ</th>
                                    <th className="p-4">SERTLİK (HR 30T)</th>
                                    <th className="p-4">AKMA DAYANIMI (MPa)</th>
                                    <th className="p-4">KAPLAMA AĞIRLIĞI (g/m²)</th>
                                    <th className="p-4">KALINLIK TOLERANSI</th>
                                    <th className="p-4">KULLANIM ALANI</th>
                                    <th className="p-4 text-right">STOK DURUMU</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 text-zinc-700">
                                {dinSpecs.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                                        <td className="p-4 font-bold text-amber-800 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-600" />
                                            {row.temper}
                                        </td>
                                        <td className="p-4 font-semibold text-zinc-900">{row.hardness}</td>
                                        <td className="p-4">{row.yield}</td>
                                        <td className="p-4">{row.coating}</td>
                                        <td className="p-4">{row.tolerance}</td>
                                        <td className="p-4 font-sans text-xs text-zinc-600">{row.usage}</td>
                                        <td className="p-4 text-right">
                                            <span className="inline-block px-2.5 py-1 rounded bg-zinc-100 text-zinc-900 font-semibold text-[11px] border border-zinc-200">
                                                {row.stock}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-500">
                        <span>* DIN EN 10202 standartlarına göre mikrometre ve Rockwell HR30T sertlik testleri uygulanır.</span>
                        <span className="font-semibold text-zinc-800">Kalite Kontrol: Veral Alsancak Atölyesi</span>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION MODULE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 max-w-2xl text-center lg:text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block">
                            ÖZEL TEKNİK ŞARTNAME & FASON İMALAT
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
                            Projeniz İçin Teknik Resim Gönderin, 24 Saatte Fiyatlandıralım
                        </h2>
                        <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                            CAD, DXF veya PDF teknik çizimlerinizi doğrudan teklif formumuzdan iletin; imalat mühendisimiz ve atölye şefimiz Oğuzcan Veral aynı gün tolerans ve fiyat analizi çıkarsın.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-amber-600/20 transition-all hover:scale-105"
                        >
                            <span>Teklif Formunu Doldur</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:+905323794003"
                            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-900 font-semibold text-sm transition-colors"
                        >
                            <Phone className="w-4 h-4 text-amber-600" />
                            <span>0532 379 40 03</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
