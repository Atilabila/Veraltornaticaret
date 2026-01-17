"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";

export const ProductGallery = () => {
    const { products, loading, fetchProducts } = useProductStore();
    const addItem = useCartStore((state) => state.addItem);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const categories = [
        { id: null, label: "TÜMÜ", color: "var(--color-brand-safety-orange)" },
        { id: "ARABA_PLAKA", label: "ARABALAR", color: "#3B82F6" },
        { id: "ATATURK_PLAKA", label: "ATATÜRK", color: "#EF4444" },
        { id: "CHARACTER_PLAKA", label: "KARAKTERLER", color: "#8B5CF6" },
        { id: "MOTOR_PLAKA", label: "MOTORLAR", color: "#F59E0B" },
    ];

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    // İlk 12 ürünü göster
    const displayProducts = filteredProducts.slice(0, 12);

    if (loading) {
        return (
            <section className="py-24 bg-slate-100">
                <div className="container-brutal">
                    <div className="text-center font-mono font-bold text-2xl">
                        ÜRÜNLER YÜKLENİYOR...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-slate-100 border-b-8 border-black">
            <div className="container-brutal">
                {/* Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-black text-white px-6 py-2 font-mono text-sm font-bold mb-6"
                    >
                        ÜRÜN KATALOĞU v2.0
                    </motion.div>
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-[Archivo Black] leading-none uppercase mb-8">
                        METAL POSTER<br />KOLEKSİYONU
                    </h2>
                    <p className="text-xl md:text-2xl font-mono font-bold max-w-3xl border-l-8 border-black pl-8">
                        28 FARKLI TASARIM. 1.5MM ALÜMİNYUM. UV DİJİTAL BASKI. HEMEN SİPARİŞ VER.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id || "all"}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-3 font-mono font-bold border-4 border-black transition-none ${selectedCategory === cat.id
                                ? "bg-black text-white shadow-brutal-orange"
                                : "bg-white hover:bg-[#FFD700]"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white border-4 border-black shadow-brutal hover:shadow-brutal-orange transition-none"
                        >
                            {/* Image - Clickable */}
                            <Link href={`/koleksiyon/${product.category}/${product.slug}`} className="block">
                                <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden border-b-4 border-black cursor-pointer">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <span className="p-3 bg-white border-2 border-black hover:bg-[#FFD700] transition-none">
                                            <Eye className="w-6 h-6" />
                                        </span>
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product as any); }}
                                            className="p-3 bg-[var(--color-brand-safety-orange)] text-white border-2 border-black hover:bg-[var(--color-brand-safety-orange)]/80 transition-none"
                                        >
                                            <ShoppingCart className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Price Tag */}
                                    <div className="absolute top-4 right-4 bg-[#FFD700] border-2 border-black px-3 py-1 font-mono font-black text-sm">
                                        {product.price} TL
                                    </div>
                                </div>
                            </Link>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-mono font-bold text-base sm:text-sm md:text-base mb-2 line-clamp-2 min-h-[3rem] sm:min-h-[2.5rem] leading-relaxed">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-black/50">
                                        {product.category?.replace("_PLAKA", "")}
                                    </span>
                                    <span className="text-lg font-black text-[var(--color-brand-safety-orange)]">
                                        ₺{product.price}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href="/urunler"
                        className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 font-mono font-bold text-xl border-4 border-black shadow-brutal-orange hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-none"
                    >
                        TÜM ÜRÜNLER ({products.length})
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
