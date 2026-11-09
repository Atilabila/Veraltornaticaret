"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { m, AnimatePresence } from "framer-motion";
import { useAdminStore } from "@/store/useAdminStore";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";
import { MobileNavSheet } from "@/components/layout/MobileNavSheet";

const DOSYA_TELI_LINKS = [
    { label: "Toptan Dosya Teli", href: "/hizmetler/dosya-teli" },
    { label: "Takvim Tenekesi", href: "/hizmetler/takvim-tenekesi" },
    { label: "Tef Zili", href: "/hizmetler/tef-zili" },
];

const NAV_LINKS = [
    { label: "Üretim Hatları", href: "/hizmetler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
];

export const Navigation = () => {
    const { content } = useContentStore();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDosyaOpen, setIsDosyaOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const dosyaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
        window.addEventListener("scroll", handleScroll, { passive: true });

        const checkAuth = async () => {
            if (isAdmin) return;
            const supabase = createBrowserSupabaseClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) setAdmin(true);
        };
        checkAuth();

        const initSync = async () => {
            try {
                if (isAdmin) return;
                const { startBackgroundSync } = await import("@/lib/sync/syncService");
                startBackgroundSync();
            } catch (error) {
                console.error("[SYNC] Failed to initialize sync service:", error);
            }
        };
        initSync();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAdmin, setAdmin]);

    const ctaText = content.headerConfig?.ctaText || "TEKLİF AL";
    const ctaLink = content.headerConfig?.ctaLink || "/teklif-al";
    const whatsappNumber = (content.whatsappNumber || "905323794003").replace(/[^0-9]/g, "");
    const whatsappHref = `https://wa.me/${whatsappNumber}`;
    const isActive = (href: string) => pathname === href || (href !== "/hizmetler" && pathname?.startsWith(href));
    const isDosyaActive = DOSYA_TELI_LINKS.some((item) => pathname?.startsWith(item.href));

    const openDosya = () => {
        if (dosyaCloseTimer.current) clearTimeout(dosyaCloseTimer.current);
        setIsDosyaOpen(true);
    };
    const closeDosya = () => {
        dosyaCloseTimer.current = setTimeout(() => setIsDosyaOpen(false), 120);
    };

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-[100] w-full border-b transition-colors duration-500",
                    isScrolled ? "border-atl-line bg-atl-bg/95 backdrop-blur" : "border-transparent bg-atl-bg/70 backdrop-blur-sm"
                )}
                style={{ backgroundColor: isScrolled ? "rgba(18,17,16,0.95)" : "rgba(18,17,16,0.7)", color: "#ece6da" }}
            >
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 sm:gap-6 sm:px-6 sm:py-3 lg:px-12">
                    <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
                        <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11 md:h-12 md:w-12">
                            <Image
                                src="/veral-logo-nav.png"
                                alt={content.siteName || "VERAL"}
                                fill
                                sizes="48px"
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        </span>
                        <div className="flex min-w-0 flex-col leading-none">
                            <span className="truncate font-display text-lg tracking-wide text-atl-text transition-colors group-hover:text-atl-brass-light sm:text-xl md:text-2xl">
                                {content.siteName || "VERAL"}
                            </span>
                            <span className="mt-0.5 hidden font-mono text-[8px] uppercase tracking-[0.3em] text-atl-muted sm:mt-1 sm:block md:text-[9px]">
                                Torna & Teneke Ti̇caret
                            </span>
                        </div>
                    </Link>

                    <nav aria-label="Ana menü" className="hidden items-center gap-8 lg:flex">
                        <div className="relative" onMouseEnter={openDosya} onMouseLeave={closeDosya}>
                            <button
                                type="button"
                                aria-expanded={isDosyaOpen}
                                aria-haspopup="true"
                                onClick={() => setIsDosyaOpen((open) => !open)}
                                className={cn(
                                    "inline-flex items-center gap-1 text-sm font-medium transition-colors",
                                    isDosyaActive || isDosyaOpen ? "text-atl-brass-light" : "text-atl-muted hover:text-atl-text"
                                )}
                            >
                                Dosya Teli
                                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isDosyaOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {isDosyaOpen && (
                                    <m.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-0 top-full z-20 min-w-[240px] border border-atl-line bg-atl-surface py-2 shadow-lg"
                                        onMouseEnter={openDosya}
                                        onMouseLeave={closeDosya}
                                    >
                                        {DOSYA_TELI_LINKS.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsDosyaOpen(false)}
                                                className={cn(
                                                    "block px-4 py-2.5 text-sm transition-colors hover:bg-atl-surface-2 hover:text-atl-brass-light",
                                                    isActive(item.href) ? "text-atl-brass-light" : "text-atl-text"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
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

                    <div className="flex items-center gap-1.5 sm:gap-3">
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden h-10 items-center gap-2 border border-atl-line px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-atl-text transition-colors hover:border-atl-brass hover:text-atl-brass-light md:inline-flex"
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp
                        </a>
                        <Link
                            href={ctaLink}
                            className="hidden h-10 items-center bg-atl-brass px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light lg:inline-flex"
                        >
                            {ctaText}
                        </Link>
                        <button
                            ref={menuButtonRef}
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center text-atl-text lg:hidden"
                            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            <MobileNavSheet
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
                dosyaLinks={DOSYA_TELI_LINKS}
                navLinks={NAV_LINKS}
                whatsappHref={whatsappHref}
                ctaText={ctaText}
                ctaLink={ctaLink}
            />
        </>
    );
};
