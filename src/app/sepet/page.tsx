import { EmptyState } from '@/components/ui/empty-state'
import { ShoppingBag } from 'lucide-react'

export default function SepetPage() {
    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black mb-8 uppercase tracking-widest text-[#0A0A0A] dark:text-white border-l-4 border-[#D4AF37] pl-4">Alışveriş Sepeti</h1>
                <EmptyState
                    title="SEPETİNİZ BOŞ"
                    description="Henüz sepetinize bir ürün eklemediniz. Endüstriyel koleksiyonumuzu inceleyerek başlayabilirsiniz."
                    actionLabel="KATALOĞA GİT"
                    actionHref="/urunler"
                    icon={<ShoppingBag className="w-8 h-8" />}
                />
            </div>
        </div>
    )
}
