"use client"

import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowLeft, Search, ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { PageContainer } from '@/components/layout/PageContainer'

export default function NotFound() {
    return (
        <PageShell variant="muted" padded={false}>
            <PageContainer className="min-h-[70vh] flex flex-col items-center justify-center text-center py-24">
                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 max-w-lg"
                >
                    <p className="text-8xl md:text-9xl font-bold text-[#e0e0e0] leading-none select-none">404</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#161616]">Sayfa bulunamadı</h1>
                    <p className="text-[#525252] leading-relaxed">
                        Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Link href="/" className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[var(--color-brand-accent)] text-white text-sm font-semibold hover:bg-[#0043ce] transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Ana sayfa
                        </Link>
                        <Link href="/#hizmetler" className="inline-flex items-center justify-center gap-2 h-12 px-6 border border-[#c6c6c6] bg-white text-[#161616] text-sm font-semibold hover:border-[var(--color-brand-accent)] transition-colors">
                            Hizmetler <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/urunler" className="inline-flex items-center justify-center gap-2 h-12 px-6 border border-[#c6c6c6] bg-white text-[#161616] text-sm font-semibold hover:border-[var(--color-brand-accent)] transition-colors">
                            <Search className="w-4 h-4" /> Katalog
                        </Link>
                    </div>
                </m.div>
            </PageContainer>
        </PageShell>
    )
}
