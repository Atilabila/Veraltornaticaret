"use client";

import { m } from 'framer-motion';
import { Star, Quote } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

export const CustomerReviews = () => {
    const { content } = useContentStore();
    const { shouldReduceVisuals } = usePerformanceDetection();

    if (shouldReduceVisuals) return null;

    const reviews = content.reviewItems || [];

    return (
        <DirectEdit tab="reviews">
            <section id="reviews" className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">

                    <div className="flex flex-col gap-4 mb-16 text-center items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-[var(--color-brand-accent)]" />
                            <span className="text-sm font-black text-[#525252] tracking-[0.3em] uppercase font-mono">
                                {content.reviewsTitle} {content.reviewsSubtitle}
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-[#161616] tracking-tighter uppercase leading-none">
                            Toptan İmalat Referansları
                        </h2>
                        <div className="flex items-center gap-2 mt-4">
                            <Star className="w-4 h-4 text-[var(--color-brand-accent)] fill-[var(--color-brand-accent)]" />
                            <span className="text-sm font-bold text-[#525252] uppercase tracking-[0.15em]">
                                {content.reviewsRatingLabel}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {reviews.map((review, index) => (
                            <m.div
                                key={review.id || index}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-[#f4f4f4] p-10 lg:p-12 relative border border-[#c6c6c6] group hover:border-[var(--color-brand-accent)] transition-colors"
                            >
                                <Quote className="absolute top-10 right-10 w-12 h-12 text-[var(--color-brand-accent)]/10" />

                                <div className="flex gap-1 mb-8">
                                    {[...Array(review.rating || 5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-[var(--color-brand-accent)] fill-[var(--color-brand-accent)]" />
                                    ))}
                                </div>

                                <p className="text-xl lg:text-2xl font-semibold text-[#161616] leading-snug mb-10">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                <div className="flex items-center justify-between pt-8 border-t border-[#c6c6c6] mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 border-2 border-[var(--color-brand-accent)] flex items-center justify-center font-bold text-[var(--color-brand-accent)] text-lg bg-white">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-base font-bold text-[#161616] leading-none mb-1">{review.name}</div>
                                            <div className="text-xs font-mono text-[#525252] uppercase tracking-wider">{review.city} · {review.date}</div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:block text-right">
                                        <span className="text-[10px] font-mono text-[#525252] uppercase block mb-1">Hat / Ürün</span>
                                        <span className="text-xs font-bold text-[#161616]">{review.product}</span>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
