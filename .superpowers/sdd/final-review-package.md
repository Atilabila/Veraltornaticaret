# Final Branch Review Package
Merge-base: 5e13c51c825cdeb9a19fd4ca3f03ab8255c73310
Head: 73a06ceea8a3aa7381eab0cada0bb4ef97cc0ffa

## Commits
73a06ce fix: wire ServicesHomeSection into homepage after Hero
786ec6f feat: quiet services section defaults and border rhythm
1e034ca fix: preserve heroImage CMS and narrow Task 5 store defaults
309dd88 feat: calm hero atmosphere and understated default copy
3f21943 fix: narrow Task 4 to cart CTA swaps without product redesign
261bee7 feat: replace storefront cart CTAs with phone and WhatsApp
f8babc4 fix: isolate navigation cart gate from unrelated nav edits
8910040 feat: hide navigation cart controls when cart disabled
20b1543 fix: isolate layout cart gate from unrelated theme edits
2210bf1 feat: redirect cart/checkout routes and unmount CartDrawer
98092e6 feat: add cart-off flag and shared contact helpers

## Stat
 .superpowers/sdd/task-5-report.md                  |  86 ++++
 e2e/cart-off.spec.ts                               |  18 +
 scripts/verify-contact.ts                          |  16 +
 src/app/(shop)/page.tsx                            |  49 +-
 src/app/layout.tsx                                 |   3 +-
 src/app/odeme/page.tsx                             | 571 +--------------------
 src/app/sepet/page.tsx                             |  30 +-
 src/app/siparis/[id]/page.tsx                      |   3 +
 src/app/urunler/[slug]/ProductDetailClient.tsx     | 154 ++++--
 src/components/layout/Navigation.tsx               |  59 ++-
 src/components/product/CatalogContainer.tsx        |   5 +-
 src/components/product/MobileActionBar.tsx         |  48 +-
 src/components/product/MobileFilterDrawer.tsx      |  19 +-
 src/components/product/ProductCard.tsx             |  56 +-
 src/components/product/ProductDetail.tsx           | 142 +++--
 .../product/detail/ConfigurationPanel.tsx          |  85 ++-
 src/components/sections/Hero.tsx                   | 124 ++---
 src/components/sections/ProductConfigurator.tsx    |  36 +-
 src/components/sections/ProductGallery.tsx         |  73 ++-
 src/components/sections/ServicesHomeSection.tsx    |  81 +++
 src/lib/commerce.ts                                |   2 +
 src/lib/contact.ts                                 |  40 ++
 src/store/useContentStore.ts                       |  57 +-
 23 files changed, 840 insertions(+), 917 deletions(-)

## Diff
```diff
diff --git a/.superpowers/sdd/task-5-report.md b/.superpowers/sdd/task-5-report.md
new file mode 100644
index 0000000..5daef07
--- /dev/null
+++ b/.superpowers/sdd/task-5-report.md
@@ -0,0 +1,86 @@
+# Task 5 Report: Hero atmosphere + understated defaults
+
+**Branch:** `feat/homepage-vision-cart-off`  
+**Status:** Complete  
+**Commit:** `309dd88` ÔÇö `feat: calm hero atmosphere and understated default copy`
+
+## Scope
+
+Surgical polish of Hero defaults and calmer media treatment. Only two files touched.
+
+| File | Change |
+|------|--------|
+| `src/store/useContentStore.ts` | Updated `heroSubtitle`, `heroProductLine`; trimmed `metalShowcaseTrustBadges` to 3; `heroTitle` unchanged |
+| `src/components/sections/Hero.tsx` | Removed inner white-border overlay, hover scale, and hover tint; aligned inline fallbacks; kept `content.heroImage` + simple `border-[#c6c6c6]` frame |
+
+## Defaults applied
+
+```ts
+heroSubtitle: "─░zmir ÔÇö toptan dosya teli ve metal imalat"
+heroProductLine: "├ûl├ğ├╝ netle┼şir, termin konu┼şulur, sevkiyat planlan─▒r."
+heroTitle: "├ûZEL & SER─░\nDOSYA TEL─░" (unchanged)
+metalShowcaseTrustBadges: Factory / 24s Teklif / Toptan MOQ (4th badge removed)
+```
+
+## Self-review / scope check
+
+- Ô£à Only `useContentStore.ts` + `Hero.tsx` committed
+- Ô£à `heroImage` still bound via `normalizeImagePath(content.heroImage || ÔÇĞ)`
+- Ô£à No Navigation, ProcessSection, layout, or font changes
+- ÔÜá´©Å Commit diff larger than Task 5 delta alone ÔÇö both files had prior branch WIP staged together
+- ÔÜá´©Å `applyManufacturingContentMerge` still forces `heroImage` from code defaults (pre-existing CMS override behavior)
+
+## Tests
+
+- Linter: no new issues on edited files
+- Manual smoke recommended: `http://127.0.0.1:3000/` ÔÇö eyebrow/tagline copy, calm image frame, Admin ÔåÆ Hero ÔåÆ Ana G├Ârsel still updates image
+
+## Concerns
+
+1. **Bundled WIP:** Commit includes manufacturing-pivot deltas already present in working tree, not only Task 5 lines.
+2. **CMS merge:** Users with Supabase/localStorage poster-era content get code defaults via `applyManufacturingContentMerge` ÔÇö intentional but may surprise admins expecting persisted subtitle.
+3. **MOQ float card:** Right-column caption card with `whileHover` retained (not in brief removal list).
+
+---
+
+## Review fix (Task 5 findings)
+
+**Status:** Fixed  
+**Commit message:** `fix: preserve heroImage CMS and narrow Task 5 store defaults` (branch HEAD after review fix)
+
+### Changes
+
+| File | Fix |
+|------|-----|
+| `src/store/useContentStore.ts` | Restored from parent `3f21943`; re-applied only Task 5 hero/trust defaults; removed `applyManufacturingContentMerge` and duplicate v13ÔÇôv18 migrate calls |
+| `src/components/sections/Hero.tsx` | Removed unused `shouldReduceVisuals`; stripped UTF-8 BOM |
+
+### heroImage preservation proof
+
+`applyManufacturingContentMerge` **removed entirely**. Grep confirms `heroImage` appears only in:
+
+1. `SiteContent` interface (`heroImage: string`)
+2. `defaultContent.heroImage` (fallback for fresh installs only)
+
+**Not** overwritten on merge/sync:
+
+- `fetchContent` uses `{ ...state.content, ...data, services: mergedServices }` ÔÇö Supabase/persisted `heroImage` wins over code default.
+- `migrate` v19 uses `{ ...defaultContent, ...newState.content }` then explicitly restores `savedHeroImage` when present ÔÇö no forced default assignment.
+
+```ts
+// fetchContent merge (heroImage from data/state preserved)
+content: {
+    ...state.content,
+    ...data,
+    services: mergedServices,
+}
+
+// migrate v19 (explicit save/restore ÔÇö no defaultContent.heroImage override)
+const savedHeroImage = newState.content?.heroImage;
+newState.content = { ...defaultContent, ...newState.content, /* heroProductLine + badges only */ };
+if (savedHeroImage) {
+    newState.content.heroImage = savedHeroImage;
+}
+```
+
+**Verification command:** `rg "applyManufacturingContentMerge|heroImage:" src/store/useContentStore.ts` ÔåÆ no merge function; `heroImage:` only on interface + defaults.
diff --git a/e2e/cart-off.spec.ts b/e2e/cart-off.spec.ts
new file mode 100644
index 0000000..6a2cb40
--- /dev/null
+++ b/e2e/cart-off.spec.ts
@@ -0,0 +1,18 @@
+import { test, expect } from "@playwright/test";
+
+test.describe("cart off", () => {
+  test("/sepet redirects to /teklif-al", async ({ page }) => {
+    await page.goto("/sepet");
+    await expect(page).toHaveURL(/\/teklif-al/);
+  });
+
+  test("/odeme redirects to /teklif-al", async ({ page }) => {
+    await page.goto("/odeme");
+    await expect(page).toHaveURL(/\/teklif-al/);
+  });
+
+  test("homepage has no Sepet aria control", async ({ page }) => {
+    await page.goto("/");
+    await expect(page.getByRole("button", { name: "Sepet" })).toHaveCount(0);
+  });
+});
diff --git a/scripts/verify-contact.ts b/scripts/verify-contact.ts
new file mode 100644
index 0000000..d467754
--- /dev/null
+++ b/scripts/verify-contact.ts
@@ -0,0 +1,16 @@
+import assert from "node:assert/strict";
+import { toTelHref, buildProductWhatsAppUrl, normalizePhoneDigits } from "../src/lib/contact";
+
+assert.equal(normalizePhoneDigits("+90 507 165 13 15"), "905071651315");
+assert.equal(toTelHref("+90 507 165 13 15"), "tel:+905071651315");
+assert.equal(toTelHref("905071651315"), "tel:+905071651315");
+
+const url = buildProductWhatsAppUrl({
+  whatsappNumber: "905071651315",
+  productName: "Dosya Teli 2mm",
+  baseMessage: "Merhaba, toptan dosya teli / imalat teklifi almak istiyorum.",
+});
+assert.match(url, /^https:\/\/wa\.me\/905071651315\?text=/);
+assert.match(decodeURIComponent(url), /Dosya Teli 2mm/);
+
+console.log("verify-contact: OK");
diff --git a/src/app/(shop)/page.tsx b/src/app/(shop)/page.tsx
index 482255d..347b5e1 100644
--- a/src/app/(shop)/page.tsx
+++ b/src/app/(shop)/page.tsx
@@ -1,69 +1,60 @@
 import React from "react";
-import "@/app/metal-art.css";
 import { Navigation } from "@/components/layout/Navigation";
 import { Footer } from "@/components/layout/Footer";
 import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
 
 import { Hero } from "@/components/sections/Hero";
 import dynamic from "next/dynamic";
 
-const ShowcaseGrid = dynamic(() => import("@/components/sections/ShowcaseGrid").then(mod => mod.ShowcaseGrid));
+const ServicesHomeSection = dynamic(() =>
+    import("@/components/sections/ServicesHomeSection").then((mod) => mod.ServicesHomeSection)
+);
 const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(mod => mod.ProcessSection));
 const BlueprintShowcase = dynamic(() => import("@/components/sections/BlueprintShowcase").then(mod => mod.BlueprintShowcase));
 const CustomerReviews = dynamic(() => import("@/components/sections/CustomerReviews").then(mod => mod.CustomerReviews));
