"use client";

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, PackageOpen, ChevronDown } from 'lucide-react';
import { MetalProduct, Category } from '@/lib/supabase/metal-products.types';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

interface CatalogContainerProps {
    products: MetalProduct[];
    categories: Category[];
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

export const CatalogContainer: React.FC<CatalogContainerProps> = ({ products, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        <section className="bg-zinc-950 min-h-screen py-12">
            <div className="container mx-auto px-6">
                {/* TOOLBAR */}
                {/* TOOLBAR */}
                <div className="sticky top-20 z-40 bg-zinc-950/90 backdrop-blur-xl border-y border-white/10 p-6 mb-16 flex flex-col xl:flex-row items-center gap-10">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
                        <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tighter">Birim Bulunamadı</h3>
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
