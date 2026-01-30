import { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/actions/metal-products.actions"
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { CatalogContainer } from "@/components/product/CatalogContainer"

export const metadata: Metadata = {
    title: "Katalog | VERAL Metal Works",
    description: "Endüstriyel metal tablo ve dekorasyon koleksiyonu.",
};

export const revalidate = 0; // Disable cache for debugging or set to 60

export default async function ProductsPage() {
    const [{ data: products }, { data: categories }] = await Promise.all([
        getProducts(),
        getCategories()
    ])

    return (
        <main className="min-h-screen bg-zinc-950">
            <Navigation />

            <div className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-white/5 relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full -top-32 -right-32 pointer-events-none mix-blend-screen" />

                <div className="container mx-auto">
                    <div className="flex flex-col gap-6 max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#D4AF37]/20 bg-[#D4AF37]/5 w-fit">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span className="text-[10px] font-black font-mono text-[#D4AF37] uppercase tracking-[0.2em]">Sistem: Katalog Çıktısı</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white font-[Archivo_Black] italic leading-none">
                            Metal <span className="metallic-shiny">Koleksiyon</span>
                        </h1>

                        <p className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed italic">
                            1.5mm endüstriyel çelik, UV baskı teknolojisi ve fırın boya ile işlenmiş
                            modern sanat eserleri. Mekanınızın DNA'sını değiştirin.
                        </p>
                    </div>
                </div>
            </div>

            <CatalogContainer
                products={products || []}
                categories={categories || []}
            />

            <Footer />
        </main>
    )
}
