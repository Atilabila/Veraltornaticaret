"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight, Plus, Filter } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { normalizeImagePath } from "@/lib/utils";

type FilterItem = { id: string; label: string; helper?: string };

function isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export const BlueprintShowcase = () => {
    const { products, categories, loading, fetchProducts, fetchCategories } = useProductStore();
    const addItem = useCartStore((s) => s.addItem);

    const [activeFilter, setActiveFilter] = React.useState<string>("all");

    React.useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    const sourceProducts = React.useMemo(() => {
        const hasShowcase = products.some((p) => Boolean(p.is_showcase));
        return hasShowcase ? products.filter((p) => p.is_showcase) : products;
    }, [products]);

    const categoriesWithProducts = React.useMemo(() => {
        return (categories || []).filter((cat) =>
            sourceProducts.some((p) => p.category === cat.id || p.category_id === cat.id)
        );
    }, [categories, sourceProducts]);

    const filters: FilterItem[] = React.useMemo(() => {
        const top = categoriesWithProducts.slice(0, 3);
        const defaults = ["RETRO", "GARAGE", "CLASSIC"];

        const dynamic = top.map((cat, idx) => {
            const label = cat?.name ? String(cat.name).toUpperCase() : defaults[idx];
            return { id: cat.id, label, helper: `CAT/${String(idx + 1).padStart(2, "0")}` };
        });

        return [{ id: "all", label: "TÜMÜ", helper: "CAT/00" }, ...dynamic];
    }, [categoriesWithProducts]);

    const filteredProducts = React.useMemo(() => {
        if (activeFilter === "all") return sourceProducts;
        return sourceProducts.filter((p) => p.category === activeFilter || p.category_id === activeFilter);
    }, [sourceProducts, activeFilter]);

    if (loading) {
        return (
            <section className="py-16 lg:py-24 bg-white text-black">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className="border-2 border-black p-10">
                        <div className="font-mono font-black uppercase tracking-[0.35em] text-[10px] text-black/60">
                            YÜKLENİYOR // BLUEPRINT GRID
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="blueprint-showcase" className="py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-[#D4AF37]" />
                            <div className="font-mono text-sm font-black uppercase tracking-[0.35em] text-zinc-600">
                                METAL VİTRİNİ
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-zinc-900">
                            Teknik <span className="italic">Katalog</span>
                        </h2>
                        <p className="text-base md:text-lg font-semibold uppercase tracking-wider text-zinc-700 max-w-2xl">
                            Her kart, bir üretim dosyası gibi okunur: referans, malzeme, stok ve ek fiyat varyantları.
                        </p>
                    </div>

                    <div className="border-2 border-zinc-800 p-3 lg:p-4 w-full lg:w-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <Filter className="w-5 h-5 text-zinc-600" />
                            <span className="font-mono text-sm font-black uppercase tracking-[0.35em] text-zinc-600">
                                FİLTRE
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setActiveFilter(f.id)}
                                    className={[
                                        "px-4 py-3 border-2 border-zinc-700 rounded-none",
                                        "font-mono text-xs font-black uppercase tracking-[0.25em]",
                                        "transition-transform active:translate-x-1 active:translate-y-1",
                                        activeFilter === f.id
                                            ? "bg-[#D4AF37] text-black shadow-[4px_4px_0px_0px_rgba(216,178,76,0.6)]"
                                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
                                    ].join(" ")}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <span className="opacity-60">{f.helper}</span>
                                        <span>{f.label}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute -inset-6 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProducts.slice(0, 9).map((product, idx) => {
                            const rawImage = product.image || "";
                            const hasImage = Boolean(rawImage && rawImage !== "null");
                            const imageSrc = encodeURI(normalizeImagePath(rawImage));

                            const catValue = String(product.category_id || product.category || "");
                            const catLabel = isUuid(catValue)
                                ? (categoriesWithProducts.find((c) => c.id === catValue)?.name || "GENEL")
                                : (catValue || "GENEL");

                            const sku = product.sku ? String(product.sku).toUpperCase() : `PRD-${String(idx + 1).padStart(3, "0")}`;

                            return (
                                <m.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                                    transition={{ duration: 0.35, delay: Math.min(idx, 6) * 0.04 }}
                                    className="group relative border-2 border-zinc-800 bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]"
                                >
                                    {/* Header strip */}
                                    <div className="border-b-2 border-zinc-800 px-5 py-4 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                                                {sku} <span className="text-zinc-600">|</span> {String(catLabel).toUpperCase()}
                                            </div>
                                            <div className="mt-1 text-xl font-black uppercase tracking-tight leading-tight line-clamp-2 text-white">
                                                {product.name}
                                            </div>
                                        </div>

                                        <Link
                                            href={`/urunler/${product.slug}`}
                                            className="h-10 w-10 border-2 border-zinc-700 flex items-center justify-center bg-zinc-800 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors"
                                            aria-label="Ürünü aç"
                                        >
                                            <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-black" />
                                        </Link>
                                    </div>

                                    {/* Blueprint media */}
                                    <div className="relative aspect-[16/11] overflow-hidden border-b-2 border-zinc-800">
                                        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {hasImage ? (
                                            <Image
                                                src={imageSrc}
                                                alt={product.name}
                                                fill
                                                sizes="(min-width: 1280px) 420px, (min-width: 640px) 48vw, 92vw"
                                                className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                                                quality={70}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                                                    GÖRSEL/YOK
                                                </div>
                                            </div>
                                        )}

                                        {/* Corner marks */}
                                        <div className="pointer-events-none absolute inset-3 border border-zinc-700" />
                                    </div>

                                    {/* Tech rows */}
                                    <div className="px-5 py-5 space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="border-2 border-zinc-800 p-3">
                                                <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                                                    BAZ/FİYAT
                                                </div>
                                                <div className="mt-1 text-lg font-black text-white">
                                                    {Number(product.price || 0).toLocaleString("tr-TR")} ₺
                                                </div>
                                            </div>
                                            <div className="border-2 border-zinc-800 p-3">
                                                <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                                                    STOK
                                                </div>
                                                <div className="mt-1 text-lg font-black text-white">
                                                    {Number(product.stock_quantity || 0)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addItem({
                                                        productId: product.id,
                                                        name: product.name,
                                                        slug: product.slug,
                                                        price: Number(product.price || 0),
                                                        image: product.image,
                                                        size: "45x60",
                                                        orientation: "vertical",
                                                    });
                                                }}
                                                className="flex-1 h-12 border-2 border-[#D4AF37] bg-[#D4AF37] text-black font-mono text-[10px] font-black uppercase tracking-[0.35em] shadow-[4px_4px_0px_0px_rgba(216,178,76,0.6)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                            >
                                                SEPETE EKLE
                                            </button>

                                            <Link
                                                href={`/urunler/${product.slug}`}
                                                className="h-12 w-12 border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                                aria-label="Detay"
                                            >
                                                <Plus className="w-5 h-5 text-zinc-300" />
                                            </Link>
                                        </div>
                                    </div>
                                </m.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/urunler"
                        className="inline-flex items-center justify-center gap-3 border-2 border-[#D4AF37] bg-[#D4AF37] text-black px-8 h-14 font-mono text-xs font-black uppercase tracking-[0.35em] shadow-[6px_6px_0px_0px_rgba(216,178,76,0.6)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        <span>KOLEKSİYONU AÇ</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
