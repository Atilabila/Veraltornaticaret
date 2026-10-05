// Product Card Component - Google Stitch Luxury Industrial Aesthetic
"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, MessageCircle, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { MetalProduct } from "@/lib/supabase/metal-products.types";
import { formatPrice, normalizeImagePath } from "@/lib/utils";
import {
  buildProductWhatsAppUrl,
  resolveWhatsappNumber,
} from "@/lib/contact";

interface ProductCardProps {
  product: MetalProduct;
  variant?: "default" | "horizontal";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = "default" }) => {
  const { content } = useContentStore();
  const wa = buildProductWhatsAppUrl({
    whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
    productName: product.name,
    baseMessage: content.whatsappMessage,
  });
  const isRetail = product.price > 0 && product.stock_quantity > 0;
  const isCustom = !isRetail;
  const isHorizontal = variant === "horizontal";
  const categoryName = product.category?.name || "";
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    categoryName
  );
  const showCategory = Boolean(categoryName && !isUuid);

  const header = (
    <div
      className={`flex justify-between items-center ${
        isHorizontal ? "px-4 pt-3 pb-2" : "px-4 py-3"
      } border-b border-zinc-100 bg-zinc-50/80 relative z-10`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
        <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-zinc-600 technical-tag">
          {isRetail ? `STOK PARTİ: ${product.stock_quantity} ADET` : "ÖZEL PROJE İMALATI"}
        </span>
      </div>
      <div className="text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-none border border-amber-200/60">
        DIN EN 10202
      </div>
    </div>
  );

  const media = (
    <div
      className={`relative ${
        isHorizontal ? "w-28 sm:w-36 flex-shrink-0 lg:w-full" : "w-full"
      } overflow-hidden aspect-[4/3] bg-zinc-100 block group-image border-b border-zinc-100 pointer-events-none`}
    >
      {product.image_url ? (
        <Image
          src={normalizeImagePath(product.image_url)}
          alt={product.name}
          fill
          sizes="(min-width:1280px) 420px, (min-width:1024px) 380px, (min-width:640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
          <Box className="w-16 h-16 stroke-1" />
        </div>
      )}

      {/* Stitch Brushed Metal Radial Sheen on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Blueprint Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-500/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-500/60 pointer-events-none" />

      {isCustom && (
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 border border-amber-500/30 text-[9px] font-mono font-bold text-amber-800 uppercase tracking-widest shadow-sm">
          B2B ÖZEL SERİ
        </div>
      )}
    </div>
  );

  const cardBody = (
    <div
      className={`flex flex-col flex-grow min-w-0 ${
        isHorizontal ? "p-4 gap-3" : "p-5 space-y-4"
      } relative bg-white`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          {showCategory ? (
            <span className="text-[10px] text-amber-700 font-bold uppercase tracking-widest font-mono">
              {categoryName}
            </span>
          ) : (
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-mono">
              VERAL İMALAT
            </span>
          )}
          <span className="text-[9px] font-mono text-zinc-400">1200 DPI UV</span>
        </div>

        <h3
          className={`font-bold tracking-tight text-zinc-900 group-hover:text-amber-700 transition-colors line-clamp-2 ${
            isHorizontal
              ? "text-sm sm:text-base leading-snug"
              : "text-base sm:text-lg leading-tight"
          }`}
        >
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
          {product.description ||
            "Endüstriyel metal işleme standartlarında, yüksek çözünürlüklü UV baskı ve fırın boyalı lazer kesim metal plaka."}
        </p>
      </div>

      {/* Technical Spec Micro-Pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        <span className="text-[9px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-none flex items-center gap-1 border border-zinc-200">
          <Layers className="w-2.5 h-2.5 text-amber-600" /> 0.5mm Sac
        </span>
        <span className="text-[9px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-none flex items-center gap-1 border border-zinc-200">
          <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Manyetik Ped
        </span>
      </div>

      {/* Pricing & B2B Actions */}
      <div
        className={`mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between gap-3 ${
          isHorizontal ? "pt-2" : ""
        }`}
      >
        <div className="flex flex-col">
          {isRetail ? (
            <>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                LİSTE FİYATI
              </span>
              <span className="font-extrabold text-lg sm:text-xl text-zinc-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-700">
                PROJE BAZLI
              </span>
              <span className="font-bold text-xs sm:text-sm text-zinc-900 tracking-wide">
                Teklif İsteyiniz
              </span>
            </div>
          )}
        </div>

        {/* 100% B2B Quick Actions */}
        <div className="relative z-20 flex items-center gap-1.5">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="WhatsApp ile Hızlı Sipariş / Bilgi Al"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <Link
            href={`/urunler/${product.slug}`}
            className="flex items-center justify-center p-2 border border-zinc-300 hover:border-amber-600 hover:bg-amber-50 text-zinc-700 hover:text-amber-800 transition-colors"
            title="Detayları İncele"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`group relative flex ${
        isHorizontal ? "flex-row lg:flex-col gap-0" : "flex-col"
      } h-full w-full min-w-0 bg-white border border-zinc-200 hover:border-amber-500/80 transition-all duration-300 hover:shadow-xl overflow-hidden rounded-none`}
    >
      <Link href={`/urunler/${product.slug}`} className="absolute inset-0 z-0" aria-label={product.name} />

      {isHorizontal ? (
        <>
          {media}
          <div className="flex flex-col flex-1 min-w-0 border-l border-zinc-100 lg:border-l-0 lg:border-t">
            {header}
            {cardBody}
          </div>
        </>
      ) : (
        <>
          {header}
          {media}
          {cardBody}
        </>
      )}
    </div>
  );
};

export default ProductCard;
