import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AuthorCard() {
    return (
        <aside className="my-10 p-6 md:p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-600/30 bg-zinc-100 flex-shrink-0 shadow-sm">
                    <Image
                        src="/hero-izmir-metal-poster.jpg"
                        alt="Oğuzcan Veral - İmalat Direktörü ve Teknik Editör"
                        fill
                        sizes="96px"
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                        <Link
                            href="/yazar/oguzcan-veral"
                            className="text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors"
                        >
                            Oğuzcan Veral
                        </Link>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-600/20 font-semibold">
                            <CheckCircle2 className="w-3 h-3 text-amber-700" /> Doğrulanmış İmalatçı & Editör
                        </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 mb-2">
                        İmalat Direktörü & Editör · Veral Torna & Teneke Ticaret (İzmir Alsancak)
                    </p>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-3">
                        İzmir Alsancak atölyemizde torna tezgahlarından 4K endüstriyel UV baskı hatlarına kadar 35.000+ siparişin üretim kalitesini, tolerans standartlarını ve teknik içeriklerini yönetmektedir.
                    </p>
                    <Link
                        href="/yazar/oguzcan-veral"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group"
                    >
                        Tüm İnceleme ve Atölye Yazıları <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
