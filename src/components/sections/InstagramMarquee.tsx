"use client";

import { useEffect, useState } from "react";
import { Instagram, Heart } from "lucide-react";
import { getInstagramFeed, type InstagramPost } from "@/lib/actions/instagram.actions";
import { DirectEdit } from "@/components/admin/DirectEdit";
import Image from "next/image";

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
                    // Fallback to static if no data yet
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

    // Duplicated list for seamless loop
    const marqueePosts = [...posts, ...posts];

    if (!loading && posts.length === 0) return null;

    return (
        <DirectEdit tab="instagram">
            <section className="instagram-marquee py-0 bg-[#0A0A0A] border-b border-[#D4AF37]/10 relative overflow-hidden">
                {/* Header Strip */}
                <div className="absolute top-0 left-0 z-20 bg-[#0A0A0A] px-4 py-1.5 border-r border-[#D4AF37]/10 flex items-center gap-3">
                    <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                    <span className="text-[9px] font-black tracking-[0.2em] text-white/50 uppercase">
                        @VERALTENEKETICARET
                    </span>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes marquee-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-inner {
                        display: flex;
                        gap: 24px;
                        width: max-content;
                        animation: marquee-scroll 60s linear infinite;
                        will-change: transform;
                    }
                    .marquee-inner:hover {
                        animation-play-state: paused;
                    }
                `}} />

                {/* Marquee Container */}
                <div className="flex overflow-hidden select-none py-8 group">
                    <div className="marquee-inner">
                        {marqueePosts.map((post, idx) => (
                            <a
                                key={`${post.id}-${idx}`}
                                href={post.permalink || "https://instagram.com/veralteneketicaret"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-[220px] h-[220px] shrink-0 border border-white/5 hover:border-[#D4AF37]/50 transition-colors duration-500 overflow-hidden bg-white/5"
                                style={{ transform: 'translateZ(0)' }}
                            >
                                <Image
                                    src={post.image_url}
                                    alt="Instagram Feed"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                    sizes="220px"
                                />

                                {/* Hover Info */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                                    <Instagram className="w-6 h-6 text-[#E1306C]" />
                                    <div className="flex items-center gap-1 font-bold text-sm">
                                        <Heart className="w-3.5 h-3.5 text-white fill-white" />
                                        <span>{post.likes}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};