-const OtherServices = dynamic(() => import("@/components/sections/OtherServices").then(mod => mod.OtherServices));
-const LiveFeedSection = dynamic(() => import("@/components/sections/LiveFeedSection").then(mod => mod.LiveFeedSection));
 
 export const metadata = {
-    title: "Metal Tablo ve End├╝striyel Dekor | Veral Teneke Ticaret",
-    description: "├ûzel ├╝retim UV bask─▒l─▒ metal tablolar, end├╝striyel teneke plakalar ve kalayl─▒ teneke levhalar. Yeni nesil teneke tasar─▒m─▒.",
+    title: "Toptan Dosya Teli ─░malat─▒ | Veral Teneke Ticaret",
+    description: "─░malat├ğ─▒dan halka: seri toptan dosya teli ├╝retimi, takvim tenekesi imalat─▒ ve end├╝striyel metal ├ğ├Âz├╝mler. ─░zmir merkezli sevkiyat.",
     alternates: {
         canonical: "/",
     },
 };
 
 export default function ShopHomePage() {
     return (
-        <main className="home-page min-h-screen bg-white selection:bg-[#D4AF37] selection:text-white pb-24 lg:pb-0">
+        <main className="home-page min-h-screen bg-[#f4f4f4] text-[#161616] selection:bg-[var(--color-brand-accent)] selection:text-white pb-24 lg:pb-0 relative z-10">
             {/* GLOBAL_NAV */}
             <Navigation />
 
-            {/* HERO - WHITE */}
-            <section className="bg-white text-black relative z-0">
+            {/* HERO */}
+            <section className="bg-white text-[#161616] relative z-0 border-b border-[#c6c6c6]">
                 <Hero />
             </section>
 
-            {/* SYSTEM_STATUS_STRIP - BLACK */}
-            <section className="bg-[#0A0A0A] text-white relative z-0">
-                <OtherServices />
+            {/* H─░ZMETLER ÔÇö 2. ekran (/hizmetler i├ğeri─şi) */}
+            <section className="bg-[#f4f4f4] text-[#161616] relative z-10 border-b border-[#c6c6c6]">
+                <ServicesHomeSection />
             </section>
 
-            {/* SHOWCASE_GRID - BLACK */}
-            <section className="bg-[#0A0A0A] text-white relative z-0">
-                <ShowcaseGrid />
-            </section>
-
-            {/* LIVE_FEED - BLACK (client-side only rendering based on device performance) */}
-            <LiveFeedSection />
-
-            {/* PRODUCTION_FLOW - WHITE */}
-            <section className="bg-white text-black relative z-0">
+            {/* SER─░ ─░MALAT */}
+            <section className="bg-white text-[#161616] relative z-0 border-b border-[#c6c6c6]">
                 <ProcessSection />
             </section>
 
-            {/* PRODUCT_SHOWCASE (Blueprint) - WHITE */}
-            <section className="bg-white text-black relative z-0">
-                <BlueprintShowcase />
+            {/* SOCIAL_PROOF */}
+            <section className="bg-white text-[#161616] relative border-b border-[#c6c6c6]">
+                <CustomerReviews />
             </section>
 
-            {/* SOCIAL_PROOF - BLACK */}
-            <section className="bg-[#0A0A0A] text-white relative">
-                <CustomerReviews />
+            {/* RETAIL CATALOG (demoted) */}
+            <section className="bg-[#f4f4f4] text-[#161616] relative z-0 border-b border-[#c6c6c6]">
+                <BlueprintShowcase />
             </section>
 
-            {/* GLOBAL_FOOTER - BLACK */}
+            {/* GLOBAL_FOOTER */}
             <Footer />
 
             {/* INTERACTION_LAYER */}
             <MobileStickyBar />
         </main>
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index 5233bcb..b86ba1b 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -9,10 +9,11 @@ import { KnowledgeBaseSchema } from "@/components/seo/KnowledgeBaseSchema";
 import { DynamicMetadata } from "@/components/seo/DynamicMetadata";
 import { GlobalGrid } from "@/components/layout/GlobalGrid";
 import { MotionProvider } from "@/components/motion/MotionProvider";
 import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
 import dynamic from "next/dynamic";
+import { CART_ENABLED } from "@/lib/commerce";
 
 const WhatsAppButton = dynamic(() =>
   import("@/components/layout/WhatsAppButton").then((mod) => mod.WhatsAppButton)
 );
 
@@ -82,11 +83,11 @@ export default function RootLayout({ children }: { children: React.ReactNode })
                   <Suspense fallback={null}>
                     <DynamicMetadata />
                   </Suspense>
                 <GlobalGrid />
                 {children}
-                <CartDrawer />
+                {CART_ENABLED ? <CartDrawer /> : null}
               </AuthProvider>
             </ContentSyncProvider>
           </AdminProvider>
         </MotionProvider>
         <WhatsAppButton />
diff --git a/src/app/odeme/page.tsx b/src/app/odeme/page.tsx
index 25b5db0..b401f21 100644
--- a/src/app/odeme/page.tsx
+++ b/src/app/odeme/page.tsx
@@ -1,568 +1,7 @@
-"use client";
+´╗┐import { redirect } from "next/navigation";
+import { CART_ENABLED } from "@/lib/commerce";
 
-import React from "react";
-import Link from "next/link";
-import { useRouter } from "next/navigation";
-import { ArrowLeft, ArrowRight, Package, CreditCard, CheckCircle, AlertTriangle, Loader2, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
-import { useCartStore } from "@/store/useCartStore";
-import { useCheckoutStore } from "@/store/useCheckoutStore";
-import { useOrderStore } from "@/store/useOrderStore";
-import { useContentStore } from "@/store/useContentStore";
-import { Button } from "@/components/ui/button";
-import { formatPrice } from "@/lib/utils";
-import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
-import { m, AnimatePresence } from 'framer-motion';
-import { Navigation } from "@/components/layout/Navigation";
-import { Footer } from "@/components/layout/Footer";
-import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";
-
-const IconComponent = ({ name, className }: { name: string; className?: string }) => (
-    <DynamicLucideIcon name={name} fallbackName="help-circle" className={className} />
-);
-
-const CartProgressBar = ({ step }: { step: number }) => {
-    const steps = [
-        { id: 1, label: "Sepet" },
-        { id: 2, label: "Adres" },
-        { id: 3, label: "WhatsApp" },
-        { id: 4, label: "Tamamland─▒" }
-    ];
-
-    return (
-        <div className="mb-12">
-            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
-                <div className="absolute top-5 left-0 w-full h-[1px] bg-zinc-200 z-0" />
-                <div
-                    className="absolute top-5 left-0 h-[1px] bg-black z-0 transition-all duration-500"
-                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
-                />
-
-                {steps.map((s) => (
-                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
-                        <div
-                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${s.id <= step
-                                ? "bg-black border-black text-white"
-                                : "bg-white border-zinc-200 text-zinc-400"
-                                }`}
-                        >
-                            {s.id < step ? (
-                                <CheckCircle2 className="w-5 h-5" />
-                            ) : (
-                                <span className="font-mono text-sm">{s.id.toString().padStart(2, '0')}</span>
-                            )}
-                        </div>
-                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${s.id <= step ? "text-black" : "text-zinc-400"}`}>
-                            {s.label}
-                        </span>
-                    </div>
-                ))}
-            </div>
-        </div>
-    );
-};
-
-export default function CheckoutPage() {
-    const router = useRouter();
-    const cart = useCartStore();
-    const checkout = useCheckoutStore();
-    const orderStore = useOrderStore();
-    const { content } = useContentStore();
-
-    const checkoutCMS = content.checkoutPage;
-
-    const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
-
-    // Redirect if cart is empty
-    React.useEffect(() => {
-        if (cart.isHydrated && cart.items.length === 0) {
-            router.push('/sepet');
-        }
-    }, [cart.isHydrated, cart.items.length, router]);
-
-    // SSR-safe loading
-    if (!cart.isHydrated) {
-        return (
-            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
-                <div className="container max-w-6xl mx-auto px-4">
-                    <div className="animate-pulse space-y-8">
-                        <div className="h-10 bg-zinc-200 rounded w-48" />
-                        <div className="grid lg:grid-cols-3 gap-12">
-                            <div className="lg:col-span-2 space-y-4">
-                                <div className="h-[600px] bg-zinc-200 rounded-2xl" />
-                            </div>
-                            <div className="h-80 bg-zinc-200 rounded-2xl" />
-                        </div>
-                    </div>
-                </div>
-            </main>
-        );
-    }
-
-    // Validate no zero-price items
-    const hasInvalidItems = cart.items.some(item => !item.price || item.price <= 0);
-
-    if (hasInvalidItems) {
-        return (
-            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
-                <div className="container max-w-4xl mx-auto px-4">
-                    <div className="text-center py-24 space-y-6 bg-white rounded-3xl border border-zinc-200 shadow-sm">
-                        <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
-                            <AlertTriangle className="w-10 h-10 text-red-600" />
-                        </div>
-                        <h1 className="text-2xl font-black uppercase tracking-tight text-red-600">Sipari┼ş ─░┼şlemi Engellenmi┼ştir</h1>
-                        <p className="text-zinc-500 max-w-md mx-auto text-sm">
-                            Sepetinizde ge├ğersiz fiyatl─▒ ├╝r├╝n(ler) bulunmaktad─▒r. L├╝tfen bu ├╝r├╝nleri kald─▒r─▒n veya m├╝┼şteri hizmetleri ile ileti┼şime ge├ğin.
-                        </p>
-                        <Link href="/sepet">
-                            <Button variant="outline" className="rounded-full px-8">Sepete D├Ân</Button>
-                        </Link>
-                    </div>
-                </div>
-            </main>
-        );
-    }
-
-    const handleInputChange = (field: keyof typeof checkout.shipping, value: string) => {
-        checkout.setShipping({ [field]: value });
-        if (formErrors[field]) {
-            setFormErrors(prev => ({ ...prev, [field]: '' }));
-        }
-    };
-
-    const handleBillingTypeChange = (type: 'individual' | 'company') => {
-        checkout.setBilling({ type });
-    };
-
-    const handleSubmit = async (e: React.FormEvent) => {
-        e.preventDefault();
-
-        // Validate form
-        const validation = checkout.validateShipping();
-        if (!validation.valid) {
-            setFormErrors(validation.errors);
-            // Scroll to first error
-            const firstErrorField = Object.keys(validation.errors)[0];
-            const element = document.getElementsByName(firstErrorField)[0];
-            if (element) {
-                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
-            }
-            return;
-        }
-
-        checkout.setProcessing(true);
-        checkout.setError(null);
-
-        try {
-
-            const order = orderStore.createOrder({
-                items: cart.items,
-                shipping: checkout.shipping,
-                billing: checkout.billing,
-                subtotal: cart.getSubtotal(),
-                shippingCost: cart.getShippingCost(),
-                discount: checkout.couponDiscount,
-                total: cart.getTotal() - checkout.couponDiscount,
-                paymentMethod: 'whatsapp',
-                status: 'payment_pending',
-            });
-
-            const whatsappNumber = content.whatsappNumber;
-            if (!String(whatsappNumber || '').trim()) {
-                checkout.setError('WhatsApp hatt─▒ tan─▒ml─▒ de─şil. L├╝tfen y├Ânetim panelinden WhatsApp numaras─▒n─▒ ekleyin.');
-                orderStore.updateOrderStatus(order.id, 'failed');
-                return;
-            }
-
-            const message = buildWhatsAppOrderMessage({
-                orderNumber: order.orderNumber,
-                shipping: {
-                    fullName: order.shipping.fullName,
-                    email: order.shipping.email,
-                    phone: order.shipping.phone,
-                    address: order.shipping.address,
-                    city: order.shipping.city,
-                    district: order.shipping.district,
-                    postalCode: order.shipping.postalCode,
-                    notes: order.shipping.notes,
-                },
-                items: order.items.map((it) => ({
-                    name: it.name,
-                    size: it.size,
-                    quantity: it.quantity,
-                    unitPrice: it.price,
-                })),
-                total: order.total,
-            });
-
-            const whatsappUrl = buildWhatsAppUrl({ phoneNumber: whatsappNumber, message });
-            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
-
-            cart.clearCart();
-            checkout.reset();
-            router.push(`/siparis/${order.id}`);
-        } catch (error) {
-            console.error('[CHECKOUT] Error:', error);
-            checkout.setError('Beklenmeyen bir hata olu┼ştu. L├╝tfen tekrar deneyin.');
-        } finally {
-            checkout.setProcessing(false);
-        }
-    };
-
-    const subtotal = cart.getSubtotal();
-    const shipping = cart.getShippingCost();
-    const total = cart.getTotal() - checkout.couponDiscount;
-
-    return (
-        <>
-            <Navigation />
-            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
-                <div className="container max-w-7xl mx-auto px-4">
-                    <CartProgressBar step={2} />
-
-                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10">
-                        <div>
-                            <Link href="/sepet" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black mb-4 transition-colors">
-                                <ArrowLeft className="w-3 h-3 mr-2" />
-                                SEPETE D├ûN
-                            </Link>
-                            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 text-black">{checkoutCMS?.title || "├ûDEME PROTOKOL├£"}</h1>
-                            <div className="flex items-center gap-3">
-                                <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-md tracking-widest uppercase">
-                                    SSL G├£VENL─░
-                                </span>
-                                <div className="h-1 w-1 rounded-full bg-zinc-300" />
-                                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">VER─░ ┼Ş─░FRELEME AKT─░F</span>
-                            </div>
-                        </div>
-                    </div>
-
-                    <form onSubmit={handleSubmit}>
-                        <div className="grid lg:grid-cols-12 gap-10">
-                            {/* Form Section */}
-                            <div className="lg:col-span-8 space-y-10">
-
-                                {/* Shipping Info */}
-                                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
-                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,rgba(255,255,255,0.06),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.60)_100%)]" />
-                                    <div className="relative z-10">
-                                        <div className="flex items-center gap-4 mb-8">
-                                            {checkoutCMS?.showStepLabels && (
-                                                <span className="text-2xl font-semibold text-white/40 tracking-tighter">01</span>
-                                            )}
-                                            <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
-                                                {checkoutCMS?.stepLabels?.shipping || "TESL─░MAT B─░LG─░LER─░"}
-                                            </h2>
-                                        </div>
-
-                                        <div className="grid sm:grid-cols-2 gap-6">
-                                            <div className="sm:col-span-2 space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">AD SOYAD *</label>
-                                                <input
-                                                    name="fullName"
-                                                    type="text"
-                                                    value={checkout.shipping.fullName}
-                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
-                                                    className={`w-full rounded-2xl bg-black/20 border px-4 py-3 text-white placeholder:text-white/35 outline-none transition ${formErrors.fullName ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/25' : 'border-white/10 focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25'}`}
-                                                    placeholder="John Doe"
-                                                />
-                                                {formErrors.fullName && <p className="text-xs font-semibold text-red-400 ml-1">{formErrors.fullName.toUpperCase()}</p>}
-                                            </div>
-
-                                            <div className="space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">E-POSTA *</label>
-                                                <input
-                                                    name="email"
-                                                    type="email"
-                                                    value={checkout.shipping.email}
-                                                    onChange={(e) => handleInputChange('email', e.target.value)}
-                                                    className={`w-full rounded-2xl bg-black/20 border px-4 py-3 text-white placeholder:text-white/35 outline-none transition ${formErrors.email ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/25' : 'border-white/10 focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25'}`}
-                                                    placeholder="john@example.com"
-                                                />
-                                                {formErrors.email && <p className="text-xs font-semibold text-red-400 ml-1">{formErrors.email.toUpperCase()}</p>}
-                                            </div>
-
-                                            <div className="space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">TELEFON *</label>
-                                                <input
-                                                    name="phone"
-                                                    type="tel"
-                                                    value={checkout.shipping.phone}
-                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
-                                                    className={`w-full rounded-2xl bg-black/20 border px-4 py-3 text-white placeholder:text-white/35 outline-none transition ${formErrors.phone ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/25' : 'border-white/10 focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25'}`}
-                                                    placeholder="05XX XXX XX XX"
-                                                />
-                                                {formErrors.phone && <p className="text-xs font-semibold text-red-400 ml-1">{formErrors.phone.toUpperCase()}</p>}
-                                            </div>
-
-                                            <div className="sm:col-span-2 space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">ADRES *</label>
-                                                <textarea
-                                                    name="address"
-                                                    value={checkout.shipping.address}
-                                                    onChange={(e) => handleInputChange('address', e.target.value)}
-                                                    className={`w-full min-h-[120px] rounded-2xl bg-black/20 border px-4 py-3 text-white placeholder:text-white/35 outline-none resize-none transition ${formErrors.address ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/25' : 'border-white/10 focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25'}`}
-                                                    placeholder="Sipari┼şinizin teslim edilece─şi a├ğ─▒k adres..."
-                                                />
-                                                {formErrors.address && <p className="text-xs font-semibold text-red-400 ml-1">{formErrors.address.toUpperCase()}</p>}
-                                            </div>
-
-                                            <div className="space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">─░L *</label>
-                                                <input
-                                                    name="city"
-                                                    type="text"
-                                                    value={checkout.shipping.city}
-                                                    onChange={(e) => handleInputChange('city', e.target.value)}
-                                                    className={`w-full rounded-2xl bg-black/20 border px-4 py-3 text-white placeholder:text-white/35 outline-none transition ${formErrors.city ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/25' : 'border-white/10 focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25'}`}
-                                                    placeholder="─░stanbul"
-                                                />
-                                                {formErrors.city && <p className="text-xs font-semibold text-red-400 ml-1">{formErrors.city.toUpperCase()}</p>}
-                                            </div>
-
-                                            <div className="space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">─░L├çE *</label>
-                                                <input
-                                                    name="district"
-                                                    type="text"
-                                                    value={checkout.shipping.district}
-                                                    onChange={(e) => handleInputChange('district', e.target.value)}
-                                                    className={`w-full rounded-2xl bg-black/20 border px-4 py-3 text-white placeholder:text-white/35 outline-none transition ${formErrors.district ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/25' : 'border-white/10 focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25'}`}
-                                                    placeholder="Kad─▒k├Ây"
-                                                />
-                                                {formErrors.district && <p className="text-xs font-semibold text-red-400 ml-1">{formErrors.district.toUpperCase()}</p>}
-                                            </div>
-
-                                            <div className="space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">POSTA KODU</label>
-                                                <input
-                                                    type="text"
-                                                    value={checkout.shipping.postalCode}
-                                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
-                                                    className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25"
-                                                    placeholder="34000"
-                                                />
-                                            </div>
-
-                                            <div className="space-y-2">
-                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">S─░PAR─░┼Ş NOTU</label>
-                                                <input
-                                                    type="text"
-                                                    value={checkout.shipping.notes}
-                                                    onChange={(e) => handleInputChange('notes', e.target.value)}
-                                                    className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25"
-                                                    placeholder="├ûrn: Kap─▒ya b─▒rak─▒n"
-                                                />
-                                            </div>
-                                        </div>
-                                    </div>
-                                </section>
-
-                                {/* Billing Info */}
-                                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
-                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,rgba(255,255,255,0.06),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.60)_100%)]" />
-                                    <div className="relative z-10">
-                                        <div className="flex items-center gap-4 mb-8">
-                                            {checkoutCMS?.showStepLabels && (
-                                                <span className="text-2xl font-semibold text-white/40 tracking-tighter">02</span>
-                                            )}
-                                            <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
-                                                {checkoutCMS?.stepLabels?.billing || "FATURA B─░LG─░LER─░"}
-                                            </h2>
-                                        </div>
-
-                                        <div className="flex gap-4 mb-8">
-                                            <button
-                                                type="button"
-                                                onClick={() => handleBillingTypeChange('individual')}
-                                                className={`flex-1 p-5 border rounded-2xl text-left transition-all relative overflow-hidden group ${checkout.billing.type === 'individual'
-                                                    ? 'border-[#d8b24c]/60 bg-[#d8b24c]/10 text-white'
-                                                    : 'border-white/10 bg-black/10 hover:border-white/20 text-white/50'
-                                                    }`}
-                                            >
-                                                <p className="font-black text-xs uppercase tracking-widest">B─░REYSEL</p>
-                                                <CheckCircle2 className={`absolute top-4 right-4 w-4 h-4 text-[#d8b24c] transition-opacity ${checkout.billing.type === 'individual' ? 'opacity-100' : 'opacity-0'}`} />
-                                            </button>
-                                            <button
-                                                type="button"
-                                                onClick={() => handleBillingTypeChange('company')}
-                                                className={`flex-1 p-5 border rounded-2xl text-left transition-all relative overflow-hidden group ${checkout.billing.type === 'company'
-                                                    ? 'border-[#d8b24c]/60 bg-[#d8b24c]/10 text-white'
-                                                    : 'border-white/10 bg-black/10 hover:border-white/20 text-white/50'
-                                                    }`}
-                                            >
-                                                <p className="font-black text-xs uppercase tracking-widest">KURUMSAL</p>
-                                                <CheckCircle2 className={`absolute top-4 right-4 w-4 h-4 text-[#d8b24c] transition-opacity ${checkout.billing.type === 'company' ? 'opacity-100' : 'opacity-0'}`} />
-                                            </button>
-                                        </div>
-
-                                        <AnimatePresence mode="wait">
-                                            {checkout.billing.type === 'company' && (
-                                                <m.div
-                                                    initial={{ opacity: 0, height: 0 }}
-                                                    animate={{ opacity: 1, height: 'auto' }}
-                                                    exit={{ opacity: 0, height: 0 }}
-                                                    className="grid sm:grid-cols-2 gap-6"
-                                                >
-                                                    <div className="sm:col-span-2 space-y-2">
-                                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">┼Ş─░RKET ├£NVANI</label>
-                                                        <input
-                                                            type="text"
-                                                            value={checkout.billing.companyName || ''}
-                                                            onChange={(e) => checkout.setBilling({ companyName: e.target.value })}
-                                                            className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25"
-                                                            placeholder="VERAL METAL A.┼Ş."
-                                                        />
-                                                    </div>
-                                                    <div className="space-y-2">
-                                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">VERG─░ DA─░RES─░</label>
-                                                        <input
-                                                            type="text"
-                                                            value={checkout.billing.taxOffice || ''}
-                                                            onChange={(e) => checkout.setBilling({ taxOffice: e.target.value })}
-                                                            className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25"
-                                                            placeholder="Bo─şazi├ği V.D."
-                                                        />
-                                                    </div>
-                                                    <div className="space-y-2">
-                                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/80 ml-1">VERG─░ NO / TC NO</label>
-                                                        <input
-                                                            type="text"
-                                                            value={checkout.billing.taxNumber || ''}
-                                                            onChange={(e) => checkout.setBilling({ taxNumber: e.target.value })}
-                                                            className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#d8b24c]/40 focus:ring-2 focus:ring-[#d8b24c]/25"
-                                                            placeholder="000 000 0000"
-                                                        />
-                                                    </div>
-                                                </m.div>
-                                            )}
-                                        </AnimatePresence>
-                                    </div>
-                                </section>
-                            </div>
-
-                            {/* Order Summary (Sticky) */}
-                            <div className="lg:col-span-4">
-                                <div className="sticky top-32 space-y-6">
-                                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
-                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,rgba(255,255,255,0.06),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.60)_100%)]" />
-                                        <div className="relative z-10">
-                                            <h2 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6 pb-4 border-b border-white/10">S─░PAR─░┼Ş ├ûZET─░</h2>
-
-                                            {/* Items List */}
-                                            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
-                                                {cart.items.map((item) => (
-                                                    <div key={item.id} className="flex gap-4 group">
-                                                        <div className="w-16 h-16 flex-shrink-0 bg-white/5 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center p-2">
-                                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-lighten transition-transform group-hover:scale-110" />
-                                                        </div>
-                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
-                                                            <p className="font-bold text-xs truncate text-white uppercase tracking-tight">{item.name}</p>
-                                                            <p className="text-xs text-white/55 font-semibold uppercase tracking-wider">{item.size} ├ù {item.quantity}</p>
-                                                            <p className="font-extrabold text-xs text-white mt-1">{formatPrice(item.price * item.quantity)}</p>
-                                                        </div>
-                                                    </div>
-                                                ))}
-                                            </div>
-
-                                            <div className="space-y-4 mb-8">
-                                                <div className="flex justify-between items-center">
-                                                    <span className="text-xs font-semibold text-white/65 uppercase tracking-wider">ARA TOPLAM</span>
-                                                    <span className="font-semibold text-sm text-white">{formatPrice(subtotal)}</span>
-                                                </div>
-                                                <div className="flex justify-between items-center">
-                                                    <span className="text-xs font-semibold text-white/65 uppercase tracking-wider">KARGO</span>
-                                                    {shipping === 0 ? (
-                                                        <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">├£CRETS─░Z</span>
-                                                    ) : (
-                                                        <span className="font-semibold text-sm text-white">{formatPrice(shipping)}</span>
-                                                    )}
-                                                </div>
-                                                {checkout.couponDiscount > 0 && (
-                                                    <div className="flex justify-between items-center">
-                                                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">─░ND─░R─░M</span>
-                                                        <span className="font-semibold text-sm text-emerald-400">-{formatPrice(checkout.couponDiscount)}</span>
-                                                    </div>
-                                                )}
-                                                <div className="h-[1px] bg-white/10 my-2" />
-                                                <div className="flex justify-between items-center text-3xl font-extrabold">
-                                                    <span className="text-white tracking-tighter uppercase">TOPLAM</span>
-                                                    <span className="text-white tracking-tighter">{formatPrice(total)}</span>
-                                                </div>
-                                            </div>
-
-                                            {checkout.error && (
-                                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
-                                                    <div className="flex gap-3">
-                                                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
-                                                        <p className="text-xs font-semibold text-red-400 uppercase tracking-wide leading-relaxed">{checkout.error}</p>
-                                                    </div>
-                                                </div>
-                                            )}
-
-                                            <Button
-                                                type="submit"
-                                                size="lg"
-                                                className="w-full rounded-2xl bg-[#d8b24c] text-black font-extrabold py-4 hover:brightness-105 active:brightness-95 transition flex items-center justify-center gap-3 group h-16"
-                                                disabled={checkout.isProcessing}
-                                            >
-                                                {checkout.isProcessing ? (
-                                                    <>
-                                                        <Loader2 className="w-5 h-5 animate-spin" />
-                                                        <span className="font-black tracking-widest uppercase text-xs">─░┼ŞLEN─░YOR...</span>
-                                                    </>
-                                                ) : (
-                                                    <>
-                                                        <span className="font-black tracking-widest uppercase text-xs">{checkoutCMS?.completeButtonText || "WHATSAPP'TA TAMAMLA"}</span>
-                                                        <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
-                                                            <ArrowRight className="w-4 h-4" />
-                                                        </div>
-                                                    </>
-                                                )}
-                                            </Button>
-
-                                            <div className="mt-6 text-xs text-white/55 text-center font-medium leading-relaxed uppercase tracking-wider">
-                                                {checkoutCMS?.legalText?.trim() ? (
-                                                    <span>{checkoutCMS.legalText}</span>
-                                                ) : (
-                                                    <>
-                                                        <span>Sipari┼şi tamamlayarak </span>
-                                                        <a href="/kosullar" className="underline">
-                                                            Sat─▒┼ş S├Âzle┼şmesi
-                                                        </a>
-                                                        <span>&apos;ni kabul etmi┼ş olursunuz.</span>
-                                                    </>
-                                                )}
-                                            </div>
-
-                                            {/* Trust Blocks */}
-                                            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6">
-                                                {checkoutCMS?.trustBlocks?.map((block: any, i: number) => (
-                                                    <div key={i} className="flex flex-col items-center gap-2">
-                                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
-                                                            <IconComponent name={block.icon} className="w-5 h-5 text-white" />
-                                                        </div>
-                                                        <span className="text-[8px] font-black text-white/55 uppercase tracking-widest text-center max-w-[80px] leading-tight">
-                                                            {block.title}
-                                                        </span>
-                                                    </div>
-                                                )) || (
-                                                        <div className="flex flex-col items-center gap-2">
-                                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
-                                                                <Lock className="w-4 h-4 text-emerald-400" />
-                                                            </div>
-                                                            <span className="text-[8px] font-black text-white/55 uppercase tracking-widest">G├£VENL─░ ├ûDEME</span>
-                                                        </div>
-                                                    )}
-                                            </div>
-                                        </div>
-                                    </div>
-                                </div>
-                            </div>
-                        </div>
-                    </form>
-                </div>
-            </main>
-            <Footer />
-        </>
-    );
+export default function OdemePage() {
+  if (!CART_ENABLED) redirect("/teklif-al");
+  redirect("/teklif-al");
 }
