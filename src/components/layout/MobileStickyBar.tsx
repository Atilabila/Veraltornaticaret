"use client";

import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';

/** Mobilde tek birincil aksiyon — WhatsApp zaten floating butonda */
export const MobileStickyBar = () => {
    const { content } = useContentStore();

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] p-3 bg-white/95 backdrop-blur border-t border-[#c6c6c6]">
            <Link
                href="/teklif-al"
                className="flex items-center justify-center gap-2 w-full h-12 bg-[var(--color-brand-accent)] text-white font-bold text-sm tracking-wide"
            >
                <FileText size={18} />
                {content.headerConfig?.ctaText || "Teklif Al"}
            </Link>
        </div>
    );
};
