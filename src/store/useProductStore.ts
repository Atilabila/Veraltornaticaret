import { create } from 'zustand';
import { ProductService } from '@/lib/supabase/products.service';
import type { Database } from '@/lib/supabase/database.types';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;

    // Fetch operations
    fetchProducts: () => Promise<void>;
    fetchProductsByCategory: (category: string) => Promise<void>;

    // CRUD operations
    addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'view_count'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    // Local state helpers
    getProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>()((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const products = await ProductService.getAllProducts();
            set({ products, loading: false });
        } catch (error) {
            // Fallback to static products if Supabase is not available
            console.warn('Supabase not available, using static products');
            const { PRODUCTS } = await import('@/lib/products');
            const staticProducts = PRODUCTS.map(p => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                price: p.price,
                image: p.image,
                category: p.category,
                is_active: true,
                stock_quantity: 50,
                view_count: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })) as Product[];
            set({ products: staticProducts, loading: false, error: null });
        }
    },

    fetchProductsByCategory: async (category: string) => {
        set({ loading: true, error: null });
        try {
            const products = await ProductService.getProductsByCategory(category);
            set({ products, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch products',
                loading: false
            });
        }
    },

    addProduct: async (productData) => {
        set({ loading: true, error: null });
        try {
            // Generate custom ID
            const newId = `CUSTOM_${Date.now()}`;

            const newProduct = await ProductService.createProduct({
                ...productData,
                id: newId,
                is_active: true,
                stock_quantity: 50,
                view_count: 0,
            });

            set((state) => ({
                products: [newProduct, ...state.products],
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to add product',
                loading: false
            });
            throw error;
        }
    },

    updateProduct: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const updatedProduct = await ProductService.updateProduct(id, updates);

            set((state) => ({
                products: state.products.map((p) =>
                    p.id === id ? updatedProduct : p
                ),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to update product',
                loading: false
            });
            throw error;
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            await ProductService.deleteProduct(id);

            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to delete product',
                loading: false
            });
            throw error;
        }
    },

    getProduct: (id) => {
        return get().products.find((p) => p.id === id);
    },
}));
