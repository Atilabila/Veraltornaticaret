"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Heart, ExternalLink } from "lucide-react";
import { getInstagramFeed, type InstagramPost } from "@/lib/actions/instagram.actions";

export const InstagramMarquee = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const data = await getInstagramFeed();
                if (data && data.length > 0) {
                    setPosts(data);
                } else {
                    // Fallback to static if no data yet (Standard high-res Unsplash for demo)
                    setPosts([
                        { id: "1", image_url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 120, display_order: 1, is_active: true },
                        { id: "2", image_url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 450, display_order: 2, is_active: true },
                        { id: "3", image_url: "https://images.unsplash.com/photo-1622547748225-3fc4abd2d00d?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 210, display_order: 3, is_active: true },
                        { id: "4", image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 89, display_order: 4, is_active: true },
                        { id: "5", image_url: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 532, display_order: 5, is_active: true },
                        { id: "6", image_url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 120, display_order: 6, is_active: true },
                        { id: "7", image_url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 450, display_order: 7, is_active: true },
                        { id: "8", image_url: "https://images.unsplash.com/photo-1622547748225-3fc4abd2d00d?q=80&w=800&auto=format&fit=crop", permalink: "", likes: 210, display_order: 8, is_active: true },
                    ]);
                }
            } catch (error) {
                console.error("Feed error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    // Create a duplicated list for seamless loop
    const marqueePosts = [...posts, ...posts, ...posts];

    if (!loading && posts.length === 0) return null;

    return (
        <section className="py-0 bg-[#0A0A0A] border-t border-b border-[#D4AF37]/20 relative overflow-hidden">
            {/* Header Strip */}
            <div className="absolute top-0 left-0 z-20 bg-[#0A0A0A] px-6 py-2 border-r border-[#D4AF37]/20 flex items-center gap-4">
                <Instagram className="w-5 h-5 text-[#E1306C]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">
                    @VERALTENEKETICARET
                </span>
            </div>

            {/* Gradient Overlays for Fade effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

            {/* Marquee Container */}
            <div className="flex overflow-hidden select-none py-12 group">
                <motion.div
                    className="flex gap-8 flex-nowrap"
                    animate={{
                        x: ["0%", "-33.333%"]
                    }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    style={{ width: "fit-content" }}
                >
                    {marqueePosts.map((post, idx) => (
                        <a
                            key={`${post.id}-${idx}`}
                            href={post.permalink || "https://instagram.com/veralteneketicaret"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-[300px] h-[300px] shrink-0 border border-white/10 hover:border-[#D4AF37] transition-colors duration-500 overflow-hidden bg-white/5"
                        >
                            <Image
                                src={post.image_url}
                                alt="Instagram Feed"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
                                sizes="300px"
                            />

                            {/* Hover Info */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                                <Instagram className="w-8 h-8 text-[#E1306C]" />
                                <div className="flex items-center gap-1 font-bold">
                                    <Heart className="w-4 h-4 text-white fill-white" />
                                    <span>{post.likes}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroller Text Background */}
            <div className="absolute -bottom-4 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
                <div className="text-[10rem] font-black text-white whitespace-nowrap leading-none tracking-tighter">
                    FOLLOW US ON INSTAGRAM <span className="text-transparent stroke-white stroke-2">@VERALTENEKETICARET</span>
                </div>
            </div>
        </section>
    );
};
