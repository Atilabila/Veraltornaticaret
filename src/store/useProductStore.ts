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
    image: dbProduct.image_url || dbProduct.image || '/placeholder.png',
    description: dbProduct.description,
    story: dbProduct.description,
    category: dbProduct.category_id || dbProduct.category,
    is_showcase: dbProduct.is_showcase || false,
    stock_quantity: dbProduct.stock_quantity || 0,
    is_active: dbProduct.is_active ?? true,
    background_color: dbProduct.background_color || "#0A0A0A",
    sku: dbProduct.sku || "",
    specs: {
        material: dbProduct.material || "1.5mm Alüminyum",
        process: dbProduct.process || "UV Baskı",
        print: dbProduct.print || "Endüstriyel",
        thickness: dbProduct.thickness || "1.5mm",
        dims: dbProduct.dims || "45x60cm",
        mounting: dbProduct.mounting || "Mıknatıs",
        ...(dbProduct.features?.reduce((acc: any, f: any) => {
            acc[f.feature_text] = f.feature_text;
            return acc;
        }, {}) || {})
    },
    features: dbProduct.features || [],
    seo: {
        title: dbProduct.seo_title || dbProduct.name,
        description: dbProduct.seo_description || dbProduct.description,
        keywords: dbProduct.seo_keywords || [],
    }
});

// ... imports
import { getProducts as getMetalProducts, createProduct as createMetalProduct, updateProduct as updateMetalProduct, deleteProduct as deleteMetalProduct } from '@/lib/actions/metal-products.actions';
import type { MetalProduct } from '@/lib/supabase/metal-products.types';
import { getAdminOrderStats } from '@/actions/admin';

// ... existing mapDbToProduct ...

const mapMetalProductToProduct = (mp: MetalProduct): Product => {
    // Convert features array to specs record
    const specs: Record<string, string> = {
        material: "1.5mm Alüminyum",
        process: "UV Baskı",
        print: "Endüstriyel",
        thickness: "1.5mm",
        dims: "45x60cm",
        mounting: "Mıknatıs",
    };

    if (mp.features && mp.features.length > 0) {
        mp.features.forEach((f, idx) => {
            specs[`Detay ${idx + 1}`] = f.feature_text;
        });
    }

    return {
        id: mp.id,
        name: mp.name,
        slug: mp.slug,
        price: mp.price,
        is_showcase: mp.is_showcase,
        stock_quantity: mp.stock_quantity,
        is_active: mp.is_active,
        background_color: mp.background_color,
        sku: mp.sku || "",
        image: mp.image_url || '/placeholder.png',
        description: mp.description || '',
        story: mp.description || '',
        category: mp.category?.id || mp.category_id || 'GENEL',
        features: mp.features || [],
        specs,
        seo: {
            title: mp.name,
            description: mp.description || '',
            keywords: [mp.name, 'metal poster'],
        }
    };
};

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
            // Use the same standard action for Admin too to ensure data consistency
            const result = await getMetalProducts();
            if (!result.success || !result.data) throw new Error('Failed to fetch admin products');

            const products = result.data.map(mapMetalProductToProduct);
            set({ products, loading: false });
        } catch (error) {
            set({
                error: 'Envanter verileri çekilemedi. Lütfen sistem yöneticisine başvurun.',
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
            const result = await createMetalProduct(productData);
            if (!result.success || !result.data) throw new Error(result.error || 'Failed to create');

            const newProduct = result.data;

            set((state) => ({
                products: [mapMetalProductToProduct(newProduct), ...state.products],
                loading: false,
            }));
        } catch (error: any) {
            set({
                error: error.message || 'Failed to add product',
                loading: false
            });
            throw error;
        }
    },

    updateProduct: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const result = await updateMetalProduct(id, updates);
            if (!result.success || !result.data) throw new Error(result.error || 'Failed to update');

            const updatedProduct = result.data;

            set((state) => ({
                products: state.products.map((p) =>
                    p.id === id ? mapMetalProductToProduct(updatedProduct) : p
                ),
                loading: false,
            }));
        } catch (error: any) {
            set({
                error: error.message || 'Failed to update product',
                loading: false
            });
            throw error;
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            const result = await deleteMetalProduct(id);
            if (!result.success) throw new Error(result.error || 'Failed to delete');

            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            set({
                error: error.message || 'Failed to delete product',
                loading: false
            });
            throw error;
        }
    },

    getProduct: (id) => {
        return get().products.find((p) => p.id === id);
    },
}));
