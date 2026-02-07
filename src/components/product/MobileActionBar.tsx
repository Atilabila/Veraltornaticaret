"use client";

import React from "react";
import { Filter, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface MobileActionBarProps {
  onFilterClick: () => void;
  onSearchClick: () => void;
  cartCount: number;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onFilterClick,
  onSearchClick,
  cartCount,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-zinc-950 border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-3 gap-2 p-3">
        {/* Filters Button */}
        <button
          onClick={onFilterClick}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15 transition-colors"
          aria-label="Filtreler"
        >
          <Filter className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-wider text-white/70">
            Filtreler
          </span>
        </button>

        {/* Search Button */}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15 transition-colors"
          aria-label="Ara"
        >
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-wider text-white/70">
            Ara
          </span>
        </button>

        {/* Cart Button */}
        <Link
          href="/sepet"
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 active:bg-[#D4AF37]/30 transition-colors relative"
          aria-label={`Sepet (${cartCount} ürün)`}
        >
          <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
            Sepet
          </span>
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-[#D4AF37] text-black text-[10px] font-black rounded-full">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
