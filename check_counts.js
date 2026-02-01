
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://wswlhtglwpyragymrdhl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzd2xodGdsd3B5cmFneW1yZGhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODk5NDQxMCwiZXhwIjoyMDg0NTcwNDEwfQ.WJLsvM-E7XuJpGRbuWVv5VVF860hbIVzkxI1Bfg-3ao";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCounts() {
    const { data, error } = await supabase
        .from('metal_products')
        .select('is_showcase, is_active');

    if (error) {
        console.error(error);
        return;
    }

    const stats = {
        total: data.length,
        showcase: data.filter(p => p.is_showcase === true).length,
        inventory: data.filter(p => p.is_showcase === false || p.is_showcase === null).length,
        active_showcase: data.filter(p => p.is_showcase === true && p.is_active === true).length
    };

    console.log('Product Stats:', stats);
}

checkCounts();
