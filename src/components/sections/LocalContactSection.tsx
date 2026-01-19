"use client";

import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SystemLabel, PrimaryButton } from '@/components/ui/Industrial';

export const LocalContactSection = () => {
    return (
        <section id="contact" className="bg-white border-b border-fog-gray">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-12">
                    <SystemLabel text="MERKEZ ÜS / İLETİŞİM" active />
                    <h2 className="text-3xl font-bold font-space uppercase">Hızlı Erişim ve Koordinatlar</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Details */}
                    <div className="flex flex-col gap-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="p-6 border border-fog-gray bg-paper-white flex flex-col gap-4">
                                <div className="text-hazard-orange"><MapPin size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase mb-2">Adres</h4>
                                    <p className="text-sm text-steel-gray">1512 Sk. No: 42/1, Alsancak/İzmir</p>
                                </div>
                            </div>

                            <div className="p-6 border border-fog-gray bg-paper-white flex flex-col gap-4">
                                <div className="text-hazard-orange"><Phone size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase mb-2">Telefon</h4>
                                    <p className="text-sm text-steel-gray">+90 507 165 13 15</p>
                                </div>
                            </div>

                            <div className="p-6 border border-fog-gray bg-paper-white flex flex-col gap-4">
                                <div className="text-hazard-orange"><Mail size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase mb-2">E-Posta</h4>
                                    <p className="text-sm text-steel-gray">LOG@VERAL.COM</p>
                                </div>
                            </div>

                            <div className="p-6 border border-fog-gray bg-paper-white flex flex-col gap-4">
                                <div className="text-acid-green"><MessageCircle size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase mb-2">WhatsApp</h4>
                                    <p className="text-sm text-steel-gray">Hızlı Teklif Hattı</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-8 border border-near-black bg-near-black text-white">
                            <h3 className="text-xl font-bold uppercase">Projeniz İçin Teklif Alın</h3>
                            <p className="text-gray-400 text-sm">Özel imalat talepleriniz için teknik çizim veya numunelerinizle bizimle iletişime geçebilirsiniz.</p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <PrimaryButton label="Online Formu Doldur" iconRight={ArrowUpRight} />
                                <a href="https://wa.me/905071651315" className="px-6 py-3 border border-white text-white font-bold uppercase text-[14px] hover:bg-white hover:text-black transition-all">WhatsApp İle Yaz</a>
                            </div>
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="relative border border-near-black h-[400px] lg:h-auto bg-fog-gray overflow-hidden">
                        <div className="absolute top-4 right-4 z-10">
                            <SystemLabel text="KOORDİNAT: 38.435, 27.142" active />
                        </div>
                        {/* Map Placeholder or Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.123456789012!2d27.1423456!3d38.4356789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDI2JzA4LjQiTiAyN8KwMDgnMzIuNCJF!5e0!3m2!1sen!2str!4v1234567890123"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(1)' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};
