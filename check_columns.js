/*
  Safe schema sanity-check helper.

  Usage:
    node check_columns.js

  Requires env vars in .env.local (or process env):
    - SUPABASE_URL (preferred) or NEXT_PUBLIC_SUPABASE_URL
    - SUPABASE_SERVICE_ROLE_KEY

  Notes:
    - This script uses the service role key. Never use it in browser/client code.
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

async function checkColumn(table, column) {
  const { error } = await supabase
    .from(table)
    .select(column, { head: true, count: 'exact' })
    .limit(1);

  if (!error) return { ok: true };

  // PostgREST returns a readable error when a column does not exist.
  if (String(error.message || '').toLowerCase().includes('column')) {
    return { ok: false, reason: error.message };
  }

  return { ok: false, reason: error.message || String(error) };
}

async function main() {
  const checks = [
    { table: 'metal_products', column: 'id' },
    { table: 'metal_products', column: 'name' },
    { table: 'product_variants', column: 'product_id' },
    { table: 'product_variants', column: 'size_label' },
    { table: 'product_variants', column: 'price_modifier' },
    { table: 'product_variants', column: 'stock_quantity' },
  ];

  let failed = 0;

  for (const c of checks) {
    const res = await checkColumn(c.table, c.column);
    if (res.ok) {
      console.log('OK  ' + c.table + '.' + c.column);
    } else {
      failed++;
      console.log('ERR ' + c.table + '.' + c.column + ' -> ' + res.reason);
    }
  }

  if (failed > 0) process.exit(2);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
