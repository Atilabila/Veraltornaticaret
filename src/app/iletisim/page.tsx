"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, MessageSquare, ArrowUpRight, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { m } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { useContentStore } from '@/store/useContentStore';
import { PUBLIC_ALWAYS_ON, PUBLIC_HOURS, PUBLIC_HOURS_LABEL, publicAddress } from '@/lib/public-facts';
import { publicPhone, publicWhatsappNumber, toTelHref } from '@/lib/contact';

export default function IletisimPage() {
    const { content } = useContentStore();

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "İletişim", url: "/iletisim" },
    ];

    const contactItems = [
        {
            icon: Phone,
            label: "Oğuzcan Veral",
            value: publicPhone(content.footerPhone),
            href: toTelHref(publicPhone(content.footerPhone)),
            sub: PUBLIC_HOURS
        },
        {
            icon: Mail,
            label: "Kurumsal E-posta",
            value: content.footerEmail || "veraltornatic@hotmail.com",
            href: `mailto:${content.footerEmail || "veraltornatic@hotmail.com"}`,
            sub: "Teknik şartname ve CAD gönderimleri"
        },
        {
            icon: MapPin,
            label: "Alsancak İmalat Merkezi",
            value: publicAddress(content.footerAddress),
            href: content.footerMapLink || "https://maps.app.goo.gl/QqWJ6pVDPwgcFDDb9",
            sub: "Doğrudan atölye ziyareti ve numune teslim"
        },
    ];

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 pt-4">
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <m.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-atl-brass/20 bg-atl-brass-tint px-3.5 py-1.5 font-sans text-xs font-semibold tracking-normal text-atl-brass shadow-sm">
                                <span className="h-2 w-2 rounded-full bg-atl-brass" />
                                İletişim ve atölye
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-atl-text tracking-tight leading-tight mb-4">
                                Üretim Ekibimizle Doğrudan İletişime Geçin
                            </h1>
                            <p className="text-base md:text-lg text-atl-muted leading-relaxed max-w-xl font-normal">
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
                                    className="flex items-center gap-5 p-6 bg-atl-surface border border-atl-line rounded-2xl shadow-sm hover:border-atl-brass hover:shadow-md transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-atl-brass-tint border border-atl-brass/20 flex items-center justify-center text-atl-brass group-hover:bg-atl-brass group-hover:text-atl-bg transition-colors shrink-0">
                                        <item.icon size={22} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-atl-brass">{item.label}</span>
                                            <span className="text-xs font-mono text-atl-muted">{item.sub}</span>
                                        </div>
                                        <span className="text-base sm:text-lg font-bold text-atl-text whitespace-pre-line">{item.value}</span>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-atl-muted group-hover:text-atl-brass group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                </m.a>
                            ))}
                        </div>

                        {/* Working Hours & Guarantee Strip */}
                        <div className="flex flex-col gap-3 rounded-2xl border border-atl-line bg-atl-surface p-6 text-sm text-atl-text shadow-sm sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 shrink-0 text-atl-brass" />
                                <span>{PUBLIC_HOURS_LABEL}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 shrink-0 text-atl-brass" />
                                <span>{PUBLIC_ALWAYS_ON}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map & Quick Contact */}
                    <m.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="lg:col-span-5 bg-atl-surface border border-atl-line rounded-3xl overflow-hidden shadow-sm flex flex-col"
                    >
                        <div className="h-64 w-full bg-atl-surface-2 relative border-b border-atl-line">
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
                                <span className="mb-1 block font-sans text-xs font-semibold tracking-normal text-atl-brass">
                                    Teknik yanıt
                                </span>
                                <h3 className="text-2xl font-black text-atl-text mb-2">Acil Talepler İçin</h3>
                                <p className="text-atl-muted text-sm leading-relaxed font-normal">
                                    WhatsApp hattımız üzerinden atölye şefimize parça ölçüsü veya teknik çizim gönderebilirsiniz.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`https://wa.me/${publicWhatsappNumber(content.whatsappNumber)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 font-sans text-sm font-semibold tracking-normal text-white shadow-md shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                                >
                                    <span>WhatsApp Usta Hattı</span>
                                    <MessageSquare size={18} />
                                </a>
                                <Link
                                    href="/teklif-al"
                                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-atl-brass/30 bg-atl-brass-tint font-sans text-sm font-semibold tracking-normal text-atl-brass transition-colors hover:border-atl-brass"
                                >
                                    <span>Teklif formu</span>
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
