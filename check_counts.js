/*
  Safe row-count helper.

  Usage:
    node check_counts.js

  Requires env vars in .env.local (or process env):
    - SUPABASE_URL (preferred) or NEXT_PUBLIC_SUPABASE_URL
    - SUPABASE_SERVICE_ROLE_KEY
*/

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables.');
  console.error('Expected SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function countTable(table) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) return { ok: false, reason: error.message || String(error) };
  return { ok: true, count: count ?? 0 };
}

async function main() {
  const tables = ['metal_products', 'product_variants'];

  for (const table of tables) {
    const res = await countTable(table);
    if (res.ok) {
      console.log(table + ': ' + res.count);
    } else {
      console.log(table + ': ERR -> ' + res.reason);
    }
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});

