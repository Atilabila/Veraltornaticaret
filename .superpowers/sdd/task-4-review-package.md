# Review Package Task 4 re-review
Base: f8babc4b414aba3761a6df67e00d15326db450b9
Head: 3f21943909b23764d2f8faa1befea9d798f6c1cc

## Commits
3f21943 fix: narrow Task 4 to cart CTA swaps without product redesign
261bee7 feat: replace storefront cart CTAs with phone and WhatsApp

## Stat
 src/app/siparis/[id]/page.tsx                      |   3 +
 src/app/urunler/[slug]/ProductDetailClient.tsx     | 154 +++++++++++++--------
 src/components/product/CatalogContainer.tsx        |   5 +-
 src/components/product/MobileActionBar.tsx         |  48 ++++---
 src/components/product/MobileFilterDrawer.tsx      |  19 ++-
 src/components/product/ProductCard.tsx             |  56 ++++++--
 src/components/product/ProductDetail.tsx           | 142 +++++++++++++------
 .../product/detail/ConfigurationPanel.tsx          |  85 ++++++++----
 src/components/sections/ProductConfigurator.tsx    |  36 ++++-
 src/components/sections/ProductGallery.tsx         |  73 +++++++---
 10 files changed, 450 insertions(+), 171 deletions(-)

