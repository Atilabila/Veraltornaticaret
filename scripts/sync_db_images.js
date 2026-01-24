
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const folderMap = {
    'ARABALAR%20PLAKA': 'arabalar-plaka',
    'ATAT%C3%9CRK%20PLAKA': 'ataturk-plaka',
    'KARAKTERLER%20%20PLAKA': 'karakterler-plaka',
    'KARAKTERLER-PLAKA': 'karakterler-plaka',
    'MOTOR-PLAKA': 'motor-plaka',
    'MOTOR%20PLAKA': 'motor-plaka',
    'YAPAY%20CITY': 'yapay-city',
};

async function syncProducts() {
    const { data: dbProducts, error: fetchError } = await supabase.from('products').select('*');
    if (fetchError) throw fetchError;

    console.log(`Checking ${dbProducts.length} products...`);

    let updatedCount = 0;
    for (const prod of dbProducts) {
        let currentImage = prod.image;
        let newImage = currentImage;

        // 1. Fix our previous mistake: /productshttps...
        if (newImage.startsWith('/productshttp')) {
            newImage = newImage.replace('/productshttp', 'http');
        }

        // 2. Only handle non-URL local paths
        if (!newImage.startsWith('http')) {
            // Normalize path
            // Remove /products if it started with it from last run
            let cleanCurrent = newImage.startsWith('/products/') ? newImage.substring(9) : newImage;
            if (cleanCurrent.startsWith('/')) cleanCurrent = cleanCurrent.substring(1);

            const parts = cleanCurrent.split('/');
            if (parts.length >= 1) {
                // Determine folder
                const originalFolder = parts[0].toUpperCase();
                let targetFolder = folderMap[originalFolder] || parts[0].toLowerCase().replace(/%20+/g, '-').replace(/\s+/g, '-');

                // Special case for ATATÜRK which might be encoded or not
                if (originalFolder.includes('ATAT')) targetFolder = 'ataturk-plaka';

                // Filename
                const originalFilename = parts[parts.length - 1];
                const lastDotIndex = originalFilename.lastIndexOf('.');
                let nameWithoutExt = lastDotIndex !== -1 ? originalFilename.substring(0, lastDotIndex) : originalFilename;

                // Normalize filename same as fix_extensions.js
                let cleanName = nameWithoutExt.toLowerCase()
                    .replace(/%20/g, ' ')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9.-]/g, '');

                newImage = `/products/${targetFolder}/${cleanName}.webp`;
            }
        }

        if (newImage !== currentImage) {
            console.log(`Updating ${prod.slug}: ${currentImage} -> ${newImage}`);
            const { error: updateError } = await supabase
                .from('products')
                .update({ image: newImage })
                .eq('id', prod.id);

            if (updateError) {
                console.error(`Error updating ${prod.slug}:`, updateError);
            } else {
                updatedCount++;
            }
        }
    }

    console.log(`Successfully updated ${updatedCount} products.`);
}

syncProducts();
