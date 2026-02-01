import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSchema() {
    console.log('🔄 Updating quotes table schema...');

    // We use the REST API to check if columns exist by trying a select, 
    // but better to just use a raw SQL approach if possible.
    // Supabase doesn't have a direct "exec SQL" via JS client unless enabled.

    console.log('⚠️ Please run this SQL in your Supabase Dashboard SQL Editor:');
    console.log(`
    -- 1. Add missing columns to quotes table
    ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS estimated_quantity TEXT;
    ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS material_type TEXT;

    -- 2. Allow multiple attachments by dropping the unique constraint
    ALTER TABLE public.quote_attachments DROP CONSTRAINT IF EXISTS one_attachment_per_quote;
    `);
}

updateSchema();
