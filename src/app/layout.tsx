import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0E0E0E",
};

export const metadata: Metadata = {
  title: "VERAL | İzmir Alsancak Torna & Teneke İmalat - 1980'den Beri",
  description: "İzmir Alsancak’ta özel imalat torna ve teneke çözümleri. Dosya teli, takvim tenekesi, metal etiket ve promosyon ürünlerinde 3. kuşak usta işçiliği.",
  keywords: ["İzmir torna atölyesi", "Alsancak metal imalat", "teneke imalatı", "dosya teli", "takvim tenekesi", "metal etiket", "metal poster", "özel üretim torna"],
  authors: [{ name: "VERAL IND TORNA & TENEKE" }],
  metadataBase: new URL("https://veralticaret.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://veralticaret.com",
    siteName: "VERAL Industrial",
    title: "VERAL | Endüstriyel Torna & Teneke Deneyimi",
    description: "İzmir Alsancak'ta 3. kuşak metal üretim tecrübesi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VERAL Endüstriyel Üretim",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      <body className="antialiased selection:bg-hazard-orange selection:text-near-black">
        {children}
      </body>
    </html>
  );
}
