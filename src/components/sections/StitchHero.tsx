"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award, Hammer } from "lucide-react";

export function StitchHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0c10] text-white pt-20 pb-16 lg:pt-28 lg:pb-24 border-b border-zinc-800">
      {/* Decorative Radial Lights directly from Stitch design */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Lines Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Semantic Headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              1980'den Beri İzmir Alsancak Üretimi • 35.000+ Sevkiyat
            </div>

            {/* Single H1 for the page - SEO & GEO Gold Standard */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              SANATTA ASALET: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 font-serif italic font-normal">
                Endüstriyel Metal Sanatı
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed">
              1.5mm yüksek mukavemetli çelik sac üzerine 4K UV kürlemeli mikronize baskı. Duvarı delmeden asılan manyetik neodimyum askı kiti, solmazlık garantisi ve Alsancak atölyemizden doğrudan tüketiciye ve toptan işletmelere üretici fiyatıyla.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#konfigurator"
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-zinc-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Özel Posterini Tasarla</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/teklif-al"
                className="h-14 px-8 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-white font-semibold text-sm tracking-wider uppercase flex items-center justify-center transition-colors"
              >
                Toptan & Kurumsal Teklif
              </Link>
            </div>

            {/* Key Stitch Specs Metric Strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">24-48s</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mt-0.5">Hızlı Teslimat</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">1.5 mm</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mt-0.5">Paslanmaz Çelik</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">4K UV</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mt-0.5">Kürlemeli Baskı</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Metal Plate Presentation */}
          <div className="lg:col-span-6 relative w-full flex justify-center">
            {/* Ambient Aura */}
            <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full transform scale-90" />

            {/* 3D Perspective Card */}
            <div className="relative z-10 w-full max-w-[540px] aspect-[880/734] rounded-2xl p-2 sm:p-3 bg-gradient-to-br from-zinc-800/70 to-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src="/hero-izmir-metal-poster.jpg"
                  alt="İzmir Saat Kulesi Mıknatıslı Metal Poster - Veral Teneke İmalatı"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Industrial Corner Markings */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

                {/* Live Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md p-3 rounded-lg border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider block">İzmir Alsancak Üretimi</span>
                    <span className="text-xs font-bold text-white">Mıknatıslı Duvar Montaj Kiti Dahil</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-500 text-black px-2.5 py-1 rounded">
                    420 ₺'den Başlayan
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
