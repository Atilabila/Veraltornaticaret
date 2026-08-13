"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, MessageSquare, ArrowUpRight, ArrowRight } from 'lucide-react';
import { m } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { useContentStore } from '@/store/useContentStore';

export default function IletisimPage() {
    const { content } = useContentStore();

    const contactItems = [
        {
            icon: Phone,
            label: "Telefon",
            value: content.footerPhone || "+90 507 165 13 15",
            href: `tel:${(content.footerPhone || "+905071651315").replace(/\s/g, "")}`,
        },
        {
            icon: Mail,
            label: "E-posta",
            value: content.footerEmail || "info@veralteneketicaret.com",
            href: `mailto:${content.footerEmail || "info@veralteneketicaret.com"}`,
        },
        {
            icon: MapPin,
            label: "Adres",
            value: content.footerAddress || "Alsancak, Konak, İzmir",
            href: content.footerMapLink || "https://maps.google.com",
        },
    ];

    return (
        <PageShell variant="muted">
            <PageContainer>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div className="flex flex-col gap-8">
                        <m.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)] mb-4">
                                İletişim
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#161616] leading-tight mb-4">
                                Bizimle iletişime geçin
                            </h1>
                            <p className="text-lg text-[#525252] leading-relaxed max-w-lg">
                                Toptan dosya teli, takvim tenekesi ve özel metal imalat talepleriniz için üretim ekibimize ulaşın.
                            </p>
                        </m.div>

                        <div className="grid gap-3">
                            {contactItems.map((item, idx) => (
                                <m.a
                                    key={idx}
                                    href={item.href}
                                    target={item.icon === MapPin ? "_blank" : undefined}
                                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                                    className="flex items-center gap-5 p-6 bg-white border border-[#c6c6c6] hover:border-[var(--color-brand-accent)] transition-colors group"
                                >
                                    <div className="w-12 h-12 border border-[#c6c6c6] flex items-center justify-center text-[var(--color-brand-accent)] group-hover:bg-[var(--color-brand-accent)] group-hover:text-white group-hover:border-[var(--color-brand-accent)] transition-colors shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] block mb-1">{item.label}</span>
                                        <span className="text-base font-semibold text-[#161616] whitespace-pre-line">{item.value}</span>
                                    </div>
                                    <ArrowUpRight className="ml-auto w-5 h-5 text-[#8d8d8d] group-hover:text-[var(--color-brand-accent)] shrink-0" />
                                </m.a>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`https://instagram.com/${(content.footerInstagram || "").replace("@", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center border border-[#c6c6c6] text-[#525252] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    <m.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-white border border-[#c6c6c6] overflow-hidden flex flex-col"
                    >
                        <div className="h-56 w-full bg-[#f4f4f4] relative border-b border-[#c6c6c6]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.8647043812893!2d27.14371587635641!3d38.43232077306283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd91684c37577%3A0x60032e353591475c!2sAlsancak%2C%20Konak%2FIzmı̇r!5e0!3m2!1sen!2str!4v1710000000000!5m2!1sen!2str"
                                className="w-full h-full grayscale"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="Veral konum haritası"
                            />
                        </div>

                        <div className="p-8 lg:p-10 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-[#161616] mb-2">Hızlı mesaj</h3>
                                <p className="text-[#525252] text-sm leading-relaxed">
                                    WhatsApp üzerinden teknik ekibimize doğrudan ulaşabilir veya toplu teklif formunu kullanabilirsiniz.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`https://wa.me/${content.whatsappNumber || "905071651315"}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-14 w-full bg-[var(--color-brand-accent)] text-white font-semibold text-sm hover:bg-[#0043ce] transition-colors flex items-center justify-center gap-3"
                                >
                                    WhatsApp destek hattı <MessageSquare size={18} />
                                </a>
                                <Link
                                    href="/teklif-al"
                                    className="h-14 w-full border border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] font-semibold text-sm hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    Teklif formu <ArrowRight size={16} />
                                </Link>
                                <p className="text-xs text-[#525252] text-center">
                                    Talepler 09:00 – 19:00 arası işlenir.
                                </p>
                            </div>
                        </div>
                    </m.div>
                </div>
            </PageContainer>
            <MobileStickyBar />
        </PageShell>
    );
}
