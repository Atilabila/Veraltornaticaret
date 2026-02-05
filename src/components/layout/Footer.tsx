"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { DirectEdit } from "@/components/admin/DirectEdit";

export const Footer = () => {
    const { content } = useContentStore();

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
                                <div className="h-16 w-16 transition-all duration-500 flex-shrink-0">
                                    <img
                                        src={(content.footerLogo && content.footerLogo.length > 0) ? content.footerLogo : "/veral-logo.webp"}
                                        alt={content.siteName || "VERAL"}
                                        className="h-full w-full object-contain invert brightness-100 mix-blend-screen"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-[#D4AF37] tracking-[0.15em] uppercase">
                                        {content.siteName || "VERAL"}
                                    </span>
                                    <span className="text-[9px] font-bold text-white/80 tracking-[0.3em] uppercase">Torna & Teneke Ticaret</span>
                                </div>
                            </Link>
                            <p className="text-[#FDFBF7]/60 text-lg leading-relaxed max-w-sm">
                                {content.aboutContent.substring(0, 150)}...
                            </p>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">MERKEZ & ATÖLYE</span>
                                <span className="text-sm font-bold text-white/80 whitespace-pre-line">{content.footerAddress}</span>
                            </div>
                            {/* SOCIAL ICONS */}
                            <div className="flex gap-6">
                                {[
                                    { icon: Instagram, href: `https://instagram.com/${content.footerInstagram.replace('@', '')}` },
                                    { icon: Facebook, href: '#' },
                                    { icon: Twitter, href: '#' }
                                ].map((social, i) => (
                                    <Link key={i} href={social.href} target="_blank" className="w-12 h-12 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
                                        <social.icon size={20} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* MIDDLE: LINKS */}
                        <div className="lg:col-span-6 xl:col-span-3">
                            <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-10">NAVİGASYON</h4>
                            <ul className="flex flex-col gap-6">
                                {[
                                    { label: 'Koleksiyon', href: '/urunler' },
                                    { label: 'Hizmetler', href: '/metal-urunler' },
                                    { label: 'Hakkımızda', href: '/hakkimizda' },
                                    { label: 'İletişim', href: '/iletisim' }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-sm font-bold text-white hover:text-[#D4AF37] transition-all flex items-center gap-2 group">
                                            {item.label}
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* RIGHT: CONTACT INFO & BÜLTEN */}
                        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-10">
                            <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-4">İLETİŞİM</h4>
                            <div className="space-y-2">
                                <div className="text-lg font-bold text-white tracking-widest">{content.footerPhone}</div>
                                <div className="text-sm text-[#FDFBF7]/50">{content.footerEmail}</div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex flex-col gap-6">
                                <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase">KONUM // NAVİGASYON</h4>
                                <div className="w-full h-48 rounded-sm overflow-hidden border border-[#D4AF37]/20 grayscale hover:grayscale-0 transition-all duration-700">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={`https://maps.google.com/maps?q=${content.footerMapLat},${content.footerMapLng}&z=${content.footerMapZoom}&output=embed`}
                                    />
                                </div>
                                <a
                                    href={content.footerMapLink || `https://www.google.com/maps/dir/?api=1&destination=${content.footerMapLat},${content.footerMapLng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 h-14 border border-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                                >
                                    YOL TARİFİ AL <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="pt-12 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-10">
                        <p className="text-xs font-bold text-white/40 tracking-[0.1em] uppercase">
                            © 2024 {content.footerCompanyName} - TÜM HAKLARI SAKLIDIR.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            {[
                                { label: 'GİZLİLİK POLİTİKASI', href: '/gizlilik' },
                                { label: 'KULLANIM ŞARTLARI', href: '/sartlar' },
                                { label: 'KVKK AYDINLATMA', href: '/kvkk' }
                            ].map((item) => (
                                <Link key={item.label} href={item.href} className="text-xs font-bold text-white/50 hover:text-[#D4AF37] transition-colors tracking-widest uppercase">
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
