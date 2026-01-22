"use client";

import React from 'react';
import { MessageSquare, Phone, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const MobileStickyBar = () => {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] h-20 bg-[#0A0A0A] border-t border-[#D4AF37]/20 flex items-center justify-around px-4">
            <Link href="https://wa.me/905071651315" className="flex flex-col items-center gap-1 text-[#FDFBF7]/60 active:text-[#D4AF37]">
                <MessageSquare size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">WhatsApp</span>
            </Link>
            <Link href="tel:+905071651315" className="flex flex-col items-center gap-1 text-[#FDFBF7]/60 active:text-[#D4AF37]">
                <Phone size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">Ara</span>
            </Link>
            <Link href="/urunler" className="flex flex-col items-center gap-1 text-[#D4AF37]">
                <ShoppingBag size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">Katalog</span>
            </Link>
        </div>
    );
};
