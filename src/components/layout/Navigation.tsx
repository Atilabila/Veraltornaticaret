"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from "@/store/useCartStore";

// Mock implementation of useScroll if it doesn't exist, 
// though the previous code referred to it.
const useScroll = (threshold: number) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > threshold);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);
    return scrolled;
};

export const Navigation = () => {
    const isScrolled = useScroll(20);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.length;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
            <div className="container-brutal">
                <div className="flex items-center justify-between h-20">

                    {/* LOGO - Image 0 Style */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center text-white font-black rotate-[-10deg] group-hover:rotate-0 transition-transform">
                            M
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
                            METAL<span className="text-[#ff6b00]">POSTER</span>.CO
                        </span>
                    </Link>

                    {/* DESKTOP NAV - Image 0 Style */}
                    <div className="hidden lg:flex items-center gap-8">
                        {['KOLEKSİYONLAR', 'YENİ GELENLER', 'HAKKIMIZDA', 'SİPARİŞ TAKİBİ'].map((link) => (
                            <Link
                                key={link}
                                href={link === 'KOLEKSİYONLAR' ? '/urunler' : '#'}
                                className="text-[13px] font-bold text-gray-600 hover:text-[#ff6b00] transition-colors tracking-wide"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* SEARCH & ACTIONS - Image 0 Style */}
                    <div className="hidden lg:flex items-center gap-6">
                        {/* SEARCH BAR */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Posterlerde ara..."
                                className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 pl-10 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>

                        {/* USER & CART */}
                        <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                            <button className="text-gray-500 hover:text-[#ff6b00] transition-colors">
                                <User className="w-5 h-5" />
                            </button>
                            <Link href="#" className="relative group">
                                <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-[#ff6b00] transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#ff6b00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="lg:hidden p-2 text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
                    <Link href="/urunler" className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2" onClick={() => setIsMobileMenuOpen(false)}>KOLEKSİYONLAR</Link>
                    <Link href="#" className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2" onClick={() => setIsMobileMenuOpen(false)}>YENİ GELENLER</Link>
                    <Link href="#" className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2" onClick={() => setIsMobileMenuOpen(false)}>HAKKIMIZDA</Link>
                    <div className="flex items-center justify-between pt-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <ShoppingCart className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            )}
        </nav>
    );
};
