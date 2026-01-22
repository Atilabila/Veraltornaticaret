"use client";

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/Industrial';
import { SectionHeader } from '@/components/ui/Brutal';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { useProductStore } from '@/store/useProductStore';
import { Search, Box, Loader2 } from 'lucide-react';

export default function UrunlerClient() {
    const { products, loading, fetchProducts } = useProductStore();
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Get unique categories
    const categories = ["ALL", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-paper-white">
                <Loader2 className="w-12 h-12 text-safety-orange animate-spin mb-4" />
                <p className="font-mono text-sm tracking-widest uppercase text-steel-gray">ARCHIVE SYNCHRONIZING...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-transparent relative">
            <Navigation />

            <div className="pt-32 pb-24 container mx-auto px-6 lg:px-12 max-w-[1400px]">
                <SectionHeader
                    title="ARCHIVE"
                    subtitle={`TOTAL UNITS: ${filteredProducts.length}`}
                />

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* === SIDEBAR (FILTERS) === */}
                    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-8">

                        {/* SEARCH */}
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] font-bold uppercase text-steel-gray">SEARCH DATABASE</label>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-gray group-focus-within:text-safety-orange transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="KEYWORD..."
                                    className="w-full bg-paper-white border-2 border-fog-gray p-3 pl-10 font-mono text-sm uppercase focus:border-near-black focus:outline-none transition-colors placeholder:text-aluminum-gray"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* CATEGORIES - DESKTOP */}
                        <div className="hidden lg:flex flex-col gap-2">
                            <label className="font-mono text-[10px] font-bold uppercase text-steel-gray mb-2">CATEGORIES</label>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-left px-4 py-3 font-space font-bold uppercase text-sm border-l-2 transition-all duration-200
                                        ${selectedCategory === cat
                                            ? 'border-safety-orange text-near-black bg-fog-gray/30 pl-6'
                                            : 'border-transparent text-steel-gray hover:border-steel-gray hover:text-near-black hover:pl-6'
                                        }`}
                                >
                                    {cat === "ALL" ? "VIEW ALL" : cat}
                                </button>
                            ))}
                        </div>

                        {/* CATEGORIES - MOBILE (Horizontal Scroll) */}
                        <div className="lg:hidden flex flex-col gap-2">
                            <label className="font-mono text-[10px] font-bold uppercase text-steel-gray">FILTER BY</label>
                            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex-shrink-0 px-4 py-2 border-2 font-mono text-xs font-bold uppercase whitespace-nowrap transition-colors
                                            ${selectedCategory === cat
                                                ? 'bg-near-black text-white border-near-black'
                                                : 'bg-transparent text-steel-gray border-fog-gray'
                                            }`}
                                    >
                                        {cat === "ALL" ? "ALL" : cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* === PRODUCT GRID === */}
                    <div className="flex-grow">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.slug}
                                        title={product.name}
                                        oneLiner={product.description}
                                        href={`/urunler/${product.slug}`}
                                        tag={product.category}
                                        image={product.image}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-fog-gray bg-white/50">
                                <Box className="text-aluminum-gray mb-4" size={48} />
                                <p className="font-mono text-steel-gray uppercase text-sm tracking-widest">NO DATA FOUND</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("ALL") }}
                                    className="mt-4 text-xs font-bold text-safety-orange hover:underline uppercase"
                                >
                                    RESET FILTERS
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}
