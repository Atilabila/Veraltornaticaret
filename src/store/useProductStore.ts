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

const mapDbToProduct = (dbProduct: DbProduct): Product => ({
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    price: dbProduct.price,
    image: dbProduct.image,
    description: dbProduct.description,
    story: dbProduct.story,
    category: dbProduct.category,
    specs: {
        material: dbProduct.material,
        process: dbProduct.process,
        print: dbProduct.print,
        thickness: dbProduct.thickness,
        dims: dbProduct.dims,
        mounting: dbProduct.mounting,
    },
    seo: {
        title: dbProduct.seo_title,
        description: dbProduct.seo_description,
        keywords: dbProduct.seo_keywords || [],
    }
});

// ... imports
import { getAdminProducts, upsertAdminProduct, deleteAdminProduct } from '@/actions/admin';

// ... existing mapDbToProduct ...

export const useProductStore = create<ProductStore>()((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const dbProducts = await ProductService.getAllProducts();
            const products = dbProducts.map(mapDbToProduct);
            set({ products, loading: false });
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
            if (!result.success || !result.data) throw new Error(result.error || 'Failed to fetch');

            const products = result.data.map(mapDbToProduct);
            set({ products, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch products for admin',
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
                image: productData.image,
                category: productData.category,
                story: productData.story || `${productData.name} - Metal Poster Koleksiyonu.`,
                material: productData.specs?.material || "1.5mm Alüminyum",
                process: productData.specs?.process || "UV Statik Baskı",
                print: productData.specs?.print || "Endüstriyel Gen-3",
                thickness: productData.specs?.thickness || "1.5mm",
                dims: productData.specs?.dims || "Var sayılan",
                mounting: productData.specs?.mounting || "Mikro Mıknatıs",
                seo_title: productData.seo?.title || productData.name,
                seo_description: productData.seo?.description || productData.description,
                seo_keywords: productData.seo?.keywords || [productData.name, "metal poster", "dekorasyon"],
                is_active: true,
            };

            const result = await upsertAdminProduct(newProductPayload as any);
            if (!result.success || !result.data) throw new Error(result.error || 'Failed to create');

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
            const dbUpdates: any = { ...updates, id }; // Include ID for upsert
            if (updates.specs) {
                if (updates.specs.material) dbUpdates.material = updates.specs.material;
                if (updates.specs.process) dbUpdates.process = updates.specs.process;
                if (updates.specs.print) dbUpdates.print = updates.specs.print;
                if (updates.specs.thickness) dbUpdates.thickness = updates.specs.thickness;
                if (updates.specs.dims) dbUpdates.dims = updates.specs.dims;
                if (updates.specs.mounting) dbUpdates.mounting = updates.specs.mounting;
                delete dbUpdates.specs;
            }
            if (updates.seo) {
                if (updates.seo.title) dbUpdates.seo_title = updates.seo.title;
                if (updates.seo.description) dbUpdates.seo_description = updates.seo.description;
                if (updates.seo.keywords) dbUpdates.seo_keywords = updates.seo.keywords;
                delete dbUpdates.seo;
            }

            const result = await upsertAdminProduct(dbUpdates);
            if (!result.success || !result.data) throw new Error(result.error || 'Failed to update');

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
            if (!result.success) throw new Error(result.error || 'Failed to delete');

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
