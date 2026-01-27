export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    price: number
                    image: string
                    description: string
                    story: string
                    category: string
                    material: string
                    process: string
                    print: string
                    thickness: string
                    dims: string
                    mounting: string
                    seo_title: string
                    seo_description: string
                    seo_keywords: string[]
                    created_at: string
                    updated_at: string
                    is_active: boolean
                    stock_quantity: number
                    view_count: number
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    price: number
                    image: string
                    description: string
                    story: string
                    category: string
                    material: string
                    process: string
                    print: string
                    thickness: string
                    dims: string
                    mounting: string
                    seo_title: string
                    seo_description: string
                    seo_keywords: string[]
                    created_at?: string
                    updated_at?: string
                    is_active?: boolean
                    stock_quantity?: number
                    view_count?: number
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    price?: number
                    image?: string
                    description?: string
                    story?: string
                    category?: string
                    material?: string
                    process?: string
                    print?: string
                    thickness?: string
                    dims?: string
                    mounting?: string
                    seo_title?: string
                    seo_description?: string
                    seo_keywords?: string[]
                    created_at?: string
                    updated_at?: string
                    is_active?: boolean
                    stock_quantity?: number
                    view_count?: number
                }
            }
            product_images: {
                Row: {
                    id: string
                    product_id: string
                    size: 'xs' | 's' | 'm' | 'l' | 'xl'
                    url: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    size: 'xs' | 's' | 'm' | 'l' | 'xl'
                    url: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    size?: 'xs' | 's' | 'm' | 'l' | 'xl'
                    url?: string
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    order_number: string
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address: Json
                    subtotal: number
                    shipping_cost: number
                    total: number
                    payment_method: string
                    payment_status: string
                    status: string
                    synced_from_local: boolean | null
                    sync_error: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    order_number: string
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address: Json
                    subtotal: number
                    shipping_cost: number
                    total: number
                    payment_method: string
                    payment_status?: string
                    status?: string
                    synced_from_local?: boolean | null
                    sync_error?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    order_number?: string
                    customer_name?: string
                    customer_email?: string
                    customer_phone?: string
                    shipping_address?: Json
                    subtotal?: number
                    shipping_cost?: number
                    total?: number
                    payment_method?: string
                    payment_status?: string
                    status?: string
                    synced_from_local?: boolean | null
                    sync_error?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string
                    product_slug: string
                    product_name: string
                    size: string
                    orientation: string
                    unit_price: number
                    quantity: number
                    subtotal: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id: string
                    product_slug: string
                    product_name: string
                    size: string
                    orientation: string
                    unit_price: number
                    quantity?: number
                    subtotal: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string
                    product_slug?: string
                    product_name?: string
                    size?: string
                    orientation?: string
                    unit_price?: number
                    quantity?: number
                    subtotal?: number
                    created_at?: string
                }
            }
            quotes: {
                Row: {
                    id: string
                    quote_number: string
                    full_name: string
                    company: string | null
                    email: string
                    phone: string
                    service_type: string
                    description: string
                    file_metadata: Json | null
                    status: string
                    synced_from_local: boolean | null
                    sync_error: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    quote_number: string
                    full_name: string
                    company?: string | null
                    email: string
                    phone: string
                    service_type: string
                    description: string
                    file_metadata?: Json | null
                    status?: string
                    synced_from_local?: boolean | null
                    sync_error?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    quote_number?: string
                    full_name?: string
                    company?: string | null
                    email?: string
                    phone?: string
                    service_type?: string
                    description?: string
                    file_metadata?: Json | null
                    status?: string
                    synced_from_local?: boolean | null
                    sync_error?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            site_content: {
                Row: {
                    id: string
                    key: string
                    data: Record<string, any>
                    updated_at: string
                }
                Insert: {
                    id?: string
                    key: string
                    data: Record<string, any>
                    updated_at?: string
                }
                Update: {
                    id?: string
                    key?: string
                    data?: Record<string, any>
                    updated_at?: string
                }
            }
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
