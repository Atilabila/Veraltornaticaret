"use client";

import React, { useState } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";

export function BacklinkBadge() {
    const [copied, setCopied] = useState(false);

    const embedCode = `<a href="https://veralteneketicaret.com" target="_blank" rel="noopener" title="Veral Teneke - Endüstriyel Metal Poster ve Dosya Teli İmalatı"><img src="https://veralteneketicaret.com/veral-logo.webp" alt="Veral Teneke Onaylı İmalatçı Rozeti" width="140" height="40" style="border:0;" /></a>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 my-8 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-2">
                <ShieldCheck className="w-4 h-4" /> MİMARİ VE TASARIM PARTNERİ ROZETİ (BACKLINK PROTOKOLÜ)
            </div>
            <h4 className="text-base font-bold text-white mb-2">
                Web Sitenize veya Portfolyonuza Onaylı İmalatçı Rozetini Ekleyin
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                İç mimarlar, matbaalar ve grafik tasarımcılar projelerinde Veral imalat onayını sunmak için aşağıdaki HTML kodunu sitelerine ekleyebilirler.
            </p>

            <div className="relative">
                <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto select-all">
                    {embedCode}
                </pre>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Kopyalandı
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" /> Kodu Kopyala
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
