"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useState } from "react";

export const WhatsAppSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "905071651315";
    const message = "Merhaba! Özel imalat ürünleriniz hakkında teklif almak istiyorum.";

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
                className="fixed right-6 bottom-20 lg:bottom-10 z-50 bg-acid-green text-near-black p-4 border border-near-black shadow-xl hover:bg-near-black hover:text-acid-green transition-all group"
                aria-label="WhatsApp ile iletişime geç"
                style={{ borderRadius: '2px' }}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageSquare className="w-6 h-6" />
                )}

                {!isOpen && (
                    <span className="absolute -top-2 -right-2 bg-hazard-orange text-near-black text-[10px] font-bold w-5 h-5 flex items-center justify-center border border-near-black">
                        1
                    </span>
                )}
            </motion.button>

            {/* WhatsApp Sidebar Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        className="fixed right-6 bottom-36 lg:bottom-28 z-40 w-80 bg-white border border-near-black shadow-2xl"
                        style={{ borderRadius: '2px' }}
                    >
                        {/* Header */}
                        <div className="bg-near-black text-paper-white p-6 border-b border-steel-gray flex flex-col gap-1">
                            <h3 className="font-space font-bold text-lg uppercase tracking-tight">ÜRETİM HATTI DESTEK</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-acid-green animate-pulse rounded-full" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SİSTEM ÇEVRİMİÇİ</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            <div className="bg-[#F9F9F9] border border-fog-gray p-4 font-source-sans text-sm text-steel-gray">
                                <p className="font-bold text-near-black mb-2 uppercase text-xs">Usta Görüşü Alın</p>
                                <p>Torna, teneke imalatı veya özel projeleriniz için teknik ekibimizle doğrudan iletişime geçin.</p>
                            </div>

                            <button
                                onClick={handleWhatsAppClick}
                                className="w-full bg-acid-green text-near-black font-space font-bold py-4 px-6 border border-near-black hover:bg-near-black hover:text-acid-green transition-all flex items-center justify-center gap-2 uppercase text-sm"
                            >
                                <MessageSquare size={18} />
                                WhatsApp SOHBETİ BAŞLAT
                            </button>
                        </div>

                        {/* Quick Info */}
                        <div className="border-t border-fog-gray bg-paper-white p-4 grid grid-cols-2 gap-2 text-[9px] font-bold text-steel-gray uppercase tracking-tighter">
                            <div className="flex items-center gap-2">
                                <span className="text-hazard-orange">●</span>
                                <span>HIZLI TEKLİF</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-hazard-orange">●</span>
                                <span>TEKNİK DESTEK</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
