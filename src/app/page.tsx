"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ArchiveHero } from '@/components/sections/ArchiveHero';
import { TrustSection } from '@/components/sections/TrustSection';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { GalleryShowcase } from '@/components/sections/GalleryShowcase';
import { ProductConfigurator } from '@/components/sections/ProductConfigurator';
import { CustomerReviews } from '@/components/sections/CustomerReviews';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { LocalContactSection } from '@/components/sections/LocalContactSection';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] selection:bg-[#D4AF37] selection:text-white">
      {/* GLOBAL_NAV */}
      <Navigation />

      {/* CORE_EXPERIENCE */}
      <section className="bg-transparent relative z-10">
        <ArchiveHero />
      </section>

      {/* SYSTEM_STATUS_STRIP */}
      <section className="relative z-10">
        <TrustSection />
      </section>

      {/* PRODUCT_GALLERY */}
      <section className="bg-transparent relative z-10">
        <ProductGallery />
      </section>

      {/* SHOWCASE */}
      <section className="bg-transparent relative z-10">
        <GalleryShowcase />
      </section>

      {/* CONFIGURATOR */}
      <section className="bg-transparent relative z-10">
        <ProductConfigurator />
      </section>

      {/* SOCIAL_PROOF */}
      <section className="bg-transparent relative z-10">
        <CustomerReviews />
      </section>

      {/* COMMUNITY */}
      <section className="bg-transparent relative z-10">
        <InstagramFeed />
      </section>

      {/* PROCESS_MATRIX */}
      <section className="bg-transparent relative z-10">
        <ProcessSection />
      </section>

      {/* CONTACT_TERMINAL */}
      <section className="bg-[#0A0A0A] relative z-10">
        <LocalContactSection />
      </section>

      {/* GLOBAL_FOOTER */}
      <Footer />

      {/* INTERACTION_LAYER */}
      <MobileStickyBar />
    </main>
  );
}
