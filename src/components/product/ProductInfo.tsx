import { ShieldCheck, Truck, RotateCcw, Box } from "lucide-react"

export const ProductInfoBlocks = () => {
    return (
        <div className="grid gap-4 py-8">
            {/* Trust Badges */}
            <div className="flex items-center gap-4 p-5 bg-industrial-gold/10 border-2 border-industrial-gold">
                <ShieldCheck className="w-10 h-10 text-industrial-gold shrink-0 border-r-2 border-industrial-gold pr-3 mr-1" />
                <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-zinc-900 font-mono">Garantili Üretim</h4>
                    <p className="text-xs font-bold text-zinc-600 mt-1">Tüm ürünler 2 yıl paslanmazlık garantilidir.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 p-4 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                    <Truck className="w-8 h-8 text-zinc-900" />
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-[0.2em] font-mono text-zinc-900">Kargo</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">3 iş günü içinde kargoda</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 p-4 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]">
                    <RotateCcw className="w-8 h-8 text-zinc-900" />
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-[0.2em] font-mono text-zinc-900">İade</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">14 gün koşulsuz iade</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProductFAQ = () => {
    return (
        <div className="space-y-4 pt-8 border-t-2 border-zinc-200">
            <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-zinc-900 italic">Sıkça Sorulan Sorular</h3>
            <div className="space-y-4">
                <details className="group border-2 border-zinc-900 bg-white shadow-[4px_4px_0_0_#18181b] [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-black uppercase text-sm tracking-widest font-mono text-zinc-900">
                        Montaj nasıl yapılır?
                        <span className="transition duration-300 group-open:-rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 text-sm font-medium text-zinc-600 border-t-2 border-zinc-100 mt-2 p-4">
                        Ürünlerimiz arkasındaki özel çift taraflı bant veya mıknatıs sistemi ile duvara kolayca asılır. Delme gerektirmez.
                    </div>
                </details>

                <details className="group border-2 border-zinc-900 bg-white shadow-[4px_4px_0_0_#18181b] [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-black uppercase text-sm tracking-widest font-mono text-zinc-900">
                        Temizliği nasıl olmalı?
                        <span className="transition duration-300 group-open:-rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 text-sm font-medium text-zinc-600 border-t-2 border-zinc-100 mt-2 p-4">
                        Hafif nemli mikrofiber bez ile silebilirsiniz. Kimyasal temizleyici kullanımı önerilmez.
                    </div>
                </details>
            </div>
        </div>
    )
}
