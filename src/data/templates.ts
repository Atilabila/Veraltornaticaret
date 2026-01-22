import { Home, Warehouse, Car, Frame, Bed, Coffee, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Template = {
    id: string;
    name: string;
    src: string;
    icon: LucideIcon;
    // Referans mobilya genişliği (cm)
    sofaCm: number;
    // Referans mobilya yüksekliği (cm)
    sofaHeightCm: number;
    // Referans nesnesi adı (Yatak, Koltuk vb.)
    refName: string;
    // A-B referans noktaları (normalize 0..1) - mobilyanın iki ucu (Genişlik)
    refA: { x: number; y: number };
    refB: { x: number; y: number };
    // C-D referans noktaları (normalize 0..1) - mobilyanın alt-üst ucu (Yükseklik)
    refC: { x: number; y: number };
    refD: { x: number; y: number };
    // Poster'in duracağı duvar alanı (normalize 0..1)
    wallBox: { x: number; y: number; w: number; h: number };
    // 3D perspektif ayarları
    perspective?: { rotY: number; rotX: number };
};

export const TEMPLATES: Template[] = [
    {
        id: "boho",
        name: "YAŞAM ALANI",
        src: "/mockups/boho.png",
        icon: Home,
        sofaCm: 200,
        sofaHeightCm: 80,
        refName: "KOLTUK",
        refA: { x: 0.15, y: 0.82 },
        refB: { x: 0.75, y: 0.82 },
        refC: { x: 0.15, y: 0.40 },
        refD: { x: 0.15, y: 0.82 },
        wallBox: { x: 0.20, y: 0.15, w: 0.60, h: 0.45 },
        perspective: { rotY: 0, rotX: 0 },
    },
    {
        id: "loft",
        name: "ENDÜSTRİYEL LOFT",
        src: "/mockups/loft.png",
        icon: Warehouse,
        sofaCm: 220,
        sofaHeightCm: 70,
        refName: "KOLTUK",
        refA: { x: 0.20, y: 0.82 },
        refB: { x: 0.80, y: 0.82 },
        refC: { x: 0.20, y: 0.45 },
        refD: { x: 0.20, y: 0.82 },
        wallBox: { x: 0.25, y: 0.20, w: 0.50, h: 0.40 },
        perspective: { rotY: 0, rotX: 0 },
    },
    {
        id: "garage",
        name: "GARAJ / RETRO",
        src: "/mockups/garage.png",
        icon: Car,
        sofaCm: 400,
        sofaHeightCm: 150,
        refName: "ARAÇ",
        refA: { x: 0.15, y: 0.75 },
        refB: { x: 0.85, y: 0.75 },
        refC: { x: 0.50, y: 0.45 },
        refD: { x: 0.50, y: 0.75 },
        wallBox: { x: 0.15, y: 0.10, w: 0.35, h: 0.50 },
        perspective: { rotY: 0, rotX: 0 },
    },
    {
        id: "gallery",
        name: "SANAT GALERİSİ",
        src: "/mockups/gallery.png",
        icon: Frame,
        sofaCm: 120,
        sofaHeightCm: 45,
        refName: "BANK",
        refA: { x: 0.65, y: 0.85 },
        refB: { x: 0.90, y: 0.85 },
        refC: { x: 0.70, y: 0.60 },
        refD: { x: 0.70, y: 0.85 },
        wallBox: { x: 0.25, y: 0.20, w: 0.50, h: 0.50 },
        perspective: { rotY: 0, rotX: 0 },
    },
    {
        id: "teen",
        name: "GENÇ ODASI",
        src: "/mockups/teen.png",
        icon: Bed,
        sofaCm: 200,
        sofaHeightCm: 60,
        refName: "YATAK",
        refA: { x: 0.35, y: 0.82 },
        refB: { x: 0.80, y: 0.82 },
        refC: { x: 0.35, y: 0.45 },
        refD: { x: 0.35, y: 0.82 },
        wallBox: { x: 0.15, y: 0.10, w: 0.40, h: 0.50 },
        perspective: { rotY: 0, rotX: 0 },
    },
    {
        id: "cafe",
        name: "KAFE / BOHO",
        src: "/mockups/cafe.png",
        icon: Coffee,
        sofaCm: 65,
        sofaHeightCm: 75,
        refName: "MASA",
        refA: { x: 0.35, y: 0.80 },
        refB: { x: 0.65, y: 0.80 },
        refC: { x: 0.50, y: 0.55 },
        refD: { x: 0.50, y: 0.80 },
        wallBox: { x: 0.20, y: 0.15, w: 0.40, h: 0.45 },
        perspective: { rotY: 0, rotX: 0 },
    },
    {
        id: "office",
        name: "OFİS / STÜDYO",
        src: "/mockups/office.png",
        icon: Briefcase,
        sofaCm: 180,
        sofaHeightCm: 75,
        refName: "MASA",
        refA: { x: 0.20, y: 0.85 },
        refB: { x: 0.80, y: 0.85 },
        refC: { x: 0.50, y: 0.45 },
        refD: { x: 0.50, y: 0.85 },
        wallBox: { x: 0.25, y: 0.15, w: 0.50, h: 0.45 },
        perspective: { rotY: 0, rotX: 0 },
    },
];
