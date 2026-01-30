import { create } from 'zustand';
import { ProductService } from '@/lib/supabase/products.service';
import type { Database } from '@/lib/supabase/database.types';
import { Product } from '@/lib/products';

type DbProduct = Database['public']['Tables']['products']['Row'];

interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;

    // Fetch operations
    fetchProducts: () => Promise<void>;
    fetchProductsAdmin: () => Promise<void>;
    fetchProductsByCategory: (category: string) => Promise<void>;

    // CRUD operations
    addProduct: (product: any) => Promise<void>;
    updateProduct: (id: string, updates: any) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    // Local state helpers
    getProduct: (id: string) => Product | undefined;
}

const mapDbToProduct = (dbProduct: any): Product => ({
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    price: dbProduct.price,
    image: dbProduct.image_url || dbProduct.image || '/placeholder.png', // Handle both schemas
    description: dbProduct.description,
    story: dbProduct.story || dbProduct.description,
    category: dbProduct.category || dbProduct.category_id, // category_id is used for metal_products
    specs: {
        material: dbProduct.material || "1.5mm Alüminyum",
        process: dbProduct.process || "UV Baskı",
        print: dbProduct.print || "Endüstriyel",
        thickness: dbProduct.thickness || "1.5mm",
        dims: dbProduct.dims || "45x60cm",
        mounting: dbProduct.mounting || "Mıknatıs",
    },
    seo: {
        title: dbProduct.seo_title || dbProduct.name,
        description: dbProduct.seo_description || dbProduct.description,
        keywords: dbProduct.seo_keywords || [],
    }
});

// ... imports
import { getProducts as getMetalProducts } from '@/lib/actions/metal-products.actions';
import type { MetalProduct } from '@/lib/supabase/metal-products.types';
import { getAdminProducts, upsertAdminProduct, deleteAdminProduct } from '@/actions/admin';

// ... existing mapDbToProduct ...

const mapMetalProductToProduct = (mp: MetalProduct): Product => ({
    id: mp.id,
    name: mp.name,
    slug: mp.slug,
    price: mp.price,
    is_showcase: mp.is_showcase,
    image: mp.image_url || '/placeholder.png',
    description: mp.description || '',
    story: mp.description || '',
    category: mp.category?.slug || 'GENEL',
    specs: {
        material: "1.5mm Alüminyum",
        process: "UV Baskı",
        print: "Endüstriyel",
        thickness: "1.5mm",
        dims: "45x60cm",
        mounting: "Mıknatıs",
    },
    seo: {
        title: mp.name,
        description: mp.description || '',
        keywords: [mp.name, 'metal poster'],
    }
});

export const useProductStore = create<ProductStore>()((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            // Use the Server Action for Metal Products (New System)
            const result = await getMetalProducts();

            if (result.success && result.data) {
                const products = result.data.map(mapMetalProductToProduct);
                set({ products, loading: false });
            } else {
                // Fallback to old system if new one is empty or fails
                console.warn('Switching to legacy product fetch due to empty metal_products or error');
                const dbProducts = await ProductService.getAllProducts();
                const products = dbProducts.map(mapDbToProduct);
                set({ products, loading: false });
            }
        } catch (error) {
            console.error('Fetch products failed:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch products',
                loading: false,
                products: [] // Ensure products is empty on error
            });
        }
    },

    fetchProductsAdmin: async () => {
        set({ loading: true, error: null });
        try {
            // Use Server Action
            const result = await getAdminProducts();
            if (!result.success || !result.data) throw new Error('Failed to fetch');

            const products = result.data.map(mapDbToProduct);
            set({ products, loading: false });
        } catch (error) {
            set({
                error: 'Failed to fetch products for admin',
                loading: false
            });
        }
    },

    fetchProductsByCategory: async (category: string) => {
        set({ loading: true, error: null });
        try {
            const dbProducts = await ProductService.getProductsByCategory(category);
            const products = dbProducts.map(mapDbToProduct);
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
            // Generate slug if not provided
            const slug = productData.slug || productData.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const newProductPayload = {
                name: productData.name,
                slug: slug,
                description: productData.description,
                price: productData.price,
                image_url: productData.image, // Map image to image_url for metal_products
                category_id: productData.category_id || productData.category, // Handle both
                is_active: true,
                stock_quantity: 100, // Default for now
                is_showcase: productData.is_showcase || false,
            };

            const result = await upsertAdminProduct(newProductPayload as any);
            if (!result.success || !result.data) throw new Error('Failed to create');

            const newDbProduct = result.data;

            set((state) => ({
                products: [mapDbToProduct(newDbProduct), ...state.products],
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
            // Map frontend structure updates back to flat DB fields if provided
            const dbUpdates: any = { ...updates, id };

            // Handle image mapping
            if (updates.image) {
                dbUpdates.image_url = updates.image;
                delete dbUpdates.image;
            }

            // Handle category mapping
            if (updates.category) {
                dbUpdates.category_id = updates.category;
                // Note: If 'category' is a slug in Admin UI, it needs conversion to UUID for metal_products
            }

            const result = await upsertAdminProduct(dbUpdates);
            if (!result.success || !result.data) throw new Error('Failed to update');

            const updatedDbProduct = result.data;

            set((state) => ({
                products: state.products.map((p) =>
                    p.id === id ? mapDbToProduct(updatedDbProduct) : p
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
            const result = await deleteAdminProduct(id);
            if (!result.success) throw new Error('Failed to delete');

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
