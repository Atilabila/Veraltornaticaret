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
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-[450px] z-[999]"
                >
                    <div className="bg-black border border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-safety-orange)]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[var(--color-brand-safety-orange)]/10 transition-colors duration-700" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-[var(--color-brand-safety-orange)]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2 font-mono">
                                        Çerez Politikası
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed font-medium">
                                        Size daha iyi bir deneyim sunabilmek için web sitemizde çerezler kullanıyoruz. Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-[var(--color-brand-safety-orange)] text-black font-black text-xs uppercase tracking-[0.2em] py-4 px-6 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    KABUL ET <ChevronRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-4 text-xs font-black text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors"
                                >
                                    REDDET
                                </button>
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
