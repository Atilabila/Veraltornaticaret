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
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-none border-2 border-zinc-900 bg-white p-5 space-y-4 shadow-[4px_4px_0_0_#18181b]">
      <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-800">
          Öne Çıkanlar
        </span>
        <span className="text-[10px] text-zinc-400 font-mono">{items.length}</span>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/urunler/${item.slug}`}
            className="flex items-center gap-3 p-2 bg-white rounded-none transition-all duration-200 border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            <div className="w-12 h-12 rounded-none overflow-hidden border-2 border-zinc-900 shrink-0 bg-zinc-100">
              <img
                src={item.image_url || "/images/placeholder-category.jpg"}
                alt={item.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] text-industrial-gold font-black uppercase tracking-[0.2em] mb-0.5">
                İncele
              </p>
              <p className="text-xs font-black text-zinc-900 truncate">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