## Diff
```diff
diff --git a/src/app/siparis/[id]/page.tsx b/src/app/siparis/[id]/page.tsx
index 588735f..bba0601 100644
--- a/src/app/siparis/[id]/page.tsx
+++ b/src/app/siparis/[id]/page.tsx
@@ -8,10 +8,11 @@ import { useOrderStore, getOrderFromStorage, Order, OrderStatus } from "@/store/
 import { useCartStore } from "@/store/useCartStore";
 import { useContentStore } from "@/store/useContentStore";
 import { Button } from "@/components/ui/button";
 import { formatPrice } from "@/lib/utils";
 import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
+import { CART_ENABLED } from "@/lib/commerce";
 import { m } from 'framer-motion';
 
 const statusConfig: Record<OrderStatus, { icon: any; color: string; label: string; description: string; bgColor: string; borderColor: string; iconBg: string }> = {
     created: { icon: Clock, color: "text-yellow-600", label: "Olu┼şturuldu", description: "Sipari┼şiniz sisteme kaydedildi.", bgColor: "bg-yellow-50", borderColor: "border-yellow-100", iconBg: "bg-yellow-100" },
     payment_pending: { icon: Clock, color: "text-amber-600", label: "WhatsApp Onay─▒ Bekleniyor", description: "WhatsApp ├╝zerinden mesaj─▒ g├Ândererek sipari┼şi tamamlay─▒n.", bgColor: "bg-amber-50", borderColor: "border-amber-100", iconBg: "bg-amber-100" },
@@ -181,14 +182,16 @@ export default function OrderConfirmationPage() {
                             <div className="flex flex-col gap-2 w-full sm:w-auto">
                                 <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-xl border-zinc-100 text-[10px] font-bold tracking-widest uppercase h-10 gap-2 hover:bg-zinc-50">
                                     <Printer className="w-4 h-4" />
                                     BELGEY─░ YAZDIR
                                 </Button>
+                                {CART_ENABLED && (
                                 <Button variant="outline" size="sm" onClick={handleReorder} className="rounded-xl border-zinc-100 text-[10px] font-bold tracking-widest uppercase h-10 gap-2 hover:bg-zinc-50">
                                     <ArrowRight className="w-4 h-4" />
                                     AYNISINI AL
                                 </Button>
+                                )}
                             </div>
                         </div>
                         <div className="mt-8 pt-8 border-t border-zinc-50 text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                             <span>Kay─▒t Tarihi: {new Date(order.createdAt).toLocaleString('tr-TR')}</span>
                             <span className="flex items-center gap-2">
diff --git a/src/app/urunler/[slug]/ProductDetailClient.tsx b/src/app/urunler/[slug]/ProductDetailClient.tsx
index 58dab97..6b57cef 100644
--- a/src/app/urunler/[slug]/ProductDetailClient.tsx
+++ b/src/app/urunler/[slug]/ProductDetailClient.tsx
@@ -1,43 +1,59 @@
 "use client"
 
 import * as React from "react"
 import Link from "next/link"
 import { useRouter } from "next/navigation"
-import { ArrowLeft, Check, ShoppingCart, AlertTriangle } from "lucide-react"
-import { Button } from "@/components/ui/button"
-import { Badge } from "@/components/ui/badge"
+import { ArrowLeft, Check, AlertTriangle, Phone, MessageCircle, FileText } from "lucide-react"
 import { formatPrice } from "@/lib/utils"
 import { MetalProduct } from "@/lib/supabase/metal-products.types"
 import { ImageViewer } from "@/components/product/ImageViewer"
 import { ProductVariants, VariantState } from "@/components/product/ProductVariants"
 import { ProductInfoBlocks, ProductFAQ } from "@/components/product/ProductInfo"
+import { useContentStore } from "@/store/useContentStore"
+import { CART_ENABLED } from "@/lib/commerce"
+import {
+    toTelHref,
+    buildProductWhatsAppUrl,
+    resolveFooterPhone,
+    resolveWhatsappNumber,
+} from "@/lib/contact"
 import { useCartStore } from "@/store/useCartStore"
+import { ShoppingCart } from "lucide-react"
 
 interface ProductDetailClientProps {
     product: MetalProduct
 }
 
 export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
     const router = useRouter()
+    const { content } = useContentStore()
     const addItem = useCartStore((state) => state.addItem)
     const [variant, setVariant] = React.useState<VariantState>({ size: '45x60', orientation: 'vertical' })
     const [price, setPrice] = React.useState(product.price)
     const [addedToCart, setAddedToCart] = React.useState(false)
     const [cartError, setCartError] = React.useState<string | null>(null)
 
-    // Simulate price change based on size
+    const tel = toTelHref(resolveFooterPhone(content.footerPhone))
+    const wa = buildProductWhatsAppUrl({
+        whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
+        productName: product.name,
+        baseMessage: content.whatsappMessage,
+    })
+
     React.useEffect(() => {
         const multipliers: Record<string, number> = {
             '30x45': 0.8,
             '45x60': 1,
             '50x70': 1.2,
             '70x100': 1.6
         }
         setPrice(product.price * multipliers[variant.size])
     }, [variant.size, product.price])
 
+    const canPurchase = price > 0 && product.stock_quantity > 0
+
     return (
         <div className="product-detail-page min-h-screen bg-[#FAFAFA] pb-20 font-syne">
             {/* Breadcrumb / Nav */}
             <div className="container px-4 py-8">
                 <Link href="/urunler" className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 font-black uppercase tracking-[0.2em] font-mono transition-colors">
@@ -130,75 +146,105 @@ export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ produc
                                 <AlertTriangle className="w-6 h-6 text-zinc-500 flex-shrink-0" />
                                 <p className="text-sm font-bold text-zinc-600 font-mono">Bu ├╝r├╝n ┼şu an stokta bulunmamaktad─▒r.</p>
                             </div>
                         )}
 
-                        {cartError && (
+                        {CART_ENABLED && cartError && (
                             <div className="flex items-center gap-4 p-4 bg-red-50 border-2 border-red-500 shadow-[4px_4px_0_0_#ef4444]">
                                 <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                 <p className="text-sm font-bold text-red-700 font-mono">{cartError}</p>
                             </div>
                         )}
 
-                        {addedToCart && (
+                        {CART_ENABLED && addedToCart && (
                             <div className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-500 shadow-[4px_4px_0_0_#10b981]">
                                 <Check className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                 <p className="text-sm font-bold text-emerald-800 font-mono">├£r├╝n sepete eklendi!</p>
                                 <Link href="/sepet" className="ml-auto text-sm font-black text-emerald-700 uppercase underline tracking-wider font-mono hover:text-emerald-900 transition-colors">
                                     Sepete Git
                                 </Link>
                             </div>
                         )}
 
-                        <button
-                            disabled={!price || price <= 0 || product.stock_quantity <= 0}
-                            onClick={() => {
-                                setCartError(null)
-                                const result = addItem({
-                                    productId: product.id,
-                                    name: product.name,
-                                    slug: product.slug,
-                                    size: variant.size,
-                                    orientation: variant.orientation,
-                                    price: price,
-                                    image: product.image_url || '/products/arabalar-plaka/3000x1500.webp',
-                                })
-                                if (result.success) {
-                                    setAddedToCart(true)
-                                    setTimeout(() => setAddedToCart(false), 3000)
-                                } else {
-                                    setCartError(result.error || '├£r├╝n sepete eklenemedi')
-                                }
-                            }}
-                            className="w-full h-16 flex items-center justify-center gap-3 bg-industrial-gold border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:pointer-events-none"
-                        >
-                            <ShoppingCart className="w-6 h-6" />
-                            Sepete Ekle ({variant.size} - {variant.orientation === 'vertical' ? 'Dikey' : 'Yatay'})
-                        </button>
-
-                        <button
-                            disabled={!price || price <= 0 || product.stock_quantity <= 0}
-                            onClick={() => {
-                                const result = addItem({
-                                    productId: product.id,
-                                    name: product.name,
-                                    slug: product.slug,
-                                    size: variant.size,
-                                    orientation: variant.orientation,
-                                    price: price,
-                                    image: product.image_url || '/products/arabalar-plaka/3000x1500.webp',
-                                })
-                                if (result.success) {
-                                    router.push('/odeme')
-                                } else {
-                                    setCartError(result.error || '├£r├╝n sepete eklenemedi')
-                                }
-                            }}
-                            className="w-full h-14 flex items-center justify-center gap-3 bg-white border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:pointer-events-none"
-                        >
-                            Hemen Sat─▒n Al
-                        </button>
+                        {CART_ENABLED ? (
+                            <>
+                                <button
+                                    disabled={!canPurchase}
+                                    onClick={() => {
+                                        setCartError(null)
+                                        const result = addItem({
+                                            productId: product.id,
+                                            name: product.name,
+                                            slug: product.slug,
+                                            size: variant.size,
+                                            orientation: variant.orientation,
+                                            price: price,
+                                            image: product.image_url || '/products/arabalar-plaka/3000x1500.webp',
+                                        })
+                                        if (result.success) {
+                                            setAddedToCart(true)
+                                            setTimeout(() => setAddedToCart(false), 3000)
+                                        } else {
+                                            setCartError(result.error || '├£r├╝n sepete eklenemedi')
+                                        }
+                                    }}
+                                    className="w-full h-16 flex items-center justify-center gap-3 bg-industrial-gold border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:pointer-events-none"
+                                >
+                                    <ShoppingCart className="w-6 h-6" />
+                                    Sepete Ekle ({variant.size} - {variant.orientation === 'vertical' ? 'Dikey' : 'Yatay'})
+                                </button>
+
+                                <button
+                                    disabled={!canPurchase}
+                                    onClick={() => {
+                                        const result = addItem({
+                                            productId: product.id,
+                                            name: product.name,
+                                            slug: product.slug,
+                                            size: variant.size,
+                                            orientation: variant.orientation,
+                                            price: price,
+                                            image: product.image_url || '/products/arabalar-plaka/3000x1500.webp',
+                                        })
+                                        if (result.success) {
+                                            router.push('/odeme')
+                                        } else {
+                                            setCartError(result.error || '├£r├╝n sepete eklenemedi')
+                                        }
+                                    }}
+                                    className="w-full h-14 flex items-center justify-center gap-3 bg-white border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:pointer-events-none"
+                                >
+                                    Hemen Sat─▒n Al
+                                </button>
+                            </>
+                        ) : (
+                            <>
+                                <a
+                                    href={tel}
+                                    className="w-full h-16 flex items-center justify-center gap-3 bg-industrial-gold border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
+                                >
+                                    <Phone className="w-6 h-6" />
+                                    Ara
+                                </a>
+                                <a
+                                    href={wa}
+                                    target="_blank"
+                                    rel="noopener noreferrer"
+                                    className="w-full h-14 flex items-center justify-center gap-3 bg-white border-2 border-zinc-900 text-zinc-900 text-sm font-black uppercase tracking-[0.2em] font-mono shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
+                                >
+                                    <MessageCircle className="w-6 h-6" />
+                                    WhatsApp
+                                </a>
+                                <Link
+                                    href="/teklif-al"
+                                    className="w-full h-12 flex items-center justify-center gap-3 border-2 border-zinc-900 text-zinc-700 text-sm font-black uppercase tracking-[0.2em] font-mono hover:bg-zinc-50 transition-all"
+                                >
+                                    <FileText className="w-5 h-5" />
+                                    Teklif Al
+                                </Link>
+                            </>
+                        )}
 
                         <p className="text-[10px] text-center text-zinc-500 font-bold uppercase tracking-widest font-mono mt-2">
                             Kurumsal al─▒m ve toplu sipari┼şler i├ğin ileti┼şime ge├ğin.
                         </p>
                     </div>
diff --git a/src/components/product/CatalogContainer.tsx b/src/components/product/CatalogContainer.tsx
index f28929b..e29ceff 100644
--- a/src/components/product/CatalogContainer.tsx
+++ b/src/components/product/CatalogContainer.tsx
@@ -1,6 +1,6 @@
-"use client";
+´╗┐"use client";
 
 import React, { useState, useMemo, useEffect } from "react";
 import {
   Search,
   SlidersHorizontal,
@@ -16,10 +16,11 @@ import Link from "next/link";
 import { MetalProduct, Category } from "@/lib/supabase/metal-products.types";
 import ProductCard from "./ProductCard";
 import { m, AnimatePresence } from 'framer-motion';
 import { useContentStore } from "@/store/useContentStore";
 import { useCartStore } from "@/store/useCartStore";
+import { CART_ENABLED } from "@/lib/commerce";
 import { RecentlyViewed } from "./RecentlyViewed";
 import { MobileFilterDrawer } from "./MobileFilterDrawer";
 import { MobileActionBar } from "./MobileActionBar";
 
 interface CatalogContainerProps {
@@ -352,10 +353,11 @@ export const CatalogContainer: React.FC<CatalogContainerProps> = ({
                     <ShieldCheck className="w-4 h-4 text-industrial-gold" /> G├╝venli ├Âdeme (256-bit SSL)
                   </div>
                 </div>
               </div>
 
+              {CART_ENABLED && (
               <div className="rounded-none border-t-4 border-t-industrial-gold border border-zinc-200 bg-white p-6 space-y-4 shadow-lg shadow-zinc-200/50">
                 <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                     Sipari┼ş ├ûzeti
                   </span>
@@ -374,10 +376,11 @@ export const CatalogContainer: React.FC<CatalogContainerProps> = ({
                   className="inline-flex items-center justify-center w-full h-12 bg-industrial-gold border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-200 shadow-[4px_4px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                 >
                   ├ûDEMEYE G─░T ({cartCount})
                 </Link>
               </div>
+              )}
 
               <RecentlyViewed items={recentItems} />
 
               <div className="rounded-none border border-zinc-200 bg-white p-5 space-y-4 shadow-sm">
                 <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
diff --git a/src/components/product/MobileActionBar.tsx b/src/components/product/MobileActionBar.tsx
index ec01bd6..b7bf151 100644
--- a/src/components/product/MobileActionBar.tsx
+++ b/src/components/product/MobileActionBar.tsx
@@ -1,10 +1,12 @@
-"use client";
+´╗┐"use client";
 
 import React from "react";
-import { Filter, Search, ShoppingCart } from "lucide-react";
+import { Filter, Search, FileText } from "lucide-react";
 import Link from "next/link";
+import { CART_ENABLED } from "@/lib/commerce";
+import { ShoppingCart } from "lucide-react";
 
 interface MobileActionBarProps {
   onFilterClick: () => void;
   onSearchClick: () => void;
   cartCount: number;
@@ -40,25 +42,37 @@ export const MobileActionBar: React.FC<MobileActionBarProps> = ({
           <span className="text-[10px] font-black uppercase tracking-wider text-white/70">
             Ara
           </span>
         </button>
 
-        {/* Cart Button */}
-        <Link
-          href="/sepet"
-          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 active:bg-[#D4AF37]/30 transition-colors relative"
-          aria-label={`Sepet (${cartCount} ├╝r├╝n)`}
-        >
-          <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
-          <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
-            Sepet
-          </span>
-          {cartCount > 0 && (
-            <span className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-[#D4AF37] text-black text-[10px] font-black rounded-full">
-              {cartCount > 9 ? "9+" : cartCount}
+        {CART_ENABLED ? (
+          <Link
+            href="/sepet"
+            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 active:bg-[#D4AF37]/30 transition-colors relative"
+            aria-label={`Sepet (${cartCount} ├╝r├╝n)`}
+          >
+            <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
+            <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
+              Sepet
+            </span>
+            {cartCount > 0 && (
+              <span className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-[#D4AF37] text-black text-[10px] font-black rounded-full">
+                {cartCount > 9 ? "9+" : cartCount}
+              </span>
+            )}
+          </Link>
+        ) : (
+          <Link
+            href="/teklif-al"
+            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 active:bg-[#D4AF37]/30 transition-colors"
+            aria-label="Teklif al"
+          >
+            <FileText className="w-5 h-5 text-[#D4AF37]" />
+            <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
+              Teklif
             </span>
-          )}
-        </Link>
+          </Link>
+        )}
       </div>
     </div>
   );
 };
diff --git a/src/components/product/MobileFilterDrawer.tsx b/src/components/product/MobileFilterDrawer.tsx
index f290546..af07ca6 100644
--- a/src/components/product/MobileFilterDrawer.tsx
+++ b/src/components/product/MobileFilterDrawer.tsx
@@ -1,11 +1,13 @@
-"use client";
+´╗┐"use client";
 
 import React, { useEffect } from "react";
-import { X, Filter, Search, ShoppingCart, ShieldCheck } from "lucide-react";
+import { X, Filter, Search, ShoppingCart, ShieldCheck, FileText } from "lucide-react";
 import { Category, MetalProduct } from "@/lib/supabase/metal-products.types";
 import { RecentlyViewed } from "./RecentlyViewed";
+import { CART_ENABLED } from "@/lib/commerce";
+import Link from "next/link";
 
 interface MobileFilterDrawerProps {
     isOpen: boolean;
     onClose: () => void;
     selectedCategory: string;
@@ -113,11 +115,11 @@ export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
                                 <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> G├╝venli ├Âdeme
                             </div>
                         </div>
                     </div>
 
-                    {/* Cart Summary */}
+                    {CART_ENABLED ? (
                     <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                         <div className="flex items-center justify-between">
                             <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">
                                 Sepet ├Âzeti
                             </span>
@@ -136,10 +138,21 @@ export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
                             className="inline-flex items-center justify-center w-full h-11 bg-[#D4AF37] text-black font-black uppercase tracking-[0.25em] text-sm"
                         >
                             Sepete Git ({cartCount})
                         </a>
                     </div>
+                    ) : (
+                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
+                        <Link
+                            href="/teklif-al"
+                            className="inline-flex items-center justify-center gap-2 w-full h-11 bg-[#D4AF37] text-black font-black uppercase tracking-[0.25em] text-sm"
+                        >
+                            <FileText className="w-4 h-4" />
+                            Teklif Al
+                        </Link>
+                    </div>
+                    )}
 
                     {/* Recently Viewed */}
                     <RecentlyViewed items={recentItems} />
 
                     {/* Categories */}
diff --git a/src/components/product/ProductCard.tsx b/src/components/product/ProductCard.tsx
index ade278a..23d0258 100644
--- a/src/components/product/ProductCard.tsx
+++ b/src/components/product/ProductCard.tsx
@@ -1,21 +1,36 @@
-// Product Card Component - Supports default (vertical) and horizontal variants
+´╗┐// Product Card Component - Supports default (vertical) and horizontal variants
 "use client";
 
 import Link from "next/link";
 import Image from "next/image";
-import { ArrowUpRight, Box, FileText, ShoppingCart } from "lucide-react";
+import { Box, FileText, MessageCircle, Phone, ShoppingCart } from "lucide-react";
 import { useCartStore } from "@/store/useCartStore";
+import { useContentStore } from "@/store/useContentStore";
 import { MetalProduct } from "@/lib/supabase/metal-products.types";
 import { formatPrice, normalizeImagePath } from "@/lib/utils";
+import { CART_ENABLED } from "@/lib/commerce";
+import {
+  toTelHref,
+  buildProductWhatsAppUrl,
+  resolveFooterPhone,
+  resolveWhatsappNumber,
+} from "@/lib/contact";
 
 interface ProductCardProps {
   product: MetalProduct;
   variant?: "default" | "horizontal";
 }
 
 const ProductCard: React.FC<ProductCardProps> = ({ product, variant = "default" }) => {
+  const { content } = useContentStore();
+  const tel = toTelHref(resolveFooterPhone(content.footerPhone));
+  const wa = buildProductWhatsAppUrl({
+    whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
+    productName: product.name,
+    baseMessage: content.whatsappMessage,
+  });
   const isRetail = product.price > 0 && product.stock_quantity > 0;
   const isCustom = !isRetail;
   const isHorizontal = variant === "horizontal";
   const categoryName = product.category?.name || "";
   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
@@ -144,17 +159,40 @@ const ProductCard: React.FC<ProductCardProps> = ({ product, variant = "default"
             </div>
           )}
         </div>
 
         {isRetail ? (
-          <button
-            onClick={handleAddToCart}
-            className={`cursor-pointer relative z-20 flex items-center justify-center w-12 h-12 border-2 transition-all duration-300 group/btn rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-zinc-50 text-zinc-900 hover:bg-industrial-gold`}
-            title="Sepete Ekle"
-          >
-            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
-          </button>
+          CART_ENABLED ? (
+            <button
+              onClick={handleAddToCart}
+              className={`cursor-pointer relative z-20 flex items-center justify-center w-12 h-12 border-2 transition-all duration-300 group/btn rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-zinc-50 text-zinc-900 hover:bg-industrial-gold`}
+              title="Sepete Ekle"
+            >
+              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
+            </button>
+          ) : (
+            <div className="relative z-20 flex items-center gap-2">
+              <a
+                href={tel}
+                onClick={(e) => e.stopPropagation()}
+                aria-label="Ara"
+                className="cursor-pointer flex items-center justify-center w-10 h-10 border-2 transition-all duration-300 rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-zinc-50 text-zinc-900 hover:bg-industrial-gold"
+              >
+                <Phone className="w-4 h-4" />
+              </a>
+              <a
+                href={wa}
+                target="_blank"
+                rel="noopener noreferrer"
+                onClick={(e) => e.stopPropagation()}
+                aria-label="WhatsApp"
+                className="cursor-pointer flex items-center justify-center w-10 h-10 border-2 transition-all duration-300 rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-zinc-50 text-zinc-900 hover:bg-industrial-gold"
+              >
+                <MessageCircle className="w-4 h-4" />
+              </a>
+            </div>
+          )
         ) : (
           <Link
             href={`/urunler/${product.slug}`}
             className={`cursor-pointer relative z-20 flex items-center justify-center w-12 h-12 border-2 transition-all duration-300 group/btn rounded-none border-zinc-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[0_0_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] bg-industrial-gold/10 text-industrial-gold hover:bg-industrial-gold hover:text-zinc-900`}
           >
diff --git a/src/components/product/ProductDetail.tsx b/src/components/product/ProductDetail.tsx
index 046fe88..099d810 100644
--- a/src/components/product/ProductDetail.tsx
+++ b/src/components/product/ProductDetail.tsx
@@ -8,19 +8,27 @@ import * as React from "react"
 import { m } from 'framer-motion'
 import Link from "next/link"
 import {
     ArrowLeft, ShoppingBag, Share2, Heart,
     Zap, Shield, Package, Truck, Check,
-    Info, Ruler, FileText, Factory
+    Info, Ruler, FileText, Factory, Phone, MessageCircle
 } from "lucide-react"
 import { MetalImage } from "@/components/landing/MetalImage"
 import { useCartStore } from "@/store/useCartStore"
+import { useContentStore } from "@/store/useContentStore"
 import { useToast } from "@/components/ui/use-toast"
 import { cn, formatPrice } from "@/lib/utils"
 import type { MetalProduct } from "@/lib/supabase/metal-products.types"
 import { useRouter } from "next/navigation"
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
+import { CART_ENABLED } from "@/lib/commerce"
+import {
+    toTelHref,
+    buildProductWhatsAppUrl,
+    resolveFooterPhone,
+    resolveWhatsappNumber,
+} from "@/lib/contact"
 
 interface ProductDetailProps {
     product: MetalProduct
     relatedProducts?: any[]
 }
@@ -30,18 +38,27 @@ const FEATURE_ICONS: Record<string, React.ElementType> = {
     Shield, Zap, Package, Truck, Check, Info, Ruler, FileText, Factory
 }
 
 export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts = [] }) => {
     const { addItem, items } = useCartStore()
+    const { content } = useContentStore()
     const { toast } = useToast()
     const router = useRouter()
     const [isAdding, setIsAdding] = React.useState(false)
 
+    const tel = toTelHref(resolveFooterPhone(content.footerPhone))
+    const wa = buildProductWhatsAppUrl({
+        whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
+        productName: product.name,
+        baseMessage: content.whatsappMessage,
+    })
+
     const inCart = items.some(item => item.productId === product.id)
     const isRetail = product.price > 0 && product.stock_quantity > 0;
 
     const handleAddToCart = (redirect: boolean = false) => {
+        if (!CART_ENABLED) return
         setIsAdding(true)
         const result = addItem({
             productId: product.id,
             name: product.name,
             slug: product.slug,
@@ -194,49 +211,94 @@ export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedPr
                                             KDV Dahil
                                         </span>
                                     </div>
 
                                     <div className="flex flex-col sm:flex-row gap-4">
-                                        <m.button
-                                            onClick={() => handleAddToCart()}
-                                            disabled={inCart || isAdding}
-                                            className={cn(
-                                                "flex-1 flex items-center justify-center gap-3 px-8 py-5",
-                                                "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
-                                                "transition-all duration-300 border-2 border-zinc-900",
-                                                inCart
-                                                    ? "bg-emerald-400 text-zinc-900 shadow-[4px_4px_0_0_#10b981]"
-                                                    : "bg-white text-zinc-900 shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]",
-                                            )}
-                                        >
-                                            {inCart ? (
-                                                <>
-                                                    <Check className="w-6 h-6" />
-                                                    Sepette
-                                                </>
-                                            ) : (
-                                                <>
-                                                    <ShoppingBag className="w-6 h-6" />
-                                                    {isAdding ? "..." : "Sepete Ekle"}
-                                                </>
-                                            )}
-                                        </m.button>
+                                        {CART_ENABLED ? (
+                                            <>
+                                                <m.button
+                                                    onClick={() => handleAddToCart()}
+                                                    disabled={inCart || isAdding}
+                                                    className={cn(
+                                                        "flex-1 flex items-center justify-center gap-3 px-8 py-5",
+                                                        "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
+                                                        "transition-all duration-300 border-2 border-zinc-900",
+                                                        inCart
+                                                            ? "bg-emerald-400 text-zinc-900 shadow-[4px_4px_0_0_#10b981]"
+                                                            : "bg-white text-zinc-900 shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]",
+                                                    )}
+                                                >
+                                                    {inCart ? (
+                                                        <>
+                                                            <Check className="w-6 h-6" />
+                                                            Sepette
+                                                        </>
+                                                    ) : (
+                                                        <>
+                                                            <ShoppingBag className="w-6 h-6" />
+                                                            {isAdding ? "..." : "Sepete Ekle"}
+                                                        </>
+                                                    )}
+                                                </m.button>
 
-                                        <m.button
-                                            onClick={() => handleAddToCart(true)}
-                                            disabled={isAdding}
-                                            className={cn(
-                                                "flex-1 flex items-center justify-center gap-3 px-10 py-5",
-                                                "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
-                                                "transition-all duration-300 border-2 border-zinc-900",
-                                                "bg-industrial-gold text-zinc-900",
-                                                "shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]"
-                                            )}
-                                        >
-                                            <Zap className="w-6 h-6 fill-current" />
-                                            Hemen Al
-                                        </m.button>
+                                                <m.button
+                                                    onClick={() => handleAddToCart(true)}
+                                                    disabled={isAdding}
+                                                    className={cn(
+                                                        "flex-1 flex items-center justify-center gap-3 px-10 py-5",
+                                                        "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
+                                                        "transition-all duration-300 border-2 border-zinc-900",
+                                                        "bg-industrial-gold text-zinc-900",
+                                                        "shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]"
+                                                    )}
+                                                >
+                                                    <Zap className="w-6 h-6 fill-current" />
+                                                    Hemen Al
+                                                </m.button>
+                                            </>
+                                        ) : (
+                                            <>
+                                                <a
+                                                    href={tel}
+                                                    className={cn(
+                                                        "flex-1 flex items-center justify-center gap-3 px-8 py-5",
+                                                        "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
+                                                        "transition-all duration-300 border-2 border-zinc-900",
+                                                        "bg-white text-zinc-900 shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]"
+                                                    )}
+                                                >
+                                                    <Phone className="w-6 h-6" />
+                                                    Ara
+                                                </a>
+                                                <a
+                                                    href={wa}
+                                                    target="_blank"
+                                                    rel="noopener noreferrer"
+                                                    className={cn(
+                                                        "flex-1 flex items-center justify-center gap-3 px-10 py-5",
+                                                        "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
+                                                        "transition-all duration-300 border-2 border-zinc-900",
+                                                        "bg-industrial-gold text-zinc-900",
+                                                        "shadow-[6px_6px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[4px] hover:translate-y-[4px]"
+                                                    )}
+                                                >
+                                                    <MessageCircle className="w-6 h-6" />
+                                                    WhatsApp
+                                                </a>
+                                                <Link
+                                                    href="/teklif-al"
+                                                    className={cn(
+                                                        "flex items-center justify-center gap-3 px-8 py-4 w-full",
+                                                        "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
+                                                        "border-2 border-zinc-900 text-zinc-700 hover:bg-zinc-50 transition-all"
+                                                    )}
+                                                >
+                                                    <FileText className="w-5 h-5" />
+                                                    Teklif Al
+                                                </Link>
+                                            </>
+                                        )}
                                     </div>
 
                                     <div className="flex items-center gap-3 text-xs lg:text-sm font-black font-mono text-zinc-500 uppercase tracking-widest justify-center">
                                         <Shield className="w-5 h-5 text-industrial-gold" />
                                         <span>G├╝venli ├ûdeme & SSL Korumas─▒</span>
@@ -250,11 +312,11 @@ export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedPr
                                     </div>
                                     <p className="text-zinc-700 font-mono text-base lg:text-lg leading-relaxed border-l-4 border-industrial-gold pl-5 py-2">
                                         Bu ├╝r├╝n stoktan sat─▒┼şa kapal─▒d─▒r. Projeleriniz i├ğin ├Âzel ├╝retim olarak talep edebilirsiniz.
                                     </p>
                                     <a
-                                        href={`https://wa.me/905071651315?text=Merhaba, ${encodeURIComponent(product.name)} (SKU: ${product.sku}) i├ğin fiyat teklifi almak istiyorum.`}
+                                        href={wa}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         className={cn(
                                             "flex items-center justify-center gap-3 px-8 py-5 w-full",
                                             "font-black text-sm lg:text-base uppercase tracking-[0.2em] font-mono",
diff --git a/src/components/product/detail/ConfigurationPanel.tsx b/src/components/product/detail/ConfigurationPanel.tsx
index 9cde604..8fb26be 100644
--- a/src/components/product/detail/ConfigurationPanel.tsx
+++ b/src/components/product/detail/ConfigurationPanel.tsx
@@ -1,32 +1,50 @@
-"use client";
+´╗┐"use client";
 
 import React, { useState } from 'react';
 import { useConfiguratorStore, SIZES } from '@/store/useConfiguratorStore';
 import { useCartStore } from '@/store/useCartStore';
-import { Check, ShoppingCart, ShieldCheck, Truck, RotateCcw, CreditCard, Settings } from 'lucide-react';
+import { useContentStore } from '@/store/useContentStore';
+import { Check, ShoppingCart, ShieldCheck, Truck, RotateCcw, CreditCard, Settings, Phone, MessageCircle } from 'lucide-react';
 import { Product } from '@/lib/products';
 import { CartTerminal } from '@/components/checkout/CartTerminal';
 import { m, AnimatePresence } from 'framer-motion';
+import { CART_ENABLED } from '@/lib/commerce';
+import {
+    toTelHref,
+    buildProductWhatsAppUrl,
+    resolveFooterPhone,
+    resolveWhatsappNumber,
+} from '@/lib/contact';
 
 export default function ConfigurationPanel({ product }: { product: Product }) {
     const { size: selectedSize, setSize, customImage } = useConfiguratorStore();
     const addItem = useCartStore((state) => state.addItem);
+    const { content } = useContentStore();
     const [isAdded, setIsAdded] = useState(false);
 
+    const productName = customImage ? "├ûZEL TASARIM METAL POSTER" : product.name;
+    const tel = toTelHref(resolveFooterPhone(content.footerPhone));
+    const wa = buildProductWhatsAppUrl({
+        whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
+        productName,
+        baseMessage: content.whatsappMessage,
+    });
+
     const totalPrice = product.price + selectedSize.priceAdd;
 
     // Display size (G├Ârsel oran─▒na g├Âre otomatik ┼şekillenir)
     const getDisplaySize = (size: typeof SIZES[0]) => {
         return `${size.dimB}x${size.dimA} CM`; // Standart g├Âr├╝n├╝m
     };
 
     const handleAddToCart = () => {
+        if (!CART_ENABLED) return;
         addItem({
             productId: product.id,
             slug: product.slug,
-            name: customImage ? "├ûZEL TASARIM METAL POSTER" : product.name,
+            name: productName,
             size: getDisplaySize(selectedSize) + " (SMART-FIT)",
             price: totalPrice,
             image: customImage || product.image,
             orientation: 'vertical'
         });
@@ -122,31 +140,50 @@ export default function ConfigurationPanel({ product }: { product: Product }) {
                 </div>
                 <div className="text-5xl font-black mb-4">
                     Ôé║{totalPrice} <span className="text-lg font-normal text-black/50">/ ADET</span>
                 </div>
 
-                <button
-                    onClick={handleAddToCart}
-                    disabled={isAdded}
-                    className={`w-full py-5 font-mono text-lg font-black uppercase transition-all ${isAdded
-                        ? 'bg-green-500 text-white'
-                        : 'bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
-                        }`}
-                >
-                    <AnimatePresence mode="wait">
-                        {isAdded ? (
-                            <m.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-4">
-                                SEPETE EKLEND─░ <Check size={24} />
-                            </m.span>
-                        ) : (
-                            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4">
-                                <ShoppingCart size={20} />
-                                <span>SEPETE EKLE</span>
-                            </m.div>
-                        )}
-                    </AnimatePresence>
-                </button>
+                {CART_ENABLED ? (
+                    <button
+                        onClick={handleAddToCart}
+                        disabled={isAdded}
+                        className={`w-full py-5 font-mono text-lg font-black uppercase transition-all ${isAdded
+                            ? 'bg-green-500 text-white'
+                            : 'bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
+                            }`}
+                    >
+                        <AnimatePresence mode="wait">
+                            {isAdded ? (
+                                <m.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-4">
+                                    SEPETE EKLEND─░ <Check size={24} />
+                                </m.span>
+                            ) : (
+                                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4">
+                                    <ShoppingCart size={20} />
+                                    <span>SEPETE EKLE</span>
+                                </m.div>
+                            )}
+                        </AnimatePresence>
+                    </button>
+                ) : (
+                    <div className="flex flex-col sm:flex-row gap-3">
+                        <a
+                            href={tel}
+                            className="flex-1 py-5 font-mono text-lg font-black uppercase transition-all bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center gap-3"
+                        >
+                            <Phone size={20} /> ARA
+                        </a>
+                        <a
+                            href={wa}
+                            target="_blank"
+                            rel="noopener noreferrer"
+                            className="flex-1 py-5 font-mono text-lg font-black uppercase transition-all border-2 border-black flex items-center justify-center gap-3 hover:bg-black hover:text-[#D4AF37]"
+                        >
+                            <MessageCircle size={20} /> WHATSAPP
+                        </a>
+                    </div>
+                )}
             </div>
 
             {/* TRUST BADGES */}
             <div className="grid grid-cols-2 gap-4">
                 {[
diff --git a/src/components/sections/ProductConfigurator.tsx b/src/components/sections/ProductConfigurator.tsx
index 079903c..364d530 100644
--- a/src/components/sections/ProductConfigurator.tsx
+++ b/src/components/sections/ProductConfigurator.tsx
@@ -2,23 +2,32 @@
 
 import { useState, useEffect } from "react";
 import { m, AnimatePresence } from 'framer-motion';
 import { useCartStore } from "@/store/useCartStore";
 import Image from "next/image";
-import { Check, ChevronLeft, ChevronRight, Sliders, Box, HardDrive } from "lucide-react";
+import { Check, ChevronLeft, ChevronRight, Sliders, Box, HardDrive, Phone, MessageCircle } from "lucide-react";
 import { useProductStore } from "@/store/useProductStore";
 import { CartTerminal } from "@/components/checkout/CartTerminal";
+import { useContentStore } from "@/store/useContentStore";
+import { CART_ENABLED } from "@/lib/commerce";
+import {
+    toTelHref,
+    buildProductWhatsAppUrl,
+    resolveFooterPhone,
+    resolveWhatsappNumber,
+} from "@/lib/contact";
 
 const sizes = [
     { id: "xs", name: "10x20 CM", priceAdd: -100, desc: "M─░N─░ TASARIM", ratio: 0.5 },
     { id: "m", name: "30x45 CM", priceAdd: 200, desc: "STANDART GALER─░", ratio: 0.67 },
     { id: "l", name: "45x60 CM", priceAdd: 500, desc: "GEN─░┼Ş SERG─░LEY─░C─░", ratio: 0.75 },
     { id: "xl", name: "60x90 CM", priceAdd: 1000, desc: "MAKS─░MUM ETK─░", ratio: 0.67 },
 ];
 
 export const ProductConfigurator = () => {
     const { products, fetchProducts } = useProductStore();
+    const { content } = useContentStore();
     const [selectedProductIndex, setSelectedProductIndex] = useState(0);
     const [selectedSize, setSelectedSize] = useState(sizes[1]);
     const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
     const [isCartOpen, setIsCartOpen] = useState(false);
     const addItem = useCartStore((state) => state.addItem);
@@ -34,10 +43,11 @@ export const ProductConfigurator = () => {
     if (!product) return null;
 
     const totalPrice = product.price + selectedSize.priceAdd;
 
     const handleAddToCart = () => {
+        if (!CART_ENABLED) return;
         addItem({
             productId: product.id,
             name: product.name,
             slug: product.slug,
             size: (orientation === 'landscape'
@@ -50,10 +60,17 @@ export const ProductConfigurator = () => {
         setAdded(true);
         setIsCartOpen(true);
         setTimeout(() => setAdded(false), 2000);
     };
 
+    const tel = toTelHref(resolveFooterPhone(content.footerPhone));
+    const wa = buildProductWhatsAppUrl({
+        whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
+        productName: product.name,
+        baseMessage: content.whatsappMessage,
+    });
+
     const nextProduct = () => setSelectedProductIndex((prev) => (prev + 1) % products.length);
     const prevProduct = () => setSelectedProductIndex((prev) => (prev - 1 + products.length) % products.length);
 
     return (
         <section id="configurator" className="py-16 lg:py-24 bg-transparent">
@@ -149,13 +166,24 @@ export const ProductConfigurator = () => {
                                         </button>
                                     ))}
                                 </div>
                             </div>
 
-                            <button onClick={handleAddToCart} className={`w-full h-20 text-[12px] font-black uppercase tracking-[0.5em] transition-all duration-500 ${added ? 'bg-green-600 text-white' : 'bg-[#0A0A0A] text-white hover:bg-[#D4AF37]'}`}>
-                                {added ? 'SEPETE EKLEND─░' : 'KOLEKS─░YONA EKLE'}
-                            </button>
+                            {CART_ENABLED ? (
+                                <button onClick={handleAddToCart} className={`w-full h-20 text-[12px] font-black uppercase tracking-[0.5em] transition-all duration-500 ${added ? 'bg-green-600 text-white' : 'bg-[#0A0A0A] text-white hover:bg-[#D4AF37]'}`}>
+                                    {added ? 'SEPETE EKLEND─░' : 'KOLEKS─░YONA EKLE'}
+                                </button>
+                            ) : (
+                                <div className="flex flex-col sm:flex-row gap-3">
+                                    <a href={tel} className="flex-1 h-20 flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] bg-[#0A0A0A] text-white hover:bg-[#D4AF37] transition-all duration-500">
+                                        <Phone className="w-5 h-5" /> ARA
+                                    </a>
+                                    <a href={wa} target="_blank" rel="noopener noreferrer" className="flex-1 h-20 flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-500">
+                                        <MessageCircle className="w-5 h-5" /> WHATSAPP
+                                    </a>
+                                </div>
+                            )}
                         </div>
                     </div>
                 </div>
             </div>
         </section>
diff --git a/src/components/sections/ProductGallery.tsx b/src/components/sections/ProductGallery.tsx
index 80f25de..9fd5b81 100644
--- a/src/components/sections/ProductGallery.tsx
+++ b/src/components/sections/ProductGallery.tsx
@@ -1,23 +1,31 @@
 ´╗┐"use client";
 
 import { useEffect, useState } from "react";
 import { m } from 'framer-motion';
-import { Plus, ArrowRight } from "lucide-react";
+import { Plus, ArrowRight, Phone, MessageCircle } from "lucide-react";
 import Link from "next/link";
 import Image from "next/image";
 import { useProductStore } from "@/store/useProductStore";
 import { useCartStore } from "@/store/useCartStore";
 import { useContentStore } from "@/store/useContentStore";
 import { DirectEdit } from "@/components/admin/DirectEdit";
 import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";
 import { normalizeImagePath } from "@/lib/utils";
+import { CART_ENABLED } from "@/lib/commerce";
+import {
+    toTelHref,
+    buildProductWhatsAppUrl,
+    resolveFooterPhone,
+    resolveWhatsappNumber,
+} from "@/lib/contact";
 
 export const ProductGallery = () => {
     const { content } = useContentStore();
     const { products, categories: allCategories, loading, fetchProducts, fetchCategories } = useProductStore();
     const addItem = useCartStore((state) => state.addItem);
+    const tel = toTelHref(resolveFooterPhone(content.footerPhone));
     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
     const [isMobile, setIsMobile] = useState(false);
     const { shouldReduceVisuals } = usePerformanceDetection();
 
     useEffect(() => {
@@ -166,28 +174,55 @@ export const ProductGallery = () => {
                                             </h3>
                                         </Link>
 
                                         <div className="flex justify-between items-center sm:mt-2 pt-6 border-t border-[#0A0A0A]/5">
                                             <p className="text-3xl font-black text-white italic tracking-tighter">{product.price} TL</p>
-                                            <button
-                                                onClick={(e) => {
-                                                    e.preventDefault();
-                                                    e.stopPropagation();
-                                                    addItem({
-                                                        productId: product.id,
-                                                        name: product.name,
-                                                        slug: product.slug,
-                                                        price: product.price,
-                                                        image: product.image,
-                                                        size: '45x60', // Default size matching base price
-                                                        orientation: 'vertical' // Default orientation
-                                                    });
-                                                }}
-                                                className="px-8 h-12 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500"
-                                            >
-                                                SEPETE EKLE
-                                            </button>
+                                            {CART_ENABLED ? (
+                                                <button
+                                                    onClick={(e) => {
+                                                        e.preventDefault();
+                                                        e.stopPropagation();
+                                                        addItem({
+                                                            productId: product.id,
+                                                            name: product.name,
+                                                            slug: product.slug,
+                                                            price: product.price,
+                                                            image: product.image,
+                                                            size: '45x60',
+                                                            orientation: 'vertical'
+                                                        });
+                                                    }}
+                                                    className="px-8 h-12 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500"
+                                                >
+                                                    SEPETE EKLE
+                                                </button>
+                                            ) : (
+                                                <div className="flex items-center gap-2">
+                                                    <a
+                                                        href={tel}
+                                                        onClick={(e) => e.stopPropagation()}
+                                                        aria-label="Ara"
+                                                        className="px-4 h-12 flex items-center justify-center bg-[#0A0A0A] text-white hover:bg-[#D4AF37] transition-all duration-500"
+                                                    >
+                                                        <Phone className="w-4 h-4" />
+                                                    </a>
+                                                    <a
+                                                        href={buildProductWhatsAppUrl({
+                                                            whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
+                                                            productName: product.name,
+                                                            baseMessage: content.whatsappMessage,
+                                                        })}
+                                                        target="_blank"
+                                                        rel="noopener noreferrer"
+                                                        onClick={(e) => e.stopPropagation()}
+                                                        aria-label="WhatsApp"
+                                                        className="px-4 h-12 flex items-center justify-center bg-[#0A0A0A] text-white hover:bg-[#D4AF37] transition-all duration-500"
+                                                    >
+                                                        <MessageCircle className="w-4 h-4" />
+                                                    </a>
+                                                </div>
+                                            )}
                                         </div>
                                     </div>
                                 </m.div>
                             );
                         })}
```
