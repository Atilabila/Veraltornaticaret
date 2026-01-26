import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// WARNING: This client uses the SERVICE_ROLE_KEY and has full admin access.
// It should ONLY be used in Server Components, Server Actions, or API Routes.
// NEVER use this on the client side.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Missing Supabase Admin Keys. Admin actions will fail.');
    }
}

export const supabaseAdmin = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseServiceKey || 'placeholder',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
