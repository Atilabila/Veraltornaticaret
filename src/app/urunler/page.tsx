import { Metadata } from "next"
import { getProducts } from "@/lib/actions/metal-products.actions"
import { ProductGrid } from "@/components/product/ProductGrid"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

export const metadata: Metadata = {
    title: "Katalog | VERAL Metal Works",
    description: "Endüstriyel metal tablo ve dekorasyon koleksiyonu.",
};

export default async function ProductsPage() {
    const { data: products } = await getProducts()

    return (
        <div className="min-h-screen bg-zinc-950 text-foreground selection:bg-primary selection:text-black">
            {/* Industrial Hero Header */}
            <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-white/5">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -top-32 -right-32 pointer-events-none mix-blend-screen" />

                <div className="container mx-auto">
                    <div className="flex flex-col gap-6 max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Canlı Stok</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white font-[Archivo_Black]">
                            Metal <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">Katalog</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                            Endüstriyel hassasiyetle işlenmiş, fırın boyalı ve paslanmaz çelik eserler.
                            Mekanlarınız için kalıcı değerler.
                        </p>
                    </div>
                </div>
            </div>

            {/* Toolbar / Filters */}
            <div className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient">
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-4">Filtrele:</span>
                        {['Tümü', 'Metal Tablo', 'Saat', 'Özel Üretim'].map((cat, i) => (
                            <button key={i} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${i === 0 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-6">
                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="hidden sm:inline">Sırala</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="container mx-auto px-6 py-12">
                <ProductGrid products={products || []} />
            </div>

            {/* Footer Banner */}
            <div className="border-t border-white/5 bg-zinc-900/50 py-24 text-center">
                <h2 className="text-3xl font-black uppercase text-white mb-6">Özel Bir Projeniz mi Var?</h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                    Katalogdaki ürünler ihtiyacınızı karşılamıyorsa, teknik çizimlerinizle bize ulaşın. Sizin için üretelim.
                </p>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
                    TEKLİF AL
                </Button>
            </div>
        </div>
    )
}
