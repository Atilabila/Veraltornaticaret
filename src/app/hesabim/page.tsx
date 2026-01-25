import { EmptyState } from '@/components/ui/empty-state'
import { UserCheck } from 'lucide-react'

export default function HesabimPage() {
    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black mb-8 uppercase tracking-widest text-[#0A0A0A] dark:text-white border-l-4 border-[#D4AF37] pl-4">Hesabım</h1>
                <EmptyState
                    title="GİRİŞ YAPILMADI"
                    description="Siparişlerinizi takip etmek ve teklif durumlarını görmek için giriş yapmalısınız."
                    actionLabel="GİRİŞ YAP / KAYIT OL"
                    actionHref="/auth/login" // Future auth route
                    icon={<UserCheck className="w-8 h-8" />}
                />
            </div>
        </div>
    )
}
