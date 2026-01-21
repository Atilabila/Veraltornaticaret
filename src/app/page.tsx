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
    <main className="min-h-screen bg-paper-white selection:bg-hazard-orange selection:text-near-black">
      {/* GLOBAL_NAV */}
      <Navigation />

      {/* CORE_EXPERIENCE */}
      <ArchiveHero />

      {/* SYSTEM_STATUS_STRIP */}
      <TrustSection />

      {/* PRODUCT_GALLERY */}
      <ProductGallery />

      {/* SHOWCASE */}
      <GalleryShowcase />

      {/* CONFIGURATOR */}
      <ProductConfigurator />

      {/* SOCIAL_PROOF */}
      <CustomerReviews />

      {/* COMMUNITY */}
      <InstagramFeed />

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
