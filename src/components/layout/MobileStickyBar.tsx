"use client";

import React from 'react';
import { MessageSquare, Phone, ShoppingBag } from 'lucide-react';
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
            <Link href="/urunler" className="sticky-action accent">
                <ShoppingBag size={20} />
                <span>Urunler</span>
            </Link>
        </div>
    );
};
