"use client";

import { Filter, SlidersHorizontal, ShoppingCart } from "lucide-react";

interface MobileActionBarProps {
  onFilters: () => void;
  onSort: () => void;
  onCart: () => void;
  cartCount: number;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onFilters,
  onSort,
  onCart,
  cartCount,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50">
      <div className="mx-4 mb-4 bg-black/85 border border-white/10 rounded-2xl p-3 shadow-2xl">
        <div className="grid grid-cols-3 gap-3 text-white text-xs font-black uppercase tracking-[0.2em]">
          <button
            onClick={onFilters}
            className="flex flex-col items-center gap-1"
            aria-label="Filtreleri aç"
          >
            <Filter className="w-5 h-5 text-[#D4AF37]" />
            Filtre
          </button>
          <button
            onClick={onSort}
            className="flex flex-col items-center gap-1"
            aria-label="Sırala"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
            Sırala
          </button>
          <button
            onClick={onCart}
            className="flex flex-col items-center gap-1"
            aria-label="Sepet"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#D4AF37] text-black text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            Sepet
          </button>
        </div>
      </div>
    </div>
  );
};
