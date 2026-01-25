import { EmptyState } from '@/components/ui/empty-state'
import { Hammer } from 'lucide-react'

export default function UretimPage() {
    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black mb-8 uppercase tracking-widest text-[#0A0A0A] dark:text-white border-l-4 border-[#D4AF37] pl-4">
                    Endüstriyel Üretim
                </h1>
                <EmptyState
                    title="ÜRETİM HATLARI DİJİTALLEŞİYOR"
                    description="Torna, pres ve teneke işleme hizmetlerimiz detaylı teknik verilerle çok yakında burada olacak. Özel üretim talepleriniz için teklif sistemini kullanabilirsiniz."
                    actionLabel="TEKLİF AL"
                    actionHref="/teklif"
                    icon={<Hammer className="w-8 h-8" />}
                />
            </div>
        </div>
    )
}
