import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/components/providers/AdminProvider";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { DynamicMetadata } from "@/components/seo/DynamicMetadata";
import { GlobalGrid } from "@/components/layout/GlobalGrid";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <LocalBusinessSchema />
      </head>
      <body>
        <GlobalGrid />
        <AdminProvider>
          <DynamicMetadata />
          {children}
        </AdminProvider>
        <Toaster />
      </body>
    </html>
  );
}
