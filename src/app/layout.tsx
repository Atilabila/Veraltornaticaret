import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1A1A1A",
};

export const metadata: Metadata = {
  title: "METAL POSTER PRO | Industrial Art & Design",
  description: "Premium metal posters for the modern industrial aesthetic. 1.5mm aluminum, UV digital print, brutalist design.",
  keywords: ["metal poster", "industrial decor", "brutalism", "aluminum art", "metal print", "wall art", "cyberpunk decor"],
  authors: [{ name: "Metal Poster Pro" }],
  metadataBase: new URL("https://metalposterpro.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://metalposterpro.com",
    siteName: "METAL POSTER PRO",
    title: "METAL POSTER PRO | Industrial Art & Design",
    description: "Premium metal posters for the modern industrial aesthetic. 1.5mm aluminum, UV digital print, brutalist design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "METAL POSTER PRO Premium Art",
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
