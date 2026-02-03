"use client";

import { MessageCircle } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';

export const WhatsAppButton = () => {
    const { content } = useContentStore();

    const handleClick = () => {
        const phoneNumber = content.whatsappNumber || '905554443322';
        const message = encodeURIComponent(content.whatsappMessage || 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-24 md:bottom-8 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            aria-label="WhatsApp ile iletişime geç"
        >
            <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        </button>
    );
};
