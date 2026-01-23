import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1349ec",
};

export const metadata: Metadata = {
  title: "METAL POSTER PRO | Modern Metal Tablo ve Endüstriyel Sanat",
  description: "Türkiye'nin en kaliteli metal posterleri. 1.5mm çelik, UV baskı ve manyetik montaj. Eviniz için modern endüstriyel dekorasyon çözümleri.",
  keywords: ["metal poster", "metal tablo", "iç mekan dekorasyon", "modern sanat", "duvar aksesuarları", "anime posterleri", "film tabloları", "ev dekorasyonu"],
  authors: [{ name: "Metal Poster Pro" }],
  metadataBase: new URL("https://metalposterpro.com"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://metalposterpro.com",
    siteName: "METAL POSTER PRO",
    title: "METAL POSTER PRO | Sonsuza Kadar Süren Sanat Eserleri",
    description: "Premium metal posterler ile yaşam alanınızı dönüştürün. Kolay montaj, ömür boyu dayanıklılık.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "METAL POSTER PRO Premium Metal Sanat",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { GlobalAtmosphere } from "@/components/layout/GlobalAtmosphere";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased selection:bg-primary selection:text-white relative">
        {/* Global Background Pattern - Grayscale, 25% opacity */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/site-pattern.jpg)',
            backgroundSize: '400px',
            backgroundRepeat: 'repeat',
            opacity: 0.15,
            filter: 'grayscale(100%)',
          }}
        />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
