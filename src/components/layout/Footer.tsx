"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { DirectEdit } from "@/components/admin/DirectEdit";
import { normalizeImagePath } from '@/lib/utils';

export const Footer = () => {
    const { content } = useContentStore();
    const footerLogoSrc = normalizeImagePath((content.footerLogo && content.footerLogo.length > 0) ? content.footerLogo : "/veral-logo.webp");
    const siteName = content.siteName || "VERAL";
    const instagramHandle = (content.footerInstagram || "").replace('@', '').trim();
    const socialLinks = [
        instagramHandle ? { icon: Instagram, href: `https://instagram.com/${instagramHandle}`, label: "Instagram" } : null,
        { icon: Facebook, href: '#', label: "Facebook" },
        { icon: Twitter, href: '#', label: "Twitter" }
    ].filter(Boolean) as { icon: typeof Instagram; href: string; label: string }[];



    return (
        <DirectEdit tab="contact">
            <footer className="bg-[#0A0A0A] pt-40 pb-20 border-t border-[#D4AF37]/20 relative overflow-hidden">
                {/* Background Texture Overlay */}
                {/* Removed external texture for performance */}

                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">

                        {/* LEFT: LOGO & ABOUT */}
                        <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-10">
                            <Link href="/" className="flex items-center gap-4 group">
                                <div className="h-16 w-16 transition-all duration-500 flex-shrink-0 relative">
                                    <Image
                                        src={footerLogoSrc}
                                        alt={siteName}
                                        fill
                                        sizes="64px"
                                        className="object-contain invert brightness-100 mix-blend-screen"
                                        priority
                                        quality={70}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-[#D4AF37] tracking-[0.15em] uppercase">
                                        {siteName}
                                    </span>
                                    <span className="text-[11px] font-bold text-white/80 tracking-[0.3em] uppercase">Torna & Teneke Ticaret</span>
                                </div>
                            </Link>
                            <p className="text-[#FDFBF7]/60 text-lg leading-relaxed max-w-sm">
                                {content.aboutContent.substring(0, 150)}...
                            </p>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-black text-[#D4AF37] tracking-[0.2em] uppercase">MERKEZ & ATÖLYE</span>
                                <span className="text-lg font-bold text-white/80 whitespace-pre-line">{content.footerAddress}</span>
                            </div>
                            {/* SOCIAL ICONS */}
                            <div className="flex gap-6">
                                {socialLinks.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        target="_blank"
                                        aria-label={`${item.label} sayfamız`}
                                        className="w-12 h-12 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                                    >
                                        <item.icon size={20} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* MIDDLE: LINKS */}
                        <div className="lg:col-span-6 xl:col-span-3">
                            <h4 className="text-sm font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-10">NAVİGASYON</h4>
                            <ul className="flex flex-col gap-6">
                                {[
                                    { label: 'Koleksiyon', href: '/urunler' },
                                    { label: 'Hakkımızda', href: '/hakkimizda' },
                                    { label: 'İletişim', href: '/iletisim' }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-lg font-bold text-white hover:text-[#D4AF37] transition-all flex items-center gap-2 group">
                                            {item.label}
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* RIGHT: CONTACT INFO & BÜLTEN */}
                        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-10">
                            <h4 className="text-sm font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-4">İLETİŞİM</h4>
                            <div className="space-y-2">
                                <div className="text-xl font-bold text-white tracking-widest">{content.footerPhone}</div>
                                <div className="text-lg text-[#FDFBF7]/60">{content.footerEmail}</div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex flex-col gap-6">
                                <h4 className="text-sm font-black text-[#D4AF37] tracking-[0.4em] uppercase">KONUM // NAVİGASYON</h4>

                                <a
                                    href={content.footerMapLink || `https://www.google.com/maps/dir/?api=1&destination=${content.footerMapLat},${content.footerMapLng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 h-16 border border-[#D4AF37] text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                                >
                                    YOL TARİFİ AL <ArrowUpRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* GOOGLE SEO DOMINANCE BLOCK */}
                    <div className="pt-20 pb-8 border-t border-[#D4AF37]/5 mt-10">
                        <p className="text-base text-zinc-400 leading-relaxed font-mono tracking-wide text-justify">
                            <strong className="text-zinc-300">VERAL Teneke & Torna İmalat Sanayi:</strong> İzmir Alsancak merkezli tesisimizde Türkiye'nin en büyük kapasiteli <strong className="text-zinc-200">toptan dosya teli üretimi</strong> ve <strong className="text-zinc-200">takvim tenekesi imalatı</strong> süreçlerini yönetmekteyiz. Kırtasiye, matbaa ve basın yayın kuruluşları için paslanmaz, esnek yapıya sahip <strong className="text-zinc-200">dosya teli</strong> ve istenilen özel ebatlarda <strong className="text-zinc-200">takvim tenekesi çıtaları</strong> seri üretim standartlarında sunulmaktadır. Ayrıca, ev ve ofis dekorasyonunda fark yaratan, dijital 4K çözünürlüklü ve çizilmeye dirençli <strong className="text-zinc-200">UV baskılı teneke posterler</strong> ile özel üretim metal pano çalışmalarımızla sınırları zorluyoruz. Sadece uygun fiyatlı <strong className="text-zinc-200">takvim tenekesi</strong> arayışında olan matbaalar değil, tasarımını ömür boyu kalıcı hale getirmek için <strong className="text-zinc-200">uv baskılı teneke poster siparişi</strong> vermek isteyen kurumsal markalar da VERAL üretim gücüne güvenmektedir. Diğer uzmanlık alanlarımız kapsamında müzik endüstrisi için akustik toleranslı kalibre edilmiş <strong className="text-zinc-200">tef zili üretimi</strong> ve kişiye/kuruma özel tasarımlı, mıknatıslı yapısıyla kolay montaj edilebilen <strong className="text-zinc-200">teneke magnet</strong> ve <strong className="text-zinc-200">metal poster imalatımız</strong> hız kesmeden sürmektedir. Stoktan hızlı gönderimli <strong className="text-zinc-200">dosya teli</strong>, yüksek termin kapasitesine sahip ucuz ve toptan <strong className="text-zinc-200">takvim tenekesi</strong> ve yüksek standart <strong className="text-zinc-200">UV baskılı teneke posterler</strong> için endüstriyel metal çözüm ortağınız olmaktan gurur duyuyoruz.
                        </p>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-10">
                        <p className="text-base font-bold text-white/50 tracking-[0.1em] uppercase">
                            © 2024 {content.footerCompanyName} - TÜM HAKLARI SAKLIDIR.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            {[
                                { label: 'MESAFELİ SATIŞ', href: '/mesafeli-satis' },
                                { label: 'ÖN BİLGİLENDİRME', href: '/on-bilgilendirme' },
                                { label: 'İPTAL / İADE', href: '/iade-iptal' },
                                { label: 'ÇEREZ POLİTİKASI', href: '/cerez' },
                                { label: 'GİZLİLİK POLİTİKASI', href: '/gizlilik' },
                                { label: 'KULLANIM ŞARTLARI', href: '/sartlar' },
                                { label: 'KVKK AYDINLATMA', href: '/kvkk' }
                            ].map((item) => (
                                <Link key={item.label} href={item.href} className="text-base font-bold text-white/50 hover:text-[#D4AF37] transition-colors tracking-widest uppercase">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </DirectEdit>
    );
};
