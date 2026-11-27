import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İletişim",
    description:
        "Veral Torna & Teneke Ticaret, 1471 Sokak No:12/A Alsancak / İzmir. Dosya teli, takvim tenekesi ve sac kesim için atölye hattı ve teklif.",
    alternates: {
        canonical: "https://veralteneketicaret.com/iletisim",
    },
    openGraph: {
        title: "İletişim | Veral Teneke Ticaret İzmir",
        url: "https://veralteneketicaret.com/iletisim",
    },
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
    return children;
}
