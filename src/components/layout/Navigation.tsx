"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Menu, X } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { m, AnimatePresence } from 'framer-motion';
import { useAdminStore } from '@/store/useAdminStore';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Üretim Hatları', href: '/hizmetler' },
    { label: 'Metal Baskı', href: '/hizmetler/miknatisli-magnet' },
    { label: 'Blog', href: '/blog' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
];

const SEARCH_GROUPS = [
    {
        title: 'Üretim hatları',
        links: [
            { label: 'Dosya Teli', href: '/hizmetler/dosya-teli' },
            { label: 'Takvim Tenekesi', href: '/hizmetler/takvim-tenekesi' },
            { label: 'Tef Zili', href: '/hizmetler/tef-zili' },
        ],
    },
    {
        title: 'Diğer hizmetler',
        links: [
            { label: 'Giyotin Kesim & Rulo Dilimleme', href: '/hizmetler' },
            { label: 'UV Baskılı Metal Levha', href: '/hizmetler/miknatisli-magnet' },
            { label: 'Teklif Al', href: '/teklif-al' },
        ],
    },
];

const SEARCH_DIALOG_ID = 'site-shortcuts-dialog';
const MOBILE_MENU_ID = 'mobile-menu-dialog';

function useOverlayFocus(
    open: boolean,
    dialogRef: React.RefObject<HTMLDivElement | null>,
    triggerRef: React.RefObject<HTMLButtonElement | null>
) {
    const wasOpen = useRef(false);
    useEffect(() => {
        if (open) {
            dialogRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus();
        } else if (wasOpen.current) {
            triggerRef.current?.focus();
        }
        wasOpen.current = open;
    }, [open, dialogRef, triggerRef]);
}

export const Navigation = () => {
    const { content } = useContentStore();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const searchDialogRef = useRef<HTMLDivElement>(null);
    const menuDialogRef = useRef<HTMLDivElement>(null);
    const setAdmin = useAdminStore((state) => state.setAdmin);
    const isAdmin = useAdminStore((state) => state.isAdmin);

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

        const checkAuth = async () => {
            if (isAdmin) return;
            const supabase = createBrowserSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setAdmin(true);
        };
        checkAuth();

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

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAdmin, setAdmin]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!isSearchOpen && !isMobileMenuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setIsSearchOpen(false);
            setIsMobileMenuOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, isMobileMenuOpen]);

    useOverlayFocus(isSearchOpen, searchDialogRef, searchButtonRef);
    useOverlayFocus(isMobileMenuOpen, menuDialogRef, menuButtonRef);

    const ctaText = content.headerConfig?.ctaText || "TEKLİF AL";
    const ctaLink = content.headerConfig?.ctaLink || "/teklif-al";
    const isActive = (href: string) => pathname === href || (href !== '/hizmetler' && pathname?.startsWith(href));

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-[100] w-full border-b transition-colors duration-500",
                    isScrolled ? "border-atl-line bg-atl-bg/95 backdrop-blur" : "border-transparent bg-atl-bg/70 backdrop-blur-sm"
                )}
            >
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-12">
                    <Link href="/" className="group flex min-w-0 items-center gap-3">
                        <span className="relative h-10 w-10 flex-shrink-0 md:h-11 md:w-11">
                            <Image
                                src="/veral-logo.png"
                                alt={content.siteName || "VERAL"}
                                fill
                                sizes="44px"
                                className="rounded-full object-contain"
                                priority
                                quality={95}
                            />
                        </span>
                        <div className="flex flex-col leading-none">
                            <span className="font-display text-xl tracking-wide text-atl-text transition-colors group-hover:text-atl-brass-light md:text-2xl">
                                {content.siteName || "VERAL"}
                            </span>
                            <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-atl-muted md:text-[9px]">Torna & Teneke Ti̇caret</span>
                        </div>
                    </Link>

                    <nav aria-label="Ana menü" className="hidden items-center gap-8 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive(link.href) ? "text-atl-brass-light" : "text-atl-muted hover:text-atl-text"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            ref={searchButtonRef}
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Hizmet ve sayfalarda gezin"
                            aria-expanded={isSearchOpen}
                            aria-controls={SEARCH_DIALOG_ID}
                            className="p-2 text-atl-muted transition-colors hover:text-atl-text"
                        >
                            <LayoutGrid className="h-5 w-5" />
                        </button>
                        <Link
                            href={ctaLink}
                            className="hidden h-10 items-center bg-atl-brass px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light sm:inline-flex"
                        >
                            {ctaText}
                        </Link>
                        <button
                            ref={menuButtonRef}
                            className="p-2 text-atl-text lg:hidden"
                            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls={MOBILE_MENU_ID}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isSearchOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100000] flex items-start justify-center px-6 pt-[10vh]"
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
                        <m.div
                            ref={searchDialogRef}
                            id={SEARCH_DIALOG_ID}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Hizmet ve sayfa kısayolları"
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            className="relative z-10 w-full max-w-2xl border border-atl-line bg-atl-surface p-8 md:p-12"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-atl-brass">Hızlı erişim</span>
                                <button onClick={() => setIsSearchOpen(false)} aria-label="Kısayolları kapat" className="text-atl-muted hover:text-atl-text">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-8 grid grid-cols-1 gap-10 border-t border-atl-line pt-8 md:grid-cols-2">
                                {SEARCH_GROUPS.map((group) => (
                                    <div key={group.title}>
                                        <h4 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">{group.title}</h4>
                                        <div className="flex flex-col gap-3">
                                            {group.links.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="text-lg text-atl-text transition-colors hover:text-atl-brass-light"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        ref={menuDialogRef}
                        id={MOBILE_MENU_ID}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobil menü"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="atl-grain fixed inset-0 z-[100000] flex flex-col overflow-y-auto bg-atl-bg p-8 text-atl-text"
                    >
                        <div className="mb-14 flex items-center justify-between">
                            <span className="font-mono text-xs uppercase tracking-[0.4em] text-atl-brass">Menü</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-atl-muted hover:text-atl-text" aria-label="Menüyü kapat">
                                <X className="h-9 w-9" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-6 pb-24">
                            {[{ label: 'Ana Sayfa', href: '/' }, ...NAV_LINKS].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-display text-4xl text-atl-text transition-colors hover:text-atl-brass-light"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href={ctaLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-8 flex h-14 items-center justify-center bg-atl-brass font-mono text-sm font-semibold uppercase tracking-[0.25em] text-atl-bg"
                            >
                                {ctaText}
                            </Link>
                        </nav>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
