import * as dotenv from 'dotenv';
import path from 'path';

// Fix for Windows path resolution if needed, or just specific path
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testConnection() {
    console.log('🔍 Testing Supabase connection...');

    // Dynamic import to ensure env vars are loaded first
    const { supabase } = await import('./src/lib/supabase/client');

    try {
        // Test 1: Database connection
        const { data, error } = await supabase
            .from('products')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Connection failed:', error.message);
            return false;
        }

        console.log('✅ Database connection successful!');

        // Test 2: Check if tables exist
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .limit(1);

        if (productsError) {
            console.error('❌ Products table error:', productsError.message);
            return false;
        }

        console.log('✅ Products table exists!');
        console.log('📊 Product count:', products?.length || 0);

        return true;
    } catch (err) {
        console.error('❌ Unexpected error:', err);
        return false;
    }
}

testConnection();
