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
                    shipping_address: string
                    total_amount: number
                    total_price: number | null
                    email: string | null
                    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    order_number: string
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address: string
                    total_amount: number
                    total_price?: number | null
                    email?: string | null
                    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    customer_name?: string
                    customer_email?: string
                    customer_phone?: string
                    shipping_address?: string
                    total_amount?: number
                    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    product_slug: string | null
                    quantity: number
                    unit_price: number
                    price: number | null
                    size: string | null
                    orientation: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id?: string | null
                    product_slug?: string | null
                    quantity: number
                    unit_price: number
                    price?: number | null
                    size?: string | null
                    orientation?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string
                    quantity?: number
                    unit_price?: number
                    created_at?: string
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
