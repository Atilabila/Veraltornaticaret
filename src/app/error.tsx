'use client'

import { useEffect } from 'react'
import Link from 'next/link'
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
        <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
            <AlertTriangle className="mb-4 h-8 w-8 text-atl-brass" aria-hidden />
            <h1 className="font-display text-3xl text-atl-text sm:text-4xl">Sayfa açılamadı</h1>
            <p className="mt-3 text-base leading-relaxed text-atl-muted">
                Bu ekran yüklenemedi. Tekrar deneyin ya da ana sayfaya dönün.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <button
                    type="button"
                    onClick={reset}
                    className="inline-flex min-h-12 items-center justify-center bg-atl-brass px-6 font-sans text-sm font-semibold tracking-normal text-atl-bg transition-colors hover:bg-atl-brass-light"
                >
                    Tekrar dene
                </button>
                <Link
                    href="/"
                    className="inline-flex min-h-12 items-center justify-center border border-atl-line px-6 font-sans text-sm font-semibold tracking-normal text-atl-text transition-colors hover:border-atl-brass"
                >
                    Ana sayfa
                </Link>
            </div>
        </div>
    )
}
