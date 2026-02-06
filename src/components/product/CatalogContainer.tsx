"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  PackageOpen,
  ChevronDown,
  ShoppingCart,
  Filter,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MetalProduct, Category } from "@/lib/supabase/metal-products.types";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useContentStore } from "@/store/useContentStore";
import { useCartStore } from "@/store/useCartStore";
import { RecentlyViewed } from "./RecentlyViewed";

interface CatalogContainerProps {
  products: MetalProduct[];
  categories: Category[];
  showcaseProducts?: MetalProduct[];
}

type Filters = {
  priceMin?: number;
  priceMax?: number;
  inStockOnly?: boolean;
  theme?: string[];
  size?: string[];
  material?: string[];
  sort?: "new" | "price_asc" | "price_desc" | "featured";
};

export const CatalogContainer: React.FC<CatalogContainerProps> = ({
  products,
  categories,
  showcaseProducts: _showcaseProducts = [],
}) => {
  const { content } = useContentStore();
  const cartItems = useCartStore((state: any) => state.items || []);
  const cartCount = cartItems.length || 0;
  const cartTotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.price || 0),
    0
  );

  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ sort: "new" });

  useEffect(() => {
    const cat = searchParams.get("cat") || searchParams.get("category");
    if (cat) {
      const found = categories.find((c) => c.slug === cat || c.id === cat);
      if (found) setSelectedCategory(found.id);
    }
  }, [searchParams, categories]);

  const headerTitle = content.productsPageTitle || "METAL KOLEKSİYON";
  const headerSubtitle =
    content.productsPageSubtitle ||
    "Endüstriyel metal tablo ve dekorasyon koleksiyonu.";
  const headerLabel = content.productsPageIntroLabel || "ÖZEL KOLEKSİYON";
  const headerBg = content.productsPageBackgroundImage;

  const themeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) => p.category?.name || p.category?.slug || "Genel")
            .filter(Boolean)
        )
      ),
    [products]
  );

  const sizeOptions = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.specs?.dims).filter(Boolean))
      ),
    [products]
  );

  const materialOptions = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.specs?.material).filter(Boolean))
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.category_id === selectedCategory ||
          p.category?.slug === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.sku?.toLowerCase().includes(query)
      );
    }

    if (filters.priceMin !== undefined) {
      result = result.filter((p) => p.price >= (filters.priceMin || 0));
    }
    if (filters.priceMax !== undefined) {
      result = result.filter(
        (p) => p.price <= (filters.priceMax || Number.MAX_SAFE_INTEGER)
      );
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => (p.stock_quantity ?? 0) > 0);
    }
    if (filters.theme && filters.theme.length > 0) {
      result = result.filter((p) =>
        filters.theme?.includes(p.category?.name || p.category?.slug || "")
      );
    }
    if (filters.size && filters.size.length > 0) {
      result = result.filter((p) =>
        filters.size?.includes(p.specs?.dims || "")
      );
    }
    if (filters.material && filters.material.length > 0) {
      result = result.filter((p) =>
        filters.material?.includes(p.specs?.material || "")
      );
    }

    const sortKey = filters.sort || "new";
    result.sort((a, b) => {
      switch (sortKey) {
        case "new":
          return (
            (new Date(b.created_at || "").getTime() || 0) -
            (new Date(a.created_at || "").getTime() || 0)
          );
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "featured":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [products, selectedCategory, searchQuery, filters]);

  const recentItems = useMemo(
    () => filteredProducts.slice(0, 3),
    [filteredProducts]
  );
  const freeShippingThreshold = content.cartPage?.freeShippingThreshold || 500;
  const shippingRemaining = Math.max(freeShippingThreshold - cartTotal, 0);

  const toggleMulti = (key: "theme" | "size" | "material", value: string) => {
    setFilters((prev) => {
      const list = prev[key] || [];
      const exists = list.includes(value);
      const nextList = exists ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [key]: nextList };
    });
  };

  const resetFilters = () => {
    setFilters({ sort: "new" });
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const activeFilterChips: string[] = [];
  if (filters.priceMin !== undefined) activeFilterChips.push(`Min ${filters.priceMin} TL`);
  if (filters.priceMax !== undefined) activeFilterChips.push(`Max ${filters.priceMax} TL`);
  if (filters.inStockOnly) activeFilterChips.push("Stokta var");
  (filters.theme || []).forEach((t) => activeFilterChips.push(t));
  (filters.size || []).forEach((t) => activeFilterChips.push(t));
  (filters.material || []).forEach((t) => activeFilterChips.push(t));

  return (
    <section className="bg-zinc-950 min-h-screen">
      <div className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-white/5 relative">
        {headerBg && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url(${headerBg})` }}
          />
        )}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent opacity-40" />
          <div className="absolute top-[-4rem] right-[-4rem] sm:right-[-2rem] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />
        </div>

        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-6 max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#D4AF37]/20 bg-[#D4AF37]/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10px] font-black font-mono text-[#D4AF37] uppercase tracking-[0.2em]">
                {headerLabel}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter text-white font-[Archivo_Black] italic leading-none max-w-5xl">
              {headerTitle.split(" ").map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "metallic-shiny" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed italic uppercase">
              {headerSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8 py-10 lg:py-12 lg:ml-6 lg:mr-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 xl:gap-10 items-start">
          <aside className="order-1 space-y-4 lg:sticky lg:top-20 hidden lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-contain" />
                <div className="text-white font-black text-lg tracking-tight">
                  {content.siteName || "VERAL"}
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
                  ? `${shippingRemaining.toLocaleString(
                      "tr-TR"
                    )} TL daha ekle, ücretsiz kargo!`
                  : "Ücretsiz kargo kazandın"}
              </div>
              <Link
                href="/sepet"
                className="inline-flex items-center justify-center w-full h-11 bg-[#D4AF37] text-black font-black uppercase tracking-[0.25em]"
              >
                Sepete Git ({cartCount})
              </Link>
            </div>

            <RecentlyViewed items={recentItems} />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                  Kategoriler
                </span>
                <ChevronDown className="w-4 h-4 text-white/50" />
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-md border ${
                    selectedCategory === "all"
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-white/10 text-white/70"
                  }`}
                >
                  Tüm ürünler
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-md border ${
                      selectedCategory === cat.id
                        ? "border-[#D4AF37] text-[#D4AF37]"
                        : "border-white/10 text-white/70"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                  Filtreler
                </span>
                <Filter className="w-4 h-4 text-white/50" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-white/80 text-sm font-bold uppercase tracking-tight">
                <label className="col-span-2 text-xs text-white/60">Fiyat Aralığı</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin ?? ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
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
                    setFilters((prev) => ({
                      ...prev,
                      priceMax: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                  className="bg-black/40 border border-white/10 rounded-md py-2 px-3 text-white text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-tight">
                <input
                  type="checkbox"
                  className="accent-[#D4AF37]"
                  checked={!!filters.inStockOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                  }
                />
                Stokta Olanlar
              </label>

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

              <button
                onClick={resetFilters}
                className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60 hover:text-[#D4AF37]"
              >
                Filtreleri sıfırla
              </button>
            </div>

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
          </aside>

          <div className="order-2 w-full">
            <div className="mb-8 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <div className="text-sm font-black uppercase tracking-[0.3em] text-[#D4AF37]">
                  İndirim / Ücretsiz kargo / Kampanya
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-white/70 text-sm uppercase tracking-[0.2em]">
                <span className="px-3 py-2 border border-white/10 rounded-md">Sonbahar kampanya</span>
                <span className="px-3 py-2 border border-white/10 rounded-md">%10 ilk alışveriş</span>
                <span className="px-3 py-2 border border-white/10 rounded-md">
                  {freeShippingThreshold} TL üstü kargo bedava
                </span>
              </div>
            </div>

            <div className="sticky top-20 z-30 bg-zinc-950 border-y border-white/10 p-6 mb-10 flex flex-col xl:flex-row items-center gap-8 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 xl:pb-0 w-full xl:w-auto">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-6 py-3 text-xs font-black uppercase tracking-[0.2em] rounded-sm transition-all whitespace-nowrap border-2 ${
                    selectedCategory === "all"
                      ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                      : "text-white/60 border-white/10 hover:border-[#D4AF37]/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Tümü
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-[0.2em] rounded-sm transition-all whitespace-nowrap border-2 ${
                      selectedCategory === cat.id
                        ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                        : "text-white/60 border-white/10 hover:border-[#D4AF37]/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                  <input
                    type="text"
                    placeholder="Model veya stil ile ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-8 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-all uppercase tracking-[0.15em]"
                  />
                </div>
                <div className="w-full md:w-64 relative">
                  <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <select
                    value={filters.sort || "new"}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sort: e.target.value as Filters["sort"],
                      }))
                    }
                    className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-[#D4AF37] uppercase font-bold tracking-[0.2em]"
                  >
                    <option value="new" className="bg-zinc-900 text-white">
                      Yeniden eskiye
                    </option>
                    <option value="price_asc" className="bg-zinc-900 text-white">
                      Fiyat (artan)
                    </option>
                    <option value="price_desc" className="bg-zinc-900 text-white">
                      Fiyat (azalan)
                    </option>
                    <option value="featured" className="bg-zinc-900 text-white">
                      İsim (A-Z)
                    </option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>

              {activeFilterChips.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full">
                  {activeFilterChips.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 text-xs font-black uppercase tracking-[0.2em] bg-white/10 border border-white/15 text-white rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="product-grid grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <ProductCard product={product} variant="horizontal" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <PackageOpen className="w-16 h-16 text-white/10 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tighter">
                  Kayıt Bulunamadı
                </h3>
                <p className="text-white/30 font-mono text-xs uppercase tracking-widest">
                  Seçili kriterlere uygun kayıt yok.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-8 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em] hover:underline"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
