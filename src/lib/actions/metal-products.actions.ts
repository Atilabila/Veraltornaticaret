'use server'

// =====================================================
// METAL PRODUCTS SERVER ACTIONS
// CRUD Operations for Admin Panel
// =====================================================

import { supabase } from '@/lib/supabase/client'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

const supabaseAdmin = createAdminSupabaseClient()
import type {
    MetalProduct,
    Category,
    ProductFeature,
    ProductFormData,
    CategoryFormData,
    ApiResponse
} from '@/lib/supabase/metal-products.types'

// =====================================================
// CATEGORY ACTIONS
// =====================================================

export async function getCategories(): Promise<ApiResponse<Category[]>> {
    try {
        const { data, error } = await (supabase as any)
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) throw error

        return { data: data as Category[], error: null, success: true }
    } catch (err) {
        console.error('Error fetching categories:', err)
        return { data: null, error: 'Kategoriler yüklenemedi', success: false }
    }
}

export async function createCategory(formData: CategoryFormData): Promise<ApiResponse<Category>> {
    try {
        // Auto-generate slug if not provided
        const slug = formData.slug || formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        const { data, error } = await (supabaseAdmin as any)
            .from('categories')
            .insert({
                ...formData,
                slug
            })
            .select()
            .single()

        if (error) throw error

        return { data: data as Category, error: null, success: true }
    } catch (err) {
        console.error('Error creating category:', err)
        return { data: null, error: 'Kategori oluşturulamadı', success: false }
    }
}

export async function updateCategory(id: string, formData: Partial<CategoryFormData>): Promise<ApiResponse<Category>> {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('categories')
            .update(formData)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return { data: data as Category, error: null, success: true }
    } catch (err) {
        console.error('Error updating category:', err)
        return { data: null, error: 'Kategori güncellenemedi', success: false }
    }
}

export async function deleteCategory(id: string): Promise<ApiResponse<null>> {
    try {
        const { error } = await (supabaseAdmin as any)
            .from('categories')
            .delete()
            .eq('id', id)

        if (error) throw error

        return { data: null, error: null, success: true }
    } catch (err) {
        console.error('Error deleting category:', err)
        return { data: null, error: 'Kategori silinemedi', success: false }
    }
}

// =====================================================
// PRODUCT ACTIONS
// =====================================================

