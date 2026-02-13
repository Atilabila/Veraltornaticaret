import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/components/providers/AdminProvider";
import { ContentSyncProvider } from "@/components/providers/ContentSyncProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { KnowledgeBaseSchema } from "@/components/seo/KnowledgeBaseSchema";
import { DynamicMetadata } from "@/components/seo/DynamicMetadata";
import { GlobalGrid } from "@/components/layout/GlobalGrid";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/motion/MotionProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "VERAL - Metal Sanat Eserleri",
  description: "Özel tasarım metal posterler ve sanat eserleri",
  robots: "index, follow",
  verification: {
    google: "mA7ESmS5CcTCWG7a5octdFFwX1_nZcURfbMvIn9inxc",
  },
};

export const revalidate = 10;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://wswlhtglwpyragymrdhl.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wswlhtglwpyragymrdhl.supabase.co" />

        {/* Runtime Google Fonts (avoids build-time fetch in restricted networks). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
        />

        <LocalBusinessSchema />
        <KnowledgeBaseSchema />
      </head>
      <body className="antialiased">
        <MotionProvider>
          <AdminProvider>
            <ContentSyncProvider>
              <AuthProvider>
                <DynamicMetadata />
                <GlobalGrid />
                {children}
              </AuthProvider>
            </ContentSyncProvider>
          </AdminProvider>
        </MotionProvider>
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
