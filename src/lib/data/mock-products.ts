import { MetalProduct } from "@/lib/supabase/metal-products.types";

export const MOCK_PRODUCTS: MetalProduct[] = [
    {
        id: "1",
        name: "Galvanizli Çelik Tel",
        slug: "galvanizli-celik-tel",
        description: "Yüksek mukavemetli, paslanmaya karşı dayanıklı galvaniz kaplama çelik tel. Endüstriyel kullanım için idealdir.",
        price: 1500,
        image_url: "https://images.unsplash.com/photo-1535050608775-7b6fb9553531?auto=format&fit=crop&q=80&w=800",
        background_color: "#e2e2e2",
        category_id: "cat-1",
        is_active: true,
        stock_quantity: 500,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        features: [
            { id: "f1", product_id: "1", feature_text: "Paslanmaz Kaplama", feature_icon: "Shield", display_order: 1, created_at: "" },
            { id: "f2", product_id: "1", feature_text: "Yüksek Mukavemet", feature_icon: "Zap", display_order: 2, created_at: "" }
        ],
        category: {
            id: "cat-1",
            name: "Endüstriyel Teller",
            slug: "endustriyel-teller",
            description: "Endüstriyel kullanım için teller",
            image_url: null,
            display_order: 1,
            is_active: true,
            created_at: "",
            updated_at: ""
        }
    },
    {
        id: "2",
        name: "Bakır Alaşımlı Levha",
        slug: "bakir-alasimli-levha",
        description: "Isı ve elektrik iletkenliği yüksek, endüstriyel bakır levha.",
        price: 3200,
        image_url: "https://images.unsplash.com/photo-1622359670088-724d29f8c121?auto=format&fit=crop&q=80&w=800",
        background_color: "#d4af37",
        category_id: "cat-2",
        is_active: true,
        stock_quantity: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        features: [
            { id: "f3", product_id: "2", feature_text: "Yüksek İletkenlik", feature_icon: "Zap", display_order: 1, created_at: "" },
            { id: "f4", product_id: "2", feature_text: "Korozyon Direnci", feature_icon: "Shield", display_order: 2, created_at: "" }
        ],
        category: {
            id: "cat-2",
            name: "Metal Levhalar",
            slug: "metal-levhalar",
            description: "Çeşitli metal levhalar",
            image_url: null,
            display_order: 2,
            is_active: true,
            created_at: "",
            updated_at: ""
        }
    },
    {
        id: "3",
        name: "Krom Nikel Boru",
        slug: "krom-nikel-boru",
        description: "Dekoratif ve yapısal kullanım için polisajlı krom nikel boru.",
        price: 850,
        image_url: "https://images.unsplash.com/photo-1533630252873-1960255d6447?auto=format&fit=crop&q=80&w=800",
        background_color: "#f4f4f5",
        category_id: "cat-3",
        is_active: true,
        stock_quantity: 300,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        features: [
            { id: "f5", product_id: "3", feature_text: "Parlak Yüzey", feature_icon: "Sparkles", display_order: 1, created_at: "" }
        ],
        category: {
            id: "cat-3",
            name: "Borular",
            slug: "borular",
            description: "Metal borular",
            image_url: null,
            display_order: 3,
            is_active: true,
            created_at: "",
            updated_at: ""
        }
    }
];
