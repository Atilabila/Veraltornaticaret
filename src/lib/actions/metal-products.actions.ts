'use server'

// =====================================================
// METAL PRODUCTS SERVER ACTIONS
// CRUD Operations for Admin Panel
// =====================================================

import { supabase } from '@/lib/supabase/client'
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

        const { data, error } = await (supabase as any)
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
        const { data, error } = await (supabase as any)
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
        const { error } = await (supabase as any)
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

export async function getProducts(): Promise<ApiResponse<MetalProduct[]>> {
    try {
        const { data, error } = await (supabase as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .order('created_at', { ascending: false })

        if (error) throw error

        return { data: data as MetalProduct[], error: null, success: true }
    } catch (err) {
        console.error('Error fetching products:', err)
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
        // Auto-generate slug if not provided
        const slug = formData.slug || formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        // Insert product
        const { data: product, error: productError } = await (supabase as any)
            .from('metal_products')
            .insert({
                name: formData.name,
                slug,
                description: formData.description,
                price: formData.price,
                image_url: formData.image_url,
                background_color: formData.background_color,
                category_id: formData.category_id,
                is_active: formData.is_active,
                stock_quantity: formData.stock_quantity
            })
            .select()
            .single()

        if (productError) throw productError

        // Insert features if any
        if (formData.features && formData.features.length > 0) {
            const featuresWithProductId = formData.features.map((f, index) => ({
                product_id: product.id,
                feature_text: f.feature_text,
                feature_icon: f.feature_icon,
                display_order: f.display_order || index + 1
            }))

            const { error: featuresError } = await (supabase as any)
                .from('product_features')
                .insert(featuresWithProductId)

            if (featuresError) {
                console.error('Error inserting features:', featuresError)
                // Don't fail the entire operation, product is created
            }
        }

        // Fetch the complete product with relations
        const { data: fullProduct } = await (supabase as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('id', product.id)
            .single()

        return { data: fullProduct as MetalProduct, error: null, success: true }
    } catch (err) {
        console.error('Error creating product:', err)
        return { data: null, error: 'Ürün oluşturulamadı', success: false }
    }
}

export async function updateProduct(id: string, formData: Partial<ProductFormData>): Promise<ApiResponse<MetalProduct>> {
    try {
        // Update product
        const { features, ...productData } = formData

        const { error: productError } = await (supabase as any)
            .from('metal_products')
            .update(productData)
            .eq('id', id)

        if (productError) throw productError

        // Handle features update if provided
        if (features !== undefined) {
            // Delete existing features
            await (supabase as any)
                .from('product_features')
                .delete()
                .eq('product_id', id)

            // Insert new features
            if (features.length > 0) {
                const featuresWithProductId = features.map((f, index) => ({
                    product_id: id,
                    feature_text: f.feature_text,
                    feature_icon: f.feature_icon,
                    display_order: f.display_order || index + 1
                }))

                await (supabase as any)
                    .from('product_features')
                    .insert(featuresWithProductId)
            }
        }

        // Fetch updated product
        const { data: updatedProduct } = await (supabase as any)
            .from('metal_products')
            .select(`
                *,
                category:categories(*),
                features:product_features(*)
            `)
            .eq('id', id)
            .single()

        return { data: updatedProduct as MetalProduct, error: null, success: true }
    } catch (err) {
        console.error('Error updating product:', err)
        return { data: null, error: 'Ürün güncellenemedi', success: false }
    }
}

export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
    try {
        // Features will be deleted automatically via CASCADE
        const { error } = await (supabase as any)
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

        const { data, error } = await (supabase as any)
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
        const { error } = await (supabase as any)
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

        const { error: uploadError } = await supabase.storage
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
        console.error('Error uploading image:', err)
        return { data: null, error: 'Görsel yüklenemedi', success: false }
    }
}
