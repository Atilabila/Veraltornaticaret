import { create } from 'zustand';
import { Home, Warehouse, Car, Frame, Bed, Coffee, Briefcase, ChevronUp, ChevronRight } from "lucide-react";

// === CONSTANTS ===
export const SCENES = [
    {
        id: 'boho',
        name: 'YAŞAM ALANI',
        image: '/mockups/boho.png',
        icon: Home,
        pos: { top: 35, left: 53.5, width: 12.5, rotY: 0, rotX: 0 }
    },
    {
        id: 'loft',
        name: 'ENDÜSTRİYEL LOFT',
        image: '/mockups/loft.png',
        icon: Warehouse,
        pos: { top: 35, left: 50, width: 14, rotY: 0, rotX: 0 }
    },
    {
        id: 'garage',
        name: 'GARAJ / RETRO',
        image: '/mockups/garage.png',
        icon: Car,
        pos: { top: 25, left: 40, width: 12, rotY: 0, rotX: 0 }
    },
    {
        id: 'gallery',
        name: 'SANAT GALERİSİ',
        image: '/mockups/gallery.png',
        icon: Frame,
        pos: { top: 35, left: 45, width: 20, rotY: 0, rotX: 0 }
    },
    {
        id: 'teen',
        name: 'GENÇ ODASI',
        image: '/mockups/teen.png',
        icon: Bed,
        pos: { top: 25, left: 63, width: 15, rotY: 0, rotX: 0 }
    },
    {
        id: 'cafe',
        name: 'KAFE / BOHO',
        image: '/mockups/cafe.png',
        icon: Coffee,
        pos: { top: 28, left: 44, width: 11, rotY: 0, rotX: 0 }
    },
    {
        id: 'office',
        name: 'OFİS / STÜDYO',
        image: '/mockups/office.png',
        icon: Briefcase,
        pos: { top: 28, left: 49, width: 16, rotY: 0, rotX: 0 }
    }
];

export const ORIENTATIONS = [
    { id: 'portrait', name: 'DİKEY', icon: ChevronUp },
    { id: 'landscape', name: 'YATAY', icon: ChevronRight },
];

export const SIZES = [
    { id: "xs", name: "10x20 CM", priceAdd: -100, desc: "MİNİ PLAKA", ratio: 0.5 },
    { id: "m", name: "30x45 CM", priceAdd: 200, desc: "STANDART KAYIT", ratio: 0.67 },
    { id: "l", name: "45x60 CM", priceAdd: 500, desc: "GENİŞ ALAN", ratio: 0.75 },
    { id: "xl", name: "60x90 CM", priceAdd: 1000, desc: "MAKS YÜK", ratio: 0.67 },
];

// === STORE ===
interface ConfiguratorState {
    size: typeof SIZES[0];
    orientation: 'portrait' | 'landscape';
    activeScene: typeof SCENES[0];
    customImage: string | null;
    customRoomImage: string | null;
    imageScale: number;
    imageFit: 'cover' | 'contain';
    manualOffset: { x: number; y: number };
    manualRot: number;
    roomRotations: { x: number; y: number; z: number };

    // Actions
    setSize: (size: typeof SIZES[0]) => void;
    setOrientation: (orientation: 'portrait' | 'landscape') => void;
    setActiveScene: (scene: typeof SCENES[0]) => void;
    setCustomImage: (url: string | null) => void;
    setCustomRoomImage: (url: string | null) => void;
    setImageScale: (scale: number) => void;
    setImageFit: (fit: 'cover' | 'contain') => void;
    setManualOffset: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
    setManualRot: (rot: number | ((prev: number) => number)) => void;
    setRoomRotations: (rot: { x: number; y: number; z: number } | ((prev: { x: number; y: number; z: number }) => { x: number; y: number; z: number })) => void;
    reset: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
    size: SIZES[1], // Default M
    orientation: 'portrait',
    activeScene: SCENES[0],
    customImage: null,
    customRoomImage: null,
    imageScale: 1,
    imageFit: 'contain',
    manualOffset: { x: 0, y: 0 },
    manualRot: 0,
    roomRotations: { x: 0, y: 0, z: 0 },

    setSize: (size) => set({ size }),
    setOrientation: (orientation) => set({ orientation }),
    setActiveScene: (activeScene) => set({ activeScene }),
    setCustomImage: (customImage) => set({ customImage }),
    setCustomRoomImage: (customRoomImage) => set({ customRoomImage }),
    setImageScale: (imageScale) => set({ imageScale }),
    setImageFit: (imageFit) => set({ imageFit }),
    setManualOffset: (val) => set((state) => ({
        manualOffset: typeof val === 'function' ? val(state.manualOffset) : val
    })),
    setManualRot: (val) => set((state) => ({
        manualRot: typeof val === 'function' ? val(state.manualRot) : val
    })),
    setRoomRotations: (val) => set((state) => ({
        roomRotations: typeof val === 'function' ? val(state.roomRotations) : val
    })),
    reset: () => set({
        manualOffset: { x: 0, y: 0 },
        manualRot: 0,
        roomRotations: { x: 0, y: 0, z: 0 },
        imageScale: 1,
        imageFit: 'cover'
    })
}));
