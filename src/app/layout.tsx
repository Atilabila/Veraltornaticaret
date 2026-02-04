import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile-fixes.css";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/components/providers/AdminProvider";
import { ContentSyncProvider } from "@/components/providers/ContentSyncProvider";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { DynamicMetadata } from "@/components/seo/DynamicMetadata";
import { GlobalGrid } from "@/components/layout/GlobalGrid";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: "VERAL - Metal Sanat Eserleri",
  description: "Özel tasarım metal posterler ve sanat eserleri",
}

// Revalidate every 10 seconds to show admin changes immediately
export const revalidate = 10;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        <AdminProvider>
          <ContentSyncProvider>
            <DynamicMetadata />
            <GlobalGrid />
            {children}
          </ContentSyncProvider>
        </AdminProvider>
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
