import { create } from 'zustand';

interface AdminStore {
    isAdmin: boolean;
    setAdmin: (isAdmin: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
    isAdmin: false,
    setAdmin: (isAdmin) => set({ isAdmin }),
}));
