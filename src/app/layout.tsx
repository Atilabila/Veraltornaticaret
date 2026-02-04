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
  // 1600px forces the browser to zoom out significantly, achieving that orderly, 
  // distant desktop view the user desires for a premium mobile experience.
  width: 1600,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "VERAL - Metal Sanat Eserleri",
  description: "Özel tasarım metal posterler ve sanat eserleri",
  robots: "index, follow",
};

export const revalidate = 10;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <LocalBusinessSchema />
        <meta name="viewport" content="width=1600" />
      </head>
      <body className="antialiased overflow-x-hidden">
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
