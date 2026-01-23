// =====================================================
// METAL PRODUCTS ADMIN PAGE
// Route: /admin/metal-products
// =====================================================

import { MetalProductsAdmin } from "@/components/admin/MetalProductsAdmin"

export const metadata = {
    title: "Metal Ürünler Admin Paneli | Veral",
    description: "Metal ürünler ve kategorileri yönetin",
}

export default function MetalProductsAdminPage() {
    return <MetalProductsAdmin />
}
