"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ChevronRight } from 'lucide-react';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-[1000] pb-[env(safe-area-inset-bottom)]"
                >
                    <div className="bg-black/90 backdrop-blur-md border-t border-[#D4AF37]/20 py-3 px-4 lg:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">

                            <div className="flex items-center gap-3 text-center md:text-left flex-1">
                                <ShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0 hidden md:block" />
                                <p className="text-[11px] sm:text-xs text-white/80 leading-snug">
                                    Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz. Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 md:flex-none px-4 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-black text-white/60 hover:text-white uppercase tracking-[0.2em] transition-colors border border-white/10 hover:bg-white/5"
                                >
                                    REDDET
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 md:flex-none bg-[#D4AF37] text-black font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] py-2 sm:py-2.5 px-4 sm:px-6 hover:bg-white transition-all duration-300"
                                >
                                    KABUL ET
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-2 text-white/40 hover:text-white transition-colors hidden md:block"
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
