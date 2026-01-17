"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
}

export const WhatsAppButton = ({
    phoneNumber,
    message = "Merhaba, metal posterler hakkında bilgi almak istiyorum."
}: WhatsAppButtonProps) => {
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    return (
        <motion.button
            onClick={handleClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="WhatsApp ile iletişime geç"
        >
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </motion.button>
    );
};
