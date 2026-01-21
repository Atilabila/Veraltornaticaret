"use client";

import React from 'react';
import { MessageSquare, Phone, FileText } from 'lucide-react';
import Link from 'next/link';

export const MobileStickyBar = () => {
    return (
        <div className="lg:hidden mobile-sticky-bar border-t border-steel-gray">
            <Link href="https://wa.me/905071651315" className="sticky-action">
                <MessageSquare size={20} />
                <span>WhatsApp</span>
            </Link>
            <Link href="tel:+905071651315" className="sticky-action">
                <Phone size={20} />
                <span>Ara</span>
            </Link>
            <Link href="#contact" className="sticky-action accent">
                <FileText size={20} />
                <span>Teklif İste</span>
            </Link>
        </div>
    );
};
