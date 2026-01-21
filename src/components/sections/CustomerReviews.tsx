"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Ahmet Yilmaz",
        city: "Istanbul",
        rating: 5,
        text: "Istanbul silueti posterini aldim, muhtesem kalite. Metal dokusu gercekten premium hissettiriyor.",
        product: "Istanbul Silueti",
        image: "/istanbul.png",
        date: "2 hafta once"
    },
    {
        id: 2,
        name: "Zeynep Kaya",
        city: "Ankara",
        rating: 5,
        text: "Ofisim icin Porsche posterini tercih ettim. Paketleme guvenli geldi, renkler cok canli.",
        product: "Klasik Porsche 911",
        image: "/porsche.png",
        date: "1 ay once"
    },
    {
        id: 3,
        name: "Murat Demir",
        city: "Izmir",
        rating: 5,
        text: "Goztepe logosu poster aldim, kalite fiyatina gore cok iyi. Kesinlikle tekrar alacagim.",
        product: "Goztepe Logosu",
        image: "/goztepe.png",
        date: "3 hafta once"
    },
    {
        id: 4,
        name: "Elif Arslan",
        city: "Bursa",
        rating: 5,
        text: "Nebula posterini banyoya astim, su gecirmez ozelligi ise yariyor. Renklerde solma yok.",
        product: "Uzay Nebulasi",
        image: "/nebula.png",
        date: "1 hafta once"
    }
];

export const CustomerReviews = () => {
    return (
        <section id="reviews" className="py-24 md:py-32">
            <div className="container-brutal">
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8">
                        <Star className="w-4 h-4 text-[#ff6b00] fill-[#ff6b00]" />
                        <span className="text-xs font-black text-[#ff6b00] uppercase tracking-widest">4.9/5 Ortalama Puan</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111827] mb-6 uppercase tracking-tighter leading-none">
                        Müşterilerimiz <span className="text-gray-400">Ne Diyor?</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base font-bold uppercase tracking-widest max-w-xl mx-auto">
                        1000+ mutlu müşterimizden bazılarının yorumları
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-premium p-8 md:p-10 relative group bg-white"
                        >
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-50 group-hover:text-orange-50 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            <p className="text-gray-900 font-bold leading-relaxed mb-8 text-lg md:text-xl">
                                "{review.text}"
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-black text-[#111827] text-lg">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-[#111827] uppercase text-sm tracking-tight">{review.name}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.city} • {review.date}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                        <Image src={review.image} alt={review.product} fill className="object-cover" />
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase hidden sm:block max-w-[80px] leading-tight">{review.product}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 md:mt-24 grid grid-cols-3 gap-6 card-premium p-8 md:p-16 bg-white">
                    <div className="text-center">
                        <div className="text-4xl md:text-6xl font-black text-[#111827] tracking-tighter">1000+</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Mutlu Müşteri</div>
                    </div>
                    <div className="text-center border-x border-gray-100">
                        <div className="text-4xl md:text-6xl font-black text-[#111827] tracking-tighter">4.9</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Ortalama Puan</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-6xl font-black text-[#111827] tracking-tighter">%98</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Tavsiye Oranı</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
