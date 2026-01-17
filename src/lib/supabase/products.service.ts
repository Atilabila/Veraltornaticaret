import { supabase } from './client';
import type { Database } from './database.types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

/**
 * Product Service - Handles all product-related database operations
 */
export class ProductService {
    /**
     * Get all active products
     */
    static async getAllProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Get products by category
     */
    static async getProductsByCategory(category: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Get a single product by slug
     */
    static async getProductBySlug(slug: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No rows returned
                return null;
            }
            console.error('Error fetching product by slug:', error);
            throw error;
        }

        // Increment view count
        if (data) {
            await this.incrementViewCount(slug);
        }

        return data;
    }

    /**
     * Get a single product by ID
     */
    static async getProductById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            console.error('Error fetching product by ID:', error);
            throw error;
        }

        return data;
    }

    /**
     * Search products by name or description
     */
    static async searchProducts(query: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error searching products:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Get featured/popular products (by view count)
     */
    static async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('view_count', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching featured products:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Increment product view count
     */
    static async incrementViewCount(slug: string): Promise<void> {
        const { error } = await supabase.rpc('increment_product_view', {
            product_slug: slug,
        });

        if (error) {
            console.error('Error incrementing view count:', error);
            // Don't throw - this is not critical
        }
    }

    /**
     * Create a new product (Admin only)
     */
    static async createProduct(product: ProductInsert): Promise<Product> {
        // @ts-ignore
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) {
            console.error('Error creating product:', error);
            throw error;
        }

        return data;
    }

    /**
     * Update a product (Admin only)
     */
    static async updateProduct(
        id: string,
        updates: Partial<ProductInsert>
    ): Promise<Product> {
        // @ts-ignore
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating product:', error);
            throw error;
        }

        return data;
    }

    /**
     * Delete a product (soft delete by setting is_active to false)
     */
    static async deleteProduct(id: string): Promise<void> {
        // @ts-ignore
        const { error } = await supabase
            .from('products')
            .update({ is_active: false })
            .eq('id', id);

        if (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    /**
     * Get product images
     */
    static async getProductImages(productId: string) {
        const { data, error } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', productId);

        if (error) {
            console.error('Error fetching product images:', error);
            throw error;
        }

        return data || [];
    }
}
