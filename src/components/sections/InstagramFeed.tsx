"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, ExternalLink, Heart } from "lucide-react";

const instagramPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400&auto=format&fit=crop", likes: 234, caption: "Yeni ofisimizin yıldızı #metalposter" },
    { id: 2, image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop", likes: 412, caption: "İstanbul aşkı duvarda" },
    { id: 3, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop", likes: 189, caption: "Oturma odasına huzur" },
    { id: 4, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop", likes: 567, caption: "Gaming room tamamlandı" },
    { id: 5, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop", likes: 321, caption: "Güç ve zarafet" },
    { id: 6, image: "https://images.unsplash.com/photo-1464802686167-b939a67e0b24?q=80&w=400&auto=format&fit=crop", likes: 445, caption: "Uzayı eve getirdik" }
];

export const InstagramFeed = () => {
    return (
        <section id="community" className="py-24 md:py-32">
            <div className="container-brutal">
                <div className="text-center mb-20 md:mb-28">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-50 mb-8 border border-orange-100">
                        <Instagram className="w-4 h-4 text-[#ff6b00]" />
                        <span className="text-[10px] font-black text-[#ff6b00] uppercase tracking-widest">@metalposterpro</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111827] mb-6 uppercase tracking-tighter leading-none">
                        Müşteri <span className="text-gray-400">Galerisi</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base font-bold uppercase tracking-widest max-w-xl mx-auto">
                        Ev ve ofislerden gerçek kullanıcı paylaşımları
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href="https://instagram.com/metalposterpro"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl shadow-gray-100"
                        >
                            <Image
                                src={post.image}
                                alt={post.caption}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-[#111827]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8">
                                <div className="flex items-center gap-2 text-white mb-3">
                                    <Heart className="w-6 h-6 fill-[#ff6b00] text-[#ff6b00]" />
                                    <span className="text-xl font-black">{post.likes}</span>
                                </div>
                                <p className="text-xs text-gray-200 font-bold text-center line-clamp-2 uppercase tracking-tight">{post.caption}</p>
                            </div>
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-5 h-5 text-white" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <a
                        href="https://instagram.com/metalposterpro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-[#111827] hover:bg-black text-white transition-all shadow-xl shadow-black/10 group active:scale-95"
                    >
                        <Instagram className="w-5 h-5 text-[#ff6b00]" />
                        <span className="font-extrabold uppercase tracking-widest text-xs">Instagram'da Takip Et</span>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    );
};
