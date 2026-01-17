import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 1200,
  initialScale: 0.35,
  maximumScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Veral Torna & Tene - Yaşam alanınızı metalle taçlandırın. 1.5mm endüstriyel sınıf alüminyum üzerine UV baskı. Su geçirmez, çizilmez, ömür boyu garanti.",
  keywords: ["veral torna", "metal poster", "alüminyum baskı", "duvar sanatı", "UV baskı", "premium dekorasyon", "metal tablo"],
  authors: [{ name: "Veral Torna & Teneke" }],
  metadataBase: new URL("https://metal-poster-pro.vercel.app"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://metal-poster-pro.vercel.app",
    siteName: "Veral Torna & Teneke",
    title: "Veral Torna & Teneke | Premium Alüminyum Baskılı Metal Posterler",
    description: "Yaşam alanınızı metalle taçlandırın. 1.5mm endüstriyel sınıf alüminyum üzerine UV baskı.",
    images: [
      {
        url: "/porsche.png",
        width: 1200,
        height: 630,
        alt: "Veral Ticaret - Premium Metal Poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veral Ticaret | Premium Metal Posterler",
    description: "Yaşam alanınızı metalle taçlandırın.",
    images: ["/porsche.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
