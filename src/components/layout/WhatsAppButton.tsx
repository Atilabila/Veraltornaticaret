"use client";

import { MessageCircle } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";

/** Masaüstünde floating; mobilde sticky bar’da WhatsApp var */
export const WhatsAppButton = () => {
    const { content } = useContentStore();

    const handleClick = () => {
        const phoneNumber = (content.whatsappNumber || "905323794003").replace(/[^0-9]/g, "");
        const message = encodeURIComponent(
            content.whatsappMessage || "Merhaba, hizmetleriniz hakkında detaylı bilgi almak istiyorum."
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="whatsapp-button-perf group fixed bottom-6 right-6 z-[60] hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20BA5A] lg:flex"
            aria-label="WhatsApp ile iletişime geç"
            style={{ transform: "translateZ(0)" }}
        >
            <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
            <span className="whatsapp-pulse" aria-hidden />
            <style
                dangerouslySetInnerHTML={{
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
            `,
                }}
            />
        </button>
    );
};
