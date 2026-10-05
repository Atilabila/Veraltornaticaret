"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award } from "lucide-react";

export function StitchHero() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] text-[#161616] pt-16 pb-16 lg:pt-24 lg:pb-24 border-b border-[#e5e7eb]">
      {/* Decorative Warm Metallic Accents (NO BLUE, NO PITCH-BLACK) */}
      <div className="absolute top-[-80px] left-[-80px] w-[450px] h-[450px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Semantic Headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              1980'den Beri İzmir Alsancak Üretimi • 35.000+ Sevkiyat
            </div>

            {/* Single H1 for the page - SEO & GEO Gold Standard */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#161616] leading-[1.05]">
              SANATTA ASALET: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 font-serif italic font-normal">
                Endüstriyel Metal Sanatı
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4b5563] max-w-2xl font-normal leading-relaxed">
              1.5mm yüksek mukavemetli çelik sac üzerine 4K UV kürlemeli mikronize baskı. Duvarı delmeden asılan manyetik neodimyum askı kiti, solmazlık garantisi ve Alsancak atölyemizden doğrudan tüketiciye ve toptan işletmelere üretici fiyatıyla.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/urunler"
                className="h-14 px-8 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Koleksiyonu Keşfet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/teklif-al"
                className="h-14 px-8 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold text-sm tracking-wider uppercase flex items-center justify-center transition-colors shadow-sm"
              >
                Toptan & Kurumsal Teklif
              </Link>
            </div>

            {/* Key Specs Metric Strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-[#161616]">24-48s</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-700 font-bold mt-0.5">Hızlı Teslimat</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-[#161616]">1.5 mm</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-700 font-bold mt-0.5">Paslanmaz Çelik</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-[#161616]">4K UV</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-700 font-bold mt-0.5">Kürlemeli Baskı</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Metal Plate Presentation */}
          <div className="lg:col-span-6 relative w-full flex justify-center">
            {/* Ambient Aura */}
            <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full transform scale-90" />

            {/* 3D Perspective Card with User's Uploaded Izmir Poster */}
            <div className="relative z-10 w-full max-w-[540px] aspect-[880/734] rounded-2xl p-2 sm:p-3 bg-white border border-zinc-200 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <Image
                  src="/hero-izmir-metal-poster.jpg"
                  alt="İzmir Saat Kulesi Mıknatıslı Metal Poster - Veral Teneke İmalatı"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Industrial Corner Markings */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-600" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-600" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-600" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-600" />

                {/* Live Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-zinc-200 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-700 font-bold tracking-wider block">İzmir Alsancak Üretimi</span>
                    <span className="text-xs font-bold text-zinc-900">Mıknatıslı Duvar Montaj Kiti Dahil</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-600 text-white px-2.5 py-1 rounded shadow-sm">
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
