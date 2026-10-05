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
            <section id="reviews" className="py-16 lg:py-24 bg-white border-b border-zinc-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">

                    <div className="flex flex-col gap-4 mb-16 text-center items-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                            35.000+ Doğrulanmış Sipariş
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                            Toptan İmalat Referanslarımız
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                ))}
                            </div>
                            <span className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-wider">
                                {content.reviewsRatingLabel || "%99.2 Müşteri Memnuniyeti"}
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
                                className="bg-[#fafafa] p-8 lg:p-10 relative border border-zinc-200 rounded-2xl shadow-sm group hover:border-amber-500 hover:shadow-md transition-all"
                            >
                                <Quote className="absolute top-8 right-8 w-10 h-10 text-amber-600/15" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.rating || 5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    ))}
                                </div>

                                <p className="text-lg lg:text-xl font-medium text-zinc-900 leading-relaxed mb-8">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
                                    <div>
                                        <div className="font-bold text-sm text-zinc-900">
                                            {review.author}
                                        </div>
                                        <div className="text-xs font-mono text-amber-700">
                                            {review.role || "Toptan Müşteri"}
                                        </div>
                                    </div>
                                    {review.location && (
                                        <div className="text-xs font-mono text-zinc-400">
                                            {review.location}
                                        </div>
                                    )}
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
