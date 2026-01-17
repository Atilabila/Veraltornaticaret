"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { Features } from "@/components/sections/Features";
import { ProductConfigurator } from "@/components/sections/ProductConfigurator";
import { GalleryShowcase } from "@/components/sections/GalleryShowcase";
import { OtherServices } from "@/components/sections/OtherServices";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { CartTerminal } from "@/components/checkout/CartTerminal";
import { WhatsAppSidebar } from "@/components/ui/WhatsAppSidebar";
import { ShoppingCart, Menu, X, Instagram, Phone, Mail, ArrowRight, Settings, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useContentStore } from "@/store/useContentStore";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.length);
  const { content } = useContentStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-transparent grid-terminal no-transition">
      {/* NAVIGATION_TERMINAL */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-none ${scrolled ? "bg-white border-b-4 border-black py-4 shadow-brutal" : "bg-white/80 border-b-4 border-black py-6"
        }`}>
        <div className="container-brutal flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 group-active:translate-x-1 group-active:translate-y-1 transition-none">
              <Image
                src="/veral-logo.png"
                alt="Veral Torna & Teneke"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 font-mono font-bold text-base text-black/80">
            <Link href="#features" className="hover:bg-black hover:text-white px-4 py-2 text-lg">ÜRETİM HATTI</Link>
            <Link href="#roadmap" className="hover:bg-black hover:text-white px-4 py-2 text-lg uppercase underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4">YOL HARİTASI</Link>
            <Link href="/urunler" className="hover:bg-black hover:text-white px-4 py-2 text-lg">KATALOG</Link>
            <Link href="/hakkimizda" className="hover:bg-black hover:text-white px-4 py-2 text-lg">HAKKIMIZDA</Link>
            <Link href="#terminals" className="hover:bg-black hover:text-white px-4 py-2 text-lg">İLETİŞİM</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-mechanical !p-2 !shadow-[2px_2px_0px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-[var(--color-brand-safety-orange)] text-white text-[10px] font-black flex items-center justify-center border-2 border-black">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </button>
            <button
              className="lg:hidden btn-mechanical !p-2 !shadow-[2px_2px_0px_0px_black]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black p-6 font-mono font-bold"
            >
              <div className="flex flex-col gap-4">
                <Link href="#features" className="border-2 border-black p-3 hover:bg-[var(--color-brand-safety-orange)] hover:text-white" onClick={() => setIsMenuOpen(false)}>ÜRETİM HATTI</Link>
                <Link href="#roadmap" className="border-2 border-black p-3 bg-black text-white hover:bg-[var(--color-brand-safety-orange)]" onClick={() => setIsMenuOpen(false)}>YOL HARİTASI (FLASH)</Link>
                <Link href="/urunler" className="border-2 border-black p-3 hover:bg-[var(--color-brand-safety-orange)] hover:text-white" onClick={() => setIsMenuOpen(false)}>KATALOG DOSYALARI</Link>
                <Link href="/hakkimizda" className="border-2 border-black p-3 hover:bg-[var(--color-brand-safety-orange)] hover:text-white" onClick={() => setIsMenuOpen(false)}>TARİHÇE KAYDI</Link>
                <Link href="/blog" className="border-2 border-black p-3 hover:bg-[var(--color-brand-safety-orange)] hover:text-white" onClick={() => setIsMenuOpen(false)}>RAPORLAR</Link>
                <Link href="#terminals" className="border-2 border-black p-3 hover:bg-[var(--color-brand-safety-orange)] hover:text-white" onClick={() => setIsMenuOpen(false)}>TERMİNALLER</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO_MODULE */}
      <Hero />

      {/* PRODUCT_GALLERY */}
      <ProductGallery />

      {/* FEATURES_MATRIX */}
      <Features />

      {/* CONFIG_TERMINAL */}
      <ProductConfigurator />
      <GalleryShowcase />

      {/* OTHER_OPERATIONS_UNITS */}
      <OtherServices />

      {/* ROADMAP_TIMELINE */}
      <RoadmapSection />

      {/* FAQ_TERMINAL */}
      <section id="faq" className="py-24 bg-transparent">
        <div className="container-brutal">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-[Archivo Black] mb-12 uppercase leading-none">{content.faqTitle}</h2>
          <div className="grid gap-4">
            {content.faqItems.map((item, index) => (
              <FAQItem
                key={index}
                id={String(index + 1).padStart(2, '0')}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER_TERMINAL */}
      <footer id="terminals" className="bg-black text-white py-24 border-t-8 border-[var(--color-brand-safety-orange)]">
        <div className="container-brutal">
          <div className="grid lg:grid-cols-4 gap-16">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-8">
                <div className="relative w-32 h-32">
                  <Image
                    src="/veral-logo.png"
                    alt="Veral Torna & Teneke"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <h2 className="text-5xl font-[Archivo Black] mb-6 uppercase tracking-tighter">
                VERAL <span className="text-[var(--color-brand-safety-orange)]">TORNA & TENEKE</span>
              </h2>
              <div className="flex flex-wrap gap-4 font-mono font-bold">
                <Link href="/blog" className="underline decoration-[var(--color-brand-safety-orange)] decoration-4 underline-offset-4 hover:bg-[var(--color-brand-safety-orange)] p-1">SERVİS KAYITLARI</Link>
                <Link href="/urunler" className="underline decoration-[var(--color-brand-safety-orange)] decoration-4 underline-offset-4 hover:bg-[var(--color-brand-safety-orange)] p-1">ÜRETİM HATTI</Link>
                <Link href="/hakkimizda" className="underline decoration-[var(--color-brand-safety-orange)] decoration-4 underline-offset-4 hover:bg-[var(--color-brand-safety-orange)] p-1">HİKAYE VERİSİ</Link>
              </div>
            </div>

            <div className="font-mono space-y-8">
              <div>
                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">MERKEZ ÜS</h4>
                <p className="text-lg border-l-4 border-white pl-4 whitespace-pre-line">
                  {content.footerAddress}
                </p>
              </div>
              <div>
                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">GİRİŞ TERMİNALLERİ</h4>
                <p className="text-lg border-l-4 border-white pl-4">
                  TEL: {content.footerPhone}<br />
                  E-POSTA: {content.footerEmail}<br />
                  INSTA: {content.footerInstagram}
                </p>
              </div>
            </div>

            <div className="font-mono text-xs flex flex-col justify-between">
              <div>
                <span className="block text-[var(--color-brand-safety-orange)] font-black mb-2 uppercase">SİSTEM DURUMU</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#4CAF50] animate-pulse"></div>
                  <span>TÜM SİSTEMLER AKTİF</span>
                </div>
              </div>
              <div className="mt-12 text-white/30 text-base">
                © 2026 VERAL TORNA & TENEKE<br />
                ÜRETİM KAYDI v4.5.11
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartTerminal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* WhatsApp Sidebar */}
      <WhatsAppSidebar />
    </main>
  );
}

const FAQItem = ({ id, question, answer }: { id: string, question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-4 border-black bg-white no-transition">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 flex justify-between items-center text-left transition-none ${isOpen ? "bg-[#FFD700]" : "hover:bg-[#E5E7EB]"}`}
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-base font-black text-black/30">SORGULAMA {id}</span>
          <span className="font-[Archivo Black] text-lg sm:text-2xl">{question}</span>
        </div>
        <PlusMinusIcon isOpen={isOpen} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-[#E5E7EB] border-t-4 border-black font-mono text-lg md:text-xl leading-relaxed p-6"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PlusMinusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <div className="absolute w-6 h-1 bg-black"></div>
    <div className={`absolute w-1 h-6 bg-black transition-none ${isOpen ? "hidden" : "block"}`}></div>
  </div>
);