diff --git a/src/app/sepet/page.tsx b/src/app/sepet/page.tsx
index 865dafa..dc9273a 100644
--- a/src/app/sepet/page.tsx
+++ b/src/app/sepet/page.tsx
@@ -1,27 +1,7 @@
-"use client";
+´╗┐import { redirect } from "next/navigation";
+import { CART_ENABLED } from "@/lib/commerce";
 
-import { useEffect } from "react";
-import { useRouter } from "next/navigation";
-import { useCartStore } from "@/store/useCartStore";
-
-export default function CartPage() {
-    const router = useRouter();
-    const { isHydrated, setCartOpen } = useCartStore();
-
-    useEffect(() => {
-        if (isHydrated) {
-            // Premium deneyim i├ğin do─şrudan ana sayfaya y├Ânlendir ve sepeti a├ğ
-            router.replace("/");
-            setCartOpen(true);
-        }
-    }, [isHydrated, router, setCartOpen]);
-
-    return (
-        <div className="min-h-screen bg-white flex items-center justify-center">
-            <div className="flex flex-col items-center gap-4">
-                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
-                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Y├Ânlendiriliyorsunuz...</p>
-            </div>
-        </div>
-    );
+export default function SepetPage() {
+  if (!CART_ENABLED) redirect("/teklif-al");
+  redirect("/teklif-al");
 }
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
diff --git a/src/components/layout/Navigation.tsx b/src/components/layout/Navigation.tsx
index 6f22b5f..e7a05fc 100644
--- a/src/components/layout/Navigation.tsx
+++ b/src/components/layout/Navigation.tsx
@@ -1,6 +1,6 @@
-´╗┐"use client";
+"use client";
 
 import React, { useState, useEffect } from 'react';
 import Link from 'next/link';
 import Image from 'next/image';
 import { usePathname } from 'next/navigation';
@@ -12,10 +12,11 @@ import { m, AnimatePresence } from 'framer-motion';
 import { normalizeImagePath } from '@/lib/utils';
 import { useAdminStore } from '@/store/useAdminStore';
 import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
 import { usePerformanceDetection } from '@/hooks/usePerformanceDetection';
 import { useAuthStore } from '@/store/useAuthStore';
+import { CART_ENABLED } from '@/lib/commerce';
 
 export const Navigation = () => {
     const { content } = useContentStore();
     const [isScrolled, setIsScrolled] = useState(false);
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
@@ -207,22 +208,24 @@ export const Navigation = () => {
                                     aria-label="Arama a├ğ"
                                     className={`relative group p-1 sm:p-2 transition-all ${textColorClass} hover:text-industrial-gold`}
                                 >
                                     <Search className="w-4 h-4 sm:w-5 h-5" />
                                 </button>
-                                <button
-                                    onClick={() => setCartOpen(true)}
-                                    aria-label="Sepet"
-                                    className={`relative group p-1 sm:p-2 transition-all cursor-pointer z-50 ${textColorClass} hover:text-industrial-gold`}
-                                >
-                                    <ShoppingCart className="w-4 h-4 sm:w-5 h-5" />
-                                    {cartCount > 0 && (
-                                        <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-industrial-gold text-black text-[8px] sm:text-[9px] font-black flex items-center justify-center rounded-full pointer-events-none">
-                                            {cartCount}
-                                        </span>
-                                    )}
-                                </button>
+                                {CART_ENABLED && (
+                                    <button
+                                        onClick={() => setCartOpen(true)}
+                                        aria-label="Sepet"
+                                        className={`relative group p-1 sm:p-2 transition-all cursor-pointer z-50 ${textColorClass} hover:text-industrial-gold`}
+                                    >
+                                        <ShoppingCart className="w-4 h-4 sm:w-5 h-5" />
+                                        {cartCount > 0 && (
+                                            <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-industrial-gold text-black text-[8px] sm:text-[9px] font-black flex items-center justify-center rounded-full pointer-events-none">
+                                                {cartCount}
+                                            </span>
+                                        )}
+                                    </button>
+                                )}
                                 <Link
                                     href="/hesabim"
                                     aria-label="Hesab─▒m"
                                     className={`relative group p-1 sm:p-2 transition-all cursor-pointer z-50 ${textColorClass} hover:text-industrial-gold`}
                                 >
@@ -392,25 +395,27 @@ export const Navigation = () => {
                                     >
                                         {link.label}
                                     </Link>
                                 </m.div>
                             ))}
-                            <m.div
-                                initial={{ opacity: 0, x: 20 }}
-                                animate={{ opacity: 1, x: 0 }}
-                                transition={{ delay: 0.3 }}
-                            >
-                                <button
-                                    onClick={() => {
-                                        setIsMobileMenuOpen(false);
-                                        setCartOpen(true);
-                                    }}
-                                    className="text-left text-3xl font-black uppercase tracking-tight text-white hover:text-industrial-gold transition-colors"
+                            {CART_ENABLED && (
+                                <m.div
+                                    initial={{ opacity: 0, x: 20 }}
+                                    animate={{ opacity: 1, x: 0 }}
+                                    transition={{ delay: 0.3 }}
                                 >
-                                    Sepetim {cartCount > 0 ? `(${cartCount})` : ''}
-                                </button>
-                            </m.div>
+                                    <button
+                                        onClick={() => {
+                                            setIsMobileMenuOpen(false);
+                                            setCartOpen(true);
+                                        }}
+                                        className="text-left text-3xl font-black uppercase tracking-tight text-white hover:text-industrial-gold transition-colors"
+                                    >
+                                        Sepetim {cartCount > 0 ? `(${cartCount})` : ''}
+                                    </button>
+                                </m.div>
+                            )}
                             <m.div
                                 className="mt-8 pt-10 border-t border-industrial-gold/20"
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ delay: 0.4 }}
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
diff --git a/src/components/sections/Hero.tsx b/src/components/sections/Hero.tsx
index 7bbd280..871fd65 100644
--- a/src/components/sections/Hero.tsx
+++ b/src/components/sections/Hero.tsx
@@ -5,22 +5,19 @@ import Link from "next/link";
 import Image from "next/image";
 import { m } from 'framer-motion';
 import { ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useContentStore } from "@/store/useContentStore";
