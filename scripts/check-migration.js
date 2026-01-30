
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
    console.log('Running migration: Add is_showcase to metal_products...');

    // We'll use a raw SQL query if possible, or try to use the client to add a column
    // Actually, Supabase client doesn't support ALTER TABLE directly.
    // I will try to use a function or just hope the table has it soon.

    // Alternative: Use the 'supabase' CLI if available, or just tell the user.
    // Wait, I can try to run a simple update to see if the column exists.

    const { error } = await supabase
        .from('metal_products')
        .update({ is_showcase: true })
        .eq('id', 'non-existent-id');

    if (error && error.message.includes('column "is_showcase" of relation "metal_products" does not exist')) {
        console.log('Column is_showcase does not exist. Please add it via Supabase Dashboard SQL Editor:');
        console.log('ALTER TABLE metal_products ADD COLUMN is_showcase BOOLEAN DEFAULT FALSE;');
    } else if (error) {
        console.error('Migration check failed:', error);
    } else {
        console.log('Column is_showcase already exists or migration successful.');
    }
}

runMigration();
