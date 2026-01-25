import Link from 'next/link'
import { EmptyState } from '@/components/ui/empty-state'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 min-h-[60vh] flex items-center justify-center">
            <EmptyState
                title="SAYFA BULUNAMADI - 404"
                description="Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir. Navigasyonu kullanarak ana sayfaya dönebilirsiniz."
                actionLabel="ANA SAYFAYA DÖN"
                actionHref="/"
                icon={<FileQuestion className="w-10 h-10" />}
            />
        </div>
    )
}
