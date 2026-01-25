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
        <div className="container mx-auto px-4 min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center w-full">
                <EmptyState
                    title="SİSTEM HATASI"
                    description="Beklenmedik bir protokol hatası oluştu. Teknik ekip bilgilendirildi."
                    icon={<AlertTriangle className="w-10 h-10 text-red-500" />}
                />
                <button
                    onClick={reset}
                    className="mt-6 px-8 py-3 text-xs font-black border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors uppercase tracking-[0.2em]"
                >
                    TEKRAR DENE
                </button>
            </div>
        </div>
    )
}
