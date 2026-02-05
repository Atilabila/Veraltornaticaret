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
  width: 1600,
  initialScale: 0.25, // Initial guess for 1600 on mobile, JS will override
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
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function fixViewport() {
                var width = 1600;
                var scale = window.screen.width / width;
                var content = 'width=' + width + ', initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=yes';
                var meta = document.querySelector('meta[name="viewport"]');
                if (!meta) {
                  meta = document.createElement('meta');
                  meta.name = 'viewport';
                  document.head.appendChild(meta);
                }
                meta.content = content;
              }
              fixViewport();
              window.addEventListener('resize', fixViewport);
              window.addEventListener('orientationchange', fixViewport);
            })();
          `
        }} />
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
