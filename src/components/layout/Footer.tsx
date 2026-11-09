"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { DirectEdit } from "@/components/admin/DirectEdit";
import { PageContainer } from '@/components/layout/PageContainer';
import { BrassRule } from '@/components/atolye/BrassRule';

const KURUMSAL = [
    { label: 'Anasayfa', href: '/' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
    { label: 'Teklif Al', href: '/teklif-al' },
    { label: 'Blog', href: '/blog' },
    { label: 'KVKK', href: '/kvkk' },
    { label: 'Çerez Politikası', href: '/cerez' },
];

const URUN_GRUPLARI = [
    { label: 'Dosya Teli', href: '/hizmetler/dosya-teli' },
    { label: 'Takvim Tenekesi', href: '/hizmetler/takvim-tenekesi' },
    { label: 'Sac Kesim & Dilimleme', href: '/hizmetler' },
    { label: 'Özel / UV Metal Baskı', href: '/hizmetler/miknatisli-magnet' },
];

const LEGAL = [
    { label: 'Mesafeli Satış', href: '/mesafeli-satis' },
    { label: 'Gizlilik', href: '/gizlilik' },
    { label: 'KVKK', href: '/kvkk' },
];

export const Footer = () => {
    const { content } = useContentStore();
    const siteName = content.siteName || "VERAL";
    const instagramHandle = (content.footerInstagram || "").replace('@', '').trim();
    const socialLinks = [
        instagramHandle ? { icon: Instagram, href: `https://instagram.com/${instagramHandle}`, label: "Instagram" } : null,
        { icon: Facebook, href: '#', label: "Facebook" },
        { icon: Twitter, href: '#', label: "Twitter" }
    ].filter(Boolean) as { icon: typeof Instagram; href: string; label: string }[];

    return (
        <DirectEdit tab="contact">
            <footer className="atl-grain border-t border-atl-line bg-atl-bg pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-10 text-atl-text sm:pt-16 lg:pb-10">
                <PageContainer>
                    <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-12 sm:gap-10 md:grid-cols-2 lg:grid-cols-12">
                        <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-4">
                            <Link href="/" className="group flex items-center gap-3 sm:gap-4">
                                <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14">
                                    <Image src="/veral-logo-nav.png" alt={siteName} fill sizes="56px" className="object-cover" unoptimized />
                                </span>
                                <span className="flex flex-col">
                                    <span className="font-display text-xl tracking-wide sm:text-2xl">{siteName}</span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-atl-muted">Torna & Teneke Ticaret</span>
                                </span>
                            </Link>
                            <p className="max-w-sm text-sm leading-relaxed text-atl-muted sm:text-base">
                                İzmir merkezli toptan dosya teli imalatı, takvim tenekesi seri üretimi ve özel metal imalat.
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.filter((item) => item.href.trim() !== "" && item.href.trim() !== "#").map((item, i) => (
                                    <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label} sayfamız`}
                                        className="flex h-11 w-11 items-center justify-center border border-atl-line text-atl-muted transition-colors hover:border-atl-brass hover:text-atl-brass-light">
                                        <item.icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 sm:contents">
                        <div className="lg:col-span-2">
                            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass sm:mb-6">Kurumsal</h4>
                            <ul className="flex flex-col gap-1 sm:gap-3">
                                {KURUMSAL.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="group inline-flex min-h-10 items-center gap-2 text-sm text-atl-text transition-colors hover:text-atl-brass-light">
                                            {item.label}
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass sm:mb-6">Ürün Gruplarımız</h4>
                            <ul className="flex flex-col gap-1 sm:gap-3">
                                {URUN_GRUPLARI.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="group inline-flex min-h-10 items-center gap-2 text-sm text-atl-text transition-colors hover:text-atl-brass-light">
                                            {item.label}
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </div>

                        <div className="flex flex-col gap-6 lg:col-span-3">
                            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">İletişim Bilgilerimiz</h4>
                            <div className="space-y-1">
                                <div className="font-display text-2xl">{content.footerPhone}</div>
                                <a
                                    href={`mailto:${content.footerEmail || "veraltornatic@hotmail.com"}`}
                                    className="text-sm text-atl-muted transition-colors hover:text-atl-brass-light"
                                >
                                    {content.footerEmail || "veraltornatic@hotmail.com"}
                                </a>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">Merkez & Atölye</span>
                                <span className="whitespace-pre-line text-sm text-atl-text">{content.footerAddress}</span>
                            </div>
                            <a href={content.footerMapLink || `https://www.google.com/maps/dir/?api=1&destination=${content.footerMapLat},${content.footerMapLng}`}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 w-fit items-center gap-2 border border-atl-brass px-5 text-sm font-semibold text-atl-brass-light transition-colors hover:bg-atl-brass hover:text-atl-bg">
                                Yol Tarifi Al <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    <BrassRule className="mb-8" />
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-atl-muted">© 2024 {content.footerCompanyName} — Tüm hakları saklıdır.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {LEGAL.map((item) => (
                                <Link key={item.label} href={item.href} className="text-xs text-atl-muted hover:text-atl-brass-light">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </PageContainer>
            </footer>
        </DirectEdit>
    );
};
