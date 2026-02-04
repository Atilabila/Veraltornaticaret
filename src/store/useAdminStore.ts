import { create } from 'zustand';

interface AdminStore {
    isAdmin: boolean;
    debugMode: boolean; // New: To show font sizes and styles inline
    setAdmin: (isAdmin: boolean) => void;
    toggleDebugMode: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
    isAdmin: false,
    debugMode: false,
    setAdmin: (isAdmin) => set({ isAdmin }),
    toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
}));
