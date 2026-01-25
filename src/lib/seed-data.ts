
import { MOCK_PRODUCTS } from "@/lib/data/mock-products"
import { MetalProduct } from "@/lib/supabase/metal-products.types"

// This script simulates DB seeding, can be run client side or server side
// Ideally it interacts with Supabase service, but for this task "Seed Data" aligns with 
// having data present. We will add a utility to easy-insert.

export async function seedProductsToDB(upsertProduct: (p: Record<string, unknown>) => Promise<unknown>) {
    console.log("Seeding products...");
    for (const product of MOCK_PRODUCTS) {
        // Omit ID to let DB autogenerate if needed, or keep for consistency
        // Assuming helper expects partial or full object
        const { category, features, ...pData } = product;

        // 1. Insert Category if not exists (simplified logic)
        // 2. Insert Product
        await upsertProduct(pData as Record<string, unknown>);
        console.log(`Upserted: ${product.name}`);
    }
    console.log("Seeding complete.");
}
