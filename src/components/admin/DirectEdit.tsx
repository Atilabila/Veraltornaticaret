"use client";

import React from "react";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { useAdminStore } from "@/store/useAdminStore";

interface DirectEditProps {
    children: React.ReactNode;
    tab: string;
    className?: string;
}

export const DirectEdit = ({ children, tab, className = "" }: DirectEditProps) => {
    const isAdmin = useAdminStore((state) => state.isAdmin);

    if (!isAdmin) return <>{children}</>;

    return (
        <div className={`relative group/edit ${className}`}>
            {children}

            {/* Desktop Hover Overlay (Stays for visual feedback) */}
            <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover/edit:opacity-100 transition-all duration-300 z-[60] items-center justify-center backdrop-blur-[1px] pointer-events-none">
                <div className="border border-[var(--color-brand-safety-orange)]/30 absolute inset-0" />
            </div>

            {/* Floating Edit Button - Visible on mobile for admins, Hover on desktop */}
            <div className="absolute top-4 right-4 z-[70]">
                <Link
                    href={`/admin?tab=${tab}`}
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--color-brand-safety-orange)] text-white rounded-full md:rounded-lg font-black text-[10px] uppercase tracking-tighter shadow-xl hover:scale-110 active:scale-95 transition-all md:opacity-0 md:group-hover/edit:opacity-100"
                >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Düzenle</span>
                </Link>
            </div>
        </div>
    );
};
