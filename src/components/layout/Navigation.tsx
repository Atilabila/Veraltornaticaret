"use client";

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

export const Navigation = () => {
    const { content } = useContentStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const cartCount = useCartItemCount();
    const setCartOpen = useCartStore((state) => state.setCartOpen);
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const setAdmin = useAdminStore((state) => state.setAdmin);
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const { shouldReduceVisuals } = usePerformanceDetection();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        const handleResize = () => {
            setIsMobileViewport(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });

        const checkAuth = async () => {
            if (isAdmin) return;
            const supabase = createBrowserSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setAdmin(true);
        };
        checkAuth();

        // Start background sync service
        const initSync = async () => {
            try {
                if (isAdmin) return;
                const { startBackgroundSync } = await import('@/lib/sync/syncService');
                startBackgroundSync();
            } catch (error) {
                console.error('[SYNC] Failed to initialize sync service:', error);
            }
        };
        initSync();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isAdmin, setAdmin]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isMobileMenuOpen]);


    const activeLinks = (content.menuItems || []).length > 0
        ? (content.menuItems || []).filter(item => item.visible && item.url !== '/metal-urunler').sort((a, b) => a.order - b.order)
        : [
            { id: 'f1', label: 'Katalog', url: '/urunler', isPrimary: false },
            { id: 'f2', label: 'Hakkımızda', url: '/hakkimizda', isPrimary: false },
            { id: 'f4', label: 'Teklif Al', url: '/teklif-al', isPrimary: true },
        ]; // Fallback while loading or if empty

    const { isDarkPage, headerMode } = useThemeDetection();

    const config = content.headerConfig || {
        logoLight: "/logo-white.svg",
        logoDark: "/logo.svg",
        mode: 'translucent',
        transparency: 90,
        blur: 12, // Default blur
        showBorder: true,
        shadow: 'none',
        ctaText: "TEKLİF AL",
        ctaLink: "/teklif-al",
        announcementActive: false
    };

    const effectiveMode = headerMode !== 'inherit' ? headerMode : config.mode;
    const isTranslucentMode = effectiveMode === 'translucent';

    const headerBgOpacity = isScrolled ? 1 : (isTranslucentMode ? config.transparency / 100 : 0);

    const isTextWhite =
        effectiveMode === 'light' ||
        (effectiveMode !== 'dark' && (isScrolled || isTranslucentMode || isDarkPage));

    const textColorClass = isTextWhite ? 'text-white' : 'text-[#0A0A0A]';
    const logoSrc = normalizeImagePath((isTextWhite ? config.logoLight : config.logoDark) || "/veral-logo.webp");
    const borderColor = isTextWhite ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const enableFx = !isMobileViewport; // kill heavy filters on mobile to reduce jank
    const blurValue = enableFx && (isScrolled || isTranslucentMode || effectiveMode === 'light' || effectiveMode === 'dark')
        ? Math.min(config.blur || 12, 8)
        : 0;

    return (
        <>
            <header
                className="fixed top-0 z-[100] w-full transition-[background-color,backdrop-filter,border-bottom,box-shadow,transform] duration-500"
                style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'background-color, backdrop-filter',
                    backgroundColor:
                        (isScrolled || isTranslucentMode || effectiveMode === 'light') ? `rgba(10, 10, 10, ${headerBgOpacity})` :
                            (effectiveMode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'transparent'),
                    backdropFilter: blurValue > 0 ? `blur(${blurValue}px)` : 'none',
                    borderBottom: (config.showBorder && (isScrolled || isTranslucentMode || effectiveMode === 'light' || effectiveMode === 'dark')) ? `1px solid ${borderColor}` : 'none',
                    boxShadow: enableFx
                        ? (isScrolled
                            ? '0 10px 40px rgba(0,0,0,0.3)'
                            : (config.shadow !== 'none' && (isTranslucentMode || effectiveMode !== 'auto')
                                ? `0 4px 20px rgba(0,0,0,${config.shadow === 'sm' ? 0.1 : config.shadow === 'md' ? 0.2 : 0.3})`
                                : 'none'))
                        : 'none'
                }}
            >
                {config.announcementActive && config.announcementText && (
                    <div className="bg-[#D4AF37] text-black text-[10px] font-bold py-1 text-center tracking-widest uppercase">
                        <Link href={config.announcementLink || '#'}>
                            {config.announcementText}
                        </Link>
                    </div>
                )}

                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className={`flex items-center justify-between transition-all duration-500 ${config.announcementActive ? (isScrolled ? 'py-2' : 'py-3') : (isScrolled ? 'py-3' : 'py-4 md:py-5')
                        }`}>
                        <div className="flex items-center gap-3 sm:gap-8 lg:gap-16 min-w-0 sm:min-w-[280px] lg:min-w-[320px]">
                            <m.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
                                    <div className={`transition-all duration-500 flex-shrink-0 relative ${isScrolled ? 'h-7 w-7 md:h-10 md:w-10' : 'h-8 w-8 md:h-12 md:w-12'
                                        }`}>
                                        <Image
                                            src={logoSrc}
                                            alt={content.siteName || "VERAL"}
                                            fill
                                            sizes="(max-width: 768px) 56px, 80px"
                                            className="object-contain transition-all duration-500"
                                            priority
                                            quality={70}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className={`font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-industrial-gold transition-all duration-500 ${isScrolled ? 'text-sm md:text-lg' : 'text-base md:text-xl'
                                            }`}>
                                            {content.siteName || "VERAL"}
                                        </h2>
                                        <span className={`text-[6px] md:text-[8px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase -mt-0.5 transition-all duration-500 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
                                            } ${isTextWhite ? 'text-white/80' : 'text-black/60'}`}>Torna & Teneke Ti̇caret</span>
                                    </div>
                                </Link>
                            </m.div>
                        </div>

                        {/* Utils - Improved spacing and alignment */}
                        <div className="flex items-center gap-1 sm:gap-6 md:gap-8">
                            {/* Control Buttons - Icon cluster with intentional spacing */}
                            <div className="flex items-center gap-1 sm:gap-4 md:gap-5">
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    aria-label="Arama aç"
                                    className={`relative group p-1 sm:p-2 transition-all ${textColorClass} hover:text-industrial-gold`}
                                >
                                    <Search className="w-4 h-4 sm:w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCartOpen(true)}
                                    aria-label="Sepet"
                                    className={`relative group p-1 sm:p-2 transition-all cursor-pointer z-50 ${textColorClass} hover:text-industrial-gold`}
                                >
                                    <ShoppingCart className="w-4 h-4 sm:w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-industrial-gold text-black text-[8px] sm:text-[9px] font-black flex items-center justify-center rounded-full pointer-events-none">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                                <Link
                                    href="/hesabim"
                                    aria-label="Hesabım"
                                    className={`relative group p-1 sm:p-2 transition-all cursor-pointer z-50 ${textColorClass} hover:text-industrial-gold`}
                                >
                                    <User className="w-4 h-4 sm:w-5 h-5" />
                                </Link>
                                <button
                                    className={`p-2 transition-all ${textColorClass}`}
                                    aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>

                            <m.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={config.ctaLink || "/teklif-al"}
                                    className={`hidden sm:flex items-center justify-center border border-industrial-gold text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-industrial-gold hover:bg-industrial-gold hover:text-black transition-all duration-500 leading-none ${isScrolled
                                        ? 'px-3 h-10 sm:px-4 sm:h-10 md:px-6 md:h-12'
                                        : 'px-3 h-10 sm:px-6 sm:h-12 md:px-8 md:h-12'
                                        }`}
                                >
                                    {config.ctaText || "TEKLİF AL"}
                                </Link>
                            </m.div>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isSearchOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100000] flex items-start justify-center pt-[10vh] px-6"
                    >
                        {/* Backdrop with Blur */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                            onClick={() => setIsSearchOpen(false)}
                        />

                        {/* Search Card */}
                        <m.div
                            initial={{ y: -50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -50, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-2xl bg-zinc-900 border border-white/10 p-8 md:p-12 shadow-2xl relative z-10"
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-gold-metal tracking-[0.5em] uppercase">Akıllı Arama</span>
                                    <button
                                        onClick={() => setIsSearchOpen(false)}
                                        className="text-zinc-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="MODEL, STİL VEYA ÜRÜN ADI..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && searchQuery.trim()) {
                                                    window.location.href = `/urunler?search=${encodeURIComponent(searchQuery)}`;
                                                }
                                            }}
                                            className="w-full bg-white/5 border border-white/10 py-6 px-8 text-2xl md:text-3xl font-black text-white focus:outline-none focus:border-industrial-gold/50 transition-all placeholder:text-white/10 uppercase italic"
                                        />
                                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-industrial-gold/50" />
                                    </div>
                                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest text-center">Aramak için ENTER tuşuna basın</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                                    <div>
                                        <h4 className="text-industrial-gold font-black text-[10px] tracking-widest mb-6 uppercase">HIZLI KATALOG</h4>
                                        <div className="flex flex-col gap-4">
                                            {['Tüm Ürünler', 'En Yeniler', 'Çok Satanlar'].map(item => (
                                                <Link
                                                    key={item}
                                                    href="/urunler"
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="text-white/60 hover:text-industrial-gold font-bold text-lg"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-industrial-gold font-black text-[10px] tracking-widest mb-6 uppercase">HIZMETLERIMIZ</h4>
                                        <div className="flex flex-col gap-4">
                                            {['Özel Tasarım', 'Metal Kesim', 'Boya Atölyesi'].map(item => (
                                                <Link
                                                    key={item}
                                                    href="/teklif-al"
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="text-white/60 hover:text-industrial-gold font-bold text-lg"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[100000] flex flex-col p-8 sm:p-10 overflow-y-auto"
                        style={{ backgroundColor: '#000000' }}
                    >
                        <div className="flex justify-between items-center mb-16 relative z-10">
                            <span className="text-2xl sm:text-3xl font-black text-white uppercase tracking-widest">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-industrial-gold" aria-label="Menüyü kapat">
                                <X className="w-10 h-10" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-10 relative z-10 pb-24">
                            <m.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center h-16 rounded-md border border-industrial-gold bg-[#0f0f0f] text-industrial-gold font-black uppercase tracking-widest text-xl sm:text-2xl shadow-[0_12px_36px_-12px_rgba(212,175,55,0.25)]"
                                >
                                    Ana Sayfaya Dön
                                </Link>
                            </m.div>
                            {activeLinks.map((link, idx) => (
                                <m.div
                                    key={link.id || link.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.05 }}
                                >
                                    <Link
                                        href={link.url}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-4xl sm:text-5xl font-black uppercase tracking-tight transition-colors 
                                        ${link.isPrimary ? 'text-industrial-gold' : 'text-white hover:text-industrial-gold'}`}
                                    >
                                        {link.label}
                                    </Link>
                                </m.div>
                            ))}
                            <m.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setCartOpen(true);
                                    }}
                                    className="text-left text-3xl font-black uppercase tracking-tight text-white hover:text-industrial-gold transition-colors"
                                >
                                    Sepetim {cartCount > 0 ? `(${cartCount})` : ''}
                                </button>
                            </m.div>
                            <m.div
                                className="mt-8 pt-10 border-t border-industrial-gold/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link href="/hesabim" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full h-20 bg-industrial-gold text-black font-black uppercase tracking-widest text-lg shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)]">
                                    {user ? 'HESABIM' : 'GİRİŞ YAP'}
                                </Link>
                            </m.div>
                        </nav>
                        <div className="absolute inset-0 opacity-5 pointer-events-none grid-pattern-dark" />
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
