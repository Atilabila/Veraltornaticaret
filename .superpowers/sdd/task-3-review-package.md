# Review Package Task 3 re-review
Base: 20b1543e5898382a1dee0090b1d26052f41a655a
Head: f8babc4b414aba3761a6df67e00d15326db450b9

## Commits
f8babc4 fix: isolate navigation cart gate from unrelated nav edits
8910040 feat: hide navigation cart controls when cart disabled

## Stat
 src/components/layout/Navigation.tsx | 59 +++++++++++++++++++-----------------
 1 file changed, 32 insertions(+), 27 deletions(-)

## Diff
```diff
diff --git a/src/components/layout/Navigation.tsx b/src/components/layout/Navigation.tsx
index 6f22b5f..e7a05fc 100644
--- a/src/components/layout/Navigation.tsx
+++ b/src/components/layout/Navigation.tsx
@@ -1,24 +1,25 @@
-´╗┐"use client";
+"use client";
 
 import React, { useState, useEffect } from 'react';
 import Link from 'next/link';
 import Image from 'next/image';
 import { usePathname } from 'next/navigation';
 import { Search, ShoppingCart, User, Menu, X, Hammer } from 'lucide-react';
 import { useCartItemCount, useCartStore } from '@/store/useCartStore';
 import { useContentStore } from '@/store/useContentStore';
 import { useThemeDetection } from '@/hooks/useThemeDetection';
 import { m, AnimatePresence } from 'framer-motion';
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
     const [isMobileViewport, setIsMobileViewport] = useState(false);
     const cartCount = useCartItemCount();
     const setCartOpen = useCartStore((state) => state.setCartOpen);
@@ -204,28 +205,30 @@ export const Navigation = () => {
                             <div className="flex items-center gap-1 sm:gap-4 md:gap-5">
                                 <button
                                     onClick={() => setIsSearchOpen(true)}
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
                                     <User className="w-4 h-4 sm:w-5 h-5" />
                                 </Link>
                                 <button
@@ -389,31 +392,33 @@ export const Navigation = () => {
                                         onClick={() => setIsMobileMenuOpen(false)}
                                         className={`text-4xl sm:text-5xl font-black uppercase tracking-tight transition-colors 
                                         ${link.isPrimary ? 'text-industrial-gold' : 'text-white hover:text-industrial-gold'}`}
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
                             >
                                 <Link href="/hesabim" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full h-20 bg-industrial-gold text-black font-black uppercase tracking-widest text-lg shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)]">
                                     {user ? 'HESABIM' : 'G─░R─░┼Ş YAP'}
```
