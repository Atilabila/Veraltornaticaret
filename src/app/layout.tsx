import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AdminProvider } from "@/components/providers/AdminProvider";
import { ContentSyncProvider } from "@/components/providers/ContentSyncProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { DynamicMetadata } from "@/components/seo/DynamicMetadata";
import { SITE_ORIGIN } from "@/lib/site";
import { GlobalGrid } from "@/components/layout/GlobalGrid";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import dynamic from "next/dynamic";
import { CART_ENABLED } from "@/lib/commerce";

const WhatsAppButton = dynamic(() =>
  import("@/components/layout/WhatsAppButton").then((mod) => mod.WhatsAppButton)
);

const CookieConsent = dynamic(() =>
  import("@/components/layout/CookieConsent").then((mod) => mod.CookieConsent)
);

const CartDrawer = dynamic(() =>
  import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer)
);

const ScrollToTop = dynamic(() =>
  import("@/components/layout/ScrollToTop").then((mod) => mod.ScrollToTop)
);

const Toaster = dynamic(() =>
  import("@/components/ui/toaster").then((mod) => mod.Toaster)
);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "İzmir Dosya Teli ve Takvim Tenekesi İmalatı | Veral Alsancak",
    template: "%s | Veral Teneke Ticaret İzmir",
  },
  description:
    "İzmir Alsancak atölyesinde dosya teli, takvim tenekesi, tef zili, sac kesim ve UV metal levha. Teklif için yazın.",
  authors: [
    {
      name: "Oğuzcan Veral",
      url: `${SITE_ORIGIN}/yazar/oguzcan-veral`,
    },
  ],
  creator: "Veral Torna & Teneke Ticaret",
  publisher: "Veral Torna & Teneke Ticaret",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Veral Teneke Ticaret",
    url: SITE_ORIGIN,
    images: [
      {
        url: "/images/services/giyotin-kesim.webp",
        width: 1200,
        height: 900,
        alt: "İzmir Alsancak Veral atölyesi",
      },
    ],
  },
  keywords: [
    "izmir dosya teli",
    "toptan dosya teli imalatı",
    "takvim tenekesi üreticisi",
    "dosya teli üreticisi izmir",
    "alsancak metal imalat",
    "uv metal poster izmir",
    "tef zili imalatı",
  ],
  verification: {
    google: "mA7ESmS5CcTCWG7a5octdFFwX1_nZcURfbMvIn9inxc",
  },
};

export const revalidate = 10;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* Runtime Google Fonts (avoids build-time fetch in restricted networks). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@400;500;600;700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&display=swap"
        />

      </head>
      <body className="antialiased bg-atl-bg text-atl-text font-sans selection:bg-atl-brass selection:text-atl-bg" style={{ backgroundColor: "#121110", color: "#ece6da" }}>
        <MotionProvider>
          <AdminProvider>
            <ContentSyncProvider>
              <AuthProvider>
                  <Suspense fallback={null}>
                    <DynamicMetadata />
                  </Suspense>
                <GlobalGrid />
                {children}
                {CART_ENABLED ? <CartDrawer /> : null}
                <CookieConsent />
              </AuthProvider>
            </ContentSyncProvider>
          </AdminProvider>
        </MotionProvider>
        <WhatsAppButton />
        <ScrollToTop />
        <AnalyticsProvider><span /></AnalyticsProvider>
        <Toaster />
      </body>
    </html>
  );
}
