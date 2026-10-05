"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

const serviceCards = [
    {
        id: "dosya-teli",
        slug: "dosya-teli",
        title: "Toptan Dosya Teli İmalatı",
        badge: "DIN EN 10202 • 0.20-0.35 mm",
        capacity: "50.000 ADET / GÜN",
        image: "/images/services/dosya-teli.jpg",
        description: "Çift taraflı bükülebilir polimer kaplı veya parlak nikelajlı çelik tel. Büro kırtasiye ve resmi arşiv mukavemet standartlarına %100 uyumludur.",
        metric: "5.000+ Büküm Direnci",
    },
    {
        id: "takvim-tenekesi",
        slug: "takvim-tenekesi",
        title: "Takvim Tenekesi & Çıtası İmalatı",
        badge: "TH-415 / TH-550 • ETP",
        capacity: "ASKILI / ASKISIZ",
        image: "/images/services/takvim-teneke.jpg",
        description: "Duvar ve masa takvimleri için ETP tenekeden, kağıdı yırtmayan çift kanal koruyucu büküm radüsü. 20 cm'den 100 cm'ye kadar boy kesim.",
        metric: "Çift Kanal Kağıt Koruma",
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
        image: "/images/services/tef-zili.jpg",
        description: "Enstrüman üreticileri için paslanmaz pirinç veya teneke alaşımlı, yüksek rezonans tınlamalı seri formlanmış pres üretimi.",
        metric: "Ø40, Ø45, Ø50 mm Formlar",
    },
    {
        id: "miknatisli-magnet",
        slug: "miknatisli-magnet",
        title: "Mıknatıslı UV Baskılı Metal Levha",
        badge: "1.5 mm Sac • 4K UV",
        capacity: "SERİ & ÖZEL BASKI",
        image: "/images/services/magnet-poster.jpg",
        description: "Endüstriyel 1200 DPI piezoelektrik UV baskı ve çizilmeye dayanıklı çift kat mat vernik. Mıknatıslı montaj sistemi ile seri kurumsal üretim.",
        metric: "10 Yıl Renk Canlılığı",
    },
];

export const ServicesHomeSection = () => {
    return (
        <DirectEdit tab="other-services">
            <section
                id="hizmetler"
                className="py-16 lg:py-24 bg-[#fafafa] text-[#161616] border-b border-[#e5e7eb] scroll-mt-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 mb-3">
                                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                                Endüstriyel İmalat Hatlarımız
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                                Hassas Metal İşleme & Toptan İmalat
                            </h2>
                            <p className="text-base md:text-lg text-zinc-600 mt-3 font-normal leading-relaxed">
                                İzmir Alsancak atölyemizde dosya teli, takvim tenekesi, giyotin sac kesim ve 4K UV baskılı metal parçaları mikron toleransıyla üretiyoruz.
                            </p>
                        </div>

                        <Link
                            href="/hizmetler"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold text-xs tracking-wider uppercase self-start md:self-auto shadow-sm transition-colors"
                        >
                            <span>Tüm Hatları & Spekleri İncele</span>
                            <ArrowRight className="w-4 h-4 text-amber-600" />
                        </Link>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceCards.map((service) => (
                            <div
                                key={service.id}
                                className="group flex flex-col justify-between bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300"
                            >
                                <div>
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
                                        <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-700 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-600/20">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                                            {service.metric}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <Link
                                        href={`/teklif-al?hizmet=${service.slug}`}
                                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-zinc-50 group-hover:bg-amber-600 group-hover:text-white text-zinc-900 font-semibold text-xs transition-colors"
                                    >
                                        <span>Fiyat Teklifi Al</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Guidance */}
                    <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                            <p className="text-sm text-zinc-700">
                                Tüm üretimlerimiz <strong className="text-zinc-900">DIN EN 10202</strong> Avrupa metalurji normlarına ve <strong className="text-zinc-900">ISO 9001:2015</strong> kalite yönetim sistemine uygundur.
                            </p>
                        </div>
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
                        >
                            <span>Hızlı Teklif Formu</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
