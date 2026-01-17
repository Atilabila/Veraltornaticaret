import { ProductService } from "@/lib/supabase/products.service";
import { Product } from "@/lib/products";
import UrunlerClient from "./UrunlerClient";

export const metadata = {
    title: "Ürün Kataloğu | Veral Torna & Teneke",
    description: "Endüstriyel metal poster koleksiyonumuzu inceleyin. 1.5mm alüminyum, UV baskı ve benzersiz tasarımlar.",
};

export default async function UrunlerPage() {
    // Fetch products on the server for instant loading
    const dbProducts = await ProductService.getAllProducts();

    // Map DB products to Frontend Product interface
    const initialProducts: Product[] = dbProducts.map(dbProduct => ({
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        price: dbProduct.price,
        image: dbProduct.image,
        description: dbProduct.description,
        story: dbProduct.story,
        category: dbProduct.category,
        specs: {
            material: dbProduct.material,
            process: dbProduct.process,
            print: dbProduct.print,
            thickness: dbProduct.thickness,
            dims: dbProduct.dims,
            mounting: dbProduct.mounting,
        },
        seo: {
            title: dbProduct.seo_title,
            description: dbProduct.seo_description,
            keywords: dbProduct.seo_keywords || [],
        }
    }));

    return <UrunlerClient initialProducts={initialProducts} />;
}
