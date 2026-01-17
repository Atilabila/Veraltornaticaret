"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, ExternalLink, Heart } from "lucide-react";

const instagramPosts = [
    { id: 1, image: "/porsche.png", likes: 234, caption: "Yeni ofisimizin yıldızı ⭐ #metalposter #veralticaret" },
    { id: 2, image: "/istanbul.png", likes: 412, caption: "İstanbul aşkı duvarda 🌉 #istanbul #metaltablo" },
    { id: 3, image: "/waves.png", likes: 189, caption: "Oturma odasına huzur geldi 🌊 #decoration #homedecor" },
    { id: 4, image: "/cyberpunk.png", likes: 567, caption: "Gaming room tamamlandı 🎮 #cyberpunk #gamingsetup" },
    { id: 5, image: "/lion.png", likes: 321, caption: "Güç ve zarafet bir arada 🦁 #artwall #premium" },
    { id: 6, image: "/nebula.png", likes: 445, caption: "Uzayı eve getirdik 🌌 #space #nebula #wallart" }
];

export const InstagramFeed = () => {
    return (
        <section className="py-24 md:py-32 bg-slate-900/30">
            <div className="container mx-auto px-5 md:px-6">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                        <Instagram className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-slate-300">@veralticaret</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6">
                        Müşteri <span className="text-gradient">Galerimiz</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
                        Müşterilerimizin evlerinden ve ofislerinden kareler
                    </p>
                </div>

                {/* Instagram Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href="https://instagram.com/veralticaret"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={post.image}
                                alt={post.caption}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <div className="flex items-center gap-2 text-white mb-2">
                                    <Heart className="w-5 h-5 fill-white" />
                                    <span className="font-medium">{post.likes}</span>
                                </div>
                                <p className="text-xs text-slate-300 text-center line-clamp-2">{post.caption}</p>
                            </div>
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Follow CTA */}
                <div className="text-center mt-16">
                    <a
                        href="https://instagram.com/veralticaret"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card hover:bg-white/10 transition-colors group"
                    >
                        <Instagram className="w-5 h-5 text-pink-400" />
                        <span className="font-medium">Bizi Instagram'da Takip Edin</span>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    );
};
