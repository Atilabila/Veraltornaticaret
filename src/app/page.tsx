"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ArchiveHero } from '@/components/sections/ArchiveHero';
import { TrustSection } from '@/components/sections/TrustSection';
import { ProductGridSection } from '@/components/sections/ProductGridSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { LocalContactSection } from '@/components/sections/LocalContactSection';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { SystemLabel } from '@/components/ui/Industrial';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper-white selection:bg-hazard-orange selection:text-near-black">
      {/* GLOBAL_NAV */}
      <Navigation />

      {/* CORE_EXPERIENCE */}
      <ArchiveHero />

      {/* SYSTEM_STATUS_STRIP */}
      <TrustSection />

      {/* PRODUCT_MODULES */}
      <ProductGridSection />

      {/* CHRONOLOGICAL_RECORD (About Snippet) */}
      <section className="bg-near-black text-paper-white py-24">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <SystemLabel text="KRONOLOJİK KAYIT" active />
            <h2 className="text-4xl font-bold font-space text-white uppercase leading-none">
              1980’den Bugüne <span className="text-hazard-orange">Metal İşleme Tutkusu</span>
            </h2>
            <p className="text-gray-400 text-lg font-source-sans leading-relaxed">
              Alsancak'taki mütevazı atölyemizde başlayan yolculuğumuz, bugün 3. kuşağın modern dokunuşlarıyla devam ediyor.
              Torna tezgahının ritmi ve tenekenin şekil alışıyla geçen yarım asırda, kaliteden ödün vermeden İzmir'in sanayi hafızasında yer edindik.
            </p>
            <div className="pt-4">
              <Link href="/hakkimizda" className="text-hazard-orange font-bold uppercase flex items-center gap-2 hover:gap-4 transition-all">
                HİKAYEMİZİN DEVAMI →
              </Link>
            </div>
          </div>
          <div className="border border-steel-gray p-2 grayscale hover:grayscale-0 transition-all">
            <img src="/alsancak-mockup.png" alt="Tarihçe" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* PROCESS_MATRIX */}
      <ProcessSection />

      {/* CONTACT_TERMINAL */}
      <LocalContactSection />

      {/* GLOBAL_FOOTER */}
      <Footer />

      {/* INTERACTION_LAYER */}
      <MobileStickyBar />
    </main>
  );
}
