"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Hammer } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">

                {/* 404 Industrial Glitch Text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative mb-8"
                >
                    <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-800 select-none">
                        404
                    </h1>
                    <div className="absolute -top-4 -right-12 md:right-0 rotate-12 bg-primary text-black font-bold px-4 py-1 text-sm uppercase tracking-wider transform">
                        Hata Raporu #X92
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 max-w-lg mx-auto"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                        Aradığınız Parça Bulunamadı
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Üretim bandında bir aksaklık olmuş olabilir veya aradığınız sayfa geri dönüşüme gönderilmiş olabilir.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link href="/" className="group">
                            <div className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Ana Sayfaya Dön
                            </div>
                        </Link>

                        <Link href="/metal-showcase" className="group">
                            <div className="px-8 py-4 border border-zinc-700 text-white font-bold uppercase tracking-wider text-sm hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
                                <Search className="w-4 h-4" />
                                Koleksiyona Bak
                            </div>
                        </Link>
                    </div>

                    <div className="pt-12 flex items-center justify-center gap-2 text-zinc-600 text-xs uppercase tracking-widest opacity-60">
                        <Hammer className="w-3 h-3" />
                        <span>Veral Metal Works &copy; System Diagnostics</span>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
