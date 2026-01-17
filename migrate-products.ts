import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from './src/lib/products';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Supabase client (using environment variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!');
    console.error('Make sure .env.local has:');
    console.error('  - NEXT_PUBLIC_SUPABASE_URL');
    console.error('  - SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateProducts() {
    console.log('🚀 Starting product migration to Supabase...\n');
    console.log(`📦 Total products to migrate: ${PRODUCTS.length}\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors: { product: string; error: string }[] = [];

    for (const product of PRODUCTS) {
        try {
            // Transform product data to match database schema
            const productData = {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                description: product.description,
                story: product.story,
                category: product.category,
                material: product.specs.material,
                process: product.specs.process,
                print: product.specs.print,
                thickness: product.specs.thickness,
                dims: product.specs.dims,
                mounting: product.specs.mounting,
                seo_title: product.seo.title,
                seo_description: product.seo.description,
                seo_keywords: product.seo.keywords,
                is_active: true,
                stock_quantity: 50, // Default stock
                view_count: 0,
            };

            // Insert product
            const { error } = await supabase.from('products').insert(productData);

            if (error) {
                errorCount++;
                errors.push({ product: product.name, error: error.message });
                console.error(`❌ Failed: ${product.slug}`);
                console.error(`   Error: ${error.message}\n`);
            } else {
                successCount++;
                console.log(`✅ Migrated: ${product.slug}`);
            }

            // Optional: Insert product images if they exist
            if (product.images) {
                const imageEntries = Object.entries(product.images)
                    .filter(([_, url]) => url) // Only non-empty URLs
                    .map(([size, url]) => ({
                        product_id: product.id,
                        size: size as 'xs' | 's' | 'm' | 'l' | 'xl',
                        url: url!,
                    }));

                if (imageEntries.length > 0) {
                    const { error: imageError } = await supabase
                        .from('product_images')
                        .insert(imageEntries);

                    if (imageError) {
                        console.warn(
                            `   ⚠️  Images failed for ${product.slug}: ${imageError.message}`
                        );
                    }
                }
            }
        } catch (err) {
            errorCount++;
            const errorMsg = err instanceof Error ? err.message : 'Unknown error';
            errors.push({ product: product.name, error: errorMsg });
            console.error(`❌ Exception for ${product.slug}: ${errorMsg}\n`);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📦 Total: ${PRODUCTS.length}`);
    console.log('='.repeat(60));

    if (errors.length > 0) {
        console.log('\n❌ Errors:');
        errors.forEach(({ product, error }) => {
            console.log(`  - ${product}: ${error}`);
        });
    }

    // Verify final count
    const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    console.log(`\n✅ Total products in database: ${count}`);
    console.log('\n🎉 Migration complete!');
}

// Run migration
migrateProducts()
    .then(() => {
        console.log('\n✨ All done! You can now check http://localhost:3000/test-supabase');
        process.exit(0);
    })
    .catch((err) => {
        console.error('\n💥 Fatal error:', err);
        process.exit(1);
    });
