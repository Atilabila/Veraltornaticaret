"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, Heart } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Ahmet Yılmaz",
        city: "İstanbul",
        rating: 5,
        text: "Münih silueti posterini aldım, muazzam kalite. Metal dokusu gerçekten asil bir hava katıyor.",
        product: "Borusan Contemporary",
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200",
        date: "2 hafta önce"
    },
    {
        id: 2,
        name: "Zeynep Kaya",
        city: "Ankara",
        rating: 5,
        text: "Ofisim için Porsche koleksiyonunu tercih ettim. Altın detaylar ve baskı kalitesi hayranlık verici.",
        product: "Klasik Porsche",
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200",
        date: "1 ay önce"
    }
];

export const CustomerReviews = () => {
    return (
        <section id="reviews" className="py-16 lg:py-24 bg-transparent">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">

                <div className="flex flex-col gap-4 mb-16 text-center items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">Miras Sahiplerinden</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none italic">
                        Koleksiyoner <span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">Yorumları</span>
                    </h2>
                    <div className="flex items-center gap-2 mt-4">
                        <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="text-sm font-black text-[#0A0A0A] uppercase tracking-[0.2em]">4.9 / 5 Müşteri Memnuniyeti</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="bg-[#FDFBF7] p-12 lg:p-16 relative border border-[#0A0A0A]/5 group hover:border-[#D4AF37]/30 transition-all duration-700"
                        >
                            <Quote className="absolute top-12 right-12 w-16 h-16 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-all" />

                            <div className="flex gap-1 mb-10">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                                ))}
                            </div>

                            <p className="text-2xl lg:text-3xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-tight italic mb-12">
                                "{review.text}"
                            </p>

                            <div className="flex items-center justify-between pt-10 border-t border-[#0A0A0A]/10 mt-auto">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 border border-[#D4AF37] flex items-center justify-center font-black text-[#D4AF37] text-xl italic bg-white">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-lg font-black text-[#0A0A0A] uppercase tracking-tighter leading-none mb-2">{review.name}</div>
                                        <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">{review.city} // {review.date}</div>
                                    </div>
                                </div>

                                <div className="hidden sm:flex items-center gap-4 border-l border-[#D4AF37]/20 pl-6">
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-[#0A0A0A]/30 uppercase block mb-1">ESER</span>
                                        <span className="text-[10px] font-black text-[#0A0A0A] uppercase tracking-widest">{review.product}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Summary */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#0A0A0A]/5">
                    {[
                        { label: "MUTLU KOLEKSİYONER", val: "2500+" },
                        { label: "ORTALAMA PUAN", val: "4.9 / 5" },
                        { label: "TAVSİYE ORANI", val: "%99" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-12 text-center border-r border-[#0A0A0A]/5 last:border-r-0">
                            <div className="text-5xl lg:text-6xl font-black text-[#0A0A0A] italic tracking-tighter mb-4">{stat.val}</div>
                            <div className="text-[10px] font-black text-[#D4AF37] tracking-[0.4em] uppercase">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
