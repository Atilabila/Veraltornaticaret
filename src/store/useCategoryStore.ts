import { create } from 'zustand';
import { CategoryService, Category } from '@/lib/supabase/categories.service';
import { upsertAdminCategory, deleteAdminCategory as deleteAdminCategoryAction } from '@/actions/admin';

interface CategoryStore {
    categories: Category[];
    loading: boolean;
    error: string | null;

    // Fetch operations
    fetchCategories: () => Promise<void>;

    // CRUD operations
    addCategory: (category: { name: string; color?: string }) => Promise<void>;
    updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;

    // Local helpers
    getCategory: (id: string) => Category | undefined;
    getCategoryBySlug: (slug: string) => Category | undefined;
    clearError: () => void;
}

export const useCategoryStore = create<CategoryStore>()((set, get) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const categories = await CategoryService.getAllCategories();
            set({ categories, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch categories',
                loading: false
            });
        }
    },

    addCategory: async (categoryData: Partial<Category> & { name: string }) => {
        set({ loading: true, error: null });
        try {
            // Generate slug from name if not provided
            const slug = categoryData.slug || categoryData.name
                .toUpperCase()
                .trim()
                .replace(/[^a-zA-Z0-9\s-]/g, '') // Simplified regex for safety
                .replace(/[\s-]+/g, '_')
                .replace(/^_+|_+$/g, '');

            const payload = {
                name: categoryData.name,
                slug: slug,
                image: categoryData.image || null, // Map to image (which service maps to image_url if needed)
                display_order: categoryData.display_order || get().categories.length + 1,
                is_active: categoryData.is_active !== undefined ? categoryData.is_active : true,
                // Remove 'color' and 'is_featured' as they are not in the database schema
            };

            const result = await upsertAdminCategory(payload);

            if (!result.success || !result.data) throw new Error("Kategori kaydedilemedi");

            set((state) => ({
                categories: [...state.categories, result.data],
                loading: false,
            }));
        } catch (error) {
            set({
                error: (error instanceof Error ? error.message : "Bilinmeyen hata"),
                loading: false
            });
            throw error;
        }
    },

    updateCategory: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const result = await upsertAdminCategory({ id, ...updates });
            if (!result.success || !result.data) throw new Error("Kategori güncellenemedi");

            set((state) => ({
                categories: state.categories.map((c) =>
                    c.id === id ? result.data : c
                ),
                loading: false,
            }));
        } catch (error) {
            set({
                error: (error instanceof Error ? error.message : "Güncelleme hatası"),
                loading: false
            });
            throw error;
        }
    },

    deleteCategory: async (id) => {
        set({ loading: true, error: null });
        try {
            const result = await deleteAdminCategoryAction(id);
            if (!result.success) throw new Error("Silme işlemi başarısız");

            set((state) => ({
                categories: state.categories.filter((c) => c.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: (error instanceof Error ? error.message : "Silme hatası"),
                loading: false
            });
            throw error;
        }
    },

    getCategory: (id) => {
        return get().categories.find((c) => c.id === id);
    },

    getCategoryBySlug: (slug) => {
        return get().categories.find((c) => c.slug === slug);
    },
    clearError: () => set({ error: null }),
}));
