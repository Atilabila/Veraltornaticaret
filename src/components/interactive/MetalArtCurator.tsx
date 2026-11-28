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
        <div className="max-w-4xl mx-auto p-6 md:p-10 rounded-2xl border border-zinc-200 bg-white shadow-xl relative overflow-hidden">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-600/20 mb-3">
                    <Bot className="w-3.5 h-3.5 text-amber-700" /> ATÖLYE & MEKAN KÜRATÖRÜ
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight mb-2">
                    Mekanınıza Özel Metal Poster Önerisi Alın
                </h2>
                <p className="text-sm md:text-base text-zinc-600 max-w-xl mx-auto">
                    Alsancak atölyemizin 40 yıllık malzeme bilgisiyle mekanınıza en uygun ölçü, mıknatıs ve renk dengesini hesaplayın.
                </p>
            </div>

            <form onSubmit={handleCurate} className="space-y-5">
                <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1.5">
                            Mekan Türü
                        </label>
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="w-full h-11 px-3 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
                        >
                            <option>Salon & Oturma Odası</option>
                            <option>Çalışma Odası & Ofis</option>
                            <option>Yatak Odası</option>
                            <option>Oyun Odası / Gaming</option>
                            <option>Kafe & Restoran</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1.5">
                            Dekorasyon Stili
                        </label>
                        <select
                            value={stylePreference}
                            onChange={(e) => setStylePreference(e.target.value)}
                            className="w-full h-11 px-3 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
                        >
                            <option>Endüstriyel & Loft</option>
                            <option>Minimalist & Modern</option>
                            <option>Retro & Otomotiv</option>
                            <option>Şehir & Mimari</option>
                            <option>Teknik Şematik & Blueprint</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1.5">
                            Ölçü Tercihi
                        </label>
                        <select
                            value={dimensions}
                            onChange={(e) => setDimensions(e.target.value)}
                            className="w-full h-11 px-3 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
                        >
                            <option>Küçük Boy (32x45 cm)</option>
                            <option>Orta Boy (48x67 cm)</option>
                            <option>Büyük Boy (64x90 cm)</option>
                            <option>Çoklu Galeri Duvarı (Triptik)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1.5">
                        Duvar Rengi veya Özel İstek (Opsiyonel)
                    </label>
                    <input
                        type="text"
                        placeholder="Örn: Açık gri taş duvar, doğrudan ışık alıyor..."
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors placeholder:text-zinc-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-600/20 cursor-pointer active:scale-[0.99]"
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
                <div className="mt-6 p-6 rounded-xl border border-amber-200 bg-amber-50/70 text-zinc-900 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider mb-3 pb-2 border-b border-amber-200">
                        <ShieldCheck className="w-4 h-4 text-amber-700" /> VERAL ATÖLYESİ KÜRATÖR TAVSİYESİ
                    </div>
                    <div className="prose max-w-none text-sm md:text-base text-zinc-800 leading-relaxed whitespace-pre-line font-sans">
                        {recommendation}
                    </div>
                </div>
            )}
        </div>
    );
}
