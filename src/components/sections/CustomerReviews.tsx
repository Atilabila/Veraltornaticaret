"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Ahmet Yılmaz",
        city: "İstanbul",
        rating: 5,
        text: "İstanbul silüeti posterini aldım, muhteşem kalite! Metal dokusu gerçekten premium hissettiriyor. Misafirlerimden sürekli övgü alıyorum.",
        product: "İstanbul Silüeti",
        image: "/istanbul.png",
        date: "2 hafta önce"
    },
    {
        id: 2,
        name: "Zeynep Kaya",
        city: "Ankara",
        rating: 5,
        text: "Ofisim için Porsche posterini tercih ettim. Paketleme çok güvenli geldi, ürün hasar görmeden ulaştı. Renkleri o kadar canlı ki!",
        product: "Klasik Porsche 911",
        image: "/porsche.png",
        date: "1 ay önce"
    },
    {
        id: 3,
        name: "Murat Demir",
        city: "İzmir",
        rating: 5,
        text: "Göztepe logosu poster aldım, taraftar arkadaşlarım bayıldı! Kalite fiyatına göre çok iyi. Kesinlikle tekrar alacağım.",
        product: "Göztepe Logosu",
        image: "/goztepe.png",
        date: "3 hafta önce"
    },
    {
        id: 4,
        name: "Elif Arslan",
        city: "Bursa",
        rating: 5,
        text: "Nebula posterini banyoya astım, su geçirmez özelliği gerçekten işe yarıyor. 2 aydır sıfır sorun, renklerde solma yok.",
        product: "Uzay Nebulası",
        image: "/nebula.png",
        date: "1 hafta önce"
    }
];

export const CustomerReviews = () => {
    return (
        <section className="py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-5 md:px-6">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-slate-300">4.9/5 Ortalama Puan</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6">
                        Müşterilerimiz <span className="text-gradient">Ne Diyor?</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
                        1000+ mutlu müşterimizden bazı yorumlar
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl p-8 md:p-10 relative group hover:border-white/20 transition-colors"
                        >
                            <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-700 group-hover:text-slate-600 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-8 text-base md:text-lg">
                                "{review.text}"
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center font-bold text-white text-lg">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{review.name}</div>
                                        <div className="text-sm text-slate-500">{review.city} • {review.date}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                                        <Image src={review.image} alt={review.product} fill className="object-cover" />
                                    </div>
                                    <span className="text-xs text-slate-500 hidden sm:block max-w-[80px]">{review.product}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="mt-16 md:mt-24 grid grid-cols-3 gap-6 glass-card rounded-2xl p-8 md:p-12">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-black text-gradient">1000+</div>
                        <div className="text-sm md:text-base text-slate-500 mt-2">Mutlu Müşteri</div>
                    </div>
                    <div className="text-center border-x border-white/10">
                        <div className="text-3xl md:text-4xl font-black text-gradient">4.9</div>
                        <div className="text-sm md:text-base text-slate-500 mt-2">Ortalama Puan</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-black text-gradient">%98</div>
                        <div className="text-sm md:text-base text-slate-500 mt-2">Tavsiye Oranı</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
