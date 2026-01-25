import { ShieldCheck, Truck, RotateCcw, Box } from "lucide-react"

export const ProductInfoBlocks = () => {
    return (
        <div className="grid gap-4 py-6">
            {/* Trust Badges */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20 border border-border/50">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                <div>
                    <h4 className="font-bold text-sm">Garantili Üretim</h4>
                    <p className="text-xs text-muted-foreground">Tüm ürünler 2 yıl paslanmazlık garantilidir.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <h4 className="font-bold text-xs uppercase">Kargo</h4>
                        <p className="text-xs text-muted-foreground">3 iş günü içinde kargoda</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors">
                    <RotateCcw className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <h4 className="font-bold text-xs uppercase">İade</h4>
                        <p className="text-xs text-muted-foreground">14 gün koşulsuz iade</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProductFAQ = () => {
    return (
        <div className="space-y-4 pt-8 border-t border-border">
            <h3 className="font-display font-bold text-lg">Sıkça Sorulan Sorular</h3>
            <div className="space-y-2">
                <details className="group border border-border rounded-lg bg-card open:bg-muted/10 transition-colors">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        Montaj nasıl yapılır?
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
                        Ürünlerimiz arkasındaki özel çift taraflı bant veya mıknatıs sistemi ile duvara kolayca asılır. Delme gerektirmez.
                    </div>
                </details>

                <details className="group border border-border rounded-lg bg-card open:bg-muted/10 transition-colors">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        Temizliği nasıl olmalı?
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
                        Hafif nemli mikrofiber bez ile silebilirsiniz. Kimyasal temizleyici kullanımı önerilmez.
                    </div>
                </details>
            </div>
        </div>
    )
}
