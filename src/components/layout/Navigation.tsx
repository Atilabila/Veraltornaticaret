"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useContentStore } from '@/store/useContentStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
    const { content } = useContentStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartCount = useCartStore((state) => state.items.length);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Koleksiyon', href: '/urunler' },
        { name: 'Showcase', href: '/metal-showcase' },
        { name: 'Hakkimizda', href: '/hakkimizda' },
        { name: 'Blog', href: '/blog' }
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
                            {content.headerLogo ? (
                                <div className="h-10 transition-all duration-500">
                                    <img
                                        src={content.headerLogo}
                                        alt={content.siteName}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center p-2 group-hover:bg-[#D4AF37] transition-all duration-500">
                                    <svg className={`w-full h-full ${isScrolled || 'text-[#D4AF37]'} transition-colors`} fill="currentColor" viewBox="0 0 48 48">
                                        <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <h2 className={`text-xl font-black uppercase tracking-[0.2em] ${isScrolled ? 'text-white' : 'text-[#0A0A0A]'}`}>
                                    {content.siteName || "Metal Art"}
                                </h2>
                                <span className="text-[7px] font-bold text-[#D4AF37] tracking-[0.5em] uppercase -mt-1">Noble Collection</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] ${isScrolled ? 'text-white/70' : 'text-[#0A0A0A]/60'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Utils */}
                    <div className="flex items-center gap-8">
                        {/* Control Buttons */}
                        <div className="flex items-center gap-4">
                            <button className={`relative group p-2 transition-all ${isScrolled ? 'text-white' : 'text-[#0A0A0A]'}`}>
                                <Search className="w-5 h-5 group-hover:text-[#D4AF37]" />
                            </button>
                            <button className={`relative group p-2 transition-all ${isScrolled ? 'text-white' : 'text-[#0A0A0A]'}`}>
                                <ShoppingCart className="w-5 h-5 group-hover:text-[#D4AF37]" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[9px] font-black flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                className={`lg:hidden p-2 transition-all ${isScrolled ? 'text-white' : 'text-[#0A0A0A]'}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        <button className="hidden sm:flex items-center justify-center px-8 h-12 border border-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-500">
                            Hesabim
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
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
                                    className="text-3xl font-black text-white hover:text-[#D4AF37] transition-colors uppercase tracking-tight"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-10 border-t border-[#D4AF37]/20">
                            <button className="w-full h-16 bg-[#D4AF37] text-white font-black uppercase tracking-widest">
                                GIRIS YAP
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
