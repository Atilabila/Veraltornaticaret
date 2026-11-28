import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Magnet } from "lucide-react";

interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: string;
}

const TREND_ITEMS: CatalogItem[] = [
  {
    id: "1",
    slug: "izmir-saat-kulesi-retro-metal-poster",
    title: "İzmir Saat Kulesi Retro Metal Poster",
    category: "Şehir & Mimari",
    price: 420,
    rating: 5,
    reviewCount: 52,
    imageUrl: "/hero-izmir-metal-poster.jpg",
    badge: "Çok Satan"
  },
  {
    id: "2",
    slug: "teknik-sematik-blueprint",
    title: "Klasik Torna & Şematik Blueprint",
    category: "Endüstriyel & Loft",
    price: 480,
    rating: 5,
    reviewCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    badge: "Özel Tasarım"
  },
  {
    id: "3",
    slug: "vintage-motorsport-classic",
    title: "Vintage Motorsport Çelik Levha",
    category: "Retro & Otomotiv",
    price: 450,
    rating: 4.9,
    reviewCount: 44,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    slug: "gold-minimal-geometry",
    title: "Altın Varak Lüks Mimari Levha",
    category: "Minimalist & Sanat",
    price: 560,
    rating: 5,
    reviewCount: 19,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    badge: "Yeni Seri"
  }
];

export function StitchCatalog() {
  return (
    <section className="bg-[#fcfcfc] text-[#161616] py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-200 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="w-12 h-0.5 bg-amber-600 mb-3" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-700 uppercase">
              SEÇKİN ATÖLYE KATALOĞU
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 mt-2 tracking-tight">
              Trend <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-900">Metal Eserler</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xs font-normal">
              Duvarı delmeden asılan manyetik neodimyum askı kiti her posterle birlikte hediye gönderilir.
            </p>
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 transition-colors shadow-sm"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TREND_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-white border border-zinc-200 p-4 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1 hover:shadow-xl shadow-sm"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-200">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {item.badge && (
                  <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    {item.badge}
                  </span>
                )}

                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-zinc-800 text-[10px] font-mono px-2 py-1 rounded border border-zinc-200 shadow-sm flex items-center gap-1 font-semibold">
                  <Magnet className="w-3 h-3 text-amber-600" /> Manyetik Asım
                </span>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">{item.category}</span>
                  <div className="flex items-center text-amber-600 text-xs gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="font-mono text-[11px] font-bold text-zinc-700">{item.rating}</span>
                    <span className="text-[10px] text-zinc-400">({item.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-bold text-zinc-900 text-base leading-snug group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 block">Fiyat</span>
                    <span className="text-lg font-black font-mono text-zinc-900">{item.price} ₺</span>
                  </div>

                  <Link
                    href={`/urunler`}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-900 group-hover:bg-amber-600 text-white text-xs font-bold font-mono transition-colors uppercase tracking-wider"
                  >
                    İncele
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
