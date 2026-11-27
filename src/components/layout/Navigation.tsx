"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import { useAdminStore } from "@/store/useAdminStore";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";
import { MobileNavSheet } from "@/components/layout/MobileNavSheet";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import {
    COMPANY_LINKS,
    headerCtaLabel,
    PRODUCTION_LINES,
    isNavHrefActive,
} from "@/lib/production-lines";
import { publicWhatsappNumber } from "@/lib/contact";

export const Navigation = () => {
    const { content } = useContentStore();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
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

    const ctaText = headerCtaLabel(content.headerConfig?.ctaText);
    const ctaLink = content.headerConfig?.ctaLink || "/teklif-al";
    const whatsappNumber = publicWhatsappNumber(content.whatsappNumber);
    const whatsappHref = `https://wa.me/${whatsappNumber}`;

    return (
        <>
            <a
                href="#icerik"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-atl-brass focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-atl-bg"
            >
                İçeriğe geç
            </a>
            <header
                className={cn(
                    "fixed top-0 z-[100] w-full border-b transition-colors duration-500",
                    isScrolled ? "border-atl-line bg-atl-bg/95 backdrop-blur" : "border-transparent bg-atl-bg/70 backdrop-blur-sm"
                )}
                style={{ backgroundColor: isScrolled ? "rgba(18,17,16,0.95)" : "rgba(18,17,16,0.7)", color: "#ece6da" }}
            >
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 sm:gap-6 sm:px-6 sm:py-3 lg:px-12">
                    <Link href="/" className="group flex shrink-0 items-center text-atl-text">
                        <Wordmark className="h-11 w-auto sm:h-12" />
                    </Link>

                    <nav aria-label="Ana menü" className="hidden items-center gap-1 xl:gap-2 2xl:gap-3 lg:flex">
                        {PRODUCTION_LINES.map((link) => {
                            const active = isNavHrefActive(pathname, link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative inline-flex min-h-11 items-center px-1.5 font-sans text-sm font-semibold tracking-tight transition-colors xl:px-2",
                                        active ? "text-atl-brass-light" : "text-atl-muted hover:text-atl-text"
                                    )}
                                >
                                    {link.label}
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "absolute inset-x-1.5 -bottom-0.5 h-px bg-atl-brass transition-opacity",
                                            active ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </Link>
                            );
                        })}
                        <span aria-hidden className="mx-1 h-4 w-px bg-atl-line" />
                        {COMPANY_LINKS.map((link) => {
                            const active = isNavHrefActive(pathname, link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative inline-flex min-h-11 items-center px-1.5 font-sans text-sm font-semibold tracking-tight transition-colors xl:px-2",
                                        active ? "text-atl-brass-light" : "text-atl-muted hover:text-atl-text"
                                    )}
                                >
                                    {link.label}
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "absolute inset-x-1.5 -bottom-0.5 h-px bg-atl-brass transition-opacity",
                                            active ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-1.5 sm:gap-3">
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden h-11 items-center gap-2 border border-atl-line px-4 font-sans text-sm font-semibold tracking-normal text-atl-text transition-colors hover:border-atl-brass hover:text-atl-brass-light md:inline-flex"
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp
                        </a>
                        <Link
                            href={ctaLink}
                            className="hidden h-11 items-center bg-atl-brass px-5 font-sans text-sm font-semibold tracking-normal text-atl-bg transition-colors hover:bg-atl-brass-light lg:inline-flex"
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
                productionLinks={PRODUCTION_LINES}
                companyLinks={COMPANY_LINKS}
                whatsappHref={whatsappHref}
                ctaText={ctaText}
                ctaLink={ctaLink}
            />
            {!isMobileMenuOpen && <MobileStickyBar />}
        </>
    );
};
