import { EmptyState } from '@/components/ui/empty-state'
import { FileText } from 'lucide-react'

export default function TeklifPage() {
    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black mb-8 uppercase tracking-widest text-[#0A0A0A] dark:text-white border-l-4 border-[#D4AF37] pl-4">B2B Teklif Formu</h1>
                <EmptyState
                    title="TEKLİF SİSTEMİ HAZIRLANIYOR"
                    description="Toplu sipariş ve özel üretim talepleriniz için gelişmiş teklif formumuz yakında devreye girecek. Acil talepleriniz için iletişime geçebilirsiniz."
                    actionLabel="İLETİŞİME GEÇ"
                    actionHref="/iletisim"
                    icon={<FileText className="w-8 h-8" />}
                />
            </div>
        </div>
    )
}
