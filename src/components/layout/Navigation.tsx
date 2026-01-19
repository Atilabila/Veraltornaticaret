"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { PrimaryButton, SystemLabel } from '@/components/ui/Industrial';

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Ana Sayfa', href: '/' },
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'Ürünler', href: '/urunler' },
        { name: 'Üretim Süreci', href: '#process' },
        { name: 'İletişim', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-near-black text-paper-white py-3 border-b border-steel-gray shadow-xl' : 'bg-transparent text-near-black py-6'}`}>
            <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex flex-col">
                    <span className="font-space font-bold text-2xl tracking-tighter uppercase leading-none">VERAL</span>
                    <div className="flex items-center gap-1">
                        <SystemLabel text="KAYIT NO: 1980" active={isScrolled} />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`font-ibm-plex text-[13px] uppercase tracking-wide font-medium hover:text-hazard-orange transition-colors ${isScrolled ? 'text-fog-gray' : 'text-near-black'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <PrimaryButton label="Teklif İste" size="sm" />
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-near-black border-t border-steel-gray p-8 flex flex-col gap-6 text-paper-white">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-space text-2xl font-bold uppercase"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 pt-6 border-t border-steel-gray">
                        <Link href="tel:+905071651315" className="flex items-center gap-3 text-hazard-orange font-bold uppercase">
                            <Phone size={20} /> ARA
                        </Link>
                        <Link href="https://wa.me/905071651315" className="flex items-center gap-3 text-acid-green font-bold uppercase">
                            <MessageSquare size={20} /> WHATSAPP
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
