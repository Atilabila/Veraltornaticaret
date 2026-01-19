"use client";

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    const footerBlocks = [
        {
            title: "MERKEZ ÜS",
            content: "1512 Sk. No: 42/1, Alsancak/İzmir"
        },
        {
            title: "İLETİŞİM HATTI",
            content: "+90 507 165 13 15 | LOG@VERAL.COM"
        },
        {
            title: "KANALLAR",
            content: "Instagram: @VERALTICARET"
        },
        {
            title: "HIZLI ERİŞİM",
            content: "Ana Sayfa / Ürünler / Üretim Süreci / İletişim"
        }
    ];

    return (
        <footer className="bg-near-black text-paper-white pt-24 pb-12 border-t border-steel-gray">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-24">
                    {footerBlocks.map((block, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h4 className="font-ibm-plex text-[11px] font-bold text-hazard-orange uppercase tracking-widest border-l-2 border-hazard-orange pl-3">
                                {block.title}
                            </h4>
                            <p className="text-sm text-fog-gray font-source-sans whitespace-pre-line leading-relaxed">
                                {block.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-12 border-t border-steel-gray">
                    <div className="flex flex-col gap-2">
                        <span className="font-space font-bold text-3xl tracking-tighter">VERAL</span>
                        <span className="text-[10px] text-steel-gray uppercase font-ibm-plex">Endüstriyel Üretim Protokolü v4.5</span>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <Link href="#contact" className="text-xs font-bold uppercase text-hazard-orange hover:underline">
                            Teklif Talebi Gönder
                        </Link>
                        <p className="text-[10px] text-steel-gray">
                            © 2026 VERAL IND TORNA & TENEKE. Tüm Hakları Saklıdır.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
