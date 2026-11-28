"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { Sparkles, Shield, Truck, Magnet, Check, ArrowRight, Layers, Sliders } from "lucide-react";

interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  weight: string;
  ratio: string;
}

interface FinishOption {
  id: string;
  name: string;
  subtitle: string;
  accentClass: string;
  priceDelta: number;
  sheen: string;
}

interface MountOption {
  id: string;
  name: string;
  desc: string;
  priceDelta: number;
}

const SIZES: SizeOption[] = [
  { id: "m", name: "M Standart", dimensions: "32 × 45 cm", basePrice: 420, weight: "0.85 kg", ratio: "aspect-[32/45]" },
  { id: "l", name: "L Galeri", dimensions: "48 × 67 cm", basePrice: 740, weight: "1.90 kg", ratio: "aspect-[48/67]" },
  { id: "xl", name: "XL Mimari", dimensions: "64 × 90 cm", basePrice: 1280, weight: "3.40 kg", ratio: "aspect-[64/90]" },
];

const FINISHES: FinishOption[] = [
  {
    id: "matte",
    name: "Mat Endüstriyel",
    subtitle: "Parlama yapmayan, anti-reflektif doku",
    accentClass: "from-zinc-700 to-zinc-900 border-zinc-500",
    priceDelta: 0,
    sheen: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.85) 80%)"
  },
  {
    id: "brushed",
    name: "Fırçalanmış Çelik",
    subtitle: "Yatay metalik fırça hatları ve ışık kırılması",
    accentClass: "from-slate-400 to-zinc-700 border-amber-500/60",
    priceDelta: 90,
    sheen: "repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 5px), radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3) 0%, rgba(15,23,42,0.9) 70%)"
  },
  {
    id: "gold",
    name: "Altın Varak Metalik",
    subtitle: "Lüks sıcak altın yansımalı premium kaplama",
    accentClass: "from-amber-500 to-yellow-700 border-amber-400",
    priceDelta: 160,
    sheen: "radial-gradient(circle at 30% 30%, rgba(253,230,138,0.35) 0%, rgba(180,83,9,0.7) 60%, rgba(24,24,27,0.95) 100%)"
  },
  {
    id: "gloss",
    name: "Ultra Parlak UV",
    subtitle: "4K derin siyah ve canlı renk canlılığı",
    accentClass: "from-blue-600 to-zinc-950 border-blue-400",
    priceDelta: 75,
    sheen: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.8) 100%)"
  }
];

const MOUNTINGS: MountOption[] = [
  { id: "magnet", name: "Duvar Delmeyen Mıknatıs Kiti", desc: "3M VHB Ped + N35 Neodimyum Mıknatıs (Duvarda 0 delik, 30 saniyede asım)", priceDelta: 0 },
  { id: "standoff", name: "Paslanmaz Krom Standoff (4 Adet)", desc: "Duvardan 25mm havada yüzen mimari galeri montaj vidaları", priceDelta: 120 },
  { id: "raw", name: "Yalnızca Metal Levha (Montajsız)", desc: "Mevcut çerçeveniz veya vitrin asımınız için", priceDelta: -50 }
];

