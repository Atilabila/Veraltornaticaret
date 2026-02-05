"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Hammer } from 'lucide-react';
import { useCartItemCount } from '@/store/useCartStore';
import { useContentStore } from '@/store/useContentStore';
import { useThemeDetection } from '@/hooks/useThemeDetection';
import { motion, AnimatePresence } from 'framer-motion';
import { normalizeImagePath } from '@/lib/utils';
import { useAdminStore } from '@/store/useAdminStore';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export const Navigation = () => {
    const { content } = useContentStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartCount = useCartItemCount();
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const setAdmin = useAdminStore((state) => state.setAdmin);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        const checkAuth = async () => {
            const supabase = createBrowserSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setAdmin(true);
        };
        checkAuth();

        // Start background sync service
        const initSync = async () => {
            try {
                const { startBackgroundSync } = await import('@/lib/sync/syncService');
                startBackgroundSync();
            } catch (error) {
                console.error('[SYNC] Failed to initialize sync service:', error);
            }
        };
        initSync();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeLinks = (content.menuItems || []).length > 0
        ? (content.menuItems || []).filter(item => item.visible).sort((a, b) => a.order - b.order)
        : [
            { id: 'f1', label: 'Katalog', url: '/urunler', isPrimary: false },
            { id: 'f2', label: 'Hakkımızda', url: '/hakkimizda', isPrimary: false },
            { id: 'f3', label: 'Hizmetler', url: '/metal-urunler', isPrimary: false },
            { id: 'f4', label: 'Teklif Al', url: '/teklif-al', isPrimary: true },
        ]; // Fallback while loading or if empty

    // Determine if current page is dark-themed (for Auto Contrast mode)
    // Determine if current page is dark-themed (for Auto Contrast mode)
    const { isDarkPage, headerMode } = useThemeDetection();

    // Header Config Logic
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

    // Effective Mode: Check override first, then global config
    const effectiveMode = headerMode !== 'inherit' ? headerMode : config.mode;
    const isTranslucentMode = effectiveMode === 'translucent';

    // Calculate effective styles
    const headerBgOpacity = isScrolled ? 1 : (isTranslucentMode ? config.transparency / 100 : 0);

    // Text Color Logic:
    // If Mode is 'light' -> forced to White (for dark bg)
    // If Mode is 'dark' -> forced to Black (for light bg)
    const isTextWhite =
        effectiveMode === 'light' ||
        (effectiveMode !== 'dark' && (isScrolled || isTranslucentMode || isDarkPage));

    const textColorClass = isTextWhite ? 'text-white' : 'text-[#0A0A0A]';
    const logoSrc = isTextWhite ? config.logoLight : config.logoDark;
    const borderColor = isTextWhite ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    return (
        <>
            <header
                className="fixed top-0 z-[100] w-full transition-all duration-700"
                style={{
                    backgroundColor:
                        (isScrolled || isTranslucentMode || effectiveMode === 'light') ? `rgba(10, 10, 10, ${headerBgOpacity})` :
                            (effectiveMode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'transparent'),
                    backdropFilter: (isScrolled || isTranslucentMode || effectiveMode === 'light' || effectiveMode === 'dark') ? `blur(${Math.min(config.blur || 12, 8)}px)` : 'none',
                    borderBottom: (config.showBorder && (isScrolled || isTranslucentMode || effectiveMode === 'light' || effectiveMode === 'dark')) ? `1px solid ${borderColor}` : 'none',
                    boxShadow: isScrolled ? '0 10px 40px rgba(0,0,0,0.3)' : (config.shadow !== 'none' && (isTranslucentMode || effectiveMode !== 'auto') ? `0 4px 20px rgba(0,0,0,${config.shadow === 'sm' ? 0.1 : config.shadow === 'md' ? 0.2 : 0.3})` : 'none')
                }}
            >
                {config.announcementActive && config.announcementText && (
                    <div className="bg-[#D4AF37] text-black text-[10px] font-bold py-1 text-center tracking-widest uppercase">
                        <Link href={config.announcementLink || '#'}>
                            {config.announcementText}
                        </Link>
                    </div>
                )}

                <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                    <div className={`flex items-center justify-between transition-all duration-500 ${config.announcementActive ? (isScrolled ? 'py-2' : 'py-3') : (isScrolled ? 'py-3' : 'py-4 md:py-5')
                        }`}>
                        {/* Brand Logo */}
                        <div className="flex items-center gap-16">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className={`transition-all duration-500 flex-shrink-0 relative ${isScrolled ? 'h-8 w-8 md:h-10 md:w-10' : 'h-10 w-10 md:h-12 md:w-12'
                                    }`}>
                                    <img
                                        src={normalizeImagePath(logoSrc || "/veral-logo.webp")}
                                        alt={content.siteName || "VERAL"}
                                        className="h-full w-full object-contain transition-all duration-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className={`font-black uppercase tracking-[0.15em] text-[#D4AF37] transition-all duration-500 ${isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'
                                        }`}>
                                        {content.siteName || "VERAL"}
                                    </h2>
                                    <span className={`text-[7px] md:text-[8px] font-bold tracking-[0.3em] uppercase -mt-0.5 transition-all duration-500 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
                                        } ${isTextWhite ? 'text-white/80' : 'text-black/60'}`}>Torna & Teneke Ti̇caret</span>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-8">
                                {activeLinks.map((link) => (
                                    <Link
                                        key={link.id || link.label}
                                        href={link.url}
                                        className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative group
                                        ${link.isPrimary ? 'text-[#D4AF37]' : (pathname === link.url ? 'text-[#D4AF37]' : `${textColorClass} hover:text-[#D4AF37]`)}
                                        `}
                                    >
                                        {link.label}
                                        {link.isPrimary && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Utils */}
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Control Buttons */}
                            <div className="flex items-center gap-2 md:gap-4">
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className={`relative group p-2 transition-all ${textColorClass} hover:text-[#D4AF37]`}
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                                <Link
                                    href="/sepet"
                                    aria-label="Sepet"
                                    className={`relative group p-2 transition-all cursor-pointer z-50 ${textColorClass} hover:text-[#D4AF37]`}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[9px] font-black flex items-center justify-center rounded-full pointer-events-none">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    className={`lg:hidden p-2 transition-all ${textColorClass}`}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>

                            <Link href={config.ctaLink || "/teklif-al"} className={`hidden sm:flex items-center justify-center border border-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-500 ${isScrolled ? 'px-4 h-10' : 'px-6 md:px-8 h-12'
                                }`}>
                                {config.ctaText || "TEKLİF AL"}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* OVERLAYS MOVED OUTSIDE FOR STACKING CONTEXT FIX */}

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100000] flex flex-col items-center justify-start pt-32 px-6 overflow-y-auto"
                        style={{ backgroundColor: '#000000' }}
                    >
                        {/* Subtle Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern-dark" />

                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-[100001]"
                        >
                            <X className="w-12 h-12" />
                        </button>

                        <div className="w-full max-w-4xl space-y-12 relative z-[100001] pb-20">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.5em] uppercase">NE ARIYORSUNUZ?</span>
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
                                        className="w-full bg-[#1A1A1A] border-b-4 border-[#D4AF37] py-8 px-6 text-4xl md:text-7xl font-black text-white focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/10 uppercase italic"
                                    />
                                    <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 text-[#D4AF37]" />
                                </div>
                                <p className="text-white/30 font-mono text-xs uppercase tracking-widest mt-4">Aramak için ENTER tuşuna basın</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                                <div>
                                    <h4 className="text-[#D4AF37] font-black text-[10px] tracking-widest mb-6 uppercase">HIZLI KATALOG</h4>
                                    <div className="flex flex-col gap-4">
                                        {['Tüm Ürünler', 'En Yeniler', 'Çok Satanlar'].map(item => (
                                            <Link
                                                key={item}
                                                href="/urunler"
                                                onClick={() => setIsSearchOpen(false)}
                                                className="text-white/60 hover:text-white font-bold text-lg"
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[#D4AF37] font-black text-[10px] tracking-widest mb-6 uppercase">HIZMETLERIMIZ</h4>
                                    <div className="flex flex-col gap-4">
                                        {['Özel Tasarım', 'Metal Kesim', 'Boya Atölyesi'].map(item => (
                                            <Link
                                                key={item}
                                                href="/hizmetler"
                                                onClick={() => setIsSearchOpen(false)}
                                                className="text-white/60 hover:text-white font-bold text-lg"
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[100000] flex flex-col p-10 lg:hidden overflow-y-auto"
                        style={{ backgroundColor: '#000000' }}
                    >
                        <div className="flex justify-between items-center mb-16 relative z-10">
                            <span className="text-xl font-black text-white uppercase tracking-widest">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#D4AF37]">
                                <X className="w-10 h-10" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-8 relative z-10 pb-20">
                            {activeLinks.map((link) => (
                                <Link
                                    key={link.id || link.label}
                                    href={link.url}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-3xl font-black uppercase tracking-tight transition-colors 
                                    ${link.isPrimary ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-8 pt-10 border-t border-[#D4AF37]/20">
                                <Link href="/hesabim" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full h-20 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-lg shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)]">
                                    GİRİŞ YAP
                                </Link>
                            </div>
                        </nav>
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none grid-pattern-dark" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
