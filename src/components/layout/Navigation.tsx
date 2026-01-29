"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Hammer } from 'lucide-react';
import { useCartItemCount } from '@/store/useCartStore';
import { useContentStore } from '@/store/useContentStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
    const { content } = useContentStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartCount = useCartItemCount();
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

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

    const navLinks = [
        { name: 'Katalog', href: '/urunler' },
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'Metal Atölyesi', href: '/metal-urunler' },
        { name: 'Hizmetler', href: '/hizmetler' },
        { name: 'Sipariş Sorgula', href: '/siparis-sorgula' },
        { name: 'Teklif Al', href: '/teklif-al', primary: true },
    ];

    return (
        <header className={`fixed top-0 z-[100] w-full transition-all duration-700 ${isScrolled
            ? 'py-4 bg-[#0A0A0A] shadow-[0_10px_40px_rgba(0,0,0,0.3)]'
            : 'py-6 bg-transparent border-b border-[#D4AF37]/10'
            }`}>
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                <div className="flex items-center justify-between">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="h-10 w-10 md:h-14 md:w-14 transition-all duration-500 flex-shrink-0">
                                <img
                                    src={(content.headerLogo && content.headerLogo.length > 0) ? content.headerLogo : "/veral-logo.webp"}
                                    alt={content.siteName || "VERAL"}
                                    className={`h-full w-full object-contain transition-all duration-500 ${(isScrolled || ['/urunler', '/metal-urunler', '/teklif-al', '/siparis-sorgula'].some(p => pathname?.startsWith(p))) ? 'brightness-100 invert mix-blend-screen' : 'mix-blend-multiply'}`}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-lg md:text-xl font-black uppercase tracking-[0.15em] text-[#D4AF37]">
                                    {content.siteName || "VERAL"}
                                </h2>
                                <span className="text-[8px] font-bold text-white/80 tracking-[0.3em] uppercase -mt-0.5">Torna & Teneke Ti̇caret</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] relative group
                                    ${link.primary ? 'text-[#D4AF37]' : (isScrolled ? 'text-white/70' : (['/urunler', '/metal-urunler', '/teklif-al', '/siparis-sorgula'].some(p => pathname?.startsWith(p)) ? 'text-white/70' : 'text-[#0A0A0A]/60'))}
                                    ${pathname === link.href ? 'text-[#D4AF37]' : ''}
                                    `}
                                >
                                    {link.name}
                                    {link.primary && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />}
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
                                className={`relative group p-2 transition-all ${(isScrolled || ['/urunler', '/metal-urunler', '/teklif-al', '/siparis-sorgula'].some(p => pathname?.startsWith(p))) ? 'text-white' : 'text-[#0A0A0A]'}`}
                            >
                                <Search className="w-5 h-5 group-hover:text-[#D4AF37]" />
                            </button>
                            <Link
                                href="/sepet"
                                aria-label="Sepet"
                                className={`relative group p-2 transition-all cursor-pointer z-50 ${(isScrolled || ['/urunler', '/metal-urunler', '/teklif-al', '/siparis-sorgula'].some(p => pathname?.startsWith(p))) ? 'text-white' : 'text-[#0A0A0A]'}`}
                            >
                                <ShoppingCart className="w-5 h-5 group-hover:text-[#D4AF37]" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[9px] font-black flex items-center justify-center rounded-full pointer-events-none">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                className={`lg:hidden p-2 transition-all ${isScrolled ? 'text-white' : 'text-[#0A0A0A]'}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        <Link href="/hesabim" className="hidden sm:flex items-center justify-center px-6 md:px-8 h-12 border border-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-500">
                            Hesabim
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-32 px-6"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-12 h-12" />
                        </button>

                        <div className="w-full max-w-4xl space-y-12">
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
                                        className="w-full bg-transparent border-b-4 border-white/10 py-8 text-4xl md:text-7xl font-black text-white focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/5 uppercase"
                                    />
                                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 text-[#D4AF37]" />
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

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[101] bg-[#0A0A0A] flex flex-col p-10 lg:hidden"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="text-xl font-black text-white uppercase tracking-widest">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#D4AF37]">
                                <X className="w-10 h-10" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-3xl font-black uppercase tracking-tight transition-colors 
                                    ${link.primary ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-10 border-t border-[#D4AF37]/20">
                            <Link href="/hesabim" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full h-16 bg-[#D4AF37] text-white font-black uppercase tracking-widest">
                                GİRİŞ YAP
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
