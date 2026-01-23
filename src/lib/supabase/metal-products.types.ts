// =====================================================
// METAL PRODUCTS DATABASE TYPES
// Generated for Part 1: Admin Panel CRUD
// =====================================================

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

// =====================================================
// DATABASE SCHEMA TYPES
// =====================================================
export interface MetalProductsDatabase {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    image_url: string | null
                    display_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    image_url?: string | null
                    display_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    image_url?: string | null
                    display_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            metal_products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    image_url: string | null
                    background_color: string
                    category_id: string | null
                    is_active: boolean
                    stock_quantity: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    price?: number
                    image_url?: string | null
                    background_color?: string
                    category_id?: string | null
                    is_active?: boolean
                    stock_quantity?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    price?: number
                    image_url?: string | null
                    background_color?: string
                    category_id?: string | null
                    is_active?: boolean
                    stock_quantity?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            product_features: {
                Row: {
                    id: string
                    product_id: string
                    feature_text: string
                    feature_icon: string | null
                    display_order: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    feature_text: string
                    feature_icon?: string | null
                    display_order?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    feature_text?: string
                    feature_icon?: string | null
                    display_order?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// =====================================================
// TYPESCRIPT INTERFACES FOR APPLICATION USE
// =====================================================

export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    display_order: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface MetalProduct {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    image_url: string | null
    background_color: string
    category_id: string | null
    is_active: boolean
    stock_quantity: number
    created_at: string
    updated_at: string
    // Joined data
    category?: Category | null
    features?: ProductFeature[]
}

export interface ProductFeature {
    id: string
    product_id: string
    feature_text: string
    feature_icon: string | null
    display_order: number
    created_at: string
}

// =====================================================
// FORM TYPES FOR ADMIN PANEL
// =====================================================

export interface ProductFormData {
    name: string
    slug?: string
    description?: string
    price: number
    image_url?: string
    background_color: string
    category_id?: string
    is_active: boolean
    stock_quantity: number
    features: FeatureFormData[]
}

export interface FeatureFormData {
    id?: string
    feature_text: string
    feature_icon?: string
    display_order: number
}

export interface CategoryFormData {
    name: string
    slug?: string
    description?: string
    image_url?: string
    display_order: number
    is_active: boolean
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T> {
    data: T | null
    error: string | null
    success: boolean
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}
