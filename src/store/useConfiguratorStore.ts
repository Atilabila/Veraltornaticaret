import { create } from 'zustand';

// Ölçüler - Boyutlar otomatik olarak görsele göre (Yatay/Dikey) şekillenecek
export const SIZES = [
    { id: "xs", name: "20x10 CM", dimA: 20, dimB: 10, priceAdd: -100, desc: "MİNİ PLAKA" },
    { id: "m", name: "45x30 CM", dimA: 45, dimB: 30, priceAdd: 200, desc: "STANDART KAYIT" },
    { id: "l", name: "60x45 CM", dimA: 60, dimB: 45, priceAdd: 500, desc: "GENİŞ ALAN" },
    { id: "xl", name: "90x60 CM", dimA: 90, dimB: 60, priceAdd: 1000, desc: "MAKS YÜK" },
];

interface Point { x: number; y: number; }
interface CalibrationData {
    refA: Point;
    refB: Point;
    refCm: number;
    refC: Point;
    refD: Point;
    refHeightCm: number;
}

interface ConfiguratorState {
    size: typeof SIZES[0];
    activeTemplateId: string;
    customImage: string | null;
    customRoomImage: string | null;
    imageScale: number;
    imageFit: 'cover' | 'contain';
    manualOffset: { x: number; y: number };
    manualRot: number;
    showCalibrator: boolean;
    calibrations: Record<string, CalibrationData>;

    // Actions
    setSize: (size: typeof SIZES[0]) => void;
    setActiveTemplateId: (id: string) => void;
    setCustomImage: (url: string | null) => void;
    setCustomRoomImage: (url: string | null) => void;
    setImageScale: (scale: number) => void;
    setImageFit: (fit: 'cover' | 'contain') => void;
    setManualOffset: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
    setManualRot: (rot: number | ((prev: number) => number)) => void;
    setShowCalibrator: (show: boolean) => void;
    updateCalibration: (templateId: string, data: Partial<CalibrationData>) => void;
    reset: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
    size: SIZES[1], // Default M (45x30)
    activeTemplateId: 'boho',
    customImage: null,
    customRoomImage: null,
    imageScale: 1,
    imageFit: 'cover',
    manualOffset: { x: 0, y: 0 },
    manualRot: 0,
    showCalibrator: false,
    calibrations: {
        'boho': {
            refA: { x: 0.15, y: 0.82 }, refB: { x: 0.75, y: 0.82 }, refCm: 200,
            refC: { x: 0.15, y: 0.40 }, refD: { x: 0.15, y: 0.82 }, refHeightCm: 80
        },
        'loft': {
            refA: { x: 0.20, y: 0.82 }, refB: { x: 0.80, y: 0.82 }, refCm: 220,
            refC: { x: 0.20, y: 0.45 }, refD: { x: 0.20, y: 0.82 }, refHeightCm: 70
        },
        'garage': {
            refA: { x: 0.15, y: 0.75 }, refB: { x: 0.85, y: 0.75 }, refCm: 400,
            refC: { x: 0.50, y: 0.45 }, refD: { x: 0.50, y: 0.75 }, refHeightCm: 150
        },
        'gallery': {
            refA: { x: 0.65, y: 0.85 }, refB: { x: 0.90, y: 0.85 }, refCm: 120,
            refC: { x: 0.70, y: 0.60 }, refD: { x: 0.70, y: 0.85 }, refHeightCm: 45
        },
        'teen': {
            refA: { x: 0.35, y: 0.82 }, refB: { x: 0.80, y: 0.82 }, refCm: 200,
            refC: { x: 0.35, y: 0.45 }, refD: { x: 0.35, y: 0.82 }, refHeightCm: 60
        },
        'cafe': {
            refA: { x: 0.35, y: 0.80 }, refB: { x: 0.65, y: 0.80 }, refCm: 65,
            refC: { x: 0.50, y: 0.55 }, refD: { x: 0.50, y: 0.80 }, refHeightCm: 75
        },
        'office': {
            refA: { x: 0.20, y: 0.85 }, refB: { x: 0.80, y: 0.85 }, refCm: 180,
            refC: { x: 0.50, y: 0.45 }, refD: { x: 0.50, y: 0.85 }, refHeightCm: 75
        },
    },

    setSize: (size) => set({ size }),
    setActiveTemplateId: (activeTemplateId) => set({ activeTemplateId }),
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
    setShowCalibrator: (showCalibrator) => set({ showCalibrator }),
    updateCalibration: (templateId, data) => set((state) => ({
        calibrations: {
            ...state.calibrations,
            [templateId]: { ...state.calibrations[templateId], ...data }
        }
    })),
    reset: () => set({
        manualOffset: { x: 0, y: 0 },
        manualRot: 0,
        imageScale: 1,
        imageFit: 'cover',
        showCalibrator: false
    })
}));
