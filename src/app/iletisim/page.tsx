"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { SystemLabel } from '@/components/ui/Industrial';
import { Mail, Phone, MapPin, Instagram, Youtube, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IletisimPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] selection:bg-[#D4AF37] selection:text-white relative overflow-hidden">
            <Navigation />

            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-metal opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#D4AF37]/5 blur-[180px] pointer-events-none" />

            {/* Visual Media Layer - Industrial Video Placeholder */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-20 pointer-events-none grayscale contrast-125">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-working-with-a-lathe-machine-in-a-workshop-43828-large.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] pt-48 pb-24 relative z-20">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div className="flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <SystemLabel text="İLETİŞİM TERMİNALİ v1.0" active className="mb-6" />
                            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-none italic">
                                BİZE <br />
                                <span className="italic font-bold text-gold-gradient">Erişin</span>
                            </h1>
                            <p className="text-white/60 text-xl font-medium max-w-lg mt-8 leading-relaxed">
                                Teknik destek, özel proje talepleri veya kurumsal iş birliği için operasyon merkezimizle iletişime geçin.
                            </p>
                        </motion.div>

                        <div className="grid gap-4">
                            {[
                                { icon: Phone, label: "OPERASYON HATTI", value: "+90 507 165 13 15", href: "tel:+905071651315" },
                                { icon: Mail, label: "E-POSTA TERMİNALİ", value: "info@veralteneketicaret.com", href: "mailto:info@veralteneketicaret.com" },
                                { icon: MapPin, label: "MERKEZ LOKASYON", value: "Alsancak, Konak, İzmir", href: "https://maps.google.com" },
                            ].map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center gap-6 p-8 bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-[#D4AF37]/30 transition-all group"
                                >
                                    <div className="w-14 h-14 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-1 block">{item.label}</span>
                                        <span className="text-xl font-black text-white uppercase tracking-tighter italic">{item.value}</span>
                                    </div>
                                    <ArrowUpRight className="ml-auto w-6 h-6 text-white/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" },
                                { icon: MessageSquare, href: "#" },
                            ].map((item, i) => (
                                <a key={i} href={item.href} className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                                    <item.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#111111] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col"
                    >
                        {/* Map Section */}
                        <div className="h-64 w-full bg-zinc-900 relative border-b border-white/5">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.8647043812893!2d27.14371587635641!3d38.43232077306283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd91684c37577%3A0x60032e353591475c!2sAlsancak%2C%20Konak%2FIzmı̇r!5e0!3m2!1sen!2str!4v1710000000000!5m2!1sen!2str"
                                className="w-full h-full grayscale opacity-50"
                                style={{ border: 0 }}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
                        </div>

                        <div className="p-12 lg:p-16 relative z-10 space-y-10 flex-grow flex flex-col justify-center">
                            <div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Hızlı Mesaj</h3>
                                <p className="text-white/40 text-sm font-medium leading-relaxed">
                                    Aşağıdaki butonu kullanarak teknik ekibimizle anlık WhatsApp bağlantısı kurabilirsiniz.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="https://wa.me/905071651315"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-20 w-full bg-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-4"
                                >
                                    WHATSAPP DESTEK HATTI <MessageSquare size={20} />
                                </a>
                                <div className="text-center">
                                    <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">UYARI: TALEPLER 09:00 - 19:00 ARASI İŞLENİR</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}
