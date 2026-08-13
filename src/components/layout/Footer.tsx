"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { DirectEdit } from "@/components/admin/DirectEdit";
import { normalizeImagePath } from '@/lib/utils';
import { PageContainer } from '@/components/layout/PageContainer';

export const Footer = () => {
    const { content } = useContentStore();
    const footerLogoSrc = normalizeImagePath((content.footerLogo && content.footerLogo.length > 0) ? content.footerLogo : "/logo.svg");
    const siteName = content.siteName || "VERAL";
    const instagramHandle = (content.footerInstagram || "").replace('@', '').trim();
    const socialLinks = [
        instagramHandle ? { icon: Instagram, href: `https://instagram.com/${instagramHandle}`, label: "Instagram" } : null,
        { icon: Facebook, href: '#', label: "Facebook" },
        { icon: Twitter, href: '#', label: "Twitter" }
    ].filter(Boolean) as { icon: typeof Instagram; href: string; label: string }[];

    return (
        <DirectEdit tab="contact">
            <footer className="bg-white pt-20 pb-10 border-t border-[#c6c6c6] text-[#161616]">
                <PageContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                        <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6">
                            <Link href="/" className="flex items-center gap-4 group">
                                <div className="h-12 w-12 relative flex-shrink-0">
                                    <Image src={footerLogoSrc} alt={siteName} fill sizes="48px" className="object-contain" quality={70} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold tracking-wide uppercase">{siteName}</span>
                                    <span className="text-[11px] font-medium text-[#525252] tracking-wider uppercase">Torna & Teneke Ticaret</span>
                                </div>
                            </Link>
                            <p className="text-[#525252] text-base leading-relaxed max-w-sm">
                                İzmir merkezli toptan dosya teli imalatı, takvim tenekesi seri üretimi ve özel metal imalat.
                            </p>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-mono font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider">Merkez & Atölye</span>
                                <span className="text-sm text-[#161616] whitespace-pre-line">{content.footerAddress}</span>
                            </div>
                            <div className="flex gap-3">
                                {socialLinks.map((item, i) => (
                                    <Link key={i} href={item.href} target="_blank" aria-label={`${item.label} sayfamız`}
                                        className="w-10 h-10 border border-[#c6c6c6] flex items-center justify-center text-[#525252] hover:bg-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] hover:text-white transition-colors">
                                        <item.icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-3">
                            <h4 className="text-xs font-mono font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider mb-6">Navigasyon</h4>
                            <ul className="flex flex-col gap-3">
                                {[
                                    { label: 'Hizmetler', href: '/#hizmetler' },
                                    { label: 'Teklif Al', href: '/teklif-al' },
                                    { label: 'Katalog', href: '/urunler' },
                                    { label: 'Hakkımızda', href: '/hakkimizda' },
                                    { label: 'İletişim', href: '/iletisim' }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-sm font-semibold text-[#161616] hover:text-[var(--color-brand-accent)] transition-colors inline-flex items-center gap-2 group">
                                            {item.label}
                                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6">
                            <h4 className="text-xs font-mono font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider">İletişim</h4>
                            <div className="space-y-1">
                                <div className="text-lg font-bold">{content.footerPhone}</div>
                                <div className="text-sm text-[#525252]">{content.footerEmail}</div>
                            </div>
                            <a href={content.footerMapLink || `https://www.google.com/maps/dir/?api=1&destination=${content.footerMapLat},${content.footerMapLng}`}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 h-12 px-5 border border-[var(--color-brand-accent)] text-sm font-semibold text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors w-fit">
                                Yol Tarifi Al <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-[#c6c6c6] flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[#525252]">© 2024 {content.footerCompanyName} — Tüm hakları saklıdır.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: 'Mesafeli Satış', href: '/mesafeli-satis' },
                                { label: 'Gizlilik', href: '/gizlilik' },
                                { label: 'KVKK', href: '/kvkk' },
                            ].map((item) => (
                                <Link key={item.label} href={item.href} className="text-xs text-[#525252] hover:text-[var(--color-brand-accent)]">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </PageContainer>
            </footer>
        </DirectEdit>
    );
};
