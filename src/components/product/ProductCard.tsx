// Product Card Component - Industrial Version
"use client"

import Link from "next/link"
import { ArrowUpRight, Shield, Zap, Sparkles, Box } from "lucide-react"
import { MetalProduct } from "@/lib/supabase/metal-products.types"
import { formatPrice } from "@/lib/utils"
import { SystemLabel } from "@/components/ui/Industrial"

interface ProductCardProps {
    product: MetalProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="group relative flex flex-col h-full bg-[#111111] border border-white/5 transition-all duration-500 hover:border-[#D4AF37]/50 shadow-none hover:shadow-[0_0_40px_-15px_rgba(212,175,55,0.2)]">
            {/* Header Metadata */}
            <div className="flex justify-between items-center p-4 border-b border-white/5">
                <SystemLabel text={product.sku || "MODEL XR-1"} active={product.stock_quantity > 0} />
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock_quantity > 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                    <span className="text-[9px] font-black font-mono text-white/40 uppercase tracking-widest">
                        {product.stock_quantity > 0 ? `STOK: ${product.stock_quantity}` : 'TÜKENDİ'}
                    </span>
                </div>
            </div>

            {/* Image Area */}
            <Link href={`/urunler/${product.slug}`} className="relative aspect-square overflow-hidden bg-black block">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 p-8"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-white/5">
                        <Box className="w-20 h-20" />
                    </div>
                )}

                {/* Visual Glitch/Industrial Elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/20 pointer-events-none" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-6 space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="font-black text-xl uppercase italic leading-none group-hover:text-[#D4AF37] transition-colors text-white tracking-tighter">
                            {product.name}
                        </h3>
                    </div>
                    {product.category && (
                        <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em] italic">
                            {product.category.name}
                        </p>
                    )}
                </div>

                <p className="text-xs text-white/40 line-clamp-2 font-medium leading-relaxed italic pr-4">
                    {product.description || "Endüstriyel metal işleme standartlarında, UV baskı ve fırın boyalı lazer kesim metal tablo."}
                </p>

                {/* Footer Data */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">BİRİM FİYAT</span>
                        <span className="font-black text-2xl text-white tracking-tighter">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <Link
                        href={`/urunler/${product.slug}`}
                        className="flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all group/btn"
                    >
                        <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
