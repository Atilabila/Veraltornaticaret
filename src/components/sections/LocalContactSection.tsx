"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight, PackageCheck } from 'lucide-react';
import { SystemLabel, PrimaryButton } from '@/components/ui/Industrial';

export const LocalContactSection = () => {
    return (
        <section id="contact" className="py-24">
            <div className="container-brutal">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="text-[10px] font-black text-[#ff6b00] tracking-[0.3em] uppercase">
                        MÜŞTERİ HİZMETLERİ
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111827] uppercase tracking-tighter leading-none">
                        Destek ve <span className="text-gray-400">İletişim</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Details */}
                    <div className="flex flex-col gap-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: PackageCheck, title: "İade ve Değişim", desc: "14 GÜN KOLAY İADE" },
                                { icon: Phone, title: "Telefon Destek", desc: "+90 507 165 13 15" },
                                { icon: Mail, title: "E-Posta", desc: "destek@metalposterpro.com" },
                                { icon: MessageCircle, title: "Canlı Destek", desc: "WHATSAPP HIZLI HAT", color: "text-green-500" }
                            ].map((item, i) => (
                                <div key={i} className="card-premium p-8 flex flex-col gap-6 hover:-translate-y-1 transition-transform bg-white">
                                    <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${item.color || 'text-[#ff6b00]'}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-[#111827] uppercase text-sm tracking-tight mb-1">{item.title}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card-premium p-10 bg-[#111827] text-white flex flex-col gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b00]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative z-10 space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Sipariş Desteği</h3>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-xs">
                                    Kargo takibi, iade talebi ve ürün bilgisi için bize ulaşın.
                                </p>
                            </div>
                            <div className="relative z-10 flex flex-wrap gap-4 pt-4">
                                <Link href="/takip" className="bg-[#ff6b00] text-white px-8 py-4 rounded-xl font-extrabold text-[10px] tracking-widest hover:bg-[#e66000] transition-colors uppercase">
                                    Kargo Takibi
                                </Link>
                                <a href="https://wa.me/905071651315" className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-extrabold text-[10px] tracking-widest hover:bg-white/20 transition-colors uppercase">
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="card-premium relative h-[400px] lg:h-auto overflow-hidden bg-white p-4">
                        <div className="absolute top-8 right-8 z-10 bg-[#111827] text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">
                            SHOWROOM / TESLİM NOKTASI
                        </div>
                        <div className="w-full h-full rounded-2xl overflow-hidden grayscale contrast-125 border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.123456789012!2d27.1423456!3d38.4356789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDI2JzA4LjQiTiAyN8KwMDgnMzIuNCJF!5e0!3m2!1sen!2str!4v1234567890123"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
