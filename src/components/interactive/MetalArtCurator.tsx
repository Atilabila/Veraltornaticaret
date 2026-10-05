"use client";

import React, { useState } from "react";
import { Sparkles, Bot, ShieldCheck, Loader2 } from "lucide-react";

export function MetalArtCurator() {
    const [roomType, setRoomType] = useState("Salon & Oturma Odası");
    const [stylePreference, setStylePreference] = useState("Endüstriyel & Loft");
    const [dimensions, setDimensions] = useState("Orta Boy (45x67 cm)");
    const [specialRequest, setSpecialRequest] = useState("");
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<string | null>(null);

    const handleCurate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setRecommendation(null);

        try {
            const res = await fetch("/api/ai/curator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomType,
                    stylePreference,
                    dimensions,
                    specialRequest,
                }),
            });

            const data = await res.json();
            setRecommendation(data.recommendation || "Tavsiye üretilemedi.");
        } catch {
            setRecommendation("Bağlantı hatası oluştu, lütfen tekrar deneyiniz.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="my-16 p-6 md:p-12 rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                        <Bot className="w-3.5 h-3.5" /> STITCH & GEMINI AI DESTEKLİ KÜRATÖR
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
                        Odanıza Özel Metal Poster Kombinasyonunu Oluşturun
                    </h2>
                    <p className="text-sm md:text-base text-zinc-400">
                        Alsancak atölyemizin 40 yıllık malzeme bilgisi ve yapay zeka küratörümüzle mekanınıza en uygun ölçü, mıknatıs ve renk dengesini hesaplayın.
                    </p>
                </div>

                <form onSubmit={handleCurate} className="space-y-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-2">
                                Mekan Türü
                            </label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full h-11 px-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                            >
                                <option>Salon & Oturma Odası</option>
                                <option>Çalışma Odası & Ofis</option>
                                <option>Yatak Odası</option>
                                <option>Oyun Odası / Gaming</option>
                                <option>Kafe & Restoran</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-2">
                                Dekorasyon Stili
                            </label>
                            <select
                                value={stylePreference}
                                onChange={(e) => setStylePreference(e.target.value)}
                                className="w-full h-11 px-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                            >
                                <option>Endüstriyel & Loft</option>
                                <option>Minimalist & Modern</option>
                                <option>Retro & Otomotiv</option>
                                <option>Cyberpunk & Karanlık Tema</option>
                                <option>Teknik Şematik & Blueprint</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-2">
                                Ölçü Tercihi
                            </label>
                            <select
                                value={dimensions}
                                onChange={(e) => setDimensions(e.target.value)}
                                className="w-full h-11 px-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                            >
                                <option>Küçük Boy (30x45 cm)</option>
                                <option>Orta Boy (45x67 cm)</option>
                                <option>Büyük Boy (60x90 cm)</option>
                                <option>Çoklu Galeri Duvarı (Triptik)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-2">
                            Duvar Rengi veya Özel İstek (Opsiyonel)
                        </label>
                        <input
                            type="text"
                            placeholder="Örn: Koyu gri duvar, doğrudan güneş alıyor, mat doku istiyorum..."
                            value={specialRequest}
                            onChange={(e) => setSpecialRequest(e.target.value)}
                            className="w-full h-11 px-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-zinc-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Atölye Küratörü Analiz Ediyor...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" /> Usta Tavsiyeli Poster Analizi Al
                            </>
                        )}
                    </button>
                </form>

                {recommendation && (
                    <div className="mt-8 p-6 md:p-8 rounded-xl border border-emerald-500/40 bg-zinc-950/90 text-zinc-200">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                            <ShieldCheck className="w-4 h-4" /> VERAL ATÖLYESİ KÜRATÖR TAVSİYESİ
                        </div>
                        <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
                            {recommendation}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
