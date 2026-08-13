"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { normalizeImagePath } from "@/lib/utils";

export const BlueprintShowcase = () => {
    const { products, loading, fetchProducts, fetchCategories } = useProductStore();

    React.useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    const sourceProducts = React.useMemo(() => {
        const hasShowcase = products.some((p) => Boolean(p.is_showcase));
        return hasShowcase ? products.filter((p) => p.is_showcase) : products;
    }, [products]);

    const displayProducts = sourceProducts.slice(0, 6);

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
                            <div className="w-12 h-[2px] bg-[var(--color-brand-accent)]" />
                            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#525252]">
                                Perakende katalog
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#161616] leading-tight">
                            Örnek ürünler
                        </h2>
                        <p className="text-base md:text-lg text-[#525252] max-w-2xl leading-relaxed">
                            Ana hat dosya teli ve takvim tenekesi imalatıdır. Perakende ürünler — detay için karta tıklayın.
                        </p>
                    </div>

                    <div className="hidden lg:block w-full lg:w-auto lg:max-w-xs">
                        <p className="font-mono text-xs text-[#525252] uppercase tracking-wider">
                            {displayProducts.length} ürün · Kartlara tıklayarak detaya gidin
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute -inset-6 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {displayProducts.map((product, idx) => {
                            const rawImage = product.image || "";
                            const hasImage = Boolean(rawImage && rawImage !== "null");
                            const imageSrc = encodeURI(normalizeImagePath(rawImage));

                            const sku = product.sku ? String(product.sku).toUpperCase() : `PRD-${String(idx + 1).padStart(3, "0")}`;

                            return (
                                <m.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                                    transition={{ duration: 0.35, delay: Math.min(idx, 6) * 0.04 }}
                                    className="group relative border border-[#c6c6c6] bg-white"
                                >
                                    <Link href={`/urunler/${product.slug}`} className="block">
                                    {/* Header strip */}
                                    <div className="border-b border-[#c6c6c6] px-5 py-4 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#525252]">
                                                {sku}
                                            </div>
                                            <div className="mt-1 text-lg font-bold leading-tight line-clamp-2 text-[#161616]">
                                                {product.name}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-[#525252] group-hover:text-[var(--color-brand-accent)] shrink-0" />
                                    </div>

                                    {/* Blueprint media */}
                                    <div className="relative aspect-[16/11] overflow-hidden border-b border-[#c6c6c6] bg-[#f4f4f4]">
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
                                    <div className="px-5 py-4 flex items-center justify-between text-sm text-[#525252]">
                                        <span>{Number(product.price || 0).toLocaleString("tr-TR")} ₺</span>
                                        <span>Stok: {Number(product.stock_quantity || 0)}</span>
                                    </div>
                                    </Link>
                                </m.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/urunler"
                        className="text-sm font-semibold text-[#525252] hover:text-[var(--color-brand-accent)] underline-offset-4 hover:underline"
                    >
                        Perakende kataloğu görüntüle
                    </Link>
                </div>
            </div>
        </section>
    );
};
