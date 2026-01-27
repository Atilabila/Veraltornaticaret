import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/components/providers/AdminProvider";

import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "VERAL — Torna, Metal Üretim ve Endüstriyel Çözümler | İzmir Alsancak",
  description: "VERAL Torna & Teneke Ticaret — İzmir Alsancak merkezli endüstriyel metal üretim, seri imalat ve özel tasarım hizmetleri.",
  keywords: ["torna izmir", "metal üretim alsancak", "seri imalat", "endüstriyel parça üretimi", "izmir sanayi", "teneke ticaret"],
  icons: {
    icon: [
      { url: '/veral-logo.webp', type: 'image/webp' },
      { url: '/images/veral-logo.png', type: 'image/png' }
    ],
    apple: '/veral-logo.webp',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <LocalBusinessSchema />
      </head>
      <body>
        <AdminProvider>
          {children}
        </AdminProvider>
        <Toaster />
      </body>
    </html>
  );
}
