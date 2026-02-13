import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function main() {
  const url = required('NEXT_PUBLIC_SUPABASE_URL');
  const serviceKey = required('SUPABASE_SERVICE_ROLE_KEY');

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const head = await supabase.from('product_variants').select('id', { head: true, count: 'exact' });
  if (head.error) {
    console.error('[VERIFY] product_variants query failed:', head.error.message);
    process.exitCode = 1;
    return;
  }
  console.log('[VERIFY] product_variants OK. Row count:', head.count ?? 0);

  const rel = await supabase
    .from('metal_products')
    .select('id,name,variants:product_variants(id,size_label,price_modifier,stock_quantity)')
    .limit(1)
    .single();

  if (rel.error) {
    console.error('[VERIFY] metal_products -> variants relationship failed:', rel.error.message);
    process.exitCode = 1;
    return;
  }

  console.log('[VERIFY] relationship OK. Sample product:', {
    id: rel.data?.id,
    name: rel.data?.name,
    variants: rel.data?.variants ?? [],
  });
}

main().catch((err) => {
  console.error('[VERIFY] Unexpected error:', err?.message || err);
  process.exitCode = 1;
});

