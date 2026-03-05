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
import { m, AnimatePresence } from 'framer-motion';
import { useContentStore } from "@/store/useContentStore";
import { useCartStore } from "@/store/useCartStore";
import { RecentlyViewed } from "./RecentlyViewed";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { MobileActionBar } from "./MobileActionBar";

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

type ProductGroup = {
  id: string;
  name: string;
  slug: string;
  anchor: string;
  products: MetalProduct[];
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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const sectionRefs = React.useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const cat = searchParams.get("cat") || searchParams.get("category");
    if (cat) {
      const found = categories.find((c) => c.slug === cat || c.id === cat);
      if (found) setSelectedCategory(found.id);
    }

    // Kullanıcı katalog sayfasına girince hafif bir animasyonla direk ürünlere insin
    const scrollTimer = setTimeout(() => {
      const catalogContent = document.getElementById("catalog-top");
      if (catalogContent) {
        // Üst panelin (sticky header vs) altında kalmaması için biraz offsetli kaydırma yapabiliriz ama scrollIntoView yeterli olur çünkü scroll-mt-32 var.
        catalogContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 600); // 600ms bekleyip aşağı kaysın (kullanıcı önce header'ı görüp ardından ürünlere insin)

    return () => clearTimeout(scrollTimer);
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
    () => [], // Dimensions not available in MetalProduct type
    [products]
  );

  const materialOptions = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.material).filter(Boolean))
      ) as string[],
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
      // Dimensions check temporarily disabled
      // result = result.filter((p) =>
      //   filters.size?.includes(p.specs?.dims || "")
      // );
    }
    if (filters.material && filters.material.length > 0) {
      result = result.filter((p) =>
        filters.material?.includes(p.material || "")
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

  const makeAnchor = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9-_]/g, "");

  const groupedProducts = useMemo<ProductGroup[]>(() => {
    if (filteredProducts.length === 0) return [];

    // Explicit category order
    const categoryOrder = ["Tel Ürünler", "Dosya Teli", "Metal Poster", "Magnet"];

    const categoryById = new Map(categories.map((cat) => [cat.id, cat]));
    const groups = new Map<string, ProductGroup>();

    filteredProducts.forEach((product) => {
      const rawCategory = product.category;
      const categoryId = rawCategory?.id || product.category_id || "uncategorized";
      const categoryMeta = categoryById.get(categoryId);
      const name = categoryMeta?.name || rawCategory?.name || "Diğer";
      const slug = categoryMeta?.slug || rawCategory?.slug || categoryId;
      const anchor = makeAnchor(slug || categoryId);

      if (!groups.has(categoryId)) {
        groups.set(categoryId, { id: categoryId, name, slug, anchor, products: [] });
      }
      groups.get(categoryId)?.products.push(product);
    });

    const ordered: ProductGroup[] = [];
    const groupsArray = Array.from(groups.values());

    // First, add categories in the explicit order
    categoryOrder.forEach((catName) => {
      const group = groupsArray.find((g) => g.name === catName);
      if (group) ordered.push(group);
    });

    // Then, add remaining categories alphabetically
    const remaining = groupsArray
      .filter((g) => !categoryOrder.includes(g.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    ordered.push(...remaining);

    // Finally, sort ordered categories by product count descending
    ordered.sort((a, b) => b.products.length - a.products.length);

    return ordered;
  }, [filteredProducts, categories]);

  // IntersectionObserver for category scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const categoryName = entry.target.getAttribute("data-category-name");
            if (categoryName) {
              setActiveCategory(categoryName);
            }
          }
        });
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "-96px 0px -50% 0px",
      }
    );

    sectionRefs.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [groupedProducts]);


  return (
    <section className="bg-zinc-50 min-h-screen selection:bg-industrial-gold/30 selection:text-zinc-900">
      <div className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-zinc-200 relative bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_50%)]">
        {headerBg && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply grayscale"
            style={{ backgroundImage: `url(${headerBg})` }}
          />
        )}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-industrial-gold/5 to-transparent opacity-40" />
          <div className="absolute top-[-4rem] right-[-4rem] sm:right-[-2rem] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-industrial-gold/10 blur-[120px] rounded-full" />
        </div>

        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-6 max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-industrial-gold/20 bg-industrial-gold/5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-industrial-gold shadow-[0_0_8px_rgba(212,175,55,0.4)] animate-pulse" />
              <span className="text-[9px] font-black font-mono text-industrial-gold uppercase tracking-[0.3em]">
                {headerLabel}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter text-zinc-900 font-syne italic leading-[0.85] max-w-5xl">
              {headerTitle.split(" ").map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-industrial-gold" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-zinc-500 max-w-xl font-medium leading-relaxed italic uppercase tracking-widest border-l-2 border-industrial-gold/30 pl-6">
              {headerSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 py-8 sm:py-10 lg:py-12 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-6 lg:gap-10 items-start">
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside
            className="hidden lg:block order-1 sticky pb-4"
            style={{
              top: 'min(calc(100vh - 100% - 2rem), 8rem)'
            }}
          >
            <div className="space-y-4">
              <div className="rounded-none border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-contain drop-shadow-sm filter invert" />
                  <div className="text-zinc-900 font-black text-lg tracking-tight">
                    {content.siteName || "VERAL"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-industrial-gold" /> Hızlı kargo
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-industrial-gold" /> İade garantisi
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <ShieldCheck className="w-4 h-4 text-industrial-gold" /> Güvenli ödeme (256-bit SSL)
                  </div>
                </div>
              </div>

              <div className="rounded-none border-t-4 border-t-industrial-gold border border-zinc-200 bg-white p-6 space-y-4 shadow-lg shadow-zinc-200/50">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                    Sipariş Özeti
                  </span>
                  <ShoppingCart className="w-5 h-5 text-industrial-gold" />
                </div>
                <div className="text-3xl font-black text-zinc-900 italic tracking-tighter">
                  {cartTotal.toLocaleString("tr-TR")} <span className="text-sm font-mono text-zinc-400 uppercase ml-1">TL</span>
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-mono leading-relaxed">
                  {shippingRemaining > 0
                    ? `Bedava kargo için ${shippingRemaining.toLocaleString("tr-TR")} TL kaldı!`
                    : "Tebrikler, kargo bizden!"}
                </div>
                <Link
                  href="/sepet"
                  className="inline-flex items-center justify-center w-full h-12 bg-industrial-gold border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-200 shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                >
                  ÖDEMEYE GİT ({cartCount})
                </Link>
              </div>

              <RecentlyViewed items={recentItems} />

              <div className="rounded-none border border-zinc-200 bg-white p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-800">
                    Kategoriler
                  </span>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2.5 rounded-none border-l-2 text-sm font-medium transition-colors ${selectedCategory === "all"
                      ? "border-industrial-gold bg-zinc-50 text-industrial-gold"
                      : "border-transparent text-zinc-600 hover:bg-zinc-50"
                      }`}
                  >
                    Tüm Koleksiyon
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-none border-l-2 text-sm font-medium transition-colors ${selectedCategory === cat.id
                        ? "border-industrial-gold bg-zinc-50 text-industrial-gold"
                        : "border-transparent text-zinc-600 hover:bg-zinc-50"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-none border border-zinc-200 bg-white p-5 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-800">
                    Filtreler
                  </span>
                  <Filter className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-zinc-700 text-sm font-bold uppercase tracking-tight">
                  <label className="col-span-2 text-xs text-zinc-500 flex items-center gap-2">
                    Fiyat Aralığı
                  </label>
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
                    className="bg-zinc-50 border border-zinc-200 rounded-none py-2 px-3 text-zinc-900 text-sm focus:border-industrial-gold focus:outline-none transition-colors"
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
                    className="bg-zinc-50 border border-zinc-200 rounded-none py-2 px-3 text-zinc-900 text-sm focus:border-industrial-gold focus:outline-none transition-colors"
                  />
                </div>
                <label className="flex items-center gap-3 text-zinc-700 text-sm font-bold uppercase tracking-tight cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-industrial-gold w-4 h-4"
                    checked={!!filters.inStockOnly}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                    }
                  />
                  Stokta Olanlar
                </label>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] font-mono">TEMA SEÇİMİ</p>
                  {themeOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 text-zinc-600 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-industrial-gold w-4 h-4"
                        checked={filters.theme?.includes(opt) || false}
                        onChange={() => toggleMulti("theme", opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] font-mono">METERYAL / MALZEME</p>
                  {materialOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 text-zinc-600 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-industrial-gold w-4 h-4"
                        checked={filters.material?.includes(opt) || false}
                        onChange={() => toggleMulti("material", opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full text-center py-2 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-industrial-gold transition-colors"
                >
                  Filtreleri Sıfırla
                </button>
              </div>

              <div className="rounded-none border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-800">
                  Arama
                </span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Katalogda Ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-none py-3 pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-industrial-gold focus:ring-1 focus:ring-industrial-gold outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="order-2 w-full min-w-0">
            {/* Mobile Category Chips - Only visible on mobile */}
            <div className="lg:hidden mb-6 -mx-3 sm:-mx-4 md:-mx-6">
              <div className="overflow-x-auto no-scrollbar px-3 sm:px-4 md:px-6">
                <div className="flex items-center gap-2 pb-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full whitespace-nowrap transition-all border ${selectedCategory === "all"
                      ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-[#D4AF37]/50"
                      }`}
                  >
                    Tümü
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full whitespace-nowrap transition-all border ${selectedCategory === cat.id
                        ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-[#D4AF37]/50"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8 bg-zinc-100 border border-zinc-200 border-l-4 border-l-industrial-gold rounded-none p-6 flex flex-col gap-4 relative overflow-hidden group shadow-sm">
              <div className="flex items-center gap-3 relative z-10">
                <Sparkles className="w-5 h-5 text-industrial-gold animate-pulse" />
                <div className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-800 italic">
                  PROMOSYON KODU // AKTİF KAMPANYALAR
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] relative z-10">
                <span className="px-4 py-2 bg-white border border-zinc-200 rounded-none shadow-sm cursor-default flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-industrial-gold"></span> FIRSAT SONBAHAR</span>
                <span className="px-4 py-2 bg-white border border-zinc-200 rounded-none shadow-sm cursor-default flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-industrial-gold"></span> %10 HOŞGELDİN</span>
                <span className="px-4 py-2 bg-white border border-zinc-200 rounded-none shadow-sm cursor-default flex items-center gap-2 text-industrial-gold font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {freeShippingThreshold} TL ÜSTÜ ÜCRETSİZ KARGO
                </span>
              </div>
            </div>

            <div className="lg:sticky lg:top-20 z-30 bg-white/90 backdrop-blur-md border-y border-zinc-200 py-4 px-6 mb-10 flex flex-col xl:flex-row items-center gap-6">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 xl:pb-0 w-full xl:w-auto px-1 pt-1">
                <a
                  href="#catalog-top"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-none transition-all duration-200 whitespace-nowrap border-2 ${selectedCategory === "all"
                    ? "bg-industrial-gold text-zinc-900 border-zinc-900 shadow-[1px_1px_0_0_#18181b] translate-x-[3px] translate-y-[3px]"
                    : "bg-white text-zinc-900 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                    }`}
                >
                  Tümü
                </a>
                {groupedProducts.map((group) => (
                  <a
                    key={group.id}
                    href={`#cat-${group.anchor}`}
                    className={`px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-none transition-all duration-200 whitespace-nowrap border-2 ${selectedCategory === group.id
                      ? "bg-industrial-gold text-zinc-900 border-zinc-900 shadow-[1px_1px_0_0_#18181b] translate-x-[3px] translate-y-[3px]"
                      : "bg-white text-zinc-900 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                      }`}
                  >
                    {group.name}
                  </a>
                ))}
              </div>

              <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-industrial-gold transition-colors" />
                  <input
                    type="text"
                    placeholder="Ürün adı, SKU veya kategori ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-zinc-200 py-3.5 pl-12 pr-8 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-industrial-gold focus:ring-1 focus:ring-industrial-gold transition-all uppercase tracking-[0.1em] font-medium shadow-sm"
                  />
                </div>
                <div className="w-full md:w-64 relative">
                  <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  <select
                    value={filters.sort || "new"}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sort: e.target.value as Filters["sort"],
                      }))
                    }
                    className="w-full bg-white border border-zinc-200 py-3.5 pl-12 pr-10 text-sm text-zinc-900 appearance-none focus:outline-none focus:border-industrial-gold focus:ring-1 focus:ring-industrial-gold font-bold tracking-[0.1em] shadow-sm uppercase cursor-pointer"
                  >
                    <option value="new" className="text-zinc-900">En Yeniler</option>
                    <option value="price_asc" className="text-zinc-900">Fiyat (Düşükten Yükseğe)</option>
                    <option value="price_desc" className="text-zinc-900">Fiyat (Yüksekten Düşüğe)</option>
                    <option value="featured" className="text-zinc-900">İsim (A-Z)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                </div>
              </div>

              {activeFilterChips.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full pt-4 xl:pt-0 border-t xl:border-t-0 border-zinc-100 xl:mt-0 mt-2">
                  {activeFilterChips.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-none flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-industrial-gold"></span> {f}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div id="catalog-top" className="scroll-mt-32" />

            {groupedProducts.length === 0 && (
              <div className="py-32 text-center border border-dashed border-zinc-300 bg-white rounded-none shadow-sm">
                <PackageOpen className="w-16 h-16 text-zinc-300 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase text-zinc-800 mb-2 tracking-tighter">
                  Kayıt Bulunamadı
                </h3>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  Seçili kriterlere uygun kayıt yok.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-8 text-industrial-gold font-black text-[10px] uppercase tracking-[0.3em] border-b border-industrial-gold/30 hover:border-industrial-gold transition-colors pb-1"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            )}

            {groupedProducts.length > 0 && (
              <div className="space-y-12">
                {groupedProducts.map((group) => (
                  <section
                    key={group.id}
                    id={`cat-${group.anchor}`}
                    className="scroll-mt-32"
                    ref={(el) => {
                      if (el) {
                        sectionRefs.current.set(group.id, el);
                      } else {
                        sectionRefs.current.delete(group.id);
                      }
                    }}
                    data-category-name={group.name}
                  >
                    <div className="lg:sticky lg:top-40 xl:top-36 z-20 mb-6 flex items-center">
                      <div className="flex items-center gap-3 px-6 py-2 border-l-4 border-industrial-gold bg-white text-zinc-800 text-sm font-black uppercase tracking-[0.3em] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-industrial-gold"></span>
                        {group.name}
                      </div>
                      <div className="h-px bg-zinc-200 flex-1 ml-4" />
                    </div>
                    <div className="product-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                      <AnimatePresence mode="popLayout">
                        {group.products.map((product) => (
                          <m.div
                            key={product.id}
                            className="min-w-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                          >
                            <ProductCard product={product} variant="default" />
                          </m.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        themeOptions={themeOptions}
        sizeOptions={sizeOptions}
        materialOptions={materialOptions}
        toggleMulti={toggleMulti}
        resetFilters={resetFilters}
        recentItems={recentItems}
        cartTotal={cartTotal}
        cartCount={cartCount}
        shippingRemaining={shippingRemaining}
        siteName={content.siteName || "VERAL"}
      />

      {/* Mobile Action Bar */}
      <MobileActionBar
        onFilterClick={() => setIsMobileDrawerOpen(true)}
        onSearchClick={() => {
          setIsMobileDrawerOpen(true);
          // Focus on search input after drawer opens
          setTimeout(() => {
            const searchInput = document.querySelector<HTMLInputElement>('input[placeholder="Ara..."]');
            searchInput?.focus();
          }, 100);
        }}
        cartCount={cartCount}
      />

      {/* Category Transition Overlay - Mobile only */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-40 lg:hidden transition-all duration-300 ease-out ${activeCategory
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
      >
        <div className="bg-black/25 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl px-4 py-2">
          <span className="text-zinc-200/70 font-extrabold tracking-[0.25em] uppercase text-sm">
            {activeCategory}
          </span>
        </div>
      </div>
    </section>
  );
};


