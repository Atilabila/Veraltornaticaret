"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Package, FileText, Settings, LogOut, Plus,
    Pencil, Trash2, Save, X, Search, ChevronDown, ChevronUp,
    Check, AlertCircle, Image as ImageIcon, Home, Info, MessageSquare, ShoppingCart, Activity, Tags, FolderPlus, Eye, ShieldCheck, Instagram, Upload, Globe, Mail, Star
} from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useContentStore, SiteContent } from "@/store/useContentStore";
import { Product } from "@/lib/products";
import { SiteContentAdmin } from "./SiteContentAdmin";
import { InstagramAdmin } from "@/components/admin/InstagramAdmin";
import { BulkProductForm } from "@/components/admin/BulkProductForm";
import { HeroPreviewDemo } from "@/components/admin/HeroPreviewDemo";
import type { Category } from "@/lib/supabase/categories.service";
import { AdminLogoutButton } from "./AdminLogoutButton";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { User } from "@supabase/supabase-js";
import { normalizeImagePath } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useAdminStore } from "@/store/useAdminStore";

export const AdminDashboard = () => {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("content");
    const [subTab, setSubTab] = useState("global");
    const setAdmin = useAdminStore((state) => state.setAdmin);

    useEffect(() => {
        const tab = searchParams.get("tab");
        const section = searchParams.get("section");

        if (tab) {
            const cmsTabs = ["global", "services", "pages", "branding", "hero", "stats", "features", "reviews", "process", "showcase", "contact", "instagram", "quote", "cart", "checkout"];

            if (cmsTabs.includes(tab)) {
                setActiveTab("content");
                setSubTab(tab);
            } else {
                setActiveTab(tab);
                if (section) setSubTab(section);
            }
        }
    }, [searchParams]);

    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const { fetchContent } = useContentStore();

    useEffect(() => {
        const getUser = async () => {
            const supabase = createBrowserSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                setAdmin(true);
            }
        };
        getUser();
        fetchContent();
    }, [fetchContent, setAdmin]);

    const showNotification = useCallback((type: "success" | "error", message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    return (
        <div className="admin-panel flex min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#EDE7DC] to-[#E8DFD0] text-slate-900 font-sans">
            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {notification.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-bold">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className="w-72 border-r border-slate-300/50 p-6 flex flex-col gap-8 bg-white/60 backdrop-blur-sm shrink-0 shadow-lg">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-safety-orange)] text-white flex items-center justify-center font-bold text-2xl shadow-lg">V</div>
                    <div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">Veral</span>
                        <span className="text-slate-600 text-xl">Panel</span>
                        <p className="text-xs text-slate-500">Yönetim Sistemi</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    <p className="text-xs text-slate-600 uppercase tracking-wider px-4 mb-2 font-bold">Genel Yönetim</p>
                    <SidebarItem
                        icon={<Globe className="w-5 h-5" />}
                        label="Site İçeriği (CMS)"
                        active={activeTab === "content"}
                        onClick={() => { setActiveTab("content"); setSubTab("global"); }}
                    />
                    <SidebarItem
                        icon={<Package className="w-5 h-5" />}
                        label="Hizmetler CMS"
                        active={activeTab === "content" && subTab === "services"}
                        onClick={() => { setActiveTab("content"); setSubTab("services"); }}
                    />

                    <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2 mt-4">Pazarlama & Sosyal</p>
                    <SidebarItem
                        icon={<Instagram className="w-5 h-5" />}
                        label="Instagram Feed"
                        active={activeTab === "content" && subTab === "instagram"}
                        onClick={() => { setActiveTab("content"); setSubTab("instagram"); }}
                    />
                    <SidebarItem
                        icon={<ImageIcon className="w-5 h-5" />}
                        label="Görsel Kütüphanesi"
                        active={activeTab === "images"}
                        onClick={() => setActiveTab("images")}
                    />

                    <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">Ürün & Sipariş</p>
                    <SidebarItem
                        icon={<ShoppingCart className="w-5 h-5" />}
                        label="Ürün Envanteri"
                        active={activeTab === "products"}
                        onClick={() => setActiveTab("products")}
                    />
                    <SidebarItem
                        icon={<Star className="w-5 h-5" />}
                        label="Metal Showcase Ürünleri"
                        active={activeTab === "metal"}
                        onClick={() => setActiveTab("metal")}
                    />
                    <SidebarItem
                        icon={<Tags className="w-5 h-5" />}
                        label="Kategoriler"
                        active={activeTab === "categories"}
                        onClick={() => setActiveTab("categories")}
                    />
                    <SidebarItem
                        icon={<FileText className="w-5 h-5" />}
                        label="Siparişler"
                        active={activeTab === "orders"}
                        onClick={() => setActiveTab("orders")}
                    />
                    <SidebarItem
                        icon={<Mail className="w-5 h-5" />}
                        label="Teklif Talepleri"
                        active={activeTab === "quotes"}
                        onClick={() => setActiveTab("quotes")}
                    />
                    <SidebarItem
                        icon={<ShieldCheck className="w-5 h-5" />}
                        label="Audit Logs"
                        active={activeTab === "logs"}
                        onClick={() => setActiveTab("logs")}
                    />
                </nav>

                <div className="mt-auto space-y-2 border-t border-white/5 pt-6">
                    {user && (
                        <div className="px-4 py-3 mb-2 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">OTURUM AÇIK</p>
                            <p className="text-xs font-mono font-bold truncate text-[var(--color-brand-safety-orange)]">{user.email}</p>
                        </div>
                    )}
                    <a href="/" target="_blank" className="w-full block">
                        <SidebarItem icon={<Home className="w-5 h-5" />} label="Siteyi Görüntüle" className="text-blue-400 hover:bg-blue-500/10" />
                    </a>
                    <div className="px-4">
                        <AdminLogoutButton />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === "content" && <SiteContentAdmin defaultTab={subTab} />}
                {activeTab === "images" && <ImagesTab showNotification={showNotification} />}
                {activeTab === "products" && <ProductsTab showNotification={showNotification} />}
                {activeTab === "metal" && <MetalShowcaseTab showNotification={showNotification} />}
                {activeTab === "categories" && <CategoriesTab showNotification={showNotification} />}
                {activeTab === "orders" && <OrdersTab showNotification={showNotification} />}
                {activeTab === "quotes" && <QuotesTab showNotification={showNotification} />}
                {activeTab === "logs" && <AuditLogsTab />}

                {/* Preview Demo - Remove this after testing */}
                {activeTab === "content" && subTab === "global" && (
                    <div className="mt-8">
                        <HeroPreviewDemo />
                    </div>
                )}
            </main>
        </div>
    );
};

// ========== HOME CONTENT TAB ==========


// ========== PRODUCTS TAB ==========
const ProductsTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { products, loading, error, fetchProductsAdmin, addProduct, updateProduct, deleteProduct, clearError } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Fetch products and categories on mount
    useEffect(() => {
        fetchProductsAdmin();
        fetchCategories();
    }, [fetchProductsAdmin, fetchCategories]);

    // Expand all categories once loaded
    useEffect(() => {
        if (categories.length > 0 && expandedCategories.length === 0) {
            setExpandedCategories(categories.map(c => c.id)); // Use ID for expansion state
        }
    }, [categories]);

    // Show error notification
    useEffect(() => {
        if (error) {
            showNotification("error", error);
            clearError();
        }
    }, [error, showNotification, clearError]);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || p.category === selectedCategory || p.category_id === selectedCategory;
        const isNotShowcase = !p.is_showcase; // Don't show showcase products here
        return matchesSearch && matchesCategory && isNotShowcase;
    });

    const groupedProducts = categories.reduce((acc: Record<string, any[]>, cat: Category) => {
        acc[cat.id] = filteredProducts.filter(p => p.category === cat.id || p.category === cat.slug);
        return acc;
    }, {} as Record<string, any[]>);

    const toggleCategory = (catId: string) => {
        setExpandedCategories(prev =>
            prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
        );
    };

    const handleSaveProduct = async (product: any) => {
        try {
            // Ensure product has all required fields for MetalProduct
            const productToSave = {
                ...product,
                category_id: product.category || product.category_id, // Ensure category_id is set
                is_active: product.is_active !== undefined ? product.is_active : true,
                background_color: product.background_color || "#0A0A0A",
                stock_quantity: product.stock_quantity || 0,
                is_showcase: product.is_showcase || false,
                features: product.features || []
            };

            if (product.id) {
                await updateProduct(product.id, productToSave);
                showNotification("success", "Ürün güncellendi!");
            } else {
                await addProduct(productToSave);
                showNotification("success", "Yeni ürün eklendi!");
            }
            setEditingProduct(null);
            setIsAddModalOpen(false);
        } catch (err) {
            console.error("Save error:", err);
            showNotification("error", "İşlem başarısız oldu!");
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
            try {
                await deleteProduct(id);
                showNotification("success", "Ürün silindi.");
            } catch (err) {
                showNotification("error", "Silme işlemi başarısız oldu!");
            }
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
                    <p className="text-slate-500 mt-1">Toplam {products.length} ürün</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsBulkAddModalOpen(true)}
                        className="flex items-center gap-2 bg-slate-800 text-white px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase tracking-tighter"
                    >
                        <FolderPlus className="w-5 h-5" /> Toplu Ürün Ekle (5+)
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] text-black px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase tracking-tighter"
                    >
                        <Plus className="w-5 h-5" /> Yeni Ürün Ekle
                    </button>
                </div>
            </header>

            <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                    />
                </div>
                <select
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-w-[200px]"
                >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map((cat: Category) => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-6">
                {categories.map((category: Category) => {
                    const categoryProducts = groupedProducts[category.id] || [];
                    if (categoryProducts.length === 0 && selectedCategory) return null;

                    return (
                        <div key={category.id} className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                                    <h3 className="text-xl font-bold">{category.name}</h3>
                                    <span className="text-slate-500 text-sm">({categoryProducts.length} ürün)</span>
                                </div>
                                {expandedCategories.includes(category.id) ?
                                    <ChevronUp className="w-5 h-5 text-slate-400" /> :
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                }
                            </button>

                            <AnimatePresence>
                                {expandedCategories.includes(category.id) && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                        <div className="p-5 pt-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {categoryProducts.map((product: Product) => (
                                                <div key={product.id} className="bg-slate-800 rounded-xl overflow-hidden group hover:ring-2 hover:ring-[var(--color-brand-safety-orange)] transition-all">
                                                    <div className="relative aspect-square bg-slate-900">
                                                        <img src={normalizeImagePath(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                            <button onClick={() => setEditingProduct(product)} className="p-3 bg-[var(--color-brand-safety-orange)] rounded-xl hover:bg-[var(--color-brand-safety-orange)]/80">
                                                                <Pencil className="w-5 h-5" />
                                                            </button>
                                                            <button onClick={() => handleDeleteProduct(product.id)} className="p-3 bg-red-500 rounded-xl hover:bg-red-600">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 space-y-2">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-bold text-sm truncate flex-1">{product.name}</h4>
                                                            <span className="text-[9px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono ml-2 shrink-0">{product.sku || "NO-SKU"}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-1">
                                                            <div className="flex flex-col">
                                                                <p className="text-[var(--color-brand-safety-orange)] font-bold">₺{product.price}</p>
                                                                <p className={`text-[10px] font-bold ${Number(product.stock_quantity) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                    {product.stock_quantity ?? 0} ADET
                                                                </p>
                                                            </div>
                                                            <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-500 uppercase font-mono">
                                                                {categories.find(c => c.id === product.category || c.slug === product.category)?.name || "Genel"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {categoryProducts.length === 0 && <p className="text-slate-500 col-span-full py-8 text-center">Bu kategoride ürün yok.</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {(isAddModalOpen || editingProduct) && (
                    <ProductModal
                        product={editingProduct}
                        onSave={handleSaveProduct}
                        onClose={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                        isLoading={loading}
                    />
                )}
                {isBulkAddModalOpen && (
                    <BulkProductForm
                        open={isBulkAddModalOpen}
                        onOpenChange={setIsBulkAddModalOpen}
                        categories={categories as any}
                        onSubmit={async (data) => {
                            const { createBulkProducts } = await import("@/lib/actions/metal-products.actions");
                            const res = await createBulkProducts(data);
                            if (res.success) {
                                showNotification("success", `${res.data} ürün başarıyla eklendi!`);
                                fetchProductsAdmin();
                                setIsBulkAddModalOpen(false);
                            } else {
                                showNotification("error", res.error || "Hata oluştu");
                            }
                        }}
                        loading={loading}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Product Modal
const ProductModal = ({ product, onSave, onClose, isLoading, hideShowcaseOption = false }: { product: any | null; onSave: (p: any) => void; onClose: () => void; isLoading: boolean; hideShowcaseOption?: boolean }) => {
    const [formData, setFormData] = useState({
        id: product?.id || "",
        name: product?.name || "",
        sku: product?.sku || "",
        description: product?.description || "",
        price: product?.price || 0,
        image: product?.image || "",
        category: product?.category_id || product?.category || "",
        is_active: product?.is_active ?? true,
        stock_quantity: product?.stock_quantity || 0,
        is_showcase: product?.is_showcase || false,
        background_color: product?.background_color || "#0A0A0A",
        material: product?.material || "1.5mm DKP Çelik",
        paint: product?.paint || "Elektrostatik Toz",
        installation: product?.installation || "Hazır Askı Sistemi",
        origin: product?.origin || "Yerli Üretim (İzmir)",
        features: product?.features || [
            { feature_text: "1.5mm Alüminyum Gövde", display_order: 1 },
            { feature_text: "Yüksek Çözünürlüklü UV Baskı", display_order: 2 },
            { feature_text: "Endüstriyel Koruma Katmanı", display_order: 3 }
        ]
    });

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...formData.features, { feature_text: "", display_order: formData.features.length + 1 }]
        });
    };

    const removeFeature = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_: any, i: number) => i !== index)
        });
    };

    const updateFeature = (index: number, text: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index].feature_text = text;
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-2xl font-bold">{product ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); try { onSave(formData); } catch (err) { console.error("Form submit error", err); } }} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <Label className="mb-2 block">Ürün Adı</Label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]" required />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Label className="mb-2 block">SKU (Stok Kodu)</Label>
                            <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                placeholder="Örn: VRL-101"
                            />
                        </div>

                        <div className="col-span-2">
                            <Label className="mb-2 block">Açıklama</Label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[100px]"
                                required
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label className="mb-2 block">Fiyat (₺)</Label>
                            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]" required />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label className="mb-2 block">Stok Miktarı</Label>
                            <input type="number" value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]" required />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label className="mb-2 block">Kategori</Label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                required
                            >
                                <option value="">Kategori Seçin</option>
                                {useCategoryStore.getState().categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label className="mb-2 block">Arka Plan Rengi</Label>
                            <div className="flex gap-2">
                                <input type="color" value={formData.background_color} onChange={(e) => setFormData({ ...formData, background_color: e.target.value })} className="h-[46px] w-12 bg-slate-800 border border-slate-700 rounded-xl p-1 cursor-pointer" />
                                <input type="text" value={formData.background_color} onChange={(e) => setFormData({ ...formData, background_color: e.target.value })} className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none font-mono" />
                            </div>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-500 transition-all">
                                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${formData.is_active ? 'bg-green-500' : 'bg-slate-700'}`}>
                                    {formData.is_active && <Check className="w-4 h-4 text-white" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                                <span className="font-bold text-sm">Ürün Satışta / Aktif</span>
                            </label>

                            {!hideShowcaseOption && (
                                <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-500 transition-all">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${formData.is_showcase ? 'bg-[var(--color-brand-safety-orange)]' : 'bg-slate-700'}`}>
                                        {formData.is_showcase && <Check className="w-4 h-4 text-black" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={formData.is_showcase} onChange={(e) => setFormData({ ...formData, is_showcase: e.target.checked })} />
                                    <span className="font-bold text-sm">Showcase Sayfası (Öne Çıkar)</span>
                                </label>
                            )}
                        </div>

                        <div className="col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <Label>Teknik Özellikler / Detaylar</Label>
                                <button type="button" onClick={addFeature} className="text-[10px] font-black uppercase text-[var(--color-brand-safety-orange)] border border-[var(--color-brand-safety-orange)]/30 px-2 py-1 hover:bg-[var(--color-brand-safety-orange)] hover:text-white transition-all">
                                    + ÖZELLİK EKLE
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.features.map((feature: any, idx: number) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={feature.feature_text}
                                            onChange={(e) => updateFeature(idx, e.target.value)}
                                            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none"
                                            placeholder="Örn: 1.5mm Alüminyum Gövde"
                                        />
                                        <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2 border-t border-white/5 pt-6">
                            <Label className="mb-4 block text-[var(--color-brand-safety-orange)] font-black tracking-widest text-[10px] uppercase italic">TEKNİK ÖZELLİK TABLOSU (SABİT ALANLAR)</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="mb-2 block text-xs">Malzeme</Label>
                                    <input type="text" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <Label className="mb-2 block text-xs">Boya</Label>
                                    <input type="text" value={formData.paint} onChange={(e) => setFormData({ ...formData, paint: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <Label className="mb-2 block text-xs">Montaj</Label>
                                    <input type="text" value={formData.installation} onChange={(e) => setFormData({ ...formData, installation: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <Label className="mb-2 block text-xs">Menşei</Label>
                                    <input type="text" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <Label className="mb-4 block">Görsel Alanı</Label>
                            <ImageUploader
                                label="Ürün Görseli"
                                currentImage={formData.image}
                                folder="products"
                                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 sticky bottom-0 bg-slate-900 py-4 border-t border-slate-800">
                        <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 py-4 border border-slate-700 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50">İptal</button>
                        <button
                            type="submit"
                            disabled={isLoading || !formData.image}
                            className="flex-1 py-4 bg-[var(--color-brand-safety-orange)] rounded-xl font-bold hover:bg-[var(--color-brand-safety-orange)]/80 flex items-center justify-center gap-2 disabled:opacity-50 text-black uppercase tracking-widest"
                        >
                            {isLoading ? (
                                <><Activity className="w-5 h-5 animate-spin" /> İŞLENİYOR...</>
                            ) : (
                                <><Save className="w-5 h-5" /> Kaydet</>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ========== CATEGORIES TAB ==========
const CategoriesTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { categories, loading, error, fetchCategories, addCategory, deleteCategory, clearError } = useCategoryStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", color: "#3B82F6" });

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (error) {
            showNotification("error", error);
            clearError();
        }
    }, [error, showNotification, clearError]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addCategory(newCategory);
            showNotification("success", "Kategori başarıyla eklendi!");
            setIsAddModalOpen(false);
            setNewCategory({ name: "", color: "#3B82F6" });
        } catch (err) {
            showNotification("error", "Kategori eklenemedi!");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Bu kategoriyi silmek istediğinizden emin misiniz? Altındaki ürünler etkilenmez ancak kategorisiz kalabilirler.")) {
            try {
                await deleteCategory(id);
                showNotification("success", "Kategori silindi.");
            } catch (err) {
                showNotification("error", "Silme işlemi başarısız.");
            }
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Kategori Yönetimi</h1>
                    <p className="text-slate-500 mt-1">Ürün gruplarını buradan yönetin</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    <FolderPlus className="w-5 h-5" /> Yeni Kategori Ekle
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full shadow-lg" style={{ backgroundColor: category.color }} />
                                <h3 className="text-xl font-bold">{category.name}</h3>
                            </div>
                            <button onClick={() => handleDelete(category.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-xs font-mono text-slate-500 bg-black/30 p-2 rounded">
                            SLUG: {category.slug}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsAddModalOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-slate-900 rounded-2xl w-full max-w-md p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold mb-6">Yeni Kategori</h2>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Kategori Adı</label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                                        placeholder="Örn: Mutfak Gereçleri"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Kategori Rengi</label>
                                    <input
                                        type="color"
                                        value={newCategory.color}
                                        onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                                        className="w-full h-12 bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 cursor-pointer"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 border border-slate-700 rounded-xl font-bold">İptal</button>
                                    <button type="submit" disabled={loading} className="flex-1 py-3 bg-[var(--color-brand-safety-orange)] rounded-xl font-bold">
                                        {loading ? "Ekleniyor..." : "Ekle"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ========== IMAGES TAB ==========
const ImagesTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { content, updateContent } = useContentStore();

    const imageFields = [
        { key: "heroImage", label: "Ana Sayfa Hero Görseli (Varsayılan)", current: content.heroImage, folder: "hero" },
        { key: "aboutImage", label: "Hakkımızda Sayfası Görseli", current: content.aboutImage, folder: "about" },
        ...content.featureItems.map((item, index) => ({
            key: `feature_${index}`,
            label: `Özellik ${index + 1} Görseli`,
            current: item.image,
            folder: "features",
            isFeature: true,
            index
        })),
        ...content.serviceItems.map((item, index) => ({
            key: `service_${index}`,
            label: `Hizmet ${index + 1} Görseli`,
            current: item.image,
            folder: "services",
            isService: true,
            index
        }))
    ];

    const handleAddHeroImage = () => {
        const newImages = [...(content.heroImages || []), ""];
        updateContent({ heroImages: newImages });
    };

    const handleRemoveHeroImage = (index: number) => {
        const newImages = content.heroImages.filter((_, i) => i !== index);
        updateContent({ heroImages: newImages });
    };

    const handleHeroImageUpdate = (index: number, url: string) => {
        const newImages = [...content.heroImages];
        newImages[index] = url;
        updateContent({ heroImages: newImages });
    };

    const handleImageUpdate = (key: string, value: string, isFeature?: boolean, isService?: boolean, index?: number) => {
        if (isFeature && index !== undefined) {
            const newItems = [...content.featureItems];
            newItems[index] = { ...newItems[index], image: value };
            updateContent({ featureItems: newItems });
        } else if (isService && index !== undefined) {
            const newItems = [...content.serviceItems];
            newItems[index] = { ...newItems[index], image: value };
            updateContent({ serviceItems: newItems });
        } else {
            updateContent({ [key]: value });
        }
        showNotification("success", "Görsel başarıyla güncellendi!");
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Görsel Yönetimi</h1>
                    <p className="text-slate-500 mt-1">Sitedeki tüm görselleri buradan yönetin (Supabase Storage)</p>
                </div>
            </header>

            <div className="space-y-8">
                <section className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-xl uppercase tracking-widest text-[#D4AF37]">Hero Slider Görselleri</h2>
                        <button
                            onClick={handleAddHeroImage}
                            className="bg-black border border-[#D4AF37] text-[#D4AF37] px-4 py-2 text-xs font-black uppercase hover:bg-[#D4AF37] hover:text-white transition-all"
                        >
                            Yeni Görsel Ekle
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.heroImages?.map((img, idx) => (
                            <div key={idx} className="relative group bg-black/40 p-4 border border-slate-800 rounded-xl">
                                <button
                                    onClick={() => handleRemoveHeroImage(idx)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <ImageUploader
                                    label={`Slide ${idx + 1}`}
                                    currentImage={img}
                                    folder="hero-slider"
                                    onImageUploaded={(url) => handleHeroImageUpdate(idx, url)}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                    <h2 className="font-bold text-xl uppercase tracking-widest text-[#D4AF37] mb-6">Diğer Sistem Görselleri</h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {imageFields.map((field) => (
                            <div key={field.key} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                <ImageUploader
                                    label={field.label}
                                    currentImage={field.current}
                                    folder={field.folder}
                                    onImageUploaded={(url) => handleImageUpdate(
                                        field.key,
                                        url,
                                        'isFeature' in field ? field.isFeature : undefined,
                                        'isService' in field ? field.isService : undefined,
                                        'index' in field ? field.index : undefined
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ========== ORDERS TAB ==========
const OrdersTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { getAdminOrders, getAdminOrderStats } = await import('@/actions/admin');
                const [ordersRes, statsRes] = await Promise.all([
                    getAdminOrders(),
                    getAdminOrderStats()
                ]);

                if (ordersRes.success) {
                    setOrders(ordersRes.data || []);
                } else {
                    throw new Error("Failed to fetch orders");
                }

                if (statsRes.success) {
                    setStats(statsRes.data);
                }

            } catch (error) {
                console.error("Failed to fetch orders:", error);
                showNotification("error", "Siparişler yüklenemedi!");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [showNotification]);

    const handleStatusUpdate = async (orderId: string, newStatus: any) => {
        try {
            const { updateAdminOrderStatus } = await import('@/actions/admin');
            const result = await updateAdminOrderStatus(orderId, newStatus);

            if (result.success) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                showNotification("success", "Sipariş durumu güncellendi!");
            } else {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            showNotification("error", "Durum güncellenemedi!");
        }
    };

    if (loading) return <div className="text-center py-20 font-mono">VERİ TERMİNALİ BAĞLANIYOR...</div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
                    <p className="text-slate-500 mt-1">Gelen siparişleri ve işlem durumlarını yönetin</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="TOPLAM SİPARİŞ" value={stats?.total || 0} icon={<ShoppingCart className="w-5 h-5 text-blue-400" />} />
                <StatCard label="BEKLEYEN" value={stats?.pending || 0} icon={<Activity className="w-5 h-5 text-yellow-400" />} />
                <StatCard label="TESLİM EDİLEN" value={stats?.delivered || 0} icon={<Check className="w-5 h-5 text-green-400" />} />
                <StatCard label="TOPLAM CİRO" value={`₺${stats?.totalRevenue?.toLocaleString() || 0}`} icon={<Save className="w-5 h-5 text-purple-400" />} />
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50 text-slate-400 font-mono text-xs uppercase tracking-widest border-b border-slate-800">
                            <th className="p-4">SİPARİŞ ID / NO</th>
                            <th className="p-4">MÜŞTERİ</th>
                            <th className="p-4">TUTAR</th>
                            <th className="p-4">DURUM</th>
                            <th className="p-4">TARİH</th>
                            <th className="p-4 text-right">EYLEM</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono">
                                    <div className="font-bold text-blue-400">{order.order_number || `#${order.id.slice(0, 8)}`}</div>
                                    {order.synced_from_local && <div className="text-[9px] text-slate-600 uppercase">SYNC_OK</div>}
                                </td>
                                <td className="p-4">
                                    <div className="font-bold">{order.customer_name}</div>
                                    <div className="text-xs text-slate-500">{order.customer_email}</div>
                                </td>
                                <td className="p-4 font-bold text-lg">₺{order.total}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                        order.status === 'delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                            'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400 text-xs">
                                    {new Date(order.created_at).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="p-4 text-right flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                        title="Detayları Gör"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        className="bg-slate-800 border border-slate-700 text-xs p-1 rounded-lg focus:outline-none"
                                    >
                                        <option value="pending">BEKLİYOR</option>
                                        <option value="processing">HAZIRLANIYOR</option>
                                        <option value="shipped">KARGOYA VERİLDİ</option>
                                        <option value="delivered">TESLİM EDİLDİ</option>
                                        <option value="cancelled">İPTAL</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-20 text-center text-slate-500 font-mono uppercase italic">
                        HENÜZ SİPARİŞ VERİSİ BULUNMUYOR
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            <Dialog open={!!selectedOrder} onOpenChange={(open: any) => !open && setSelectedOrder(null)}>
                <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black font-mono">
                            SİPARİŞ DETAYI: {selectedOrder?.order_number || selectedOrder?.id?.slice(0, 8)}
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Müşteri bilgileri ve sipariş içeriği
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                    <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Müşteri Bilgileri</h4>
                                    <p className="font-bold">{selectedOrder.customer_name}</p>
                                    <p className="text-sm text-slate-400">{selectedOrder.customer_email}</p>
                                    <p className="text-sm text-slate-400">{selectedOrder.customer_phone}</p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                    <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Teslimat Adresi</h4>
                                    <div className="text-sm leading-relaxed text-slate-300">
                                        {typeof selectedOrder.shipping_address === 'object' ? (
                                            <>
                                                <p>{selectedOrder.shipping_address.street}</p>
                                                <p>{selectedOrder.shipping_address.district} / {selectedOrder.shipping_address.city}</p>
                                            </>
                                        ) : (
                                            <p>{selectedOrder.shipping_address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-800 text-xs font-mono uppercase text-slate-500">
                                        <tr>
                                            <th className="p-3">Ürün Snapshot</th>
                                            <th className="p-3">Özellikler</th>
                                            <th className="p-3 text-center">Adet</th>
                                            <th className="p-3 text-right">Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {selectedOrder.order_items?.map((item: any, idx: number) => (
                                            <tr key={idx} className="border-t border-slate-700/50">
                                                <td className="p-3">
                                                    <div className="font-bold">{item.product_name || item.product_slug}</div>
                                                    <div className="text-[10px] text-slate-500">{item.product_id}</div>
                                                </td>
                                                <td className="p-3 text-xs text-slate-400">
                                                    {item.size && <span>{item.size}</span>}
                                                    {item.orientation && <span> • {item.orientation}</span>}
                                                </td>
                                                <td className="p-3 text-center">{item.quantity}</td>
                                                <td className="p-3 text-right">₺{item.unit_price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-slate-800/30">
                                            <td colSpan={3} className="p-3 text-right font-bold uppercase text-xs text-slate-500">Ara Toplam</td>
                                            <td className="p-3 text-right font-bold text-slate-300">₺{selectedOrder.subtotal}</td>
                                        </tr>
                                        <tr className="bg-slate-800/30">
                                            <td colSpan={3} className="p-3 text-right font-bold uppercase text-xs text-slate-500">Kargo</td>
                                            <td className="p-3 text-right font-bold text-slate-300">₺{selectedOrder.shipping_cost}</td>
                                        </tr>
                                        <tr className="bg-slate-800/30">
                                            <td colSpan={3} className="p-3 text-right font-bold uppercase text-xs text-slate-500">Toplam</td>
                                            <td className="p-3 text-right font-black text-lg text-green-400">₺{selectedOrder.total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-bold uppercase text-xs"
                                >
                                    KAPAT
                                </button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

// ========== QUOTES TAB ==========
const QuotesTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [selectedQuote, setSelectedQuote] = useState<any>(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const { getAdminQuotes, getAdminQuoteStats } = await import('@/actions/admin');
                const [quotesRes, statsRes] = await Promise.all([
                    getAdminQuotes(),
                    getAdminQuoteStats()
                ]);

                if (quotesRes.success) {
                    setQuotes(quotesRes.data || []);
                } else {
                    throw new Error("Failed to fetch quotes");
                }

                if (statsRes.success) {
                    setStats(statsRes.data);
                }

            } catch (error) {
                console.error("Failed to fetch quotes:", error);
                showNotification("error", "Teklifler yüklenemedi!");
            } finally {
                setLoading(false);
            }
        };
        fetchQuotes();
    }, [showNotification]);

    const handleStatusUpdate = async (quoteId: string, newStatus: any) => {
        try {
            const { updateAdminQuoteStatus } = await import('@/actions/admin');
            const result = await updateAdminQuoteStatus(quoteId, newStatus);

            if (result.success) {
                setQuotes(quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q));
                showNotification("success", "Teklif durumu güncellendi!");
            } else {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            showNotification("error", "Durum güncellenemedi!");
        }
    };

    if (loading) return <div className="text-center py-20 font-mono text-slate-500">TEKNİK SERVİS VERİLERİ ÇEKİLİYOR...</div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold italic tracking-tighter">B2B TEKLİF YÖNETİMİ</h1>
                    <p className="text-slate-500 mt-1">Endüstriyel hizmet ve üretim talepleri</p>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="TOPLAM TALEP" value={stats?.total || 0} icon={<FileText className="w-5 h-5 text-blue-400" />} />
                <StatCard label="BEKLEYEN" value={stats?.pending || 0} icon={<Activity className="w-5 h-5 text-yellow-500" />} />
                <StatCard label="TAMAMLANAN" value={stats?.completed || 0} icon={<Check className="w-5 h-5 text-green-400" />} />
                <StatCard label="İPTAL/RED" value={stats?.cancelled || 0} icon={<X className="w-5 h-5 text-red-500" />} />
            </div>

            {/* Quotes Table */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50 text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800">
                            <th className="p-4">REFERANS NO</th>
                            <th className="p-4">FİRMA / YETKİLİ</th>
                            <th className="p-4">HİZMET TİPİ</th>
                            <th className="p-4">DURUM</th>
                            <th className="p-4 text-right">EYLEM</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {quotes.map((quote) => (
                            <tr key={quote.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono">
                                    <div className="font-bold text-yellow-500">{quote.quote_number}</div>
                                    <div className="text-[9px] text-slate-600">{new Date(quote.created_at).toLocaleString('tr-TR')}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold">{quote.company || "ŞAHIS"}</div>
                                    <div className="text-xs text-slate-400">{quote.full_name}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-xs font-black uppercase text-slate-300 bg-slate-800 inline-block px-2 py-1 rounded">
                                        {quote.service_type}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${quote.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                        quote.status === 'completed' || quote.status === 'sent' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                            'bg-red-500/10 text-red-500 border border-red-500/20'
                                        }`}>
                                        {quote.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => setSelectedQuote(quote)}
                                        className="p-2 hover:bg-yellow-500/20 text-yellow-500 rounded-lg transition-colors"
                                        title="Talep Detaylarını Gör"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <select
                                        value={quote.status}
                                        onChange={(e) => handleStatusUpdate(quote.id, e.target.value)}
                                        className="bg-slate-800 border border-slate-700 text-xs p-1 rounded-lg focus:outline-none"
                                    >
                                        <option value="pending">BEKLİYOR</option>
                                        <option value="evaluating">İNCELENİYOR</option>
                                        <option value="sent">TEKLİF GÖNDERİLDİ</option>
                                        <option value="completed">ONAYLANDI</option>
                                        <option value="rejected">REDDEDİLDİ</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {quotes.length === 0 && (
                    <div className="p-20 text-center text-slate-500 font-mono uppercase italic tracking-widest">
                        GÜNCEL TEKLİF TALEBİ BULUNMAMAKTADIR
                    </div>
                )}
            </div>

            {/* Quote Detail Modal */}
            <Dialog open={!!selectedQuote} onOpenChange={(open: any) => !open && setSelectedQuote(null)}>
                <DialogContent className="max-w-3xl bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black font-mono tracking-tighter text-yellow-500 uppercase">
                            TEKLİF DETAYI: {selectedQuote?.quote_number}
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            B2B Servis Talebi ve Teknik Veriler
                        </DialogDescription>
                    </DialogHeader>

                    {selectedQuote && (
                        <div className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Müşteri / Firma Bilgisi</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Firma</p>
                                            <p className="font-bold text-lg">{selectedQuote.company || "Bireysel Müşteri"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Yetkili</p>
                                            <p className="font-bold">{selectedQuote.full_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">İletişim</p>
                                            <p className="text-sm text-slate-300">{selectedQuote.email}</p>
                                            <p className="text-sm text-slate-300">{selectedQuote.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Hizmet Parametreleri</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Hizmet Tipi</p>
                                            <p className="font-bold text-[var(--color-brand-safety-orange)]">{selectedQuote.service_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Talep Tarihi</p>
                                            <p className="font-bold">{new Date(selectedQuote.created_at).toLocaleString('tr-TR')}</p>
                                        </div>
                                        {selectedQuote.quote_attachments?.[0] ? (
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase font-bold">Teknik Dosya</p>
                                                <div className="flex items-center justify-between mt-1 bg-black/40 p-3 rounded-lg border border-slate-700">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-blue-400" />
                                                        <span className="text-xs font-mono">{selectedQuote.quote_attachments[0].file_name}</span>
                                                    </div>
                                                    <button
                                                        onClick={async () => {
                                                            const { getQuoteSignedUrl } = await import('@/actions/admin');
                                                            const res = await getQuoteSignedUrl(selectedQuote.quote_attachments[0].file_path);
                                                            if (res.success && res.url) {
                                                                window.open(res.url, '_blank');
                                                            } else {
                                                                showNotification("error", "Link oluşturulamadı!");
                                                            }
                                                        }}
                                                        className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded font-black uppercase tracking-tighter"
                                                    >
                                                        DOSYAYI AÇ
                                                    </button>
                                                </div>
                                                <p className="text-[9px] text-slate-500 mt-2 font-mono">
                                                    BOYUT: {(selectedQuote.quote_attachments[0].file_size / 1024 / 1024).toFixed(2)} MB • {selectedQuote.quote_attachments[0].file_type}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase font-bold">Teknik Dosya</p>
                                                <p className="text-xs text-slate-400 mt-1 italic">Dosya yüklenmedi.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Talep Açıklaması</h4>
                                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-slate-800">
                                    {selectedQuote.description}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setSelectedQuote(null)}
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-black uppercase text-[10px] tracking-widest border border-slate-700"
                                >
                                    PENCEREYİ KAPAT
                                </button>
                                <a
                                    href={`mailto:${selectedQuote.email}?subject=Veral Teknoloji - Teklif Talebiniz Hakkında (${selectedQuote.quote_number})`}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors font-black uppercase text-[10px] tracking-widest text-white flex items-center gap-2"
                                >
                                    İLETİŞİME GEÇ (E-POSTA)
                                </a>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

const StatCard = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">{label}</span>
            {icon}
        </div>
        <div className="text-3xl font-black text-white">{value}</div>
    </div>
);

// Sidebar Item
const SidebarItem = ({ icon, label, active, onClick, className }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; className?: string }) => (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${active ? "bg-[var(--color-brand-safety-orange)] text-white font-bold shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"} ${className}`}>
        {icon}
        <span className="text-sm font-medium">{label}</span>
    </button>
);

// ========== AUDIT LOGS TAB ==========
const AuditLogsTab = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            const { getAdminLogs } = await import('@/actions/admin');
            const res = await getAdminLogs();
            if (res.success) setLogs(res.data);
            setIsLoading(false);
        };
        fetchLogs();
    }, []);

    if (isLoading) return <div className="p-20 text-center font-mono animate-pulse uppercase tracking-widest text-slate-500">Loglar Yükleniyor...</div>;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Audit Logs</h1>
                <p className="text-slate-500 mt-1">Sistem üzerinde yapılan tüm yönetici işlemlerinin kaydı</p>
            </header>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50 text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800">
                            <th className="p-4">TARİH</th>
                            <th className="p-4">ADMİN</th>
                            <th className="p-4">EYLEM</th>
                            <th className="p-4">VARLIK</th>
                            <th className="p-4">IP / CİHAZ</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-slate-500">
                                    {new Date(log.created_at).toLocaleString('tr-TR')}
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-slate-300">{log.admin_email}</div>
                                </td>
                                <td className="p-4">
                                    <span className="font-black text-[var(--color-brand-safety-orange)]">{log.action}</span>
                                </td>
                                <td className="p-4 text-slate-400">
                                    {log.entity} <span className="text-[10px] bg-slate-800 px-1 rounded">{log.entity_id}</span>
                                </td>
                                <td className="p-4 text-[10px] text-slate-500 font-mono">
                                    <div>{log.ip}</div>
                                    <div className="truncate max-w-[200px]">{log.user_agent}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length === 0 && (
                    <div className="p-20 text-center text-slate-500 font-mono uppercase italic tracking-widest">
                        HENÜZ HİÇBİR İŞLEM KAYDEDİLMEMİŞ
                    </div>
                )}
            </div>
        </div>
    );
};

// ========== BRANDING TAB ==========
const BrandingTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { content, updateContent } = useContentStore();

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Logo & Marka Yönetimi</h1>
                    <p className="text-slate-500 mt-1">Site logosu ve marka ayarlarını düzenleyin</p>
                </div>
                <button
                    onClick={async () => {
                        const success = await useContentStore.getState().saveToSupabase();
                        if (success) showNotification("success", "Marka ayarları kaydedildi!");
                        else showNotification("error", "Kayıt hatası!");
                    }}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] text-black px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase tracking-tighter"
                >
                    <Save className="w-5 h-5" /> Kaydet
                </button>
            </header>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Site Adı</label>
                        <input
                            type="text"
                            value={content.siteName || ""}
                            onChange={(e) => updateContent({ siteName: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] text-lg"
                            placeholder="VERAL"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Header Logo</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={content.headerLogo || ""}
                                onChange={(e) => updateContent({ headerLogo: e.target.value })}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] font-mono text-xs"
                                placeholder="/logo.svg"
                            />
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/svg+xml,image/webp,image/png,image/jpeg"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            formData.append("path", "branding");
                                            const { uploadSiteAsset } = await import("@/actions/admin");
                                            try {
                                                const result = await uploadSiteAsset(formData);
                                                if (result.success) updateContent({ headerLogo: result.url });
                                            } catch (err: any) {
                                                showNotification("error", err.message);
                                            }
                                        }
                                    }}
                                />
                                <button className="h-full px-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                                    <Upload className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Navigasyon çubuğunda görünecek logo (SVG/WebP önerilir)</p>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Footer Logo</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={content.footerLogo || ""}
                                onChange={(e) => updateContent({ footerLogo: e.target.value })}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] font-mono text-xs"
                                placeholder="/logo-white.svg"
                            />
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/svg+xml,image/webp,image/png,image/jpeg"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            formData.append("path", "branding");
                                            const { uploadSiteAsset } = await import("@/actions/admin");
                                            try {
                                                const result = await uploadSiteAsset(formData);
                                                if (result.success) updateContent({ footerLogo: result.url });
                                            } catch (err: any) {
                                                showNotification("error", err.message);
                                            }
                                        }
                                    }}
                                />
                                <button className="h-full px-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                                    <Upload className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Footer'da görünecek logo (genellikle beyaz)</p>
                    </div>
                </div>

                {/* Logo Preview */}
                <div className="mt-8 pt-6 border-t border-slate-700">
                    <h4 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                        👁️ Logo Önizleme
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl flex items-center justify-center min-h-[100px]">
                            {content.headerLogo ? (
                                <img src={normalizeImagePath(content.headerLogo)} alt="Header Logo" className="max-h-16 object-contain" />
                            ) : (
                                <span className="text-slate-400 text-sm">Header Logo URL girin</span>
                            )}
                        </div>
                        <div className="bg-slate-950 p-6 rounded-xl flex items-center justify-center min-h-[100px]">
                            {content.footerLogo ? (
                                <img src={normalizeImagePath(content.footerLogo)} alt="Footer Logo" className="max-h-16 object-contain" />
                            ) : (
                                <span className="text-slate-600 text-sm">Footer Logo URL girin</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ========== METAL SHOWCASE TAB ==========
const MetalShowcaseTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { content, updateContent, saveToSupabase } = useContentStore();
    const { products, loading, fetchProductsAdmin, addProduct, updateProduct, deleteProduct } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    useEffect(() => {
        fetchProductsAdmin();
        fetchCategories();
    }, [fetchProductsAdmin, fetchCategories]);

    const showcaseProducts = products.filter(p => p.is_showcase);

    const handleSave = async () => {
        const success = await saveToSupabase();
        if (success) {
            showNotification("success", "Metal Showcase ayarları Supabase'e kaydedildi!");
        } else {
            showNotification("error", "Kayıt sırasında bir hata oluştu!");
        }
    };

    const handleSaveProduct = async (product: any) => {
        try {
            const productToSave = {
                ...product,
                category_id: product.category || product.category_id,
                is_active: product.is_active !== undefined ? product.is_active : true,
                background_color: product.background_color || "#0A0A0A",
                stock_quantity: product.stock_quantity || 0,
                is_showcase: true, // Force showcase for this tab
                features: product.features || []
            };

            if (product.id) {
                await updateProduct(product.id, productToSave);
                showNotification("success", "Ürün güncellendi!");
            } else {
                await addProduct(productToSave);
                showNotification("success", "Yeni showcase ürünü eklendi!");
            }
            setEditingProduct(null);
            setIsAddModalOpen(false);
        } catch (err) {
            console.error("Save error:", err);
            showNotification("error", "İşlem başarısız oldu!");
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm("Bu ürünü showcase'den silmek istediğinizden emin misiniz?")) {
            try {
                await deleteProduct(id);
                showNotification("success", "Ürün silindi.");
            } catch (err) {
                showNotification("error", "Silme işlemi başarısız oldu!");
            }
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Metal Showcase Ayarları</h1>
                    <p className="text-slate-500 mt-1">/metal-showcase sayfasının içeriklerini düzenleyin</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] text-black px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase tracking-tighter"
                >
                    <Save className="w-5 h-5" /> Kaydet
                </button>
            </header>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Hero Başlık</label>
                        <input
                            type="text"
                            value={content.metalShowcaseTitle || ""}
                            onChange={(e) => updateContent({ metalShowcaseTitle: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] text-lg"
                            placeholder="Metal Art Atelier"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Hero Alt Başlık</label>
                        <textarea
                            value={content.metalShowcaseSubtitle || ""}
                            onChange={(e) => updateContent({ metalShowcaseSubtitle: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[80px]"
                            placeholder="Endüstriyel kalite. Sanatsal tasarım."
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Hero Görsel URL (Opsiyonel)</label>
                        <input
                            type="text"
                            value={content.metalShowcaseHeroImage || ""}
                            onChange={(e) => updateContent({ metalShowcaseHeroImage: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-slate-700">
                    <h4 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                        🏆 Güven Rozetleri
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                        {content.metalShowcaseTrustBadges?.map((badge, index) => (
                            <div key={index} className="bg-slate-800 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-[var(--color-brand-safety-orange)]">
                                    Rozet #{index + 1}
                                </p>
                                <input
                                    type="text"
                                    value={badge.icon}
                                    onChange={(e) => {
                                        const newBadges = [...content.metalShowcaseTrustBadges];
                                        newBadges[index] = { ...badge, icon: e.target.value };
                                        updateContent({ metalShowcaseTrustBadges: newBadges });
                                    }}
                                    placeholder="İkon (örn: Zap, Shield)"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                                <input
                                    type="text"
                                    value={badge.text}
                                    onChange={(e) => {
                                        const newBadges = [...content.metalShowcaseTrustBadges];
                                        newBadges[index] = { ...badge, text: e.target.value };
                                        updateContent({ metalShowcaseTrustBadges: newBadges });
                                    }}
                                    placeholder="Metin (örn: Hızlı Üretim)"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview Link */}
                <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center">
                    <a
                        href="/metal-showcase"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <Activity className="w-4 h-4" />
                        Metal Showcase Sayfasını Görüntüle →
                    </a>
                </div>
            </div>

            {/* Showcase Products Management */}
            <div className="mt-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold italic">Metal Showcase Ürünleri</h3>
                        <p className="text-sm text-slate-500 italic">Özel seride sergilenen {showcaseProducts.length} adet ürün</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-black text-xs uppercase"
                    >
                        <Plus className="w-4 h-4" /> Showcase Ürünü Ekle
                    </button>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {showcaseProducts.map((product) => (
                        <div key={product.id} className="bg-slate-800 rounded-xl overflow-hidden group hover:ring-2 hover:ring-[var(--color-brand-safety-orange)] transition-all relative">
                            <div className="aspect-square bg-slate-900 border-b border-white/5">
                                <img src={normalizeImagePath(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => setEditingProduct(product)} className="p-2 bg-[var(--color-brand-safety-orange)] rounded-lg hover:scale-110 transition-transform">
                                        <Pencil className="w-4 h-4 text-black" />
                                    </button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-red-500 rounded-lg hover:scale-110 transition-transform">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-bold truncate text-slate-300 italic uppercase">{product.name}</p>
                            </div>
                        </div>
                    ))}
                    {showcaseProducts.length === 0 && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-800 rounded-xl">
                            <p className="text-slate-500 font-mono text-sm">HENÜZ SHOWCASE ÜRÜNÜ EKLENMEMİŞ</p>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {(isAddModalOpen || editingProduct) && (
                    <ProductModal
                        product={editingProduct}
                        onSave={handleSaveProduct}
                        onClose={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                        isLoading={loading}
                        hideShowcaseOption={true}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
