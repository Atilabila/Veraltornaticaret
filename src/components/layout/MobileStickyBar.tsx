"use client";

import Link from "next/link";
import { FileText, MessageCircle } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";

/** Mobil thumb zone: iki birincil aksiyon, safe-area uyumlu */
export const MobileStickyBar = () => {
    const { content } = useContentStore();
    const phone = (content.whatsappNumber || "905323794003").replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
        content.whatsappMessage || "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum."
    );
    const whatsappHref = `https://wa.me/${phone}?text=${message}`;
    const ctaText = content.headerConfig?.ctaText || "Teklif Al";

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-[90] border-t border-atl-line bg-atl-bg/95 px-3 pt-2.5 backdrop-blur-md lg:hidden"
            style={{ paddingBottom: "max(0.65rem, env(safe-area-inset-bottom))" }}
        >
            <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#25D366]/50 bg-[#25D366]/10 px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7dffb0] active:bg-[#25D366]/20"
                >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                    WhatsApp
                </a>
                <Link
                    href="/teklif-al"
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-atl-brass px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-atl-bg active:bg-atl-brass-light"
                >
                    <FileText className="h-4 w-4 shrink-0" aria-hidden />
                    {ctaText}
                </Link>
            </div>
        </div>
    );
};
