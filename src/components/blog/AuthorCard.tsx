import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AuthorCard({
    className = "",
    hideAvatar = false,
}: {
    className?: string;
    hideAvatar?: boolean;
}) {
    return (
        <aside className={`my-10 rounded-2xl border border-atl-line bg-atl-surface p-6 shadow-sm md:p-8 ${className}`}>
            <div className={`flex gap-6 ${hideAvatar ? "items-start" : "flex-col items-center sm:flex-row sm:items-start"}`}>
                {hideAvatar ? null : (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-atl-brass/30 bg-atl-surface-2 shadow-sm sm:h-24 sm:w-24">
                        <Image
                            src="/hero-izmir-metal-poster.jpg"
                            alt="Oğuzcan Veral - İmalat Direktörü ve Teknik Editör"
                            fill
                            sizes="96px"
                            className="object-cover"
                        />
                    </div>
                )}
                <div className={`flex-1 ${hideAvatar ? "text-left" : "text-center sm:text-left"}`}>
                    <div className={`mb-1.5 flex flex-wrap items-center gap-2 ${hideAvatar ? "justify-start" : "justify-center sm:justify-start"}`}>
                        <Link
                            href="/yazar/oguzcan-veral"
                            className="text-lg font-bold text-atl-text hover:text-atl-brass transition-colors"
                        >
                            Oğuzcan Veral
                        </Link>
                        <span className="inline-flex items-center gap-1 rounded border border-atl-brass/20 bg-atl-brass-tint px-2 py-0.5 font-sans text-xs font-semibold text-atl-brass">
                            <CheckCircle2 className="w-3 h-3 text-atl-brass" /> Doğrulanmış İmalatçı & Editör
                        </span>
                    </div>
                    <p className="text-xs font-mono text-atl-muted mb-2">
                        İmalat Direktörü & Editör · Veral Torna & Teneke Ticaret (İzmir Alsancak)
                    </p>
                    <p className="text-sm text-atl-muted leading-relaxed mb-3">
                        İzmir Alsancak atölyemizde torna tezgahlarından 4K endüstriyel UV baskı hatlarına kadar siparişlerin üretim kalitesini, tolerans standartlarını ve teknik içeriklerini yönetmektedir.
                    </p>
                    <Link
                        href="/yazar/oguzcan-veral"
                        className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm font-semibold text-atl-brass transition-colors hover:text-atl-brass-light group"
                    >
                        Tüm İnceleme ve Atölye Yazıları <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
