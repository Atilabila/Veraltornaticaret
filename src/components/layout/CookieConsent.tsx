"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const consent = localStorage.getItem('veral_cookie_consent') || localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (!isVisible) {
            root.style.setProperty("--cookie-offset", "0px");
            return;
        }
        const el = bannerRef.current;
        const apply = () => {
            root.style.setProperty("--cookie-offset", `${el?.offsetHeight ?? 0}px`);
        };
        apply();
        const observer = new ResizeObserver(apply);
        if (el) observer.observe(el);
        return () => {
            observer.disconnect();
            root.style.setProperty("--cookie-offset", "0px");
        };
    }, [isVisible]);

    const handleAccept = () => {
        localStorage.setItem('veral_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('veral_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={bannerRef}
                    initial={false}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-x-0 top-0 z-[1100] lg:top-auto lg:bottom-0"
                >
                    <div className="bg-black/90 backdrop-blur-md border-t border-[var(--color-brand-accent)]/20 py-3 px-4 lg:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">

                            <div className="flex items-center gap-3 text-center md:text-left flex-1">
                                <ShieldCheck className="w-5 h-5 text-[var(--color-brand-accent)] flex-shrink-0 hidden md:block" />
                                <p className="text-sm text-white/80 leading-snug">
                                    Çerezler siteyi çalıştırmak ve ziyareti hatırlamak için kullanılır.{" "}
                                    <a href="/cerez" className="underline underline-offset-2 hover:text-white">Çerez politikası</a>
                                </p>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="inline-flex min-h-11 flex-1 items-center justify-center px-4 text-xs font-semibold text-white/80 hover:text-white transition-colors border border-white/20 hover:bg-atl-surface-2 md:flex-none"
                                >
                                    REDDET
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="inline-flex min-h-11 flex-1 items-center justify-center bg-[var(--color-brand-accent)] px-6 text-sm font-semibold text-atl-bg hover:bg-atl-brass-light transition-colors md:flex-none"
                                >
                                    KABUL ET
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="hidden h-11 w-11 items-center justify-center text-white/70 hover:text-white transition-colors md:inline-flex"
                                    aria-label="Kapat"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
