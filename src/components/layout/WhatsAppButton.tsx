"use client";

import { MessageCircle } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';

export const WhatsAppButton = () => {
    const { content } = useContentStore();

    const handleClick = () => {
        const phoneNumber = content.whatsappNumber || '905071651315';
        const message = encodeURIComponent(content.whatsappMessage || 'Merhaba, hizmetleriniz hakkında detaylı bilgi almak istiyorum.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-[88px] md:bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group whatsapp-button-perf"
            aria-label="WhatsApp ile iletişime geç"
            style={{ transform: 'translateZ(0)' }}
        >
            <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes soft-pulse {
                    0% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.2); opacity: 0.1; }
                    100% { transform: scale(1.4); opacity: 0; }
                }
                .whatsapp-pulse {
                    position: absolute;
                    inset: 0;
                    border-radius: 9999px;
                    background-color: #25D366;
                    animation: soft-pulse 3s infinite;
                    pointer-events: none;
                }
            `}} />
            <div className="whatsapp-pulse"></div>
        </button>
    );
};

