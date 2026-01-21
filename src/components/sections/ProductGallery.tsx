"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Star } from "lucide-react";
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
        { id: null, label: "TUMU", color: "var(--color-brand-safety-orange)" },
        { id: "ARABA_PLAKA", label: "ARABALAR", color: "#3B82F6" },
        { id: "ATATURK_PLAKA", label: "ATATURK", color: "#EF4444" },
        { id: "CHARACTER_PLAKA", label: "KARAKTERLER", color: "#8B5CF6" },
        { id: "MOTOR_PLAKA", label: "MOTOR", color: "#F59E0B" },
        { id: "YAPAY_CITY", label: "YAPAY CITY", color: "#00FF41" },
    ];

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    const displayProducts = filteredProducts.slice(0, 12);

    if (loading) {
        return (
            <section id="products" className="py-24 bg-slate-100">
                <div className="container-brutal">
                    <div className="text-center font-mono font-bold text-2xl">
                        URUNLER YUKLENIYOR...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="py-20">
            <div className="container-brutal">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
                        Katalog
                    </h2>
                    <p className="text-gray-400 max-w-[600px] text-lg leading-relaxed font-medium">
                        Endüstriyel tasarımın zarafetle buluştuğu yüksek kaliteli metal poster koleksiyonu.
                    </p>
                </div>

                {/* Category Filter - Premium Style */}
                <div className="w-full overflow-x-auto pb-6 mb-12 no-scrollbar">
                    <div className="flex gap-4 min-w-max px-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id || "all"}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`
                                    px-8 py-3 rounded-full text-[13px] font-bold transition-all duration-300 border
                                    ${selectedCategory === cat.id
                                        ? "bg-[#ff6b00] text-white border-[#ff6b00] shadow-xl shadow-orange-100 scale-105"
                                        : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:text-gray-900"
                                    }
                                `}
                            >
                                {cat.label === "TUMU" ? "Tümü" : cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid - Image 0 Pattern */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group flex flex-col bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image Wrapper */}
                            <Link href={`/urunler/${product.slug}`} className="block relative aspect-square mb-6 overflow-hidden rounded-xl bg-gray-50">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                />

                                {/* Status Badge (if applicable) */}
                                <div className="absolute top-3 left-3 bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                                    EN ÇOK SATAN
                                </div>
                            </Link>

                            {/* Info Section */}
                            <div className="flex flex-col flex-grow">
                                <Link href={`/urunler/${product.slug}`} className="hover:text-[#ff6b00] transition-colors">
                                    <h3 className="text-xl font-bold text-[#111827] mb-2 line-clamp-1 uppercase">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs text-gray-400 font-medium">
                                        48 x 68 cm • {product.category?.replace("_PLAKA", "")}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-2xl font-bold text-[#ff6b00]">
                                        {product.price} TL
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-[#ffb800] text-[#ffb800]" />
                                        <span className="text-xs font-bold text-gray-400">4.9 (124)</span>
                                    </div>
                                </div>

                                {/* Full Width Action Button - Matching Image 0 */}
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product as any); }}
                                    className="mt-auto h-12 w-full bg-[#ff6b00] hover:bg-[#e66000] text-white rounded-xl font-extrabold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-orange-100"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    SEPETE EKLE
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <Link
                        href="/urunler"
                        className="inline-flex items-center gap-3 text-gray-400 font-bold hover:text-[#ff6b00] transition-colors group"
                    >
                        TÜM ÜRÜNLERİ GÖSTER ({products.length})
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
