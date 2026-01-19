"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ProductCard, SystemLabel } from '@/components/ui/Industrial';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { PRODUCTS_DATA } from '@/lib/products';
import { Search, Filter, Box } from 'lucide-react';

export default function UrunlerClient() {
    const [selectedCategory, setSelectedCategory] = useState("HEPSİ");
    const [searchQuery, setSearchQuery] = useState("");

    const products = Object.values(PRODUCTS_DATA);
    const categories = ["HEPSİ", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === "HEPSİ" || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-paper-white">
            <Navigation />

            <div className="pt-32 pb-24 px-6 max-w-[1240px] mx-auto">

                {/* Archive Header */}
                <div className="flex flex-col gap-6 mb-16 border-b border-fog-gray pb-12">
                    <div className="flex items-center gap-3">
                        <SystemLabel text="KAYIT SORGULAMA" active />
                        <SystemLabel text={`MEVCUT MODÜLLER: ${filteredProducts.length}`} />
                    </div>
                    <h1 className="text-5xl font-bold font-space uppercase">Hizmet Envanteri</h1>
                    <p className="max-w-[700px] text-steel-gray text-lg font-source-sans">
                        1980'den bu yana geliştirdiğimiz tüm teknik çözümler, seri üretim protokolleri ve özel imalat projelerimizin bulunduğu dijital arşivimiz.
                    </p>
                </div>

                {/* Filter Toolbar */}
                <div className="grid md:grid-cols-12 gap-6 mb-12 items-end">
                    <div className="md:col-span-4 flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-steel-gray ml-1">Terim İle Ara</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray" size={18} />
                            <input
                                type="text"
                                placeholder="Örn: Dosya teli, Etiket..."
                                className="w-full bg-white border border-fog-gray p-4 pl-12 text-sm focus:border-near-black outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase text-steel-gray ml-1">Kategori Filtresi</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2 border font-ibm-plex text-[11px] font-bold uppercase transition-all
                     ${selectedCategory === cat ? 'bg-near-black text-white border-near-black' : 'bg-white text-steel-gray border-fog-gray hover:border-near-black'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid Grid */}
                <div className="grid md:grid-cols-3 gap-8">
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

                {filteredProducts.length === 0 && (
                    <div className="py-24 flex flex-col items-center justify-center border border-dashed border-fog-gray bg-white">
                        <Box className="text-fog-gray mb-4" size={48} />
                        <p className="font-bold text-steel-gray uppercase text-sm tracking-widest">Kayıt Bulunamadı</p>
                    </div>
                )}

            </div>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}
