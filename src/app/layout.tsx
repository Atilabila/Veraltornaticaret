import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/components/providers/AdminProvider";
import { ContentSyncProvider } from "@/components/providers/ContentSyncProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { DynamicMetadata } from "@/components/seo/DynamicMetadata";
import { GlobalGrid } from "@/components/layout/GlobalGrid";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Space_Grotesk, Syne } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

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
    <html lang="tr" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <head>
        <link rel="preconnect" href="https://wswlhtglwpyragymrdhl.supabase.co" />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        <AdminProvider>
          <ContentSyncProvider>
            <AuthProvider>
              <DynamicMetadata />
              <GlobalGrid />
              {children}
            </AuthProvider>
          </ContentSyncProvider>
        </AdminProvider>
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
