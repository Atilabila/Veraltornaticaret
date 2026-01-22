import { create } from 'zustand';
import { CategoryService, Category } from '@/lib/supabase/categories.service';

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

    addCategory: async (categoryData) => {
        set({ loading: true, error: null });
        try {
            // Generate slug from name
            const slug = categoryData.name
                .toUpperCase()
                .trim()
                .replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s-]/g, '')
                .replace(/[\s-]+/g, '_')
                .replace(/^_+|_+$/g, '');

            const newCategory = await CategoryService.createCategory({
                name: categoryData.name,
                slug: slug,
                color: categoryData.color || '#3B82F6',
                display_order: get().categories.length + 1,
                is_active: true,
            });

            set((state) => ({
                categories: [...state.categories, newCategory],
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to add category',
                loading: false
            });
            throw error;
        }
    },

    updateCategory: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const updatedCategory = await CategoryService.updateCategory(id, updates);

            set((state) => ({
                categories: state.categories.map((c) =>
                    c.id === id ? updatedCategory : c
                ),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to update category',
                loading: false
            });
            throw error;
        }
    },

    deleteCategory: async (id) => {
        set({ loading: true, error: null });
        try {
            await CategoryService.deleteCategory(id);

            set((state) => ({
                categories: state.categories.filter((c) => c.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to delete category',
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
}));
