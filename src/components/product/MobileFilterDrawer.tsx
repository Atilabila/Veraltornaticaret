"use client";

import React, { useEffect } from "react";
import { X, Filter, Search, ShoppingCart, ShieldCheck } from "lucide-react";
import { Category, MetalProduct } from "@/lib/supabase/metal-products.types";
import { RecentlyViewed } from "./RecentlyViewed";

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    categories: Category[];
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    filters: any;
    setFilters: (f: any) => void;
    themeOptions: string[];
    sizeOptions: string[];
    materialOptions: string[];
    toggleMulti: (key: "theme" | "size" | "material", value: string) => void;
    resetFilters: () => void;
    recentItems: MetalProduct[];
    cartTotal: number;
    cartCount: number;
    shippingRemaining: number;
    siteName: string;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    isOpen,
    onClose,
    selectedCategory,
    setSelectedCategory,
    categories,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    themeOptions,
    sizeOptions,
    materialOptions,
    toggleMulti,
    resetFilters,
    recentItems,
    cartTotal,
    cartCount,
    shippingRemaining,
    siteName,
}) => {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
                className="fixed inset-y-0 left-0 w-full max-w-sm bg-zinc-950 border-r border-white/10 z-50 overflow-y-auto lg:hidden"
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-zinc-950 border-b border-white/10 p-4 flex items-center justify-between">
                    <h2 id="drawer-title" className="text-lg font-black text-white uppercase tracking-tight">
                        Filtreler & Arama
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        aria-label="Kapat"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Logo & Trust Badges */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                        <div className="flex items-center gap-3">
                            <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-contain" />
                            <div className="text-white font-black text-lg tracking-tight">
                                {siteName || "VERAL"}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Hızlı kargo
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> İade
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Güvenli ödeme
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                                Sepet özeti
                            </span>
                            <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div className="text-2xl font-black text-white">
                            {cartTotal.toLocaleString("tr-TR")} TL
                        </div>
                        <div className="text-xs text-white/60 uppercase tracking-[0.2em]">
                            {shippingRemaining > 0
                                ? `${shippingRemaining.toLocaleString("tr-TR")} TL daha ekle, ücretsiz kargo!`
                                : "Ücretsiz kargo kazandın"}
                        </div>
                        <a
                            href="/sepet"
                            className="inline-flex items-center justify-center w-full h-11 bg-[#D4AF37] text-black font-black uppercase tracking-[0.25em] text-sm"
                        >
                            Sepete Git ({cartCount})
                        </a>
                    </div>

                    {/* Recently Viewed */}
                    <RecentlyViewed items={recentItems} />

                    {/* Categories */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                                Kategoriler
                            </span>
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    onClose();
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md border text-sm font-semibold ${selectedCategory === "all"
                                        ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
                                        : "border-white/10 text-white/70"
                                    }`}
                            >
                                Tüm ürünler
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        onClose();
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-md border text-sm font-semibold ${selectedCategory === cat.id
                                            ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
                                            : "border-white/10 text-white/70"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                                Filtreler
                            </span>
                            <Filter className="w-4 h-4 text-white/50" />
                        </div>

                        {/* Price Range */}
                        <div className="grid grid-cols-2 gap-3 text-white/80 text-sm font-bold uppercase tracking-tight">
                            <label className="col-span-2 text-xs text-white/60">Fiyat Aralığı</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.priceMin ?? ""}
                                onChange={(e) =>
                                    setFilters((prev: any) => ({
                                        ...prev,
                                        priceMin: e.target.value ? Number(e.target.value) : undefined,
                                    }))
                                }
                                className="bg-black/40 border border-white/10 rounded-md py-2 px-3 text-white text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.priceMax ?? ""}
                                onChange={(e) =>
                                    setFilters((prev: any) => ({
                                        ...prev,
                                        priceMax: e.target.value ? Number(e.target.value) : undefined,
                                    }))
                                }
                                className="bg-black/40 border border-white/10 rounded-md py-2 px-3 text-white text-sm"
                            />
                        </div>

                        {/* In Stock */}
                        <label className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-tight">
                            <input
                                type="checkbox"
                                className="accent-[#D4AF37]"
                                checked={!!filters.inStockOnly}
                                onChange={(e) =>
                                    setFilters((prev: any) => ({ ...prev, inStockOnly: e.target.checked }))
                                }
                            />
                            Stokta Olanlar
                        </label>

                        {/* Theme */}
                        {themeOptions.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs text-white/60 uppercase tracking-[0.25em]">Tema</p>
                                {themeOptions.map((opt) => (
                                    <label key={opt} className="flex items-center gap-2 text-white/80 text-sm">
                                        <input
                                            type="checkbox"
                                            className="accent-[#D4AF37]"
                                            checked={filters.theme?.includes(opt) || false}
                                            onChange={() => toggleMulti("theme", opt)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* Size */}
                        {sizeOptions.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs text-white/60 uppercase tracking-[0.25em]">Boyut</p>
                                {sizeOptions.map((opt) => (
                                    <label key={opt} className="flex items-center gap-2 text-white/80 text-sm">
                                        <input
                                            type="checkbox"
                                            className="accent-[#D4AF37]"
                                            checked={filters.size?.includes(opt) || false}
                                            onChange={() => toggleMulti("size", opt)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* Material */}
                        {materialOptions.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs text-white/60 uppercase tracking-[0.25em]">Malzeme</p>
                                {materialOptions.map((opt) => (
                                    <label key={opt} className="flex items-center gap-2 text-white/80 text-sm">
                                        <input
                                            type="checkbox"
                                            className="accent-[#D4AF37]"
                                            checked={filters.material?.includes(opt) || false}
                                            onChange={() => toggleMulti("material", opt)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => {
                                resetFilters();
                                onClose();
                            }}
                            className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60 hover:text-[#D4AF37]"
                        >
                            Filtreleri sıfırla
                        </button>
                    </div>

                    {/* Search */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                            Arama
                        </span>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                            <input
                                type="text"
                                placeholder="Ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
