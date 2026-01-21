"use client";

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-white pt-24 pb-8 border-t border-gray-100">
            <div className="container-brutal">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

                    {/* LEFT: LOGO & ABOUT - Image 0 Style */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center text-white font-black rotate-[-10deg]">
                                M
                            </div>
                            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
                                METAL<span className="text-[#ff6b00]">POSTER</span>.CO
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Duvarlarınız için en kaliteli metal sanat eserlerini üretiyoruz. Dayanıklı, manyetik askılı ve eşsiz tasarımlar.
                        </p>
                        {/* SOCIAL ICONS - Matching Reference */}
                        <div className="flex gap-3">
                            {['instagram', 'facebook', 'twitter'].map((social) => (
                                <div key={social} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-[#ff6b00] cursor-pointer transition-colors border border-gray-50">
                                    <span className="text-[10px] font-black uppercase">SC</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MIDDLE: CATEGORIES - Image 0 Style */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <h4 className="text-[10px] font-black text-[#ff6b00] tracking-[0.2em] uppercase">KATEGORİLER</h4>
                        <ul className="flex flex-col gap-4">
                            {['Popüler Ürünler', 'Motor Sporları', 'Pop Kültür', 'Doğa & Minimalizm'].map((item) => (
                                <li key={item}><Link href="#" className="text-sm font-bold text-gray-600 hover:text-black transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* MIDDLE: SUPPORT - Image 0 Style */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <h4 className="text-[10px] font-black text-[#ff6b00] tracking-[0.2em] uppercase">DESTEK</h4>
                        <ul className="flex flex-col gap-4">
                            {['Sıkça Sorulan Sorular', 'Kargo Takibi', 'İade Politikası', 'Montaj Kılavuzu'].map((item) => (
                                <li key={item}><Link href="#" className="text-sm font-bold text-gray-600 hover:text-black transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT: NEWSLETTER - Image 0 Style */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <h4 className="text-[10px] font-black text-[#ff6b00] tracking-[0.2em] uppercase">BÜLTEN</h4>
                        <p className="text-sm text-gray-400 font-medium">Yeni koleksiyonlardan ve özel indirimlerden ilk siz haberdar olun.</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="E-posta"
                                className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20"
                            />
                            <button className="bg-[#ff6b00] text-white px-6 py-3 rounded-lg font-black text-xs hover:bg-[#e66000] shadow-lg shadow-orange-100">
                                OK
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR - Image 0 Style */}
                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-gray-300 uppercase">
                        © 2024 METALPOSTER.CO - TÜM HAKLARI SAKLIDIR.
                    </p>
                    <div className="flex gap-6">
                        {['GİZLİLİK SÖZLEŞMESİ', 'KULLANIM KOŞULLARI', 'KVKK'].map((item) => (
                            <Link key={item} href="#" className="text-[10px] font-bold text-gray-300 hover:text-gray-900 transition-colors tracking-widest uppercase">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

