// Product Card Component - Industrial Version
"use client"

import Link from "next/link"
import { ArrowUpRight, Shield, Zap, Sparkles, Box, FileText } from "lucide-react"
import { MetalProduct } from "@/lib/supabase/metal-products.types"
import { formatPrice } from "@/lib/utils"
import { SystemLabel } from "@/components/ui/Industrial"

interface ProductCardProps {
    product: MetalProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Hybrid Logic: Determine if Retail or Custom/B2B
    const isRetail = product.price > 0 && product.stock_quantity > 0;
    const isCustom = !isRetail;

    return (
        <div className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-[#D4AF37]/50 shadow-none hover:shadow-[0_0_40px_-15px_rgba(212,175,55,0.2)]">
            {/* Header Metadata */}
            <div className="flex justify-between items-center p-4 border-b border-white/5 relative z-10">
                <SystemLabel text={product.sku || "MODEL VERİSİ YOK"} active={isRetail} />
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isRetail ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]'}`} />
                    <span className={`text-[9px] font-black font-mono uppercase tracking-widest ${isRetail ? 'text-white/40' : 'text-[#D4AF37]'}`}>
                        {isRetail ? `STOK: ${product.stock_quantity}` : 'PROJE / TEKLİF'}
                    </span>
                </div>
            </div>

            {/* Image Area */}
            <Link href={`/urunler/${product.slug}`} className="relative aspect-square overflow-hidden bg-black block group-image">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 p-8 grayscale group-hover:grayscale-0"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-white/5">
                        <Box className="w-20 h-20" />
                    </div>
                )}

                {/* Visual Glitch/Industrial Elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/20 pointer-events-none transition-all group-hover:border-[#D4AF37]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/20 pointer-events-none transition-all group-hover:border-[#D4AF37]" />

                {/* Custom Badge Overlay */}
                {isCustom && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#D4AF37] px-4 py-2 bg-black/80 backdrop-blur-sm transform rotate-[-12deg] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                        <span className="text-[#D4AF37] font-black tracking-[0.2em] text-xs whitespace-nowrap">ÖZEL ÜRETİM</span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-6 space-y-6 relative border-t border-white/5">
                <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                        {product.category && (
                            <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">
                                {product.category.name}
                            </p>
                        )}
                        <h3 className="font-black text-xl uppercase italic leading-none group-hover:text-[#D4AF37] transition-colors text-white tracking-tighter line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                        </h3>
                    </div>
                </div>

                <p className="text-xs text-white/40 line-clamp-3 font-medium leading-relaxed font-mono pr-4">
                    {product.description || "Endüstriyel metal işleme standartlarında, UV baskı ve fırın boyalı lazer kesim metal tablo. Dayanıklı ve estetik."}
                </p>

                {/* Footer Data */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                        {isRetail ? (
                            <>
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">BİRİM FİYAT</span>
                                <span className="font-black text-2xl text-white tracking-tighter">
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
                        className={`flex items-center justify-center w-12 h-12 border transition-all group/btn ${isRetail
                                ? 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
                                : 'bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
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
        </div>
    )
}

export default ProductCard
