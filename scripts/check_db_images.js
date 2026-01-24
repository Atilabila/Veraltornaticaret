
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('name, image, slug')
        .limit(10);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Sample Products from DB:');
    console.log(JSON.stringify(data, null, 2));
}

checkProducts();
