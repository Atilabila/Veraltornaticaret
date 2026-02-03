"use client";

import React from 'react';
import '@/app/metal-art.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ShowcaseGrid } from '@/components/sections/ShowcaseGrid';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { GalleryShowcase } from '@/components/sections/GalleryShowcase';

import { CustomerReviews } from '@/components/sections/CustomerReviews';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { InstagramMarquee } from '@/components/sections/InstagramMarquee';
import { StatsMarquee } from '@/components/sections/StatsMarquee';
import { OtherServices } from '@/components/sections/OtherServices';
import { LocalContactSection } from '@/components/sections/LocalContactSection';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#D4AF37] selection:text-white">
      {/* GLOBAL_NAV */}
      <Navigation />

      {/* CORE_EXPERIENCE - WHITE */}
      <section className="bg-white text-black relative">
        <Hero />
      </section>

      {/* SYSTEM_STATUS_STRIP - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative">
        <ShowcaseGrid />
      </section>

      {/* INSTAGRAM_MARQUEE_FEED - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative">
        <InstagramMarquee />
        <StatsMarquee />
      </section>

      {/* PRODUCT_GALLERY - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative">
        <ProductGallery />
      </section>

      {/* SHOWCASE - WHITE */}
      <section className="bg-white text-black relative">
        <GalleryShowcase />
      </section>

      {/* SOCIAL_PROOF - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative">
        <CustomerReviews />
      </section>

      {/* PROCESS_MATRIX - WHITE */}
      <section className="bg-white text-black relative">
        <ProcessSection />
      </section>

      {/* SERVICES_MODULE - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative">
        <OtherServices />
      </section>

      {/* CONTACT_TERMINAL - WHITE */}
      <section className="bg-white text-black relative">
        <LocalContactSection />
      </section>

      {/* GLOBAL_FOOTER - BLACK */}
      <Footer />

      {/* INTERACTION_LAYER */}
      <MobileStickyBar />
    </main>
  );
}
