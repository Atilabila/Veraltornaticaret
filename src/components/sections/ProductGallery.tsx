"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { useContentStore } from "@/store/useContentStore";
import { DirectEdit } from "@/components/admin/DirectEdit";

export const ProductGallery = () => {
    const { content } = useContentStore();
    const { products, categories: allCategories, loading, fetchProducts, fetchCategories } = useProductStore();
    const addItem = useCartStore((state) => state.addItem);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [fetchProducts, fetchCategories]);

    // Only show categories that HAVE products (excluding showcase-only products)
    const activeCategories = [
        { id: null, label: "TÜM KOLEKSİYON" },
        ...allCategories
            .filter(cat => products.some(p => (p.category === cat.id || p.category_id === cat.id) && !p.is_showcase))
            .map(cat => ({ id: cat.id, label: cat.name }))
    ];

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory && !p.is_showcase)
        : products.filter((p) => !p.is_showcase);

    // Limit to 5 on mobile, 12 on desktop
    const displayProducts = isMobile ? filteredProducts.slice(0, 5) : filteredProducts.slice(0, 12);

    if (loading) {
        return (
            <section id="products" className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-block animate-pulse font-black text-2xl text-[#0A0A0A]/20 tracking-widest">YÜKLENİYOR // NOBLE COLLECTION</div>
                </div>
            </section>
        );
    }

    return (
        <DirectEdit tab="products">
            <section id="products" className="py-16 lg:py-24 bg-transparent">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                                <span className="text-sm font-black text-[#D4AF37] tracking-[0.3em] uppercase">Seçkin Katalog</span>
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none italic">
                                Trend <span className="text-gold-metal normal-case tracking-normal">Eserler</span>
                            </h2>
                            <p className="text-white/50 text-lg font-medium max-w-lg">Sadece metal değil; her biri titizlikle tasarlanmış bir sanat parçası.</p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                            {activeCategories.map((cat) => (
                                <button
                                    key={cat.id || "all"}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`
                                        px-10 py-4 text-[10px] font-black tracking-[0.3em] uppercase transition-all whitespace-nowrap border
                                        ${selectedCategory === cat.id
                                            ? "bg-white text-black border-white shadow-2xl"
                                            : "bg-transparent text-white/40 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                                        }
                                    `}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
                        {displayProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.03, duration: 0.5 }}
                                className="group flex flex-col gap-8"
                            >
                                {/* Image Wrapper: Sharp Museum Frame */}
                                <Link href={`/urunler/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#f8f8f8] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_50px_100px_-20px_rgba(212,175,55,0.2)] transition-all duration-1000 border border-[#0A0A0A]/5">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    {/* Label for Detail */}
                                    <div className="absolute bottom-6 right-6 p-4 bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 border border-[#D4AF37]/30">
                                        <Plus className="w-5 h-5 text-[#D4AF37]" />
                                    </div>
                                </Link>


                                {/* Info Section: High Readability */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-[1px] bg-[#D4AF37]/40" />
                                        <span className="text-[9px] font-black text-[#D4AF37] tracking-[0.4em] uppercase">
                                            {product.category?.replace("_PLAKA", "") || "COLLECTION"}
                                        </span>
                                    </div>
                                    <Link href={`/urunler/${product.slug}`}>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none italic group-hover:text-gold-metal transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex justify-between items-center sm:mt-2 pt-6 border-t border-[#0A0A0A]/5">
                                        <p className="text-3xl font-black text-white italic tracking-tighter">{product.price} TL</p>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addItem({
                                                    productId: product.id,
                                                    name: product.name,
                                                    slug: product.slug,
                                                    price: product.price,
                                                    image: product.image,
                                                    size: '45x60', // Default size matching base price
                                                    orientation: 'vertical' // Default orientation
                                                });
                                            }}
                                            className="px-8 h-12 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500"
                                        >
                                            SEPETE EKLE
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-32">
                        <Link
                            href={content.productsExploreUrl || "/urunler"}
                            className="inline-flex items-center justify-center gap-8 px-16 h-20 bg-transparent border border-white/20 text-white font-black tracking-[0.5em] transition-all hover:bg-white hover:text-black group relative overflow-hidden"
                        >
                            <span className="relative z-10 uppercase text-xs">
                                {content.productsExploreText || "TÜMÜNÜ İNCELE"}
                            </span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </DirectEdit>
    );
};
