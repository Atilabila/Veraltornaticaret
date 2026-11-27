import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});
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
    default: "Veral Torna ve Teneke | Alsancak",
    template: "%s | Veral Teneke Ticaret İzmir",
  },
  description:
    "1986'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir. Torna, yedek parça ve teneke ürünleri imalatı.",
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
        alt: "Veral Torna ve Teneke",
      },
    ],
  },
  keywords: [
    "izmir dosya teli",
    "toptan dosya teli imalatı",
    "takvim tenekesi üreticisi",
    "dosya teli üreticisi izmir",
    "alsancak metal imalat",
    "metal poster izmir",
    "tef zili imalatı",
  ],
  verification: {
    google: "mA7ESmS5CcTCWG7a5octdFFwX1_nZcURfbMvIn9inxc",
  },
};

export const revalidate = 10;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={geist.variable}>
      <body className={`${geist.className} antialiased bg-atl-bg text-atl-text font-sans selection:bg-atl-brass selection:text-atl-bg`} style={{ backgroundColor: "#121110", color: "#ece6da" }}>
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
