
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://wswlhtglwpyragymrdhl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzd2xodGdsd3B5cmFneW1yZGhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODk5NDQxMCwiZXhwIjoyMDg0NTcwNDEwfQ.WJLsvM-E7XuJpGRbuWVv5VVF860hbIVzkxI1Bfg-3ao";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
    const { data, error } = await supabase
        .from('metal_products')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Query Error:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns in metal_products:', Object.keys(data[0]));
    } else {
        console.log('No products found to check columns.');
        // Try to insert a dummy one to see if it fails
        const { error: insertError } = await supabase
            .from('metal_products')
            .insert({ name: 'Test', slug: 'test-column-check', is_showcase: true });

        if (insertError) {
            console.log('Insert failed (likely missing column):', insertError.message);
        } else {
            console.log('Insert worked! Column exists.');
            // Clean up
            await supabase.from('metal_products').delete().eq('slug', 'test-column-check');
        }
    }
}

checkColumns();
