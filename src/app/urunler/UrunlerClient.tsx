"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const CATEGORY_LABELS: Record<string, string> = {
    "ALL_LOGS": "TÜM KAYITLAR",
    "ARABA_PLAKA": "OTOMOBİL",
    "ATATURK_PLAKA": "ATATÜRK SERİSİ",
    "CHARACTER_PLAKA": "KARAKTERLER",
    "MOTOR_PLAKA": "MOTOSİKLET",
    "CITY_PLAKA": "ŞEHİR VE KENT",
};

interface UrunlerClientProps {
    initialProducts: Product[];
}

import { CartTerminal } from "@/components/checkout/CartTerminal";

export default function UrunlerClient({ initialProducts }: UrunlerClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("ALL_LOGS");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemsCount = useCartStore((state) => state.items.length);

    const categories = ["ALL_LOGS", ...Array.from(new Set(initialProducts.map((p: Product) => p.category)))];

    const filteredProducts = selectedCategory === "ALL_LOGS"
        ? initialProducts
        : initialProducts.filter((p: Product) => p.category === selectedCategory);

    return (
        <main className="min-h-screen bg-white grid-terminal no-transition">
            {/* NAVIGATION_TERMINAL */}
            <header className="fixed top-0 left-0 w-full z-100 bg-white border-b-4 border-black">
                <div className="container-brutal py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center text-white font-black text-xl sm:text-2xl group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-none shadow-[4px_4px_0px_0px_var(--color-brand-safety-orange)]">
                            V
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-lg font-[Archivo Black] leading-none uppercase flex items-center gap-1">
                                VERAL <span className="text-[var(--color-brand-veral-green)] text-[8px] sm:text-[10px] bg-black px-1 py-0.5">IND</span>
                            </span>
                            <span className="text-[8px] sm:text-[10px] font-mono font-black text-black/40 uppercase tracking-[0.2em]">TORNA & TENEKE // TİCARET</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 font-bold text-sm">
                        <Link href="/blog" className="hover:bg-black hover:text-white px-2 py-1">SERVİS GÜNLÜĞÜ</Link>
                        <Link href="/urunler" className="bg-[var(--color-brand-safety-orange)] text-white px-2 py-1">ÜRETİM HATTI</Link>
                        <Link href="/hakkimizda" className="hover:bg-black hover:text-white px-2 py-1">İLETİŞİM TERMİNALİ</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="btn-mechanical p-3 !p-2 !shadow-[2px_2px_0px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-3 -right-3 w-6 h-6 bg-[var(--color-brand-safety-orange)] text-white text-[10px] font-black flex items-center justify-center border-2 border-black">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <CartTerminal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <div className="container-brutal pt-32 pb-24">
                {/* SYSTEM_HEADER */}
                <div className="border-industrial p-8 mb-12 bg-[#E5E7EB] shadow-brutal-orange relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-black/20 select-none">
                        DERLEME ID: 2026 ENDÜSTRİYEL v4.5<br />
                        KOORDİNAT: 38.4192° K, 27.1287° D
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-[Archivo Black] mb-4 uppercase truncate sm:whitespace-normal">KATALOG v2</h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="px-3 py-1 bg-black text-white font-bold text-sm">AKTİF BİRİMLER: {filteredProducts.length}</span>
                        <span className="px-3 py-1 border-2 border-black font-bold text-sm">KONUM: İZMİR ATÖLYE</span>
                    </div>
                </div>

                {/* CATEGORY_SELECT_INTERFACE */}
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-0 mb-12 border-industrial bg-black overflow-hidden">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 sm:px-8 py-4 text-[10px] sm:text-sm font-black border-r-4 border-b-4 md:border-b-0 border-black transition-none flex-1 md:flex-none uppercase ${selectedCategory === cat
                                ? "bg-[var(--color-brand-safety-orange)] text-white"
                                : "bg-white text-black hover:bg-[#E5E7EB]"
                                }`}
                        >
                            {CATEGORY_LABELS[cat] || cat}
                        </button>
                    ))}
                </div>

                {/* PRODUCTION_GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product: Product) => (
                        <Link
                            key={product.id}
                            href={`/koleksiyon/${product.category}/${product.slug || product.id}`}
                            className="spec-sheet shadow-brutal hover:shadow-brutal-orange active:translate-x-1 active:translate-y-1 active:shadow-none transition-none group h-full flex flex-col no-underline text-black"
                        >
                            <div className="spec-header flex justify-between items-center">
                                <span>BİRİM ID: {product.id}</span>
                                <span className="text-[var(--color-brand-safety-orange)]">● AKTİF</span>
                            </div>

                            <div className="relative aspect-[4/3] border-b-4 border-black overflow-hidden bg-black">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-none"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-black text-white p-2 font-mono text-xs font-bold border-2 border-white uppercase">
                                        {CATEGORY_LABELS[product.category] || product.category}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-2xl font-[Archivo Black] mb-4 leading-none uppercase">{product.name.split("|")[1]?.trim() || product.name}</h3>

                                {/* TEKNİK SPESİFİKASYONLAR */}
                                <div className="space-y-3 mb-8 font-mono">
                                    <div className="flex justify-between border-b-2 border-black/10 pb-1">
                                        <span className="spec-label">ANA MALZEME:</span>
                                        <span className="font-bold text-xs">{product.specs.material}</span>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-black/10 pb-1">
                                        <span className="spec-label">KALINLIK:</span>
                                        <span className="font-bold text-xs">{product.specs.thickness}</span>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-black/10 pb-1">
                                        <span className="spec-label">İŞLEM TİPİ:</span>
                                        <span className="font-bold text-xs">{product.specs.process}</span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t-4 border-black flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-black/40">BİRİM FİYAT</span>
                                        <span className="text-2xl font-[Archivo Black]">₺{product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] text-white px-4 py-2 font-black text-xs group-hover:bg-black transition-none uppercase">
                                        DETAYLI İNCELE <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* SYSTEM_FOOTER */}
            <footer className="bg-black text-white py-24 border-t-8 border-[var(--color-brand-safety-orange)]">
                <div className="container-brutal">
                    <div className="grid lg:grid-cols-4 gap-16">
                        <div className="lg:col-span-2">
                            <Link href="/" className="inline-block mb-8">
                                <div className="w-16 h-16 bg-[var(--color-brand-safety-orange)] flex items-center justify-center text-white font-black text-4xl shadow-[6px_6px_0px_0px_white]">
                                    V
                                </div>
                            </Link>
                            <h2 className="text-5xl font-[Archivo Black] mb-6 uppercase tracking-tighter">
                                VERAL <span className="text-[var(--color-brand-safety-orange)]">TORNA & TENEKE</span>
                            </h2>
                            <div className="flex flex-wrap gap-4 font-mono font-bold">
                                <Link href="/blog" className="underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4 hover:bg-black hover:text-white p-1">SERVİS KAYITLARI</Link>
                                <Link href="/urunler" className="underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4 hover:bg-black hover:text-white p-1">ÜRETİM HATTI</Link>
                                <Link href="/hakkimizda" className="underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4 hover:bg-black hover:text-white p-1">HİKAYE VERİSİ</Link>
                            </div>
                        </div>

                        <div className="font-mono space-y-8">
                            <div>
                                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">MERKEZ ÜS</h4>
                                <p className="text-sm border-l-4 border-white pl-4">
                                    1512 Sk. No: 42/1<br />
                                    Alsancak/İzmir<br />
                                    TÜRKİYE BÖLGESİ
                                </p>
                            </div>
                            <div>
                                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">GİRİŞ TERMİNALLERİ</h4>
                                <p className="text-sm border-l-4 border-white pl-4">
                                    TEL: +90 507 165 13 15<br />
                                    E-POSTA: LOG@VERAL.COM<br />
                                    INSTA: @VERALTICARET
                                </p>
                            </div>
                        </div>

                        <div className="font-mono text-xs flex flex-col justify-between">
                            <div>
                                <span className="block text-[var(--color-brand-safety-orange)] font-black mb-2 uppercase">SİSTEM DURUMU</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#4CAF50] animate-pulse"></div>
                                    <span>TÜM SİSTEMLER AKTİF</span>
                                </div>
                            </div>
                            <div className="mt-12 text-white/30">
                                © 2026 VERAL TORNA & TENEKE<br />
                                ÜRETİM KAYDI v2.0
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
