import { supabase } from './client';

export interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    description?: string;
    image?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CategoryInsert {
    name: string;
    slug: string;
    color?: string;
    description?: string;
    image?: string;
    display_order?: number;
    is_active?: boolean;
}

// Default categories as fallback
const DEFAULT_CATEGORIES: Category[] = [
    { id: '1', name: 'Arabalar', slug: 'ARABA_PLAKA', color: '#3B82F6', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', name: 'Atatürk', slug: 'ATATURK_PLAKA', color: '#EF4444', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', name: 'Karakterler', slug: 'CHARACTER_PLAKA', color: '#8B5CF6', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', name: 'Motorlar', slug: 'MOTOR_PLAKA', color: '#F59E0B', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', name: 'Özel Ürünler', slug: 'CUSTOM', color: '#10B981', display_order: 5, is_active: true, created_at: '', updated_at: '' },
];

/**
 * Category Service - Handles all category-related database operations
 */
export class CategoryService {
    /**
     * Get all active categories
     */
    static async getAllCategories(): Promise<Category[]> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (error) {
                console.warn('Supabase categories fetch failed, using defaults:', error.message);
                return DEFAULT_CATEGORIES;
            }

            return (data && data.length > 0) ? data as Category[] : DEFAULT_CATEGORIES;
        } catch (err) {
            console.warn('Supabase connection error, using default categories:', err);
            return DEFAULT_CATEGORIES;
        }
    }

    /**
     * Get a single category by slug
     */
    static async getCategoryBySlug(slug: string): Promise<Category | null> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('slug', slug)
                .eq('is_active', true)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return DEFAULT_CATEGORIES.find(c => c.slug === slug) || null;
                }
                console.error('Error fetching category by slug:', error);
                return DEFAULT_CATEGORIES.find(c => c.slug === slug) || null;
            }

            return data as Category;
        } catch (err) {
            return DEFAULT_CATEGORIES.find(c => c.slug === slug) || null;
        }
    }

    /**
     * Create a new category (Admin only)
     */
    static async createCategory(category: CategoryInsert): Promise<Category> {
        // @ts-ignore
        const { data, error } = await supabase
            .from('categories')
            .insert(category)
            .select()
            .single();

        if (error) {
            console.error('Error creating category:', error);
            throw error;
        }

        return data as Category;
    }

    /**
     * Update a category (Admin only)
     */
    static async updateCategory(id: string, updates: Partial<CategoryInsert>): Promise<Category> {
        // @ts-ignore
        const { data, error } = await supabase
            .from('categories')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating category:', error);
            throw error;
        }

        return data as Category;
    }

    /**
     * Delete a category (soft delete by setting is_active to false)
     */
    static async deleteCategory(id: string): Promise<void> {
        // @ts-ignore
        const { error } = await supabase
            .from('categories')
            .update({ is_active: false })
            .eq('id', id);

        if (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
}
