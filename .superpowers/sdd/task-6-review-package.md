# Review Package Task 6
Base: 1e034ca1a24ee5b71ada9d9cdd38d017b8814688
Head: 786ec6f320660ab886080cb01e0a50d9f449df16

## Commits
786ec6f feat: quiet services section defaults and border rhythm

## Stat
 src/components/sections/ServicesHomeSection.tsx | 81 +++++++++++++++++++++++++
 src/store/useContentStore.ts                    | 31 +++++++---
 2 files changed, 105 insertions(+), 7 deletions(-)

## Diff
```diff
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
diff --git a/src/store/useContentStore.ts b/src/store/useContentStore.ts
index 4c5a955..c23d5c7 100644
--- a/src/store/useContentStore.ts
+++ b/src/store/useContentStore.ts
@@ -1,9 +1,9 @@
-import { create } from "zustand";
+´╗┐import { create } from "zustand";
 import { persist } from "zustand/middleware";
 import { ContentService } from "@/lib/supabase/content.service";
 import { upsertAdminContent } from "@/actions/admin";
 
 export interface SiteContent {
     // ... (existing interface lines remain same)
     // ===== BRANDING =====
     headerLogo: string;
@@ -402,16 +402,17 @@ interface ContentStore {
     nav_reorder: (newOrder: SiteContent["menuItems"]) => void;
     cat_update: (index: number, item: SiteContent["productCategories"][0]) => void;
     cat_add: () => void;
     cat_remove: (index: number) => void;
 
     // Supabase Sync Methods
     fetchContent: () => Promise<void>;
     saveToSupabase: () => Promise<boolean>;
+    resetToManufacturingDefaults: () => Promise<boolean>;
 
     // Typography Actions
     updateTypography: (id: string, styles: any) => void;
 }
 
 export const defaultContent: SiteContent = {
     // Branding
     headerLogo: "/logo.svg",
@@ -530,22 +531,22 @@ export const defaultContent: SiteContent = {
             ctaTitle: 'Kendi Tasar─▒m─▒n─▒ Bast─▒r',
             ctaLabel: '┼Şimdi Olu┼ştur',
             order: 4,
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
     pageSettings: [
         { path: '/', theme: 'dark', headerModeOverride: 'inherit', gridOverride: 'inherit' },
         { path: '/urunler', theme: 'dark', headerModeOverride: 'inherit', gridOverride: 'inherit' },
@@ -1193,16 +1194,32 @@ export const useContentStore = create<ContentStore>()(
             },
 
             saveToSupabase: async () => {
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
                             ...(state.content.typographyOverrides || {}),
                             [id]: {
                                 ...(state.content.typographyOverrides?.[id] || {}),
```
