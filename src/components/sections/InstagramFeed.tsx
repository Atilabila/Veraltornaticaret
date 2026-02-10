"use client";

import { m } from 'framer-motion';
import Image from "next/image";
import { Instagram, ExternalLink, Heart } from "lucide-react";

const instagramPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400&auto=format&fit=crop", likes: 234 },
    { id: 2, image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop", likes: 412 },
    { id: 3, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop", likes: 189 },
    { id: 4, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop", likes: 567 },
    { id: 5, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop", likes: 321 },
    { id: 6, image: "https://images.unsplash.com/photo-1464802686167-b939a67e0b24?q=80&w=400&auto=format&fit=crop", likes: 445 }
];

export const InstagramFeed = () => {
    return (
        <section id="community" className="py-16 lg:py-24 bg-transparent">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">

                <div className="flex flex-col gap-4 mb-16 items-center text-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">DİJİTAL TOPLULUK</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none italic">
                        #METAL<span className="font-serif italic font-normal text-gold-gradient normal-case tracking-normal">POSTERPRO</span>
                    </h2>
                    <p className="text-[#0A0A0A]/50 text-lg font-medium tracking-tight mt-2">@metalposterpro // #noblecollection</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {instagramPosts.map((post, index) => (
                        <m.a
                            key={post.id}
                            href="https://instagram.com/metalposterpro"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="relative aspect-square overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#0A0A0A]/5"
                        >
                            <Image
                                src={post.image}
                                alt="Instagram Paylaşımı"
                                fill
                                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-[#0A0A0A]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                                <Heart className="w-6 h-6 text-[#D4AF37] mb-2" />
                                <span className="text-white text-lg font-black italic tracking-tighter">{post.likes}</span>
                            </div>
                        </m.a>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <a
                        href="https://instagram.com/metalposterpro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-8 px-12 h-20 border border-[#0A0A0A] text-[#0A0A0A] font-black tracking-[0.4em] text-[10px] hover:bg-[#0A0A0A] hover:text-[#D4AF37] transition-all duration-500"
                    >
                        <Instagram className="w-5 h-5 text-[#D4AF37]" />
                        <span>TAKİP ET</span>
                        <ExternalLink className="w-4 h-4 opacity-30" />
                    </a>
                </div>
            </div>
        </section>
    );
};