export async function getProducts(isShowcase?: boolean): Promise<ApiResponse<MetalProduct[]>> {
    console.log(`[ACTION] getProducts called with isShowcase:`, isShowcase);
    try {
        let query = (supabaseAdmin as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `);

        if (isShowcase === true) {
            query = query.eq('is_showcase', true);
        } else if (isShowcase === false) {
            // Include both false and null for regular products
            query = query.or('is_showcase.eq.false,is_showcase.is.null');
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('[ACTION] getProducts error:', error);
            throw error;
        }

        console.log(`[ACTION] getProducts returned ${data?.length || 0} items`);
        return { data: data as MetalProduct[], error: null, success: true }
    } catch (err) {
        console.error('[ACTION] Error fetching products:', err)
        return { data: null, error: 'Ürünler yüklenemedi', success: false }
    }
}

export async function getProductById(id: string): Promise<ApiResponse<MetalProduct>> {
    try {
        const { data, error } = await (supabase as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('id', id)
            .single()

        if (error) throw error

        return { data: data as MetalProduct, error: null, success: true }
    } catch (err) {
        console.error('Error fetching product:', err)
        return { data: null, error: 'Ürün bulunamadı', success: false }
    }
}

export async function getProductBySlug(slug: string): Promise<ApiResponse<MetalProduct>> {
    try {
        const { data, error } = await (supabase as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('slug', slug)
            .eq('is_active', true)
            .single()

        if (error) throw error

        return { data: data as MetalProduct, error: null, success: true }
    } catch (err) {
        console.error('Error fetching product by slug:', err)
        return { data: null, error: 'Ürün bulunamadı', success: false }
    }
}

export async function createProduct(formData: ProductFormData): Promise<ApiResponse<MetalProduct>> {
    try {
        console.log(`[ACTION] createProduct called`, formData);

        // Auto-generate slug if not provided
        const slug = formData.slug || formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        const { features, ...rest } = formData as any;

        // Strip non-insertable or analytical fields
        const allowedColumns = [
            'name', 'slug', 'description', 'price', 'image_url',
            'background_color', 'category_id', 'is_active',
            'stock_quantity', 'sku', 'is_showcase',
            'material', 'paint', 'installation', 'origin'
        ];

        const productData: any = {};

        // Handle field mapping
        if (rest.image && !rest.image_url) rest.image_url = rest.image;
        if (rest.category && !rest.category_id && typeof rest.category === 'string') rest.category_id = rest.category;

        Object.keys(rest).forEach(key => {
            if (allowedColumns.includes(key)) {
                productData[key] = rest[key];
            }
        });

        // Ensure slug is in productData
        productData.slug = slug;

        console.log(`[ACTION] productData for insert:`, productData);

        // Insert product
        const { data: product, error: productError } = await (supabaseAdmin as any)
            .from('metal_products')
            .insert(productData)
            .select()
            .single()

        if (productError) {
            console.error('[DATABASE ERROR] Product creation failed:', productError);
            throw productError
        }

        // Insert features if any
        if (features && features.length > 0) {
            const featuresWithProductId = features.map((f: any, index: number) => ({
                product_id: product.id,
                feature_text: f.feature_text,
                feature_icon: f.feature_icon,
                display_order: f.display_order || index + 1
            }))

            const { error: featuresError } = await (supabaseAdmin as any)
                .from('product_features')
                .insert(featuresWithProductId)

            if (featuresError) {
                console.error('[DATABASE ERROR] Feature insertion failed:', featuresError)
            }
        }

        // Fetch the complete product with relations
        const { data: fullProduct, error: fetchError } = await (supabaseAdmin as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('id', product.id)
            .single()

        if (fetchError) {
            console.error('[DATABASE ERROR] Fetching created product failed:', fetchError);
            throw fetchError;
        }

        return { data: fullProduct as MetalProduct, error: null, success: true }
    } catch (err: any) {
        console.error('[CRITICAL ACTION ERROR] createProduct failed:', err)
        return { data: null, error: `Ürün oluşturulamadı: ${err.message || 'Bilinmeyen hata'}`, success: false }
    }
}

export async function updateProduct(id: string, formData: Partial<ProductFormData>): Promise<ApiResponse<MetalProduct>> {
    try {
        console.log(`[ACTION] updateProduct called for ID: ${id}`, formData);

        // Update product
        const { features, ...rest } = formData as any;

        // Strip non-updatable or analytical fields that might exist in the object
        // but not in the database schema.
        const allowedColumns = [
            'name', 'slug', 'description', 'price', 'image_url',
            'background_color', 'category_id', 'is_active',
            'stock_quantity', 'sku', 'is_showcase',
            'material', 'paint', 'installation', 'origin'
        ];

        const productData: any = {};

        // Handle field mapping (sometimes frontend sends 'image' instead of 'image_url')
        if (rest.image && !rest.image_url) rest.image_url = rest.image;
        if (rest.category && !rest.category_id && typeof rest.category === 'string') rest.category_id = rest.category;

        Object.keys(rest).forEach(key => {
            if (allowedColumns.includes(key)) {
                productData[key] = rest[key];
            }
        });

        console.log(`[ACTION] Filtered productData for update:`, productData);

        const { error: productError } = await (supabaseAdmin as any)
            .from('metal_products')
            .update({
                ...productData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id);

        if (productError) {
            console.error('[DATABASE ERROR] Product update failed:', productError);
            throw productError;
        }

        // Handle features update if provided
        if (features !== undefined) {
            // Delete existing features
            const { error: deleteError } = await (supabaseAdmin as any)
                .from('product_features')
                .delete()
                .eq('product_id', id);

            if (deleteError) {
                console.warn('[DATABASE WARNING] Feature deletion failed:', deleteError);
            }

            // Insert new features
            if (features.length > 0) {
                const featuresWithProductId = features.map((f: any, index: number) => ({
                    product_id: id,
                    feature_text: f.feature_text,
                    feature_icon: f.feature_icon,
                    display_order: f.display_order || index + 1
                }));

                const { error: insertError } = await (supabaseAdmin as any)
                    .from('product_features')
                    .insert(featuresWithProductId);

                if (insertError) {
                    console.error('[DATABASE ERROR] Feature insert failed:', insertError);
                }
            }
        }

        // Fetch updated product
        const { data: updatedProduct, error: fetchError } = await (supabaseAdmin as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('[DATABASE ERROR] Fetching updated product failed:', fetchError);
            // Even if fetch fails, the update was successful. 
            // Return what we have or a partial success? 
            // For now throw to match existing behavior.
            throw fetchError;
        }

        return { data: updatedProduct as MetalProduct, error: null, success: true }
    } catch (err: any) {
        console.error('[CRITICAL ACTION ERROR] updateProduct failed:', err);
        return { data: null, error: `Ürün güncellenemedi: ${err.message || 'Bilinmeyen hata'}`, success: false }
    }
}

export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
    try {
        // Features will be deleted automatically via CASCADE
        const { error } = await (supabaseAdmin as any)
            .from('metal_products')
            .delete()
            .eq('id', id)

        if (error) throw error

        return { data: null, error: null, success: true }
    } catch (err) {
        console.error('Error deleting product:', err)
        return { data: null, error: 'Ürün silinemedi', success: false }
    }
}

export async function toggleProductStatus(id: string, isActive: boolean): Promise<ApiResponse<MetalProduct>> {
    return updateProduct(id, { is_active: isActive })
}

// =====================================================
// FEATURE ACTIONS
// =====================================================

export async function addProductFeature(
    productId: string,
    featureText: string,
    featureIcon?: string
): Promise<ApiResponse<ProductFeature>> {
    try {
        // Get current max display_order
        const { data: existing } = await (supabase as any)
            .from('product_features')
            .select('display_order')
            .eq('product_id', productId)
            .order('display_order', { ascending: false })
            .limit(1)

        const nextOrder = existing && existing.length > 0
            ? existing[0].display_order + 1
            : 1

        const { data, error } = await (supabaseAdmin as any)
            .from('product_features')
            .insert({
                product_id: productId,
                feature_text: featureText,
                feature_icon: featureIcon,
                display_order: nextOrder
            })
            .select()
            .single()

        if (error) throw error

        return { data: data as ProductFeature, error: null, success: true }
    } catch (err) {
        console.error('Error adding feature:', err)
        return { data: null, error: 'Özellik eklenemedi', success: false }
    }
}

export async function deleteProductFeature(id: string): Promise<ApiResponse<null>> {
    try {
        const { error } = await (supabaseAdmin as any)
            .from('product_features')
            .delete()
            .eq('id', id)

        if (error) throw error

        return { data: null, error: null, success: true }
    } catch (err) {
        console.error('Error deleting feature:', err)
        return { data: null, error: 'Özellik silinemedi', success: false }
    }
}

// =====================================================
// STORAGE ACTIONS (Image Upload)
// =====================================================

export async function uploadProductImage(
    file: File,
    productSlug: string
): Promise<ApiResponse<string>> {
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${productSlug}-${Date.now()}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabaseAdmin.storage
            .from('ürünler')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
            .from('ürünler')
            .getPublicUrl(filePath)

        return { data: urlData.publicUrl, error: null, success: true }
    } catch (err) {
        return { data: null, error: 'Görsel yüklenemedi', success: false }
    }
}

export async function createBulkProducts(products: ProductFormData[]): Promise<ApiResponse<number>> {
    try {
        console.log(`[ACTION] createBulkProducts called for ${products.length} products`);

        // Strip non-insertable or analytical fields
        const allowedColumns = [
            'name', 'slug', 'description', 'price', 'image_url',
            'background_color', 'category_id', 'is_active',
            'stock_quantity', 'sku', 'is_showcase',
            'material', 'paint', 'installation', 'origin'
        ];

        // Prepare data with slugs
        const productsToInsert = products.map(p => {
            const baseSlug = p.slug || p.name
                .toLowerCase()
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')

            // Add short random suffix to ensure uniqueness in bulk uploads
            const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 5)}`

            const row: any = p;
            const productData: any = {};

            // Handle field mapping
            if (row.image && !row.image_url) row.image_url = row.image;
            if (row.category && !row.category_id && typeof row.category === 'string') row.category_id = row.category;

            Object.keys(row).forEach(key => {
                if (allowedColumns.includes(key)) {
                    productData[key] = row[key];
                }
            });

            // Force slug and numeric types
            productData.slug = slug;
            productData.price = Number(productData.price) || 0;
            productData.stock_quantity = Number(productData.stock_quantity) || 0;
            productData.is_active = productData.is_active ?? true;
            productData.is_showcase = productData.is_showcase ?? false;

            return productData;
        })

        const { data, error } = await (supabaseAdmin as any)
            .from('metal_products')
            .insert(productsToInsert)
            .select()

        if (error) {
            console.error('[DATABASE ERROR] Bulk Insert Error:', error)
            throw error
        }

        return { data: data?.length || 0, error: null, success: true }
    } catch (err: any) {
        console.error('[CRITICAL ACTION ERROR] createBulkProducts failed:', err)
        return {
            data: null,
            error: `Toplu ürün ekleme başarısız: ${err.message || 'Bilinmeyen hata'}`,
            success: false
        }
    }
}

export async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<ApiResponse<MetalProduct[]>> {
    try {
        const { data, error } = await (supabase as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('category_id', categoryId)
            .neq('id', currentProductId)
            .eq('is_active', true)
            .limit(4)

        if (error) throw error

        return { data: data as MetalProduct[], error: null, success: true }
    } catch (err) {
        console.error('Error fetching related products:', err)
        return { data: [], error: 'Benzer ürünler yüklenemedi', success: false }
    }
}