-import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";
 import { normalizeImagePath } from "@/lib/utils";
-import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";
 
 import { DirectEdit } from "@/components/admin/DirectEdit";
 import { TextInspector } from "@/components/admin/TextInspector";
 
 export const Hero = () => {
     const { content } = useContentStore();
-    const { shouldReduceVisuals } = usePerformanceDetection();
     const heroImage = normalizeImagePath(content.heroImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1587&auto=format&fit=crop");
-    const safeTitle = (content.heroTitle || "METAL TABLO &\nTENEKELERDE\nYEN─░ NES─░L\nDEKOR VE ├£RET─░M")
+    const safeTitle = (content.heroTitle || "DOSYA TEL─░\nSER─░ ─░MALAT")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/\n/g, "<br/>");
 
     return (
@@ -36,18 +33,18 @@ export const Hero = () => {
                                 transition={{ duration: 0.5 }}
                                 className="flex items-center gap-3"
                             >
                                 <span className="h-[3px] w-12 bg-industrial-gold" />
                                 <TextInspector label="Hero-Eyebrow">
-                                    <span className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-zinc-600">
-                                        {content.heroSubtitle || "Yerli ├╝retim metal tablolar, teneke ├╝r├╝nler ve ├Âzel bask─▒ ├ğ├Âz├╝mleri"}
+                                    <span className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-[#525252]">
+                                        {content.heroSubtitle || "─░zmir ÔÇö toptan dosya teli ve metal imalat"}
                                     </span>
                                 </TextInspector>
                             </m.div>
 
                             <m.h1
-                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tighter uppercase text-zinc-900 break-words font-syne italic drop-shadow-md animate-fade-in-up"
+                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight uppercase text-[#161616] break-words animate-fade-in-up"
                                 style={{ animationDelay: '0.1s' }}
                             >
                                 <TextInspector label="Hero-Headline">
                                     <span dangerouslySetInnerHTML={{ __html: safeTitle }} />
                                 </TextInspector>
@@ -55,133 +52,90 @@ export const Hero = () => {
 
                             <m.div
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.5, delay: 0.2 }}
-                                className="space-y-4"
+                                className="space-y-3 max-w-2xl"
                             >
-                                <div className="border-l-4 border-industrial-gold pl-5 py-1">
-                                    <TextInspector label="Hero-Tagline">
-                                        <p className="text-[#C49A2B] font-black tracking-[0.2em] uppercase text-lg md:text-xl leading-relaxed">
-                                            {content.heroTagline || "UV BASKI YEN─░ NES─░L TENEKE PLAKALAR. S─▒n─▒rs─▒z Tasar─▒m, ├£retim"}
-                                        </p>
-                                    </TextInspector>
-                                </div>
-                                <m.p
-                                    initial={{ opacity: 0 }}
-                                    animate={{ opacity: 1 }}
-                                    transition={{ duration: 0.6, delay: 0.4 }}
-                                    className="text-[#B38C27] font-black tracking-[0.12em] uppercase text-sm md:text-base leading-relaxed pl-1"
-                                >
-                                    Dosya Teli ÔÇö Takvim Tenekesi ÔÇö Teneke Tef Zil ÔÇö Retro Teneke Poster ÔÇö UV Bask─▒l─▒ ├ûzel ─░malat ├£r├╝nler
-                                </m.p>
+                                <TextInspector label="Hero-Tagline">
+                                    <p className="text-[#525252] text-base md:text-lg leading-relaxed">
+                                        {content.heroProductLine || "├ûl├ğ├╝ netle┼şir, termin konu┼şulur, sevkiyat planlan─▒r."}
+                                    </p>
+                                </TextInspector>
                             </m.div>
 
                             <m.div
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.5, delay: 0.3 }}
-                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full"
+                                className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 w-full"
                             >
                                 <Button
                                     asChild
                                     size="lg"
-                                    className="h-14 px-8 sm:px-10 text-[13px] sm:text-[14px] font-black tracking-[0.18em] sm:tracking-[0.24em] uppercase rounded-none bg-industrial-gold hover:bg-industrial-gold-muted transition-all duration-300 w-full sm:w-auto justify-center shadow-[4px_4px_0px_0px_rgba(212,175,55,0.4)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-black"
+                                    className="h-12 px-8 text-sm font-bold tracking-wide rounded-none bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-muted)] transition-colors w-full sm:w-auto justify-center text-white"
                                 >
-                                    <Link href={content.heroButton1Url || "/urunler"}>
-                                        <span className="flex items-center gap-3">
-                                            {content.heroButton1Text || "├£r├╝n├╝ ─░ncele"}
-                                            <ArrowRight className="w-5 h-5" />
+                                    <Link href={content.heroButton1Url || "/teklif-al"}>
+                                        <span className="flex items-center gap-2">
+                                            {content.heroButton1Text || "Teklif Al"}
+                                            <ArrowRight className="w-4 h-4" />
                                         </span>
                                     </Link>
                                 </Button>
-
-                                <Button
-                                    asChild
-                                    variant="outline"
-                                    size="lg"
-                                    className="h-14 px-8 sm:px-10 text-[13px] sm:text-[14px] font-black tracking-[0.18em] sm:tracking-[0.24em] uppercase rounded-none border-2 border-industrial-gold/40 bg-transparent text-industrial-gold hover:bg-industrial-gold hover:text-black transition-all duration-300 w-full sm:w-auto justify-center shadow-[4px_4px_0px_0px_rgba(212,175,55,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
+                                <Link
+                                    href="/#hizmetler"
+                                    className="text-sm font-semibold text-[#525252] hover:text-[var(--color-brand-accent)] transition-colors underline-offset-4 hover:underline"
                                 >
-                                    <Link href={content.heroButton2Url || "/urunler"}>
-                                        {content.heroButton2Text || "KATALOG"}
-                                    </Link>
-                                </Button>
+                                    ├£retim hatlar─▒n─▒ incele
+                                </Link>
                             </m.div>
 
-                            <m.div
+                            {(content.metalShowcaseTrustBadges || []).length > 0 && (
+                            <m.ul
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ duration: 0.5, delay: 0.4 }}
-                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 pt-6 border-t border-white/5"
+                                className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-6 border-t border-[#c6c6c6] text-sm text-[#525252] list-none"
                             >
-                                {(content.metalShowcaseTrustBadges || []).slice(0, 4).map((badge, index) => (
-                                    <TrustItem key={index} iconName={badge.icon} text={badge.text} />
+                                {(content.metalShowcaseTrustBadges || []).slice(0, 3).map((badge, index) => (
+                                    <li key={index} className="flex items-center gap-2">
+                                        <span className="text-[var(--color-brand-accent)]">┬À</span>
+                                        {badge.text}
+                                    </li>
                                 ))}
-                                {(!content.metalShowcaseTrustBadges || content.metalShowcaseTrustBadges.length === 0) && (
-                                    <>
-                                        <TrustItem iconName="Zap" text="H─▒zl─▒ ├£retim" />
-                                        <TrustItem iconName="Award" text="+44 Y─▒l Deneyim" />
-                                        <TrustItem iconName="ShieldCheck" text="Premium Kalite" />
-                                        <TrustItem iconName="Clock" text="7/24 Destek" />
-                                    </>
-                                )}
-                            </m.div>
+                            </m.ul>
+                            )}
                         </div>
 
                         {/* Right Column: Visual */}
                         <div
                             className="col-span-12 lg:col-span-5 relative w-full min-w-0"
                         >
-                            <Link href="/urunler" className="group block">
-                                <div className="relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5] bg-gray-100/80 w-full shadow-2xl rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
+                            <Link href="/hizmetler/dosya-teli" className="block">
+                                <div className="relative aspect-[4/5] bg-[#f4f4f4] w-full border border-[#c6c6c6] overflow-hidden">
                                     <Image
                                         src={heroImage}
-                                        alt="Industrial Metal Production"
+                                        alt="Toptan dosya teli seri imalat─▒"
                                         fill
                                         className="object-cover"
                                         priority
                                         fetchPriority="high"
                                         sizes="(min-width:1280px) 560px, (min-width:1024px) 480px, (min-width:768px) 60vw, 94vw"
                                         quality={55}
                                     />
-                                    <m.div
-                                        initial={{ opacity: 0, scale: 1.1 }}
-                                        animate={{ opacity: 1, scale: 1 }}
-                                        transition={{ delay: 1, duration: 1 }}
-                                        className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none"
-                                    />
-                                    {/* Hover Overlay */}
-                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                 </div>
                             </Link>
                             <m.div
-                                whileHover={{ x: 10, y: -10 }}
-                                className="mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 bg-zinc-900 p-6 shadow-[0_0_40px_rgba(212,175,55,0.15)] border-l-8 border-industrial-gold z-20 w-full max-w-[280px] cursor-pointer transition-shadow hover:shadow-[0_0_60px_rgba(212,175,55,0.25)]"
+                                whileHover={{ x: 4, y: -4 }}
+                                className="mt-6 lg:mt-0 lg:absolute lg:-bottom-4 lg:-left-4 bg-white p-5 border border-[#c6c6c6] border-l-4 border-l-[var(--color-brand-accent)] z-20 w-full max-w-[260px]"
                             >
-                                <div className="text-xs font-black uppercase tracking-widest text-zinc-300 mb-2">Technical Specs</div>
-                                <div className="text-4xl font-black text-white font-syne italic">0.30<span className="text-sm align-top ml-1">mm</span></div>
-                                <div className="text-sm font-bold text-zinc-200 mt-2">Industrial Grade Steel</div>
+                                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#525252] mb-1">Toptan MOQ</div>
+                                <div className="text-3xl font-black text-[#161616]">Seri ─░malat</div>
+                                <div className="text-sm text-[#525252] mt-1">├ûzel ├Âl├ğ├╝ dosya teli</div>
                             </m.div>
                         </div>
                     </div>
                 </div>
             </section>
         </DirectEdit>
     );
 };
-
-
-
-const TrustItem = ({ iconName, text }: { iconName: string, text: string }) => (
-    <div className="rounded-2xl border border-zinc-700 bg-zinc-800/70 backdrop-blur-sm p-5 md:p-6 flex flex-col items-start gap-3 hover:border-industrial-gold/50 transition-all duration-300 group/trust">
-        <div className="p-3 bg-zinc-700 rounded-lg group-hover/trust:bg-industrial-gold/20 transition-colors">
-            <DynamicLucideIcon
-                name={iconName}
-                fallbackName="shield-check"
-                className="w-8 h-8 md:w-10 md:h-10 text-industrial-gold"
-            />
-        </div>
-        <span className="text-sm md:text-base font-black uppercase tracking-wide leading-tight text-zinc-100">
-            {text}
-        </span>
-    </div>
-);
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
diff --git a/src/components/sections/ServicesHomeSection.tsx b/src/components/sections/ServicesHomeSection.tsx
new file mode 100644
index 0000000..67a5df2
--- /dev/null
+++ b/src/components/sections/ServicesHomeSection.tsx
@@ -0,0 +1,81 @@
+´╗┐"use client";
+
+import Link from "next/link";
+import { ArrowUpRight } from "lucide-react";
+import { useContentStore } from "@/store/useContentStore";
+import { DirectEdit } from "@/components/admin/DirectEdit";
+import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";
+
+export const ServicesHomeSection = () => {
+    const { content } = useContentStore();
+    const header = content.servicesPageHeader;
+    const services = (content.services || [])
+        .filter((s) => s.isActive !== false)
+        .sort((a, b) => a.order - b.order);
+
+    return (
+        <DirectEdit tab="other-services">
+            <section
+                id="hizmetler"
+                className="min-h-[90vh] flex flex-col justify-center py-20 lg:py-28 scroll-mt-24"
+            >
+                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
+                    <div className="mb-14 lg:mb-20 max-w-3xl">
+                        <p className="text-sm font-mono font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
+                            {header?.badge || "├£retim hizmetleri"}
+                        </p>
+                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#161616] leading-[1.05] mb-5">
+                            {header?.title || "├£retim Hizmetlerimiz"}
+                        </h2>
+                        <p className="text-lg md:text-xl text-[#525252] leading-relaxed">
+                            {header?.subtitle || "Dosya teli, takvim tenekesi, tef zili ve metal poster ÔÇö ├Âl├ğ├╝ye g├Âre."}
+                        </p>
+                    </div>
+
+                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
+                        {services.map((service, index) => (
+                            <Link
+                                key={service.id}
+                                href={`/hizmetler/${service.slug}`}
+                                className="group relative flex flex-col min-h-[220px] lg:min-h-[260px] p-8 lg:p-10 bg-white border border-[#c6c6c6] border-l-4 border-l-transparent hover:border-l-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-[border-color] duration-300"
+                            >
+                                <div className="flex items-start justify-between gap-4 mb-8">
+                                    <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#f4f4f4] text-[var(--color-brand-accent)] group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-colors duration-300">
+                                        <DynamicLucideIcon
+                                            name={service.icon}
+                                            fallbackName="settings"
+                                            className="w-8 h-8 lg:w-10 lg:h-10"
+                                        />
+                                    </div>
+                                    <span className="text-xs font-mono font-semibold text-[#a8a8a8] tabular-nums">
+                                        {String(index + 1).padStart(2, "0")}
+                                    </span>
+                                </div>
+
+                                <h3 className="text-2xl lg:text-3xl font-bold text-[#161616] mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors leading-tight">
+                                    {service.title}
+                                </h3>
+                                <p className="text-base lg:text-lg text-[#525252] leading-relaxed flex-1">
+                                    {service.shortDescription}
+                                </p>
+
+                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-accent)]">
+                                    Detayl─▒ incele
+                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
+                                </div>
+                            </Link>
+                        ))}
+                    </div>
+
+                    <p className="mt-12 text-base text-[#525252]">
+                        Toptan fiyat i├ğin{" "}
+                        <Link href="/teklif-al" className="font-semibold text-[var(--color-brand-accent)] hover:underline underline-offset-4">
+                            teklif formunu doldurun
+                        </Link>
+                        .
+                    </p>
+                </div>
+            </section>
+        </DirectEdit>
+    );
+};
diff --git a/src/lib/commerce.ts b/src/lib/commerce.ts
new file mode 100644
index 0000000..3156544
--- /dev/null
+++ b/src/lib/commerce.ts
@@ -0,0 +1,2 @@
+/** Storefront cart/checkout. Keep false until ecommerce returns. */
+export const CART_ENABLED = false as const;
diff --git a/src/lib/contact.ts b/src/lib/contact.ts
new file mode 100644
index 0000000..1182f92
--- /dev/null
+++ b/src/lib/contact.ts
@@ -0,0 +1,40 @@
+import { buildWhatsAppUrl, normalizeWhatsappNumber } from "@/lib/whatsapp";
+
+export const DEFAULT_FOOTER_PHONE = "+90 507 165 13 15";
+export const DEFAULT_WHATSAPP_NUMBER = "905071651315";
+export const DEFAULT_WHATSAPP_MESSAGE =
+  "Merhaba, toptan dosya teli / imalat teklifi almak istiyorum.";
+
+export function normalizePhoneDigits(raw: string): string {
+  return String(raw || "").replace(/\D/g, "");
+}
+
+export function toTelHref(phone: string): string {
+  const digits = normalizePhoneDigits(phone);
+  if (!digits) return "tel:+905071651315";
+  const withCountry = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
+  return `tel:+${withCountry}`;
+}
+
+export function buildProductWhatsAppUrl(opts: {
+  whatsappNumber: string;
+  productName?: string;
+  baseMessage?: string;
+}): string {
+  const base = opts.baseMessage || DEFAULT_WHATSAPP_MESSAGE;
+  const message = opts.productName
+    ? `${base}\n├£r├╝n: ${opts.productName}`
+    : base;
+  return buildWhatsAppUrl({
+    phoneNumber: opts.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
+    message,
+  });
+}
+
+export function resolveFooterPhone(footerPhone?: string | null): string {
+  return footerPhone?.trim() || DEFAULT_FOOTER_PHONE;
+}
+
+export function resolveWhatsappNumber(whatsappNumber?: string | null): string {
+  return normalizeWhatsappNumber(whatsappNumber || DEFAULT_WHATSAPP_NUMBER) || DEFAULT_WHATSAPP_NUMBER;
+}
diff --git a/src/store/useContentStore.ts b/src/store/useContentStore.ts
index 5f8c408..c23d5c7 100644
--- a/src/store/useContentStore.ts
+++ b/src/store/useContentStore.ts
@@ -1,6 +1,6 @@
-import { create } from "zustand";
+´╗┐import { create } from "zustand";
 import { persist } from "zustand/middleware";
 import { ContentService } from "@/lib/supabase/content.service";
 import { upsertAdminContent } from "@/actions/admin";
 
 export interface SiteContent {
@@ -19,10 +19,11 @@ export interface SiteContent {
     heroImages: string[];
     heroButton1Text: string;
     heroButton1Url: string;
     heroButton2Text: string;
     heroButton2Url: string;
+    heroProductLine: string;
     heroStats: { value: string; label: string }[];
 
     // ===== FEATURES SECTION =====
     featuresTitle: string;
     featuresSubtitle: string;
@@ -404,10 +405,11 @@ interface ContentStore {
     cat_remove: (index: number) => void;
 
     // Supabase Sync Methods
     fetchContent: () => Promise<void>;
     saveToSupabase: () => Promise<boolean>;
+    resetToManufacturingDefaults: () => Promise<boolean>;
 
     // Typography Actions
     updateTypography: (id: string, styles: any) => void;
 }
 
@@ -532,16 +534,16 @@ export const defaultContent: SiteContent = {
             isActive: true
         }
     ],
 
     servicesPageHeader: {
-        title: 'End├╝striyel Hizmetlerimiz',
-        subtitle: 'Teneke ve Torna sekt├Âr├╝nde 44 y─▒ll─▒k tecr├╝bemizi yans─▒t─▒yoruz.',
-        badge: 'VERAL ÔÇö METAL ─░┼ŞLEME & ├£RET─░M MERKEZ─░',
-        intro: 'Metal i┼şleme ve tasar─▒mda 20 y─▒ll─▒k tecr├╝be ile kurumsal ├ğ├Âz├╝mler.',
-        ctaTitle: 'PROJEN─░Z ─░├ç─░N TEKN─░K\nTEKL─░F ALMAK ─░STER M─░S─░N─░Z?',
-        ctaDescription: 'Teknik ├ğizimleriniz ekibimiz taraf─▒ndan incelenir ve 24 saat i├ğinde detayland─▒r─▒lm─▒┼ş fiyatland─▒rma taraf─▒n─▒za iletilir.',
+        title: '├£retim Hizmetlerimiz',
+        subtitle: 'Dosya teli, takvim tenekesi, tef zili ve metal poster ÔÇö ├Âl├ğ├╝ye g├Âre.',
+        badge: '├£retim hizmetleri',
+        intro: 'Seri imalat hatlar─▒m─▒zda ├Âl├ğ├╝ ve miktar netle┼şir, termin konu┼şulur.',
+        ctaTitle: 'Toptan sipari┼ş i├ğin teklif al─▒n',
+        ctaDescription: '├ûl├ğ├╝ ve miktar bilgileriniz incelenir; 24 saat i├ğinde fiyatland─▒rma iletilir.',
         ctaButtonText: 'TEKL─░F ─░STE',
         ctaButtonLink: '/teklif-al',
     },
 
     // Page Settings Defaults (Common paths)
@@ -557,12 +559,12 @@ export const defaultContent: SiteContent = {
         darkPaths: ['/urunler', '/teklif-al', '/siparis-sorgula', '/product', '/metal-tablolar']
     },
 
 
     // Hero
-    heroTitle: "METAL─░N D─░J─░TAL\nD├ûN├£┼Ş├£M├£",
-    heroSubtitle: "Veral standartlar─▒nda 0.30mm end├╝striyel teneke, y├╝ksek ├ğ├Âz├╝n├╝rl├╝kl├╝ UV bask─▒.",
+    heroTitle: "├ûZEL & SER─░\nDOSYA TEL─░",
+    heroSubtitle: "─░zmir ÔÇö toptan dosya teli ve metal imalat",
     heroTagline: "0.30MM TENEKE // Y├£KSEK ├ç├ûZ├£N├£RL├£K // UV AKTARIM",
     heroPrice: "199 TL",
     heroImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop",
     heroImages: [
         "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop",
@@ -571,10 +573,11 @@ export const defaultContent: SiteContent = {
     ],
     heroButton1Text: "├£RET─░M HATTINI KE┼ŞFET",
     heroButton1Url: "/#process",
     heroButton2Text: "KATALO─ŞA G─░T",
     heroButton2Url: "/urunler",
+    heroProductLine: "├ûl├ğ├╝ netle┼şir, termin konu┼şulur, sevkiyat planlan─▒r.",
     heroStats: [
         { value: "24-48s", label: "TESL─░MAT" },
         { value: "1.5mm", label: "METAL" },
         { value: "4K UV", label: "BASKI" }
     ],
@@ -721,13 +724,13 @@ export const defaultContent: SiteContent = {
     // Metal Showcase
     metalShowcaseTitle: "Metal Art Atelier",
     metalShowcaseSubtitle: "End├╝striyel kalite. Sanatsal tasar─▒m. Tel, etiket ve m─▒knat─▒s ├ğ├Âz├╝mlerinde g├╝venilir partneriniz.",
     metalShowcaseHeroImage: "",
     metalShowcaseTrustBadges: [
-        { icon: "Zap", text: "H─▒zl─▒ ├£retim" },
-        { icon: "Shield", text: "10 Y─▒l Garanti" },
-        { icon: "Award", text: "Premium Kalite" }
+        { icon: "Factory", text: "Seri ─░malat" },
+        { icon: "Clock", text: "24s Teklif" },
+        { icon: "PackageCheck", text: "Toptan MOQ" },
     ],
     metalShowcaseItems: [
         {
             title: "DOSYA TEL─░",
             desc: "END├£STR─░YEL SINIF SAC TEL. Y├£KSEK GER─░L─░M D─░RENC─░ VE HASSAS B├£K├£M.",
@@ -1194,10 +1197,26 @@ export const useContentStore = create<ContentStore>()(
                 const { content } = get();
                 const result = await upsertAdminContent(content);
                 return result.success;
             },
 
+            resetToManufacturingDefaults: async () => {
+                const { content } = get();
+                const savedHeroImage = content.heroImage;
+                const updatedContent = {
+                    ...content,
+                    heroSubtitle: defaultContent.heroSubtitle,
+                    heroProductLine: defaultContent.heroProductLine,
+                    servicesPageHeader: defaultContent.servicesPageHeader,
+                    metalShowcaseTrustBadges: defaultContent.metalShowcaseTrustBadges,
+                    heroImage: savedHeroImage,
+                };
+                set({ content: updatedContent });
+                const result = await upsertAdminContent(updatedContent);
+                return result.success;
+            },
+
             updateTypography: (id: string, styles: any) => {
                 set((state) => ({
                     content: {
                         ...state.content,
                         typographyOverrides: {
@@ -1211,11 +1230,11 @@ export const useContentStore = create<ContentStore>()(
                 }));
             },
         }),
         {
             name: "site-content-storage",
-            version: 11,
+            version: 19,
             migrate: (persistedState: any, version: number) => {
                 const newState = { ...persistedState };
                 if (version < 11) {
                     newState.content = {
                         ...defaultContent,
@@ -1242,10 +1261,22 @@ export const useContentStore = create<ContentStore>()(
                             ...defaultContent.checkoutPage,
                             ...(newState.content?.checkoutPage || {})
                         },
                     };
                 }
+                if (version < 19) {
+                    const savedHeroImage = newState.content?.heroImage;
+                    newState.content = {
+                        ...defaultContent,
+                        ...newState.content,
+                        heroProductLine: newState.content?.heroProductLine || defaultContent.heroProductLine,
+                        metalShowcaseTrustBadges: newState.content?.metalShowcaseTrustBadges || defaultContent.metalShowcaseTrustBadges,
+                    };
+                    if (savedHeroImage) {
+                        newState.content.heroImage = savedHeroImage;
+                    }
+                }
                 return newState;
             },
         }
     )
 );
```
