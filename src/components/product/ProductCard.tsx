// Product Card Component - Supports default (vertical) and horizontal variants
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Box, FileText, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    useCartStore.getState().addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      size: "30x42 cm", // Varsayılan boyut
      orientation: "vertical",
      price: product.price,
      image: product.image_url || "",
    });
  };

  const header = (
    <div
      className={`flex justify-between items-center ${isHorizontal ? "px-4 pt-4 pb-2 border-b-2" : "p-4 border-b-2"
        } border-zinc-900 relative z-10 min-w-0 bg-zinc-50/50`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-1.5 h-1.5 rounded-full ${isRetail
            ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
            : "bg-industrial-gold shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            }`}
        />
        <span
          className={`text-xs font-black font-mono uppercase tracking-widest ${isRetail ? "text-zinc-700" : "text-industrial-gold"
            }`}
        >
          {isRetail ? `STOK: ${product.stock_quantity}` : "ÖZEL SİPARİŞ"}
        </span>
      </div>
    </div>
  );

  const media = (
    <div
      className={`relative ${isHorizontal ? "w-24 sm:w-28 flex-shrink-0 lg:w-full" : "w-full"
        } overflow-hidden rounded-none aspect-[4/3] lg:aspect-[16/10] bg-zinc-100 block group-image border-b-2 border-zinc-900 pointer-events-none`}
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
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-industrial-gold/20 pointer-events-none transition-all group-hover:border-industrial-gold" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-industrial-gold/20 pointer-events-none transition-all group-hover:border-industrial-gold" />
        </>
      )}

      {isCustom && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-industrial-gold/40 px-4 py-2 bg-white/90 backdrop-blur-md transform rotate-[-8deg] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 shadow-xl">
          <span className="text-industrial-gold font-black tracking-[0.3em] text-[10px] whitespace-nowrap uppercase">PROJE BAZLI ÜRETİM</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );

  const content = (
    <div
      className={`flex flex-col flex-grow min-w-0 ${isHorizontal ? "p-4 gap-3" : "p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-6"} relative bg-[#FAFAFA]`}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          {showCategory && (
            <p className="text-[10px] text-industrial-gold font-black uppercase tracking-[0.4em] font-mono opacity-90">
              {categoryName}
            </p>
          )}
          <h3
            className={`font-black uppercase italic group-hover:text-industrial-gold transition-colors text-zinc-900 tracking-widest line-clamp-2 max-w-full font-syne ${isHorizontal
              ? "text-base sm:text-lg leading-none break-words max-w-[22ch] sm:max-w-none"
              : "text-lg sm:text-xl lg:text-2xl leading-[0.9] min-h-[1.8em]"
              }`}
          >
            {product.name}
          </h3>
        </div>
      </div>

      <p className="text-sm lg:text-[15px] text-zinc-700 line-clamp-3 font-semibold leading-relaxed font-mono pr-1 break-words">
        {product.description ||
          "Endüstriyel metal işleme standartlarında, UV baskı ve fırın boyalı lazer kesim metal tablo. Dayanıklı ve estetik."}
      </p>

      <div className={`mt-auto ${isHorizontal ? "pt-3" : "pt-6"} border-t-2 border-zinc-900 flex items-end justify-between gap-4 -mx-4 sm:-mx-5 lg:-mx-6 px-4 sm:px-5 lg:px-6`}>
        <div className="flex flex-col">
          {isRetail ? (
            <>
              <span className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] mb-1 font-mono">BİRİM FİYAT</span>
              <span className={`font-black ${isHorizontal ? "text-xl" : "text-2xl lg:text-3xl"} text-zinc-900 italic tracking-tighter`}>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-industrial-gold/80 uppercase tracking-[0.3em] mb-1 font-mono">PROSES</span>
              <span className="font-black text-[11px] text-zinc-900 tracking-[0.2em] uppercase border-2 border-industrial-gold/50 px-3 py-2 bg-industrial-gold/10 italic">
                TEKLİF İSTEYİNİZ
              </span>
            </div>
          )}
        </div>

        {isRetail ? (
          <button
            onClick={handleAddToCart}
            className={`cursor-pointer relative z-20 flex items-center justify-center w-12 h-12 border-2 transition-all duration-300 group/btn rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-zinc-50 text-zinc-900 hover:bg-industrial-gold`}
            title="Sepete Ekle"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        ) : (
          <Link
            href={`/urunler/${product.slug}`}
            className={`cursor-pointer relative z-20 flex items-center justify-center w-12 h-12 border-2 transition-all duration-300 group/btn rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-industrial-gold/10 text-industrial-gold hover:bg-industrial-gold hover:text-zinc-900`}
          >
            <FileText className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`group relative flex ${isHorizontal ? "flex-row lg:flex-col gap-0" : "flex-col"} h-full w-full min-w-0 bg-[#FAFAFA] border-2 border-zinc-900 transition-all duration-200 shadow-[8px_8px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[6px] hover:translate-y-[6px] overflow-hidden rounded-none`}
      style={{ willChange: "transform, box-shadow" }}
    >
      <Link href={`/urunler/${product.slug}`} className="absolute inset-0 z-0" aria-label={product.name} />

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
