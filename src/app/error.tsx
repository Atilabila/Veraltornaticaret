'use client'

import { useEffect } from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container mx-auto flex min-h-[40vh] items-center justify-center px-4 py-10 sm:min-h-[50vh] sm:py-14">
            <div className="flex w-full max-w-md flex-col items-center gap-4">
                <EmptyState
                    title="SİSTEM HATASI"
                    description="Beklenmedik bir protokol hatası oluştu. Teknik ekip bilgilendirildi."
                    icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
                />
                <button
                    type="button"
                    onClick={reset}
                    className="min-h-11 px-6 text-xs font-black uppercase tracking-[0.2em] border border-atl-line transition-colors hover:bg-atl-surface-2"
                >
                    TEKRAR DENE
                </button>
            </div>
        </div>
    )
}
