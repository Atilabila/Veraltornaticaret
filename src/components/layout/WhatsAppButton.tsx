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
            className="fixed bottom-[5.5rem] right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#20BA5A] md:bottom-6 md:right-6 whatsapp-button-perf group"
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

