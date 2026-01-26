"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Package, FileText, Settings, LogOut, Plus,
    Pencil, Trash2, Save, X, Search, ChevronDown, ChevronUp,
    Check, AlertCircle, Image as ImageIcon, Home, Info, MessageSquare, ShoppingCart, Activity, Tags, FolderPlus, Eye
} from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useContentStore, SiteContent } from "@/store/useContentStore";
import { Product } from "@/lib/products";
import { ImageUploader } from "./ImageUploader";
import type { Category } from "@/lib/supabase/categories.service";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/Dialog";

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("content");
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const { fetchContent } = useContentStore();

    // Fetch content from Supabase on mount
    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    const showNotification = (type: "success" | "error", message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-white font-sans">
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
            <aside className="w-72 border-r border-white/10 p-6 flex flex-col gap-8 bg-slate-900/50 shrink-0">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-safety-orange)] text-white flex items-center justify-center font-bold text-2xl shadow-lg">V</div>
                    <div>
                        <span className="font-bold text-xl tracking-tight">Veral</span>
                        <span className="text-slate-500 text-xl">Panel</span>
                        <p className="text-xs text-slate-500">Yönetim Sistemi</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2">Marka & Görsel</p>
                    <SidebarItem
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Logo & Marka"
                        active={activeTab === "branding"}
                        onClick={() => setActiveTab("branding")}
                    />
                    <SidebarItem
                        icon={<Activity className="w-5 h-5" />}
                        label="Metal Showcase"
                        active={activeTab === "showcase"}
                        onClick={() => setActiveTab("showcase")}
                    />

                    <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2 mt-4">İçerik Yönetimi</p>
                    <SidebarItem
                        icon={<Home className="w-5 h-5" />}
                        label="Ana Sayfa İçerikleri"
                        active={activeTab === "content"}
                        onClick={() => setActiveTab("content")}
                    />
                    <SidebarItem
                        icon={<Info className="w-5 h-5" />}
                        label="Diğer Sayfalar"
                        active={activeTab === "pages"}
                        onClick={() => setActiveTab("pages")}
                    />
                    <SidebarItem
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="İletişim & Footer"
                        active={activeTab === "contact"}
                        onClick={() => setActiveTab("contact")}
                    />
                    <SidebarItem
                        icon={<ImageIcon className="w-5 h-5" />}
                        label="Görseller"
                        active={activeTab === "images"}
                        onClick={() => setActiveTab("images")}
                    />

                    <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">Ürün & Sipariş</p>
                    <SidebarItem
                        icon={<Package className="w-5 h-5" />}
                        label="Ürünler"
                        active={activeTab === "products"}
                        onClick={() => setActiveTab("products")}
                    />
                    <SidebarItem
                        icon={<Tags className="w-5 h-5" />}
                        label="Kategoriler"
                        active={activeTab === "categories"}
                        onClick={() => setActiveTab("categories")}
                    />
                    <SidebarItem
                        icon={<ShoppingCart className="w-5 h-5" />}
                        label="Siparişler"
                        active={activeTab === "orders"}
                        onClick={() => setActiveTab("orders")}
                    />
                </nav>

                <div className="mt-auto space-y-2 border-t border-white/5 pt-6">
                    <a href="/" className="w-full block">
                        <SidebarItem icon={<LogOut className="w-5 h-5" />} label="Siteye Dön" className="text-blue-400 hover:bg-blue-500/10" />
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === "branding" && <BrandingTab showNotification={showNotification} />}
                {activeTab === "showcase" && <MetalShowcaseTab showNotification={showNotification} />}
                {activeTab === "content" && <HomeContentTab showNotification={showNotification} />}
                {activeTab === "pages" && <OtherPagesTab showNotification={showNotification} />}
                {activeTab === "contact" && <ContactTab showNotification={showNotification} />}
                {activeTab === "images" && <ImagesTab showNotification={showNotification} />}
                {activeTab === "products" && <ProductsTab showNotification={showNotification} />}
                {activeTab === "categories" && <CategoriesTab showNotification={showNotification} />}
                {activeTab === "orders" && <OrdersTab showNotification={showNotification} />}
            </main>
        </div>
    );
};

