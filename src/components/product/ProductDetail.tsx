// =====================================================
// PRODUCT DETAIL COMPONENT - GOOGLE STITCH LUXURY B2B
// Luxury Industrial Architectural Metal Art Studio
// =====================================================
"use client";

import * as React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Heart,
  Zap,
  Shield,
  Package,
  Truck,
  Check,
  Info,
  Ruler,
  FileText,
  Factory,
  Phone,
  MessageCircle,
  Layers,
  Sparkles,
  Award,
} from "lucide-react";
import { MetalImage } from "@/components/landing/MetalImage";
import { useContentStore } from "@/store/useContentStore";
import { useToast } from "@/components/ui/use-toast";
import { cn, formatPrice } from "@/lib/utils";
import type { MetalProduct } from "@/lib/supabase/metal-products.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  toTelHref,
  buildProductWhatsAppUrl,
  resolveFooterPhone,
  resolveWhatsappNumber,
} from "@/lib/contact";

interface ProductDetailProps {
  product: MetalProduct;
  relatedProducts?: any[];
}

const FEATURE_ICONS: Record<string, React.ElementType> = {
  Shield,
  Zap,
  Package,
  Truck,
  Check,
  Info,
  Ruler,
  FileText,
  Factory,
};

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  relatedProducts = [],
}) => {
  const { content } = useContentStore();
  const { toast } = useToast();

  // State for interactive Stitch configuration selectors
  const [selectedSize, setSelectedSize] = React.useState<string>("L (45x65 cm)");
  const [selectedMounting, setSelectedMounting] = React.useState<string>("3M VHB Manyetik");
  const [selectedFinish, setSelectedFinish] = React.useState<string>("Mat Koruyucu Vernik");

  const tel = toTelHref(resolveFooterPhone(content.footerPhone));
  const wa = buildProductWhatsAppUrl({
    whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
    productName: `${product.name} [${selectedSize} - ${selectedMounting}]`,
    baseMessage: content.whatsappMessage,
  });

  const isRetail = product.price > 0 && product.stock_quantity > 0;
  const sortedFeatures =
    product.features?.sort((a, b) => a.display_order - b.display_order) || [];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast({
        title: "Bağlantı Kopyalandı",
        description: "Ürün linki panoya kaydedildi.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-brushed-metal font-sans selection:bg-amber-600 selection:text-white">
      {/* Precision Top Sticky Sub-Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-zinc-200/80 px-4 md:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/urunler"
            className="flex items-center gap-2 text-zinc-600 hover:text-amber-800 font-mono text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kataloğa Dön</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 border border-amber-200">
              SPEC: DIN EN 10202
            </span>
            <button
              onClick={handleShare}
              aria-label="Paylaş"
              className="p-2 border border-zinc-300 hover:border-amber-600 bg-white/80 hover:bg-white text-zinc-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Showcase Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb line */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-amber-700 transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-amber-700 transition-colors">
            Katalog
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: Floating Showcase Metal Plate */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
            <div className="relative group w-full aspect-[4/3] rounded-none overflow-hidden bg-white border border-zinc-200 shadow-xl">
              {/* Subtle ambient metal drop shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

              {/* Technical Corner Alignment Marks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-600/80 pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-600/80 pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-600/80 pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-600/80 pointer-events-none z-10" />

              {product.image_url ? (
                <MetalImage
                  src={product.image_url}
                  alt={product.name}
                  backgroundColor="transparent"
                  className="w-full h-full p-6 sm:p-10 transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                  <Factory className="w-20 h-20 stroke-1" />
                </div>
              )}

              {/* Status Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md border border-amber-600/40 text-amber-800 text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {product.category?.name || "ÖZEL SERİ"}
                </span>
              </div>
            </div>

            {/* Quick Feature Strip Below Image */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white/80 backdrop-blur-sm border border-zinc-200">
                <span className="block text-[11px] font-mono font-bold text-zinc-900 uppercase">
                  1200 DPI UV
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">Mikronize Piezo</span>
              </div>
              <div className="p-3 bg-white/80 backdrop-blur-sm border border-zinc-200">
                <span className="block text-[11px] font-mono font-bold text-zinc-900 uppercase">
                  0.50 MM ÇELİK
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">DIN EN 10202 Sac</span>
              </div>
              <div className="p-3 bg-white/80 backdrop-blur-sm border border-zinc-200">
                <span className="block text-[11px] font-mono font-bold text-zinc-900 uppercase">
                  10 YIL GARANTİ
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">Solmazlık & Pas</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details, Configurator & Direct B2B Triggers */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Block */}
            <div className="space-y-3 pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2.5 py-1 border border-zinc-200">
                  SKU: {product.sku || product.id.slice(0, 8).toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200 font-bold uppercase">
                  İZMİR ALSANCAK İMALATI
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 font-syne leading-tight">
                {product.name}
              </h1>

              {product.description && (
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-sans">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price & Wholesale Notice */}
            <div className="p-5 glass-panel border border-zinc-200 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    BİRİM LİSTE FİYATI
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-syne">
                      {isRetail ? formatPrice(product.price) : "Proje Fiyatı"}
                    </span>
                    {isRetail && (
                      <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase bg-emerald-100/60 px-2 py-0.5">
                        KDV Dahil
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">
                    Toptan Alımlarda
                  </span>
                  <span className="text-xs text-zinc-600 font-semibold">Özel İskonto Mevcuttur</span>
                </div>
              </div>
            </div>

            {/* Stitch Configuration Selectors */}
            <div className="space-y-4 pt-2">
              {/* Ebat / Boyut Seçimi */}
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-800 flex justify-between">
                  <span>Ölçü Seçimi</span>
                  <span className="text-[10px] text-amber-700 font-normal">Özel Ebat Mümkündür</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "M", dim: "30x42 cm", code: "M (30x42 cm)" },
                    { label: "L", dim: "45x65 cm", code: "L (45x65 cm)" },
                    { label: "XL", dim: "70x100 cm", code: "XL (70x100 cm)" },
                  ].map((sz) => (
                    <button
                      key={sz.code}
                      type="button"
                      onClick={() => setSelectedSize(sz.code)}
                      className={cn(
                        "py-3 px-2 text-center border font-mono transition-all",
                        selectedSize === sz.code
                          ? "border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                      )}
                    >
                      <span className="block text-xs font-bold">{sz.label}</span>
                      <span className="text-[10px] opacity-75">{sz.dim}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Asma & Montaj Sistemi */}
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-800">
                  Montaj & Asma Kiti
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { title: "3M VHB Manyetik Ped", subtitle: "Duvar Delmez / Saniyede Montaj" },
                    { title: "Paslanmaz Standoff Vida", subtitle: "Mekanik Yükseltici Kit" },
                  ].map((m) => (
                    <button
                      key={m.title}
                      type="button"
                      onClick={() => setSelectedMounting(m.title)}
                      className={cn(
                        "p-3 text-left border transition-all",
                        selectedMounting === m.title
                          ? "border-amber-600 bg-amber-50 text-amber-900 shadow-sm"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                      )}
                    >
                      <span className="block text-xs font-bold">{m.title}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{m.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 100% B2B Action Buttons (CART_ENABLED = false) */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-md shadow-emerald-600/20 transition-all font-mono"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp ile Sipariş & Fiyat Onayı
              </a>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/teklif-al"
                  className="py-3 px-4 border border-zinc-300 hover:border-amber-600 hover:bg-amber-50 text-zinc-800 hover:text-amber-900 text-xs font-bold font-mono tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  Teklif Formu
                </Link>

                <a
                  href={tel}
                  className="py-3 px-4 border border-zinc-300 hover:border-zinc-800 hover:bg-zinc-50 text-zinc-800 text-xs font-bold font-mono tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-zinc-600" />
                  Atölye Hattı
                </a>
              </div>
            </div>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white border border-zinc-200 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Güvenli Ahşap Kasa</h4>
                  <p className="text-[10px] text-zinc-500">Köşe korumalı kraft ambalaj</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-zinc-200 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Alsancak Zanaati</h4>
                  <p className="text-[10px] text-zinc-500">1980&apos;den beri kesintisiz üretim</p>
                </div>
              </div>
            </div>

            {/* Detailed Tabs: Specifications, Delivery, Warranty */}
            <div className="pt-4">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-zinc-100 border border-zinc-200 rounded-none p-0 h-auto">
                  <TabsTrigger
                    value="features"
                    className="font-mono font-bold text-xs uppercase py-3 data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600 text-zinc-600 rounded-none"
                  >
                    Teknik Detay
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="font-mono font-bold text-xs uppercase py-3 data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600 text-zinc-600 rounded-none"
                  >
                    Lojistik
                  </TabsTrigger>
                  <TabsTrigger
                    value="warranty"
                    className="font-mono font-bold text-xs uppercase py-3 data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600 text-zinc-600 rounded-none"
                  >
                    Garanti
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-4 space-y-3">
                  <div className="p-4 bg-white border border-zinc-200 space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between border-b border-zinc-100 pb-2">
                      <span className="text-zinc-500">Hammadde Standardı:</span>
                      <span className="font-bold text-zinc-900">
                        {product.material || "0.50mm DIN EN 10202 Teneke Levha"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-100 pb-2">
                      <span className="text-zinc-500">Baskı Çözünürlüğü:</span>
                      <span className="font-bold text-zinc-900">1200 x 1200 DPI Piezo UV</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-100 pb-2">
                      <span className="text-zinc-500">Yüzey Koruması:</span>
                      <span className="font-bold text-zinc-900">
                        {product.paint || "Çift Kat Ultraviyole Mat Vernik"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-100 pb-2">
                      <span className="text-zinc-500">Montaj Donanımı:</span>
                      <span className="font-bold text-zinc-900">
                        {product.installation || "N35 Neodimyum Manyetik Ped Dahil"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">İmalat Yeri:</span>
                      <span className="font-bold text-zinc-900">Alsancak / Konak / İzmir</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="mt-4">
                  <div className="p-4 bg-white border border-zinc-200 space-y-2 text-xs text-zinc-600 leading-relaxed font-sans">
                    <p>
                      <strong>Standart Teslimat:</strong> Siparişiniz onaylandıktan sonra 24-48 saat içerisinde özenle paketlenerek anlaşmalı kargoya verilir.
                    </p>
                    <p>
                      <strong>Toptan ve Ambar Sevkiyatı:</strong> İzmir Gıda Çarşısı ve ambarlar üzerinden tüm Türkiye&apos;ye doğrudan paletli sevkiyat sağlanmaktadır.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="warranty" className="mt-4">
                  <div className="p-4 bg-white border border-zinc-200 space-y-2 text-xs text-zinc-600 leading-relaxed font-sans">
                    <p>
                      <strong>10 Yıl Renk Solmazlık Güvencesi:</strong> UV kürlemeli endüstriyel pigmentlerimiz iç mekanda güneş ışığına maruz kalsa dahi solmama ve paslanmama garantisine sahiptir.
                    </p>
                    <p>
                      <strong>Hasarsız Teslimat Sözü:</strong> Kargo kaynaklı deformasyonlarda 48 saat içinde bedelsiz yeni ürün imal edilip adresinize gönderilir.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16 border-t border-zinc-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-200">
              <h2 className="text-2xl font-bold font-syne uppercase tracking-tight text-zinc-900">
                Atölyeden Benzer İmalatlar
              </h2>
              <Link
                href="/urunler"
                className="text-xs font-mono font-bold text-amber-700 hover:underline uppercase tracking-wider"
              >
                Kataloğun Tamamı →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((relProduct) => (
                <Link
                  key={relProduct.id}
                  href={`/urunler/${relProduct.slug}`}
                  className="group block border border-zinc-200 bg-white p-3 hover:border-amber-600 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] bg-zinc-50 overflow-hidden relative mb-3">
                    {relProduct.image_url ? (
                      <MetalImage
                        src={relProduct.image_url}
                        alt={relProduct.name}
                        backgroundColor="transparent"
                        className="w-full h-full p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300">
                        <Zap className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors truncate">
                    {relProduct.name}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase mt-1">
                    {relProduct.category?.name || "Metal İmalat"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
