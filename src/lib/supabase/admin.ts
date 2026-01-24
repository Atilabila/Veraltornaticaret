
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
// NOTE: Admin key must be in .env.local as SUPABASE_SERVICE_ROLE_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-for-build';

if (!supabaseServiceRoleKey) {
    console.warn('⚠️ Admin client initialized without SUPABASE_SERVICE_ROLE_KEY. Admin actions may fail.')
}

// Create a Supabase client with the SERVICE_ROLE_KEY
// This client bypasses Row Level Security (RLS) and should only be used server-side
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})