// ========== HOME CONTENT TAB ==========
const HomeContentTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { content, updateContent, updateFeatureItem, updateFaqItem, addFaqItem, removeFaqItem, updateServiceItem, saveToSupabase } = useContentStore();
    const [activeSection, setActiveSection] = useState("hero");

    const sections = [
        { id: "hero", label: "Hero (Giriş)", icon: "🏠" },
        { id: "features", label: "Özellikler", icon: "⚡" },
        { id: "services", label: "Hizmetler", icon: "🔧" },
        { id: "faq", label: "SSS (FAQ)", icon: "❓" },
    ];

    const handleSave = async () => {
        const success = await saveToSupabase();
        if (success) {
            showNotification("success", "Değişiklikler Supabase'e kaydedildi!");
        } else {
            showNotification("error", "Kayıt sırasında bir hata oluştu!");
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Ana Sayfa İçerikleri</h1>
                    <p className="text-slate-500 mt-1">Tüm ana sayfa metinlerini ve görsellerini düzenleyin</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    <Save className="w-5 h-5" /> Kaydet
                </button>
            </header>

            {/* Section Tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-5 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${activeSection === section.id
                            ? "bg-[var(--color-brand-safety-orange)] text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                            }`}
                    >
                        <span>{section.icon}</span> {section.label}
                    </button>
                ))}
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                {/* HERO SECTION */}
                {activeSection === "hero" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🏠 Hero (Giriş) Bölümü</h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-400 mb-2">Ana Başlık</label>
                                <input
                                    type="text"
                                    value={content.heroTitle}
                                    onChange={(e) => updateContent({ heroTitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] text-lg"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-400 mb-2">Alt Başlık (Açıklama)</label>
                                <textarea
                                    value={content.heroSubtitle}
                                    onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[80px]"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-400 mb-2">Etiket (Slogan)</label>
                                <input
                                    type="text"
                                    value={content.heroTagline}
                                    onChange={(e) => updateContent({ heroTagline: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Başlangıç Fiyatı</label>
                                <input
                                    type="text"
                                    value={content.heroPrice}
                                    onChange={(e) => updateContent({ heroPrice: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Hero Görsel URL</label>
                                <input
                                    type="text"
                                    value={content.heroImage || ""}
                                    onChange={(e) => updateContent({ heroImage: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Buton 1 Metni</label>
                                <input
                                    type="text"
                                    value={content.heroButton1Text}
                                    onChange={(e) => updateContent({ heroButton1Text: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Buton 1 URL</label>
                                <input
                                    type="text"
                                    value={content.heroButton1Url || ""}
                                    onChange={(e) => updateContent({ heroButton1Url: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="/urunler"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Buton 2 Metni</label>
                                <input
                                    type="text"
                                    value={content.heroButton2Text}
                                    onChange={(e) => updateContent({ heroButton2Text: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Buton 2 URL</label>
                                <input
                                    type="text"
                                    value={content.heroButton2Url || ""}
                                    onChange={(e) => updateContent({ heroButton2Url: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="/katalog.pdf"
                                />
                            </div>
                        </div>

                        {/* Hero Stats */}
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <h4 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                                📊 Hero İstatistikleri
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                                {content.heroStats?.map((stat, index) => (
                                    <div key={index} className="bg-slate-800 rounded-xl p-4 space-y-3">
                                        <p className="text-xs font-bold text-[var(--color-brand-safety-orange)]">
                                            İstatistik #{index + 1}
                                        </p>
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => {
                                                const newStats = [...content.heroStats];
                                                newStats[index] = { ...stat, value: e.target.value };
                                                updateContent({ heroStats: newStats });
                                            }}
                                            placeholder="Değer (örn: 24-48s)"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-lg font-bold focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...content.heroStats];
                                                newStats[index] = { ...stat, label: e.target.value };
                                                updateContent({ heroStats: newStats });
                                            }}
                                            placeholder="Etiket (örn: TESLİMAT)"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* FEATURES SECTION */}
                {activeSection === "features" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">⚡ Özellikler Bölümü</h3>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Bölüm Başlığı</label>
                                <input
                                    type="text"
                                    value={content.featuresTitle}
                                    onChange={(e) => updateContent({ featuresTitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Alt Başlık</label>
                                <input
                                    type="text"
                                    value={content.featuresSubtitle}
                                    onChange={(e) => updateContent({ featuresSubtitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton Metni</label>
                                <input
                                    type="text"
                                    value={content.featuresExploreText || ""}
                                    onChange={(e) => updateContent({ featuresExploreText: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="Tüm Özellikleri Keşfet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton URL</label>
                                <input
                                    type="text"
                                    value={content.featuresExploreUrl || ""}
                                    onChange={(e) => updateContent({ featuresExploreUrl: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="/ozellikler"
                                />
                            </div>
                        </div>


                        <h4 className="font-bold text-slate-300 mb-4">Özellik Kartları</h4>
                        <div className="space-y-4">
                            {content.featureItems.map((item, index) => (
                                <div key={index} className="bg-slate-800 rounded-xl p-4 space-y-3">
                                    <p className="text-sm font-bold text-[var(--color-brand-safety-orange)]">Özellik #{index + 1}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateFeatureItem(index, { ...item, title: e.target.value })}
                                            placeholder="Başlık"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                        <input
                                            type="text"
                                            value={item.tag}
                                            onChange={(e) => updateFeatureItem(index, { ...item, tag: e.target.value })}
                                            placeholder="Etiket"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updateFeatureItem(index, { ...item, description: e.target.value })}
                                            placeholder="Açıklama"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)] col-span-2"
                                        />
                                        <input
                                            type="text"
                                            value={item.stats}
                                            onChange={(e) => updateFeatureItem(index, { ...item, stats: e.target.value })}
                                            placeholder="İstatistik"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                        <input
                                            type="text"
                                            value={item.image}
                                            onChange={(e) => updateFeatureItem(index, { ...item, image: e.target.value })}
                                            placeholder="Görsel URL"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SERVICES SECTION */}
                {activeSection === "services" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🔧 Hizmetler Bölümü</h3>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Bölüm Başlığı</label>
                                <input
                                    type="text"
                                    value={content.servicesTitle}
                                    onChange={(e) => updateContent({ servicesTitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Alt Başlık</label>
                                <input
                                    type="text"
                                    value={content.servicesSubtitle}
                                    onChange={(e) => updateContent({ servicesSubtitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton Metni</label>
                                <input
                                    type="text"
                                    value={content.servicesExploreText || ""}
                                    onChange={(e) => updateContent({ servicesExploreText: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="Tüm Hizmetleri Gör"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton URL</label>
                                <input
                                    type="text"
                                    value={content.servicesExploreUrl || ""}
                                    onChange={(e) => updateContent({ servicesExploreUrl: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="/hizmetler"
                                />
                            </div>
                        </div>

                        <h4 className="font-bold text-slate-300 mb-4">Hizmet Kartları</h4>
                        <div className="space-y-4">
                            {content.serviceItems.map((item, index) => (
                                <div key={index} className="bg-slate-800 rounded-xl p-4 space-y-3">
                                    <p className="text-sm font-bold text-[var(--color-brand-safety-orange)]">Hizmet #{index + 1}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateServiceItem(index, { ...item, title: e.target.value })}
                                            placeholder="Başlık"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                        <input
                                            type="text"
                                            value={item.image}
                                            onChange={(e) => updateServiceItem(index, { ...item, image: e.target.value })}
                                            placeholder="Görsel URL"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                        />
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updateServiceItem(index, { ...item, description: e.target.value })}
                                            placeholder="Açıklama"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)] col-span-2"
                                        />
                                        <input
                                            type="text"
                                            value={item.features.join(", ")}
                                            onChange={(e) => updateServiceItem(index, { ...item, features: e.target.value.split(", ") })}
                                            placeholder="Özellikler (virgülle ayırın)"
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)] col-span-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ SECTION */}
                {activeSection === "faq" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">❓ SSS (Sıkça Sorulan Sorular)</h3>
                            <button
                                onClick={addFaqItem}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Yeni Soru Ekle
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2">Bölüm Başlığı</label>
                            <input
                                type="text"
                                value={content.faqTitle}
                                onChange={(e) => updateContent({ faqTitle: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                            />
                        </div>

                        <div className="space-y-4">
                            {content.faqItems.map((item, index) => (
                                <div key={index} className="bg-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-[var(--color-brand-safety-orange)]">Soru #{index + 1}</span>
                                        <button onClick={() => removeFaqItem(index)} className="p-1 text-red-400 hover:text-red-300">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={item.question}
                                        onChange={(e) => updateFaqItem(index, { ...item, question: e.target.value })}
                                        placeholder="Soru"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    />
                                    <textarea
                                        value={item.answer}
                                        onChange={(e) => updateFaqItem(index, { ...item, answer: e.target.value })}
                                        placeholder="Cevap"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[80px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ========== OTHER PAGES TAB ==========
const OtherPagesTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { content, updateContent, updateAboutStat } = useContentStore();
    const [activePage, setActivePage] = useState("about");

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Diğer Sayfa İçerikleri</h1>
                    <p className="text-slate-500 mt-1">Hakkımızda, Ürünler ve Blog sayfalarını düzenleyin</p>
                </div>
                <button
                    onClick={() => showNotification("success", "Değişiklikler kaydedildi!")}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    <Save className="w-5 h-5" /> Kaydet
                </button>
            </header>

            <div className="flex gap-2 mb-8">
                {[
                    { id: "about", label: "Hakkımızda" },
                    { id: "products", label: "Ürünler Sayfası" },
                    { id: "blog", label: "Blog Sayfası" },
                ].map(page => (
                    <button
                        key={page.id}
                        onClick={() => setActivePage(page.id)}
                        className={`px-5 py-2 rounded-xl font-bold transition-colors ${activePage === page.id ? "bg-[var(--color-brand-safety-orange)] text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                            }`}
                    >
                        {page.label}
                    </button>
                ))}
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                {activePage === "about" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4">Hakkımızda Sayfası</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Sayfa Başlığı</label>
                                <input
                                    type="text"
                                    value={content.aboutTitle}
                                    onChange={(e) => updateContent({ aboutTitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Alt Başlık</label>
                                <input
                                    type="text"
                                    value={content.aboutSubtitle}
                                    onChange={(e) => updateContent({ aboutSubtitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-400 mb-2">İçerik Metni</label>
                                <textarea
                                    value={content.aboutContent}
                                    onChange={(e) => updateContent({ aboutContent: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[150px]"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-400 mb-2">Görsel URL</label>
                                <input
                                    type="text"
                                    value={content.aboutImage}
                                    onChange={(e) => updateContent({ aboutImage: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton Metni</label>
                                <input
                                    type="text"
                                    value={content.aboutExploreText || ""}
                                    onChange={(e) => updateContent({ aboutExploreText: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="Hikayemizi Keşfet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton URL</label>
                                <input
                                    type="text"
                                    value={content.aboutExploreUrl || ""}
                                    onChange={(e) => updateContent({ aboutExploreUrl: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="/hakkimizda"
                                />
                            </div>
                        </div>

                        <h4 className="font-bold text-slate-300 mt-6 mb-4">İstatistikler</h4>
                        <div className="grid grid-cols-3 gap-4">
                            {content.aboutStats.map((stat, index) => (
                                <div key={index} className="bg-slate-800 rounded-xl p-4 space-y-2">
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => updateAboutStat(index, { ...stat, label: e.target.value })}
                                        placeholder="Etiket"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    />
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => updateAboutStat(index, { ...stat, value: e.target.value })}
                                        placeholder="Değer"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-2xl font-bold focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activePage === "products" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4">Ürünler Sayfası</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Sayfa Başlığı</label>
                                <input
                                    type="text"
                                    value={content.productsPageTitle}
                                    onChange={(e) => updateContent({ productsPageTitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Alt Başlık</label>
                                <input
                                    type="text"
                                    value={content.productsPageSubtitle}
                                    onChange={(e) => updateContent({ productsPageSubtitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton Metni</label>
                                <input
                                    type="text"
                                    value={content.productsExploreText || ""}
                                    onChange={(e) => updateContent({ productsExploreText: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="Tüm Ürünleri Gör"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">🔗 Keşfet Buton URL</label>
                                <input
                                    type="text"
                                    value={content.productsExploreUrl || ""}
                                    onChange={(e) => updateContent({ productsExploreUrl: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                    placeholder="/urunler"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activePage === "blog" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4">Blog Sayfası</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Sayfa Başlığı</label>
                                <input
                                    type="text"
                                    value={content.blogPageTitle}
                                    onChange={(e) => updateContent({ blogPageTitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Alt Başlık</label>
                                <input
                                    type="text"
                                    value={content.blogPageSubtitle}
                                    onChange={(e) => updateContent({ blogPageSubtitle: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ========== CONTACT TAB ==========
const ContactTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { content, updateContent } = useContentStore();

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">İletişim & Footer</h1>
                    <p className="text-slate-500 mt-1">İletişim bilgilerini ve footer içeriklerini düzenleyin</p>
                </div>
                <button
                    onClick={() => showNotification("success", "Değişiklikler kaydedildi!")}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    <Save className="w-5 h-5" /> Kaydet
                </button>
            </header>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
                <h3 className="text-xl font-bold mb-4">Şirket Bilgileri</h3>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Şirket Adı</label>
                        <input
                            type="text"
                            value={content.footerCompanyName}
                            onChange={(e) => updateContent({ footerCompanyName: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Telefon</label>
                        <input
                            type="text"
                            value={content.footerPhone}
                            onChange={(e) => updateContent({ footerPhone: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">E-posta</label>
                        <input
                            type="text"
                            value={content.footerEmail}
                            onChange={(e) => updateContent({ footerEmail: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Instagram</label>
                        <input
                            type="text"
                            value={content.footerInstagram}
                            onChange={(e) => updateContent({ footerInstagram: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-400 mb-2">Adres</label>
                        <textarea
                            value={content.footerAddress}
                            onChange={(e) => updateContent({ footerAddress: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[100px]"
                        />
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-4 mt-8">WhatsApp Ayarları</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">WhatsApp Numarası</label>
                        <input
                            type="text"
                            value={content.whatsappNumber}
                            onChange={(e) => updateContent({ whatsappNumber: e.target.value })}
                            placeholder="905071651315"
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Varsayılan Mesaj</label>
                        <input
                            type="text"
                            value={content.whatsappMessage}
                            onChange={(e) => updateContent({ whatsappMessage: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ========== PRODUCTS TAB ==========
const ProductsTab = ({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) => {
    const { products, loading, error, fetchProductsAdmin, addProduct, updateProduct, deleteProduct } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
            setExpandedCategories(categories.map(c => c.slug));
        }
    }, [categories]);

    // Show error notification
    useEffect(() => {
        if (error) {
            showNotification("error", error);
        }
    }, [error, showNotification]);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const groupedProducts = categories.reduce((acc: Record<string, any[]>, cat: Category) => {
        acc[cat.slug] = filteredProducts.filter(p => p.category === cat.slug);
        return acc;
    }, {} as Record<string, any[]>);

    const toggleCategory = (catSlug: string) => {
        setExpandedCategories(prev =>
            prev.includes(catSlug) ? prev.filter(id => id !== catSlug) : [...prev, catSlug]
        );
    };

    const handleSaveProduct = async (product: any) => {
        try {
            if (product.id) {
                await updateProduct(product.id, product);
                showNotification("success", "Ürün güncellendi!");
            } else {
                await addProduct(product);
                showNotification("success", "Yeni ürün eklendi!");
            }
            setEditingProduct(null);
            setIsAddModalOpen(false);
        } catch (err) {
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
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    <Plus className="w-5 h-5" /> Yeni Ürün Ekle
                </button>
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
                    const categoryProducts = groupedProducts[category.slug] || [];
                    if (categoryProducts.length === 0 && selectedCategory) return null;

                    return (
                        <div key={category.slug} className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                            <button
                                onClick={() => toggleCategory(category.slug)}
                                className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                                    <h3 className="text-xl font-bold">{category.name}</h3>
                                    <span className="text-slate-500 text-sm">({categoryProducts.length} ürün)</span>
                                </div>
                                {expandedCategories.includes(category.slug) ?
                                    <ChevronUp className="w-5 h-5 text-slate-400" /> :
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                }
                            </button>

                            <AnimatePresence>
                                {expandedCategories.includes(category.slug) && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                        <div className="p-5 pt-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {categoryProducts.map((product: Product) => (
                                                <div key={product.id} className="bg-slate-800 rounded-xl overflow-hidden group hover:ring-2 hover:ring-[var(--color-brand-safety-orange)] transition-all">
                                                    <div className="relative aspect-square bg-slate-900">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                            <button onClick={() => setEditingProduct(product)} className="p-3 bg-[var(--color-brand-safety-orange)] rounded-xl hover:bg-[var(--color-brand-safety-orange)]/80">
                                                                <Pencil className="w-5 h-5" />
                                                            </button>
                                                            <button onClick={() => handleDeleteProduct(product.id)} className="p-3 bg-red-500 rounded-xl hover:bg-red-600">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <h4 className="font-bold text-sm truncate">{product.name}</h4>
                                                        <p className="text-[var(--color-brand-safety-orange)] font-bold mt-1">₺{product.price}</p>
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
            </AnimatePresence>
        </div>
    );
};

// Product Modal
const ProductModal = ({ product, onSave, onClose, isLoading }: { product: Product | null; onSave: (p: any) => void; onClose: () => void; isLoading: boolean }) => {
    const [formData, setFormData] = useState({
        id: product?.id || "",
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || 350,
        image: product?.image || "",
        category: product?.category || "CUSTOM",
        specs: product?.specs || { material: "ALÜMİNYUM", thickness: "1.5MM", process: "UV_STATİK", print: "ENDÜSTRİYEL_GEN_3" }
    });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-2xl font-bold">{product ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-400 mb-2">Ürün Adı</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-400 mb-2">Açıklama</label>
                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)] min-h-[100px]" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2">Fiyat (₺)</label>
                            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2">Kategori</label>
                            <div className="flex gap-2">
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                                >
                                    {useCategoryStore.getState().categories.map(cat => (
                                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <ImageUploader
                                label="Ürün Görseli"
                                currentImage={formData.image}
                                folder="products"
                                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 py-3 border border-slate-700 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50">İptal</button>
                        <button
                            type="submit"
                            disabled={isLoading || !formData.image}
                            className="flex-1 py-3 bg-[var(--color-brand-safety-orange)] rounded-xl font-bold hover:bg-[var(--color-brand-safety-orange)]/80 flex items-center justify-center gap-2 disabled:opacity-50"
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
    const { categories, loading, fetchCategories, addCategory, deleteCategory } = useCategoryStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", color: "#3B82F6" });

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

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
                // Dynamically import Server Actions to avoid build issues if mixed
                const { getAdminOrders, getAdminOrderStats } = await import('@/actions/admin');
                const [ordersRes, statsRes] = await Promise.all([
                    getAdminOrders(),
                    getAdminOrderStats()
                ]);

                if (ordersRes.success) {
                    setOrders(ordersRes.data || []);
                } else {
                    throw new Error(ordersRes.error);
                }

                if (statsRes.success) {
                    setStats(statsRes.data);
                }

            } catch (error) {
                console.error("Failed to fetch orders:", error);
                showNotification("error", "Siparişler yüklenemedi! (Veritabanı bağlantısını kontrol edin)");
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
                throw new Error(result.error);
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

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="TOPLAM SİPARİŞ" value={stats?.total || 0} icon={<ShoppingCart className="w-5 h-5 text-blue-400" />} />
                <StatCard label="BEKLEYEN" value={stats?.pending || 0} icon={<Activity className="w-5 h-5 text-yellow-400" />} />
                <StatCard label="TESLİM EDİLEN" value={stats?.delivered || 0} icon={<Check className="w-5 h-5 text-green-400" />} />
                <StatCard label="TOPLAM CİRO" value={`₺${stats?.totalRevenue?.toLocaleString() || 0}`} icon={<Save className="w-5 h-5 text-purple-400" />} />
            </div>

            {/* Orders Table */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50 text-slate-400 font-mono text-xs uppercase tracking-widest border-b border-slate-800">
                            <th className="p-4">SİPARİŞ ID</th>
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
                                <td className="p-4 font-mono font-bold text-blue-400">#{order.id.slice(0, 8)}</td>
                                <td className="p-4">
                                    <div className="font-bold">{order.customer_name}</div>
                                    <div className="text-xs text-slate-500">{order.customer_email}</div>
                                </td>
                                <td className="p-4 font-bold text-lg">₺{order.total_amount}</td>
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
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
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
                                    <p className="text-sm text-slate-400">{selectedOrder.customer_email || selectedOrder.email}</p>
                                    <p className="text-sm text-slate-400">{selectedOrder.customer_phone}</p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                    <h4 className="text-xs font-black text-slate-500 uppercase mb-2">Teslimat Adresi</h4>
                                    <p className="text-sm leading-relaxed">{selectedOrder.shipping_address}</p>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-800 text-xs font-mono uppercase text-slate-500">
                                        <tr>
                                            <th className="p-3">Ürün (Slug)</th>
                                            <th className="p-3">Özellikler</th>
                                            <th className="p-3 text-center">Adet</th>
                                            <th className="p-3 text-right">Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {selectedOrder.order_items?.map((item: any, idx: number) => (
                                            <tr key={idx} className="border-t border-slate-700/50">
                                                <td className="p-3 font-bold">{item.product_slug}</td>
                                                <td className="p-3 text-xs text-slate-400">
                                                    {item.size && <span>{item.size}</span>}
                                                    {item.orientation && <span> • {item.orientation}</span>}
                                                </td>
                                                <td className="p-3 text-center">{item.quantity}</td>
                                                <td className="p-3 text-right">₺{item.unit_price || item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-slate-800/30">
                                            <td colSpan={3} className="p-3 text-right font-bold uppercase text-xs text-slate-500">Toplam</td>
                                            <td className="p-3 text-right font-black text-lg text-green-400">₺{selectedOrder.total_amount || selectedOrder.total_price}</td>
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
                    onClick={() => showNotification("success", "Marka ayarları kaydedildi!")}
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
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

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Header Logo URL</label>
                        <input
                            type="text"
                            value={content.headerLogo || ""}
                            onChange={(e) => updateContent({ headerLogo: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                            placeholder="/logo.svg"
                        />
                        <p className="text-xs text-slate-500 mt-1">Navigasyon çubuğunda görünecek logo</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Footer Logo URL</label>
                        <input
                            type="text"
                            value={content.footerLogo || ""}
                            onChange={(e) => updateContent({ footerLogo: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-safety-orange)]"
                            placeholder="/logo-white.svg"
                        />
                        <p className="text-xs text-slate-500 mt-1">Footer'da görünecek logo (genellikle beyaz)</p>
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
                                <img src={content.headerLogo} alt="Header Logo" className="max-h-16 object-contain" />
                            ) : (
                                <span className="text-slate-400 text-sm">Header Logo URL girin</span>
                            )}
                        </div>
                        <div className="bg-slate-950 p-6 rounded-xl flex items-center justify-center min-h-[100px]">
                            {content.footerLogo ? (
                                <img src={content.footerLogo} alt="Footer Logo" className="max-h-16 object-contain" />
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

    const handleSave = async () => {
        const success = await saveToSupabase();
        if (success) {
            showNotification("success", "Metal Showcase ayarları Supabase'e kaydedildi!");
        } else {
            showNotification("error", "Kayıt sırasında bir hata oluştu!");
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
                    className="flex items-center gap-2 bg-[var(--color-brand-safety-orange)] hover:bg-[var(--color-brand-safety-orange)]/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
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
                <div className="mt-6 pt-6 border-t border-slate-700">
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
        </div>
    );
};
