// Product Card Component - Supports default (vertical) and horizontal variants
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Box, FileText } from "lucide-react";
import { MetalProduct } from "@/lib/supabase/metal-products.types";
import { formatPrice, normalizeImagePath } from "@/lib/utils";

interface ProductCardProps {
  product: MetalProduct;
  variant?: "default" | "horizontal";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = "default" }) => {
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
        isHorizontal ? "px-4 pt-4 pb-2 border-b" : "p-3 sm:p-4 border-b"
      } border-white/5 relative z-10 min-w-0`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isRetail
              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              : "bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]"
          }`}
        />
        <span
          className={`text-[9px] font-black font-mono uppercase tracking-widest ${
            isRetail ? "text-white/40" : "text-[#D4AF37]"
          }`}
        >
          {isRetail ? `STOK: ${product.stock_quantity}` : "PROJE / TEKLİF"}
        </span>
      </div>
    </div>
  );

  const media = (
    <Link
      href={`/urunler/${product.slug}`}
      className={`relative ${
        isHorizontal ? "w-24 sm:w-28 flex-shrink-0 lg:w-full" : "w-full"
      } overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[16/10] bg-neutral-950/30 ring-1 ring-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.55)] block group-image`}
    >
      {product.image_url ? (
        <Image
          src={normalizeImagePath(product.image_url)}
          alt={product.name}
          fill
          sizes="(min-width:1280px) 420px, (min-width:1024px) 380px, (min-width:640px) 45vw, 92vw"
          className="object-cover scale-[1.06] transition-transform duration-700 group-hover:scale-[1.1]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white/5">
          <Box className="w-20 h-20" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(255,255,255,0.06),rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.65)_100%)]" />
      <div className="pointer-events-none absolute left-6 right-6 top-3 h-px bg-white/10" />

      {!isHorizontal && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/20 pointer-events-none transition-all group-hover:border-[#D4AF37]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/20 pointer-events-none transition-all group-hover:border-[#D4AF37]" />
        </>
      )}

      {isCustom && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#D4AF37] px-4 py-2 bg-black/80 backdrop-blur-sm transform rotate-[-12deg] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
          <span className="text-[#D4AF37] font-black tracking-[0.2em] text-xs whitespace-nowrap">ÖZEL ÜRETİM</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  );

  const content = (
    <div
      className={`flex flex-col flex-grow min-w-0 ${isHorizontal ? "p-4 gap-3" : "p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-6"} relative ${
        isHorizontal ? "" : "border-t"
      } border-white/5`}
    >
      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          {showCategory && (
            <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">
              {categoryName}
            </p>
          )}
          <h3
            className={`font-black uppercase italic group-hover:text-[#D4AF37] transition-colors text-white tracking-tighter line-clamp-2 max-w-full ${
              isHorizontal
                ? "text-base sm:text-lg leading-tight break-words max-w-[22ch] sm:max-w-none"
                : "text-base sm:text-lg lg:text-xl leading-tight min-h-[2.25rem]"
            }`}
          >
            {product.name}
          </h3>
        </div>
      </div>

      <p className="text-xs text-white/40 line-clamp-3 font-medium leading-relaxed font-mono pr-1 break-words">
        {product.description ||
          "Endüstriyel metal işleme standartlarında, UV baskı ve fırın boyalı lazer kesim metal tablo. Dayanıklı ve estetik."}
      </p>

      <div className={`mt-auto ${isHorizontal ? "pt-3" : "pt-6"} border-t border-white/5 flex items-end justify-between gap-4`}>
        <div className="flex flex-col">
          {isRetail ? (
            <>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">BİRİM FİYAT</span>
                <span className={`font-black ${isHorizontal ? "text-xl" : "text-xl lg:text-2xl"} text-white tracking-tighter`}>
                  {formatPrice(product.price)}
                </span>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-[#D4AF37]/50 uppercase tracking-widest mb-1">DURUM</span>
              <span className="font-black text-sm text-[#D4AF37] tracking-widest uppercase border border-[#D4AF37]/30 px-2 py-1 bg-[#D4AF37]/10">
                TEKLİF ALINIZ
              </span>
            </div>
          )}
        </div>

        <Link
          href={`/urunler/${product.slug}`}
          className={`flex items-center justify-center w-12 h-12 border transition-all group/btn ${
            isRetail
              ? "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
              : "bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
          }`}
        >
          {isRetail ? (
            <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          ) : (
            <FileText className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          )}
        </Link>
      </div>
    </div>
  );

  return (
    <div
      className={`group relative flex ${isHorizontal ? "flex-row lg:flex-col gap-4" : "flex-col"} h-full w-full min-w-0 bg-[#111827] border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]`}
      style={{ transform: "translateZ(0)", willChange: "transform, border-color" }}
    >
      {isHorizontal ? (
        <>
          {media}
          <div className="flex flex-col flex-1 min-w-0 border-l border-white/5 lg:border-l-0 lg:border-t">
            {header}
            {content}
          </div>
        </>
      ) : (
        <>
          {header}
          {media}
          {content}
        </>
      )}
    </div>
  );
};

export default ProductCard;
