"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield } from "lucide-react";

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("veral_cookie_consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("veral_cookie_consent", "accepted");
        setIsVisible(false);
        window.location.reload();
    };

    const handleDecline = () => {
        localStorage.setItem("veral_cookie_consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[9999]"
                >
                    <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-6 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                        {/* Close Button */}
                        <button
                            onClick={handleDecline}
                            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                            aria-label="Kapat"
                        >
                            <X className="w-4 h-4 text-zinc-400" />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                                <Cookie className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base">Çerez Bildirimi</h3>
                                <p className="text-zinc-400 text-xs">Deneyiminizi iyileştirmek için</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                            Sitemizi nasıl kullandığınızı anlamamıza yardımcı olması için anonim sayfa ziyareti verisi topluyoruz.
                            Kişisel bilgileriniz <strong className="text-white">kesinlikle</strong> kaydedilmez.
                        </p>

                        {/* Trust Badge */}
                        <div className="flex items-center gap-2 mb-5 p-2.5 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-emerald-400 text-xs font-medium">KVKK & GDPR uyumlu • Anonim veri</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleDecline}
                                className="flex-1 py-3 text-sm font-bold text-zinc-400 border border-zinc-700 rounded-xl hover:bg-zinc-800 hover:text-white transition-all"
                            >
                                Reddet
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-3 text-sm font-bold text-black bg-[#D4AF37] rounded-xl hover:bg-[#E5C04B] transition-all shadow-lg shadow-[#D4AF37]/20"
                            >
                                Kabul Et
                            </button>
                        </div>

                        {/* Policy Link */}
                        <div className="mt-3 text-center">
                            <a href="/cerez" className="text-zinc-500 text-xs hover:text-[#D4AF37] transition-colors underline underline-offset-2">
                                Çerez Politikamızı okuyun
                            </a>
                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};
