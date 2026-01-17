"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Zap, Target, Rocket, ArrowRight, Layers } from "lucide-react";

const roadmapItems = [
    {
        phase: "PHASE 01",
        title: "CORE ENERGIZE",
        status: "in-progress",
        items: [
            { id: "1.1", text: "Iyzico Ödeme Entegrasyonu", done: false },
            { id: "1.2", text: "Supabase Veri Tabanı Geçişi", done: true },
            { id: "1.3", text: "Medya Optimizasyonu (%100 WebP)", done: false },
            { id: "1.4", text: "Admin Kontrol Paneli v1.0", done: false }
        ],
        icon: <Zap className="w-8 h-8" />,
        color: "bg-[var(--color-brand-safety-orange)]"
    },
    {
        phase: "PHASE 02",
        title: "GROWTH ENGINE",
        status: "planned",
        items: [
            { id: "2.1", text: "FOMO Dinamik Sayaç Sistemi", done: false },
            { id: "2.2", text: "Canlı Satış Bildirimleri (Social Proof)", done: false },
            { id: "2.3", text: "Müşteri Deneyim Galerisi", done: false }
        ],
        icon: <Target className="w-8 h-8" />,
        color: "bg-[#FFD700]"
    },
    {
        phase: "PHASE 03",
        title: "EXPERIENCE EVOLVE",
        status: "planned",
        items: [
            { id: "3.1", text: "Ultra Hassas Detay Zoom", done: false },
            { id: "3.2", text: "Özel Tasarım Yükleme Portalı", done: false },
            { id: "3.3", text: "Artırılmış Gerçeklik (AR) Önizleme", done: false }
        ],
        icon: <Layers className="w-8 h-8" />,
        color: "bg-blue-500"
    },
    {
        phase: "PHASE 04",
        title: "SYSTEM DEPLOY",
        status: "planned",
        items: [
            { id: "4.1", text: "Vercel Production Deployment", done: false },
            { id: "4.2", text: "SSL ve Global Domain Kurulumu", done: false },
            { id: "4.3", text: "SEO ve SEM Optimizasyonu", done: false }
        ],
        icon: <Rocket className="w-8 h-8" />,
        color: "bg-green-500"
    }
];

export const RoadmapSection = () => {
    return (
        <section id="roadmap" className="py-24 bg-black text-white overflow-hidden relative border-t-8 border-white">
            {/* Background scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />

            <div className="container-brutal relative z-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-[var(--color-brand-safety-orange)] text-black px-4 py-1 font-mono font-black text-sm uppercase"
                        >
                            <Zap className="w-4 h-4" /> SİSTEM EVRİMİ v4.5
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-[Archivo Black] leading-none uppercase tracking-tighter">
                            FLASH <span className="text-outline-white">YOL HARİTASI</span>
                        </h2>
                    </div>
                    <div className="font-mono text-right hidden md:block">
                        <p className="text-white/40 mb-2">GÜNCELLEME DURUMU</p>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-green-500 animate-pulse rounded-full" />
                            <span className="text-2xl font-black">OPERASYONEL</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {roadmapItems.map((phase, idx) => (
                        <RoadmapCard key={phase.phase} phase={phase} index={idx} />
                    ))}
                </div>

                {/* Technical stats footer */}
                <div className="mt-20 pt-12 border-t-4 border-white/20 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono">
                    <div className="space-y-1">
                        <span className="text-white/40 block text-xs">GELİŞTİRME DERECESİ</span>
                        <div className="text-2xl font-black">BETA 0.8.2</div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-white/40 block text-xs">TOPLAM GÖREV</span>
                        <div className="text-2xl font-black">13 MODÜL</div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-white/40 block text-xs">TAMAMLANMA</span>
                        <div className="text-2xl font-black">~%25</div>
                    </div>
                    <div className="space-y-1 text-right">
                        <span className="text-white/40 block text-xs">SON KAYIT</span>
                        <div className="text-2xl font-black">17.01.2026</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RoadmapCard = ({ phase, index }: { phase: typeof roadmapItems[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col h-full bg-[#121212] border-4 border-white/20 p-8 hover:border-white transition-all duration-300"
        >
            <div className={`absolute top-0 right-0 w-16 h-16 ${phase.color} flex items-center justify-center text-black group-hover:scale-110 transition-transform`}>
                {phase.icon}
            </div>

            <div className="mb-12">
                <span className="font-mono font-black text-white/40 mb-2 block">{phase.phase}</span>
                <h3 className="text-3xl font-[Archivo Black] leading-tight uppercase group-hover:text-[var(--color-brand-safety-orange)] transition-colors">{phase.title}</h3>
            </div>

            <div className="flex-grow space-y-6">
                {phase.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                        {item.done ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                        ) : (
                            <Circle className="w-6 h-6 text-white/20 shrink-0 mt-1" />
                        )}
                        <span className={`font-mono text-base ${item.done ? 'line-through text-white/40' : 'text-white'}`}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t-2 border-white/10 flex justify-between items-center group-hover:border-white/30 transition-colors">
                <span className="font-mono text-xs font-black uppercase text-white/40">
                    DURUM: {phase.status === 'in-progress' ? 'AKTİF' : phase.status === 'planned' ? 'SIRADA' : 'BEKLEMEDE'}
                </span>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:translate-x-2 group-hover:text-white transition-all" />
            </div>
        </motion.div>
    );
};

export default RoadmapSection;
