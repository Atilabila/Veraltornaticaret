"use client";

import Link from "next/link";

type RecentItem = {
  id: string;
  slug: string;
  name: string;
  image_url?: string | null;
  description?: string | null;
};

interface RecentlyViewedProps {
  items: RecentItem[];
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ items }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
          Son görüntülenenler
        </span>
        <span className="text-[10px] text-white/50">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/urunler/${item.slug}`}
            className="flex items-center gap-3 p-3 border border-white/10 bg-black/30 rounded-lg hover:border-[#D4AF37]/40 transition"
          >
            <div className="w-12 h-12 rounded-md overflow-hidden border border-white/10">
              <img
                src={item.image_url || "/images/placeholder-category.jpg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-[#D4AF37] uppercase tracking-[0.25em]">
                Slug
              </p>
              <p className="text-sm font-black text-white truncate">{item.name}</p>
            </div>
          </Link>
        ))}
        {items.length === 0 && <p className="text-white/40 text-sm">Henüz kayıt yok.</p>}
      </div>
    </div>
  );
};