export function StitchPosterConfigurator() {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[1]);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISHES[1]);
  const [selectedMount, setSelectedMount] = useState<MountOption>(MOUNTINGS[0]);
  const [added, setAdded] = useState(false);
  const sizeGroupId = useId();
  const finishGroupId = useId();
  const mountGroupId = useId();

  const totalPrice = selectedSize.basePrice + selectedFinish.priceDelta + selectedMount.priceDelta;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-2xl border border-zinc-800 bg-[#0d0f14] text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-zinc-800/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            <Sliders className="w-3.5 h-3.5" /> STITCH STUDIO 2026 — DİJİTAL İMALAT KONFİGÜRATÖRÜ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Özel Metal Posterinizi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Canlı Tasarlayın</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Alsancak atölyemizde 1.5mm paslanmaz çelik sac üzerine 4K UV kürleme ile basılır. Ölçü, metalik doku ve montaj aparatını seçin.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-400" /> Ömür Boyu Paslanmazlık</span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-amber-400" /> 24-48 Saat Kargo</span>
        </div>
      </div>

      {/* Main Grid: Interactive Stage (Left) & Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Visual Stage */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-zinc-950/70 rounded-xl border border-zinc-800 p-8 sm:p-12 relative min-h-[460px]">
          {/* Dimension indicator badge */}
          <div className="absolute top-4 left-4 text-xs font-mono text-zinc-400 bg-zinc-900/90 px-3 py-1 rounded border border-zinc-800">
            {selectedSize.dimensions} • {selectedSize.weight}
          </div>

          <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded border border-amber-800/40 flex items-center gap-1.5">
            <Magnet className="w-3.5 h-3.5" /> Mıknatıslı Sistem
          </div>

          {/* Simulated Metal Plate */}
          <div
            className={`relative w-64 sm:w-72 md:w-80 ${selectedSize.ratio} rounded-md shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden flex items-center justify-center p-6 text-center group`}
            style={{
              background: selectedFinish.sheen,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
            }}
          >
            {/* Fine metal brushing overlay */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Inner Plate Graphic / Text */}
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-amber-300/80 block">
                VERAL ALSANCAC ATELIER
              </span>
              <p className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white drop-shadow-md">
                ENDÜSTRİYEL SANAT
              </p>
              <div className="w-12 h-0.5 bg-amber-400 mx-auto" />
              <p className="text-[11px] text-zinc-300 font-light max-w-[180px] mx-auto leading-relaxed">
                4K UV Kürlemeli Çelik Baskı
                <br />
                {selectedFinish.name}
              </p>
            </div>

            {/* Corner Industrial Rivet Accents */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-zinc-400/60 shadow-inner" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-400/60 shadow-inner" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-zinc-400/60 shadow-inner" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-zinc-400/60 shadow-inner" />
          </div>

          {/* Quick Explanatory Footer */}
          <div className="mt-8 flex items-center gap-6 text-xs text-zinc-400 text-center">
            <span>✓ Çift Kat Mat Fırın Vernik</span>
            <span>✓ Güneş Işığına ve Suya Dayanıklı</span>
            <span>✓ Duvarı Delmeden Asım</span>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. ÖLÇÜ SEÇİMİ */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" /> 1. ÖLÇÜ SEÇİN
              </label>
              <span className="text-xs text-zinc-500">Standart Levha Boyutları</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {SIZES.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/10 text-white shadow-lg shadow-amber-500/10"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{size.name}</div>
                    <div className="text-xs font-mono text-zinc-400 mt-0.5">{size.dimensions}</div>
                    <div className="text-xs font-mono font-semibold text-amber-400 mt-2">{size.basePrice} ₺</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. METALİK DOKU / BİTİŞ SEÇİMİ */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> 2. METAL YÜZEY BİTİŞİ
              </label>
              <span className="text-xs text-amber-400/90">{selectedFinish.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {FINISHES.map((finish) => {
                const isSelected = selectedFinish.id === finish.id;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setSelectedFinish(finish)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/10 text-white shadow-lg shadow-amber-500/10"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{finish.name}</span>
                      {finish.priceDelta > 0 && (
                        <span className="text-[11px] font-mono text-amber-400">+{finish.priceDelta} ₺</span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{finish.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. MONTAJ APARATI */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block mb-3">
              3. MONTAJ & DUVAR ASKI SİSTEMİ
            </label>

            <div className="space-y-2">
              {MOUNTINGS.map((mount) => {
                const isSelected = selectedMount.id === mount.id;
                return (
                  <button
                    key={mount.id}
                    type="button"
                    onClick={() => setSelectedMount(mount)}
                    className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/10 text-white"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{mount.name}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{mount.desc}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 shrink-0">
                      {mount.priceDelta === 0 ? "Dahil" : mount.priceDelta > 0 ? `+${mount.priceDelta} ₺` : `${mount.priceDelta} ₺`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono block">Toplam Tutar (KDV Dahil)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">{totalPrice} ₺</span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Ücretsiz Kargo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none h-12 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-zinc-950" /> Sepete Eklendi
                  </>
                ) : (
                  <>
                    Hemen Sipariş Ver <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <Link
                href="/teklif-al"
                className="h-12 px-5 rounded-xl border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center transition-colors"
              >
                Toptan Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
