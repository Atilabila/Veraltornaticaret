"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, MessageSquare, ArrowUpRight, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { m } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { useContentStore } from '@/store/useContentStore';

export default function IletisimPage() {
    const { content } = useContentStore();

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "İletişim", url: "/iletisim" },
    ];

    const contactItems = [
        {
            icon: Phone,
            label: "Doğrudan Atölye Hattı",
            value: content.footerPhone || "+90 532 379 40 03",
            href: `tel:${(content.footerPhone || "+905323794003").replace(/\s/g, "")}`,
            sub: "Hafta içi 08:30 - 18:30"
        },
        {
            icon: Mail,
            label: "Kurumsal E-posta",
            value: content.footerEmail || "info@veralteneketicaret.com",
            href: `mailto:${content.footerEmail || "info@veralteneketicaret.com"}`,
            sub: "Teknik şartname ve CAD gönderimleri"
        },
        {
            icon: MapPin,
            label: "Alsancak İmalat Merkezi",
            value: content.footerAddress || "1471 Sokak No:12/A Alsancak, Konak, İzmir",
            href: content.footerMapLink || "https://maps.google.com/?q=Alsancak+Konak+Izmir",
            sub: "Doğrudan atölye ziyareti ve numune teslim"
        },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 pt-4">
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <m.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm mb-4">
                                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                                İLETİŞİM & ATÖLYE ULAŞIM
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4">
                                Üretim Ekibimizle Doğrudan İletişime Geçin
                            </h1>
                            <p className="text-base md:text-lg text-zinc-600 leading-relaxed max-w-xl font-normal">
                                Toptan dosya teli, takvim tenekesi, giyotin sac kesim ve özel mikron toleranslı metal imalat projeleriniz için İzmir Alsancak atölyemize ulaşın.
                            </p>
                        </m.div>

                        <div className="grid gap-4">
                            {contactItems.map((item, idx) => (
                                <m.a
                                    key={idx}
                                    href={item.href}
                                    target={item.icon === MapPin ? "_blank" : undefined}
                                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                                    className="flex items-center gap-5 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-amber-500 hover:shadow-md transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-600/20 flex items-center justify-center text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                                        <item.icon size={22} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 block mb-1">{item.label}</span>
                                            <span className="text-[11px] font-mono text-zinc-400">{item.sub}</span>
                                        </div>
                                        <span className="text-base sm:text-lg font-bold text-zinc-900 whitespace-pre-line">{item.value}</span>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                </m.a>
                            ))}
                        </div>

                        {/* Working Hours & Guarantee Strip */}
                        <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-amber-600" />
                                <span>Çalışma Saatleri: Pazartesi - Cumartesi 08:30 - 18:30</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Aynı Gün Numune İnceleme</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map & Quick Contact */}
                    <m.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="lg:col-span-5 bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm flex flex-col"
                    >
                        <div className="h-64 w-full bg-zinc-100 relative border-b border-zinc-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.8647043812893!2d27.14371587635641!3d38.43232077306283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd91684c37577%3A0x60032e353591475c!2sAlsancak%2C%20Konak%2FIzmı̇r!5e0!3m2!1sen!2str!4v1710000000000!5m2!1sen!2str"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="Veral Teneke Ticaret Konum Haritası"
                            />
                        </div>

                        <div className="p-8 space-y-6">
                            <div>
                                <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block mb-1">
                                    HIZLI TEKNİK YANIT
                                </span>
                                <h3 className="text-2xl font-black text-zinc-900 mb-2">Acil Talepler İçin</h3>
                                <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                                    WhatsApp hattımız üzerinden atölye şefimize parça ölçüsü veya teknik çizim göndererek 30 dakika içinde geri dönüş alabilirsiniz.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`https://wa.me/${(content.whatsappNumber || "905323794003").replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-14 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-3"
                                >
                                    <span>WhatsApp Usta Hattı</span>
                                    <MessageSquare size={18} />
                                </a>
                                <Link
                                    href="/teklif-al"
                                    className="h-14 w-full border border-amber-600/30 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>B2B Hızlı Teklif Formu</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </m.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
