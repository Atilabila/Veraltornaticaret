"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, PackageOpen, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { MetalProduct, Category } from '@/lib/supabase/metal-products.types';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useContentStore } from '@/store/useContentStore';

interface CatalogContainerProps {
    products: MetalProduct[];
    categories: Category[];
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

export const CatalogContainer: React.FC<CatalogContainerProps> = ({ products, categories }) => {
    const { content } = useContentStore();
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Initial category from URL
    useEffect(() => {
        const cat = searchParams.get('cat') || searchParams.get('category');
        if (cat) {
            // Find category by slug or ID
            const found = categories.find(c => c.slug === cat || c.id === cat);
            if (found) {
                setSelectedCategory(found.id);
            }
        }
    }, [searchParams, categories]);

    // Dynamic Header Data (Defaults are safe)
    const headerTitle = content.productsPageTitle || "METAL KOLEKSİYON";
    const headerSubtitle = content.productsPageSubtitle || "Endüstriyel metal tablo ve dekorasyon koleksiyonu.";
    const headerLabel = content.productsPageIntroLabel || "Sistem: Katalog Çıktısı";
    const headerBg = content.productsPageBackgroundImage;

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category_id === selectedCategory || p.category?.slug === selectedCategory);
        }

        // Search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query) ||
                p.sku?.toLowerCase().includes(query)
            );
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return result;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <section className="bg-zinc-950 min-h-screen">
            {/* DYNAMIC HEADER */}
            <div className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-white/5 relative">
                {headerBg && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: `url(${headerBg})` }}
                    />
                )}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full -top-32 -right-32 pointer-events-none mix-blend-screen" />

                <div className="container mx-auto">
                    <div className="flex flex-col gap-6 max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#D4AF37]/20 bg-[#D4AF37]/5 w-fit">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span className="text-[10px] font-black font-mono text-[#D4AF37] uppercase tracking-[0.2em]">{headerLabel}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter text-white font-[Archivo_Black] italic leading-none max-w-5xl">
                            {headerTitle.split(" ").map((word, i) => (
                                <span key={i} className={i % 2 !== 0 ? "metallic-shiny" : ""}>{word} </span>
                            ))}
                        </h1>

                        <p className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed italic uppercase">
                            {headerSubtitle}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* TOOLBAR */}
                <div className="sticky top-20 z-40 bg-zinc-950 border-y border-white/10 p-6 mb-16 flex flex-col xl:flex-row items-center gap-10 shadow-2xl shadow-black/50">
                    {/* CATEGORY SELECTOR */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 xl:pb-0 w-full xl:w-auto">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm transition-all whitespace-nowrap border-2 ${selectedCategory === 'all'
                                ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[6px_6px_0px_0px_rgba(212,175,55,0.3)]'
                                : 'text-white/60 border-white/10 hover:border-[#D4AF37]/50 hover:text-white hover:bg-white/5'}`}
                        >
                            TÜMÜ
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm transition-all whitespace-nowrap border-2 ${selectedCategory === cat.id
                                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[6px_6px_0px_0px_rgba(212,175,55,0.3)]'
                                    : 'text-white/60 border-white/10 hover:border-[#D4AF37]/50 hover:text-white hover:bg-white/5'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-6">
                        {/* SEARCH */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                            <input
                                type="text"
                                placeholder="MODEL, STİL VEYA SKU İLE ARA..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border-2 border-white/10 py-5 pl-16 pr-8 font-mono text-xs tracking-[0.2em] text-white focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 uppercase"
                            />
                        </div>

                        {/* SORT */}
                        <div className="w-full md:w-72 relative">
                            <SlidersHorizontal className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="w-full bg-white/5 border-2 border-white/10 py-5 pl-14 pr-12 font-mono text-xs tracking-[0.15em] text-white appearance-none focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer uppercase font-bold"
                            >
                                <option value="newest" className="bg-zinc-900 text-white">YENİDEN ESKİYE</option>
                                <option value="price-asc" className="bg-zinc-900 text-white">FİYAT (ARTAN)</option>
                                <option value="price-desc" className="bg-zinc-900 text-white">FİYAT (AZALAN)</option>
                                <option value="name-asc" className="bg-zinc-900 text-white">İSİM (A-Z)</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <motion.div
                    layout
                    className="product-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* EMPTY STATE */}
                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-3xl">
                        <PackageOpen className="w-16 h-16 text-white/10 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tighter">Kayıt Bulunamadı</h3>
                        <p className="text-white/30 font-mono text-xs uppercase tracking-widest">Seçili kriterlere uygun üretim kaydı mevcut değil.</p>
                        <button
                            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                            className="mt-8 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em] hover:underline"
                        >
                            FİLTRELERİ SIFIRLA
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
