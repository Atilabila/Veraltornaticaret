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
      <section className="bg-white text-black relative z-10">
        <Hero />
      </section>

      {/* SYSTEM_STATUS_STRIP - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative z-10">
        <ShowcaseGrid />
      </section>

      {/* INSTAGRAM_MARQUEE_FEED - WHITE */}
      <section className="bg-white text-black relative z-10">
        <InstagramMarquee />
        <StatsMarquee />
      </section>

      {/* PRODUCT_GALLERY - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative z-10">
        <ProductGallery />
      </section>

      {/* SHOWCASE - WHITE */}
      <section className="bg-white text-black relative z-10">
        <GalleryShowcase />
      </section>

      {/* SOCIAL_PROOF - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative z-10">
        <CustomerReviews />
      </section>

      {/* PROCESS_MATRIX - WHITE */}
      <section className="bg-white text-black relative z-10">
        <ProcessSection />
      </section>

      {/* SERVICES_MODULE - BLACK */}
      <section className="bg-[#0A0A0A] text-white relative z-10">
        <OtherServices />
      </section>

      {/* CONTACT_TERMINAL - WHITE */}
      <section className="bg-white text-black relative z-10">
        <LocalContactSection />
      </section>

      {/* GLOBAL_FOOTER - BLACK */}
      <Footer />

      {/* INTERACTION_LAYER */}
      <MobileStickyBar />
    </main>
  );
}
