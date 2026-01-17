"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export const WhatsAppSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "905555555555"; // Telefon numarasını buraya girin
    const message = "Merhaba! Metal poster ürünleriniz hakkında bilgi almak istiyorum.";

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <>
            {/* WhatsApp Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-6 bottom-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-brutal border-4 border-black hover:bg-[#128C7E] transition-colors group"
                aria-label="WhatsApp ile iletişime geç"
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <MessageCircle className="w-8 h-8 animate-pulse" />
                )}

                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 bg-[var(--color-brand-safety-orange)] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                        1
                    </span>
                )}
            </motion.button>

            {/* WhatsApp Sidebar Panel */}
            {isOpen && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    className="fixed right-6 bottom-24 z-40 w-80 bg-white border-4 border-black shadow-brutal"
                >
                    {/* Header */}
                    <div className="bg-[#25D366] text-white p-4 border-b-4 border-black">
                        <h3 className="font-mono font-bold text-lg">💬 Canlı Destek</h3>
                        <p className="text-sm opacity-90">Hemen yanıtlıyoruz!</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        <div className="bg-[#E5E7EB] border-2 border-black p-4 font-mono text-sm">
                            <p className="font-bold mb-2">👋 Merhaba!</p>
                            <p>Metal poster ürünlerimiz hakkında sorularınız mı var?</p>
                            <p className="mt-2 text-xs text-black/60">Hemen WhatsApp'tan yazın, size yardımcı olalım!</p>
                        </div>

                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-[#25D366] text-white font-mono font-bold py-4 px-6 border-4 border-black shadow-brutal hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp'ta Sohbet Başlat
                        </button>

                        <div className="text-center text-xs font-mono text-black/40">
                            Genellikle 5 dakika içinde yanıt veriyoruz
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="border-t-4 border-black bg-[#FFF9E6] p-4 space-y-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--color-brand-safety-orange)]">●</span>
                            <span>Ücretsiz Kargo (500 TL üzeri)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--color-brand-safety-orange)]">●</span>
                            <span>Ömür Boyu Garanti</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--color-brand-safety-orange)]">●</span>
                            <span>14 Gün İade Garantisi</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};
