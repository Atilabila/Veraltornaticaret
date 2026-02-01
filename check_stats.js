
const { createAdminSupabaseClient } = require('./src/lib/supabase/admin');
const supabaseAdmin = createAdminSupabaseClient();

async function checkStats() {
    const { data: allProducts, error } = await supabaseAdmin
        .from('metal_products')
        .select('id, name, is_showcase');

    if (error) {
        console.error(error);
        return;
    }

    const stats = {
        total: allProducts.length,
        true: allProducts.filter(p => p.is_showcase === true).length,
        false: allProducts.filter(p => p.is_showcase === false).length,
        null: allProducts.filter(p => p.is_showcase === null).length
    };

    console.log('Product Stats:', stats);
}

checkStats();
