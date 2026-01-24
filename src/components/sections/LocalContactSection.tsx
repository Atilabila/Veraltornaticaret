"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle, ArrowUpRight, PackageCheck } from 'lucide-react';

export const LocalContactSection = () => {
    return (
        <section id="contact" className="py-16 lg:py-24 bg-transparent">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">

                <div className="flex flex-col gap-4 mb-16">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">DİREKT HAT</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none italic">
                        BİZE <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">ERİŞİN</span>
                    </h2>
                    <p className="text-white/50 text-lg font-medium max-w-lg">TEKNİK DESTEK VE ÖZEL PROJELER İÇİN OPERASYON MERKEZİ.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Contact Grid */}
                    <div className="lg:col-span-12 xl:col-span-7 grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: PackageCheck, title: "İADE", desc: "14 GÜN KOŞULSUZ İADE POLİTİKASI" },
                            { icon: Phone, title: "TELEFON", desc: "+90 507 165 13 15" },
                            { icon: Mail, title: "E-POSTA", desc: "support@metalposter.co" },
                            { icon: MessageCircle, title: "WHATSAPP", desc: "ANLIK OPERASYON HATTI", color: "text-[#D4AF37]" }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#FDFBF7] p-12 flex flex-col gap-10 border border-[#0A0A0A]/5 hover:bg-[#0A0A0A] group transition-all duration-700">
                                <div className={`w-14 h-14 border border-[#D4AF37]/30 flex items-center justify-center ${item.color || 'text-[#D4AF37]'} group-hover:bg-[#D4AF37] group-hover:text-white transition-all`}>
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-black text-[#0A0A0A] group-hover:text-white uppercase text-2xl tracking-tighter italic leading-none transition-colors">{item.title}</h4>
                                    <p className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Inquiry Card */}
                    <div className="lg:col-span-12 xl:col-span-5 bg-[#0A0A0A] p-12 lg:p-16 text-white flex flex-col gap-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000 ease-out" />

                        <div className="relative z-10 space-y-6">
                            <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic leading-none">Özel Sipariş <br /> Sorgulama</h3>
                            <p className="text-lg font-medium text-white/50 leading-relaxed max-w-sm">
                                Mevcut siparişlerinizle ilgili durum takibi yapabilir veya kurumsal projeleriniz için özel teklif isteyebilirsiniz.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row gap-4 pt-10 mt-auto">
                            <Link href="/takip" className="h-16 px-12 bg-[#D4AF37] text-black font-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all flex items-center justify-center gap-3">
                                SİPARİŞ TAKİBİ <ArrowUpRight size={16} />
                            </Link>
                            <a href="https://wa.me/905071651315" className="h-16 px-12 border border-white/20 text-white font-black text-xs tracking-[0.3em] uppercase hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all flex items-center justify-center">
                                WHATSAPP
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
