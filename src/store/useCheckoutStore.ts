"use client";

import { create } from 'zustand';

// =====================================================
// CHECKOUT TYPES
// =====================================================

export type BillingType = 'individual' | 'company';

export interface ShippingInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    notes: string;
}

export interface BillingInfo {
    type: BillingType;
    companyName?: string;
    taxOffice?: string;
    taxNumber?: string;
}

export interface CheckoutState {
    // Form State
    shipping: ShippingInfo;
    billing: BillingInfo;
    couponCode: string;
    couponDiscount: number;

    // UI State
    step: 'shipping' | 'payment' | 'confirmation';
    isProcessing: boolean;
    error: string | null;

    // Actions
    setShipping: (data: Partial<ShippingInfo>) => void;
    setBilling: (data: Partial<BillingInfo>) => void;
    setCoupon: (code: string, discount: number) => void;
    setStep: (step: CheckoutState['step']) => void;
    setProcessing: (state: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;

    // Validation
    validateShipping: () => { valid: boolean; errors: Record<string, string> };
}

// =====================================================
// INITIAL STATE
// =====================================================

const initialShipping: ShippingInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    notes: '',
};

const initialBilling: BillingInfo = {
    type: 'individual',
};

// =====================================================
// CHECKOUT STORE
// =====================================================

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
    shipping: initialShipping,
    billing: initialBilling,
    couponCode: '',
    couponDiscount: 0,
    step: 'shipping',
    isProcessing: false,
    error: null,

    setShipping: (data) => {
        set((state) => ({
            shipping: { ...state.shipping, ...data },
            error: null,
        }));
    },

    setBilling: (data) => {
        set((state) => ({
            billing: { ...state.billing, ...data },
        }));
    },

    setCoupon: (code, discount) => {
        set({ couponCode: code, couponDiscount: discount });
    },

    setStep: (step) => set({ step }),

    setProcessing: (isProcessing) => set({ isProcessing }),

    setError: (error) => set({ error }),

    reset: () => set({
        shipping: initialShipping,
        billing: initialBilling,
        couponCode: '',
        couponDiscount: 0,
        step: 'shipping',
        isProcessing: false,
        error: null,
    }),

    validateShipping: () => {
        const { shipping } = get();
        const errors: Record<string, string> = {};

        if (!shipping.fullName.trim()) {
            errors.fullName = 'Ad Soyad zorunludur';
        }

        if (!shipping.email.trim()) {
            errors.email = 'E-posta zorunludur';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
            errors.email = 'Geçerli bir e-posta adresi girin';
        }

        if (!shipping.phone.trim()) {
            errors.phone = 'Telefon numarası zorunludur';
        } else if (!/^[0-9]{10,11}$/.test(shipping.phone.replace(/\D/g, ''))) {
            errors.phone = 'Geçerli bir telefon numarası girin';
        }

        if (!shipping.address.trim()) {
            errors.address = 'Adres zorunludur';
        }

        if (!shipping.city.trim()) {
            errors.city = 'Şehir zorunludur';
        }

        if (!shipping.district.trim()) {
            errors.district = 'İlçe zorunludur';
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    },
}));
