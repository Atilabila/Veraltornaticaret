
const { createAdminSupabaseClient } = require('./src/lib/supabase/admin');
const supabaseAdmin = createAdminSupabaseClient();

async function checkDB() {
    const { data, error } = await supabaseAdmin
        .from('metal_products')
        .select('id, name, is_showcase, is_active');

    if (error) {
        console.error(error);
        return;
    }

    console.log('Metal Products in DB:');
    console.log(JSON.stringify(data, null, 2));
}

checkDB();
