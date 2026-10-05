import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AuthorCard() {
    return (
        <aside className="my-10 p-6 md:p-8 rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-zinc-800 flex-shrink-0">
                    <Image
                        src="/alsancak-mockup.png"
                        alt="Atila Bila - Metal Zanaatı ve UV Baskı Uzmanı"
                        fill
                        sizes="96px"
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                        <Link
                            href="/yazar/atila-bila"
                            className="text-lg font-bold text-white hover:text-emerald-400 transition-colors"
                        >
                            Atila Bila
                        </Link>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> E-E-A-T Doğrulanmış Usta
                        </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mb-2">
                        Teknik Direktör · Veral Torna & Teneke Ticaret (İzmir Alsancak)
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                        20 yılı aşkın süredir torna tezgahlarından 1200 DPI endüstriyel UV baskı hatlarına kadar 35.000+ siparişin üretim kalitesini ve malzeme dayanımını denetlemektedir.
                    </p>
                    <Link
                        href="/yazar/atila-bila"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
                    >
                        Tüm Uzmanlık Profili ve Yazıları <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
