"use client";

import React from 'react';
import '@/app/metal-art.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ShowcaseGrid } from '@/components/sections/ShowcaseGrid';
import dynamic from 'next/dynamic';

const ProductGallery = dynamic(() => import('@/components/sections/ProductGallery').then(mod => mod.ProductGallery));
const GalleryShowcase = dynamic(() => import('@/components/sections/GalleryShowcase').then(mod => mod.GalleryShowcase));
const CustomerReviews = dynamic(() => import('@/components/sections/CustomerReviews').then(mod => mod.CustomerReviews));
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection').then(mod => mod.ProcessSection));
const InstagramMarquee = dynamic(() => import('@/components/sections/InstagramMarquee').then(mod => mod.InstagramMarquee));
const StatsMarquee = dynamic(() => import('@/components/sections/StatsMarquee').then(mod => mod.StatsMarquee));
const OtherServices = dynamic(() => import('@/components/sections/OtherServices').then(mod => mod.OtherServices));
const LocalContactSection = dynamic(() => import('@/components/sections/LocalContactSection').then(mod => mod.LocalContactSection));
const MobileStickyBar = dynamic(() => import('@/components/layout/MobileStickyBar').then(mod => mod.MobileStickyBar));
import { MotionConfig } from 'framer-motion';
import { usePerformanceDetection } from '@/hooks/usePerformanceDetection';

export default function HomePage() {
  const { shouldReduceVisuals, isReady } = usePerformanceDetection();
  const disableHeavyVisuals = !isReady || shouldReduceVisuals;

  return (
    <MotionConfig reducedMotion={shouldReduceVisuals ? "always" : "never"}>
      <main className="home-page min-h-screen bg-white selection:bg-[#D4AF37] selection:text-white pb-24 lg:pb-0">
        {/* GLOBAL_NAV */}
        <Navigation />

        {/* CORE_EXPERIENCE - WHITE */}
        <section className="bg-white text-black relative z-0">
          <Hero />
        </section>

        {/* SYSTEM_STATUS_STRIP - BLACK */}
        <section className="bg-[#0A0A0A] text-white relative z-0">
          <ShowcaseGrid />
        </section>

        {/* INSTAGRAM_MARQUEE_FEED - BLACK (skip on low-power/mobile) */}
        {!disableHeavyVisuals && (
          <section className="bg-[#0A0A0A] text-white relative">
            <InstagramMarquee />
            <div className="hide-on-mobile-force">
              <StatsMarquee />
            </div>
          </section>
        )}

        {/* PRODUCT_GALLERY - BLACK (Heavy: Hide Grid) */}
        <section className="bg-[#0A0A0A] text-white relative z-10">
          <ProductGallery />
        </section>

        {/* SHOWCASE - WHITE (skip on low-power/mobile) */}
        {!disableHeavyVisuals && (
          <section className="bg-white text-black relative z-10">
            <GalleryShowcase />
          </section>
        )}

        {/* SOCIAL_PROOF - BLACK */}
        <section className="bg-[#0A0A0A] text-white relative">
          <CustomerReviews />
        </section>

        {/* PROCESS_MATRIX - WHITE */}
        <section className="bg-white text-black relative z-0">
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
    </MotionConfig>
  );
}
