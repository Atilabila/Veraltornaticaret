"use client";

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { m } from 'framer-motion';
import { Product } from '@/lib/products';

export default function SpecsSection({ product }: { product: Product }) {
    const reviews = [
        {
            name: "Ahmet Yılmaz",
            location: "İstanbul",
            date: "2 hafta önce",
            content: "İstanbul silueti posterini aldım, muhteşem kalite. Metal dokusu gerçekten premium hissettiriyor.",
            stars: 5,
            image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=100&auto=format&fit=crop",
            productName: "İstanbul Silueti"
        },
        {
            name: "Zeynep Kaya",
            location: "Ankara",
            date: "1 ay önce",
            content: "Ofisim için Porsche posterini tercih ettim. Paketleme güvenli geldi, renkler çok canlı.",
            stars: 5,
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=100&auto=format&fit=crop",
            productName: "Klasik Porsche"
        },
        {
            name: "Murat Demir",
            location: "İzmir",
            date: "3 hafta önce",
            content: "Göztepe logosu poster aldım, kalite fiyatına göre çok iyi. Kesinlikle tekrar alacağım.",
            stars: 5,
            image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=100&auto=format&fit=crop",
            productName: "Göztepe Logosu"
        },
        {
            name: "Elif Arslan",
            location: "Bursa",
            date: "1 hafta önce",
            content: "Nebula posterini banyoya astım, su geçirmez özelliği işe yarıyor. Renklerinde solma yok.",
            stars: 5,
            image: "https://images.unsplash.com/photo-1464802686167-b939a67e0b24?q=80&w=100&auto=format&fit=crop",
            productName: "Uzay Serisi Nebula"
        }
    ];

    return (
        <section className="mt-20 pt-16 border-t border-gray-100 bg-white">
            {/* Header Section */}
            <div className="flex flex-col gap-6 mb-16 px-4 md:px-0">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-[#ffb800]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-[10px] font-black text-gray-900 ml-1 uppercase tracking-widest">4.9/5 Ortalama Puan</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111827] uppercase tracking-tighter leading-none">
                        Müşterilerimiz <br className="hidden md:block" /> Ne Diyor?
                    </h2>
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                    1000+ mutlu müşterimizden bazılarının yorumları
                </p>
            </div>

            {/* Testimonial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {reviews.map((rev, i) => (
                    <m.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col gap-8 p-10 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 relative group hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500"
                    >
                        <Quote className="absolute top-10 right-10 w-16 h-16 text-gray-200/30 group-hover:text-[#ff6b00]/20 transition-colors" />

                        <div className="flex gap-1 text-[#ffb800]">
                            {[...Array(rev.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                        </div>

                        <p className="text-xl font-bold text-[#111827] leading-relaxed pr-10">
                            "{rev.content}"
                        </p>

                        <div className="flex items-center justify-between pt-6 mt-auto border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-900 font-black text-lg">
                                    {rev.name[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-[#111827] uppercase tracking-tight">{rev.name}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rev.location} • {rev.date}</span>
                                </div>
                            </div>

                            {/* Product Reference */}
                            <div className="hidden sm:flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                                <img src={rev.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-gray-400 tracking-widest uppercase">ALINAN ÜRÜN</span>
                                    <span className="text-[10px] font-bold text-[#111827] uppercase">{rev.productName}</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-3 left-10 flex items-center gap-2 bg-[#ff6b00] px-4 py-2 rounded-full shadow-lg border border-white/20">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">DOĞRULANMIŞ ALICI</span>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Bottom Stats */}
            <div className="mt-20 pt-16 border-t border-gray-100 grid grid-cols-3 gap-8 text-center md:text-left">
                {[
                    { val: "1000+", label: "Mutlu Müşteri" },
                    { val: "4.9", label: "Ortalama Puan" },
                    { val: "%98", label: "Tavsiye Oranı" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2 items-center md:items-start">
                        <span className="text-4xl md:text-6xl font-black text-[#111827] tracking-tighter">{stat.val}</span>
                        <div className="h-1 w-12 bg-[#ff6b00] rounded-full hidden md:block" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
