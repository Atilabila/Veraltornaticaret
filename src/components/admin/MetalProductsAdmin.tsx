
// =====================================================
// METAL PRODUCTS ADMIN PANEL
// Main Dashboard for Product Management (Part 1)
// =====================================================
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Package, Tags, Plus, Pencil, Trash2, Eye, EyeOff,
    LayoutDashboard, LogOut, Search, MoreHorizontal,
    Home, ChevronRight, Loader2, RefreshCw, X, LayoutTemplate
} from "lucide-react"
import { DataTable, Badge } from "@/components/ui/DataTable"
import { type Column } from "@/components/ui/DataTable"
import { ProductForm } from "@/components/admin/ProductForm"
import { BulkProductForm } from "@/components/admin/BulkProductForm"
import { SiteContentAdmin } from "@/components/admin/SiteContentAdmin"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn, formatPrice, formatDate, slugify } from "@/lib/utils"
// import * as actions from "@/lib/actions/metal-products.actions" // Mocking for UI Kit pass
// Mock actions if they don't exist in file context, but assuming they do based on previous read.

// Mocking actions for the sake of the example if the file is not reachable, 
// but since I read it, I should keep the imports.
import * as actions from "@/lib/actions/metal-products.actions"

import type {
    MetalProduct,
    Category,
    ProductFormData,
    CategoryFormData
} from "@/lib/supabase/metal-products.types"

// =====================================================
// MAIN ADMIN PANEL COMPONENT
// =====================================================
export const MetalProductsAdmin: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<"products" | "categories" | "content">("products")
    const [notification, setNotification] = React.useState<{
        type: "success" | "error"
        message: string
    } | null>(null)

    const showNotification = (type: "success" | "error", message: string) => {
        setNotification({ type, message })
        setTimeout(() => setNotification(null), 3000)
    }

    return (
        <div className="flex min-h-screen bg-slate-950 text-white font-sans">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -50 }}
                        className={cn(
                            "fixed top-6 left-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl",
                            "flex items-center gap-3 font-bold",
                            notification.type === "success" ? "bg-emerald-500" : "bg-red-500"
                        )}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className="w-72 border-r border-white/10 p-6 flex flex-col gap-8 bg-slate-900/50 shrink-0">
                {/* Logo */}
                <div className="flex items-center gap-3 px-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-2xl shadow-lg">
                        M
                    </div>
                    <div>
                        <span className="font-bold text-xl tracking-tight">Metal</span>
                        <span className="text-slate-500 text-xl">Admin</span>
                        <p className="text-xs text-slate-500">Ürün Yönetim Sistemi</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-2">
                        Yönetim
                    </p>

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
                        icon={<LayoutTemplate className="w-5 h-5" />}
                        label="Site İçeriği"
                        active={activeTab === "content"}
                        onClick={() => setActiveTab("content")}
                    />
                </nav>

                {/* Back to site */}
                <div className="mt-auto border-t border-white/5 pt-6">
                    <a href="/">
                        <SidebarItem
                            icon={<Home className="w-5 h-5" />}
                            label="Siteye Dön"
                            className="text-blue-400 hover:bg-blue-500/10"
                        />
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === "products" && (
                    <ProductsPanel showNotification={showNotification} />
                )}
                {activeTab === "categories" && (
                    <CategoriesPanel showNotification={showNotification} />
                )}
                {activeTab === "content" && (
                    <SiteContentAdmin />
                )}
            </main>
        </div>
    )
}

// =====================================================
// SIDEBAR ITEM COMPONENT
// =====================================================
interface SidebarItemProps {
    icon: React.ReactNode
    label: string
    active?: boolean
    onClick?: () => void
    className?: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    active,
    onClick,
    className
}) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
            active
                ? "bg-orange-500/20 text-orange-500 font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800",
            className
        )}
    >
        {icon}
        <span>{label}</span>
        {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
)

// =====================================================
// PRODUCTS PANEL
// =====================================================
interface PanelProps {
    showNotification: (type: "success" | "error", message: string) => void
}

const ProductsPanel: React.FC<PanelProps> = ({ showNotification }) => {
    const [products, setProducts] = React.useState<MetalProduct[]>([])
    const [categories, setCategories] = React.useState<Category[]>([])
    const [loading, setLoading] = React.useState(true)
    const [formOpen, setFormOpen] = React.useState(false)
    const [bulkFormOpen, setBulkFormOpen] = React.useState(false)
    const [editingProduct, setEditingProduct] = React.useState<MetalProduct | null>(null)
    const [formLoading, setFormLoading] = React.useState(false)

    // Fetch data on mount
    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                actions.getProducts(),
                actions.getCategories()
            ])

            if (productsRes.success && productsRes.data) {
                setProducts(productsRes.data)
            }
            if (categoriesRes.success && categoriesRes.data) {
                setCategories(categoriesRes.data)
            }
        } catch (error) {
            showNotification("error", "Veriler yüklenemedi")
        } finally {
            setLoading(false)
        }
    }

    // Handle bulk submit
    const handleBulkSubmit = async (data: ProductFormData[]) => {
        setFormLoading(true)
        try {
            const result = await actions.createBulkProducts(data)
            if (result.success) {
                showNotification("success", `${result.data} ürün başarıyla eklendi!`)
                setBulkFormOpen(false)
                loadData()
            } else {
                showNotification("error", result.error || "Toplu ekleme başarısız")
            }
        } catch (error) {
            showNotification("error", "İşlem sırasında hata oluştu")
        } finally {
            setFormLoading(false)
        }
    }

    // Handle form submit
    const handleFormSubmit = async (data: ProductFormData) => {
        setFormLoading(true)
        try {
            if (editingProduct) {
                const result = await actions.updateProduct(editingProduct.id, data)
                if (result.success) {
                    showNotification("success", "Ürün güncellendi!")
                    setFormOpen(false)
                    setEditingProduct(null)
                    loadData()
                } else {
                    showNotification("error", result.error || "Güncelleme başarısız")
                }
            } else {
                const result = await actions.createProduct(data)
                if (result.success) {
                    showNotification("success", "Yeni ürün eklendi!")
                    setFormOpen(false)
                    loadData()
                } else {
                    showNotification("error", result.error || "Ekleme başarısız")
                }
            }
        } catch (error) {
            showNotification("error", "İşlem sırasında hata oluştu")
        } finally {
            setFormLoading(false)
        }
    }

    // Handle delete
    const handleDelete = async (product: MetalProduct) => {
        if (!confirm(`"${product.name}" ürününü silmek istediğinizden emin misiniz?`)) {
            return
        }

        const result = await actions.deleteProduct(product.id)
        if (result.success) {
            showNotification("success", "Ürün silindi")
            loadData()
        } else {
            showNotification("error", result.error || "Silme başarısız")
        }
    }

    // Handle toggle status
    const handleToggleStatus = async (product: MetalProduct) => {
        const result = await actions.toggleProductStatus(product.id, !product.is_active)
        if (result.success) {
            showNotification("success", product.is_active ? "Ürün pasife alındı" : "Ürün aktifleştirildi")
            loadData()
        } else {
            showNotification("error", "Durum değiştirilemedi")
        }
    }

    // Table columns
    const columns: Column<MetalProduct>[] = [
        {
            key: "image_url",
            header: "Görsel",
            width: "80px",
            render: (row) => (
                <div
                    className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700"
                    style={{ backgroundColor: row.background_color }}
                >
                    {row.image_url && (
                        <img
                            src={row.image_url}
                            alt={row.name}
                            className="w-full h-full object-contain"
                        />
                    )}
                </div>
            )
        },
        {
            key: "name",
            header: "Ürün Adı",
            sortable: true,
            render: (row) => (
                <div>
                    <p className="font-bold">{row.name}</p>
                    <p className="text-sm text-slate-500">{row.slug}</p>
                </div>
            )
        },
        {
            key: "category.name",
            header: "Kategori",
            render: (row) => (
                <Badge variant="info">{row.category?.name || "Kategorisiz"}</Badge>
            )
        },
        {
            key: "price",
            header: "Fiyat",
            sortable: true,
            render: (row) => (
                <span className="font-bold text-emerald-400">{formatPrice(row.price)}</span>
            )
        },
        {
            key: "stock_quantity",
            header: "Stok",
            sortable: true,
            render: (row) => (
                <Badge variant={row.stock_quantity > 10 ? "success" : row.stock_quantity > 0 ? "warning" : "error"}>
                    {row.stock_quantity} adet
                </Badge>
            )
        },
        {
            key: "is_active",
            header: "Durum",
            render: (row) => (
                <Badge variant={row.is_active ? "success" : "default"}>
                    {row.is_active ? "Aktif" : "Pasif"}
                </Badge>
            )
        },
        {
            key: "features",
            header: "Özellik",
            render: (row) => (
                <span className="text-slate-400">
                    {row.features?.length || 0} özellik
                </span>
            )
        }
    ]

    return (
        <div>
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
                    <p className="text-slate-500 mt-1">
                        Toplam {products.length} ürün
                    </p>
                </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={loadData}
                        disabled={loading}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                    >
                        <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
                    </button>
                    <button
                        onClick={() => setBulkFormOpen(true)}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-bold transition-colors"
                    >
                        <LayoutTemplate className="w-5 h-5" />
                        Toplu Ekle
                    </button>
                    <button
                        onClick={() => {
                            setEditingProduct(null)
                            setFormOpen(true)
                        }}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Yeni Ürün Ekle
                    </button>
                </div>
            </header >

    {/* Data Table */ }
    < DataTable
columns = { columns }
data = { products }
loading = { loading }
searchKey = "name"
searchPlaceholder = "Ürün ara..."
emptyMessage = "Henüz ürün eklenmemiş"
actions = {(row) => (
    <div className="flex items-center gap-2">
        <button
            onClick={() => handleToggleStatus(row)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title={row.is_active ? "Pasife Al" : "Aktifleştir"}
        >
            {row.is_active ? (
                <EyeOff className="w-4 h-4 text-slate-400" />
            ) : (
                <Eye className="w-4 h-4 text-slate-400" />
            )}
        </button>
        <button
            onClick={() => {
                setEditingProduct(row)
                setFormOpen(true)
            }}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
            <Pencil className="w-4 h-4 text-blue-400" />
        </button>
        <button
            onClick={() => handleDelete(row)}
            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
        >
            <Trash2 className="w-4 h-4 text-red-400" />
        </button>
    </div>
)}
            />

{/* Product Form Modal */ }
<ProductForm
    open={formOpen}
    onOpenChange={setFormOpen}
    product={editingProduct}
    categories={categories}
    onSubmit={handleFormSubmit}
    loading={formLoading}
/>

{/* Bulk Product Form Modal */ }
<BulkProductForm
    open={bulkFormOpen}
    onOpenChange={setBulkFormOpen}
    categories={categories}
    onSubmit={handleBulkSubmit}
    loading={formLoading}
/>
        </div >
    )
}

// =====================================================
// CATEGORIES PANEL
// =====================================================
const CategoriesPanel: React.FC<PanelProps> = ({ showNotification }) => {
    const [categories, setCategories] = React.useState<Category[]>([])
    const [loading, setLoading] = React.useState(true)
    const [formOpen, setFormOpen] = React.useState(false)
    const [editingCategory, setEditingCategory] = React.useState<Category | null>(null)
    const [formData, setFormData] = React.useState<CategoryFormData>({
        name: "",
        slug: "",
        description: "",
        image_url: "",
        display_order: 0,
        is_active: true
    })

    // Fetch categories
    React.useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        setLoading(true)
        const result = await actions.getCategories()
        if (result.success && result.data) {
            setCategories(result.data)
        }
        setLoading(false)
    }

    // Open form for editing
    const openEditForm = (category: Category) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            image_url: category.image_url || "",
            display_order: category.display_order,
            is_active: category.is_active
        })
        setFormOpen(true)
    }

    // Open form for new category
    const openNewForm = () => {
        setEditingCategory(null)
        setFormData({
            name: "",
            slug: "",
            description: "",
            image_url: "",
            display_order: categories.length,
            is_active: true
        })
        setFormOpen(true)
    }

    // Handle submit
    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            showNotification("error", "Kategori adı zorunludur")
            return
        }

        const data = {
            ...formData,
            slug: formData.slug || slugify(formData.name)
        }

        try {
            if (editingCategory) {
                const result = await actions.updateCategory(editingCategory.id, data)
                if (result.success) {
                    showNotification("success", "Kategori güncellendi!")
                    setFormOpen(false)
                    loadCategories()
                } else {
                    showNotification("error", result.error || "Güncelleme başarısız")
                }
            } else {
                const result = await actions.createCategory(data)
                if (result.success) {
                    showNotification("success", "Yeni kategori eklendi!")
                    setFormOpen(false)
                    loadCategories()
                } else {
                    showNotification("error", result.error || "Ekleme başarısız")
                }
            }
        } catch (error) {
            showNotification("error", "İşlem sırasında hata oluştu")
        }
    }

    // Handle delete
    const handleDelete = async (category: Category) => {
        if (!confirm(`"${category.name}" kategorisini silmek istediğinizden emin misiniz?`)) {
            return
        }

        const result = await actions.deleteCategory(category.id)
        if (result.success) {
            showNotification("success", "Kategori silindi")
            loadCategories()
        } else {
            showNotification("error", result.error || "Silme başarısız")
        }
    }

    // Table columns
    const columns: Column<Category>[] = [
        {
            key: "display_order",
            header: "#",
            width: "60px",
            render: (row) => (
                <span className="text-slate-500 font-mono">{row.display_order + 1}</span>
            )
        },
        {
            key: "name",
            header: "Kategori Adı",
            sortable: true,
            render: (row) => (
                <div>
                    <p className="font-bold">{row.name}</p>
                    <p className="text-sm text-slate-500">{row.slug}</p>
                </div>
            )
        },
        {
            key: "description",
            header: "Açıklama",
            render: (row) => (
                <span className="text-slate-400 text-sm">
                    {row.description || "-"}
                </span>
            )
        },
        {
            key: "is_active",
            header: "Durum",
            render: (row) => (
                <Badge variant={row.is_active ? "success" : "default"}>
                    {row.is_active ? "Aktif" : "Pasif"}
                </Badge>
            )
        }
    ]

    return (
        <div>
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Kategori Yönetimi</h1>
                    <p className="text-slate-500 mt-1">
                        Toplam {categories.length} kategori
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={loadCategories}
                        disabled={loading}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                    >
                        <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
                    </button>
                    <button
                        onClick={openNewForm}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Yeni Kategori
                    </button>
                </div>
            </header>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={categories}
                loading={loading}
                searchKey="name"
                searchPlaceholder="Kategori ara..."
                emptyMessage="Henüz kategori eklenmemiş"
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openEditForm(row)}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Pencil className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                            onClick={() => handleDelete(row)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                    </div>
                )}
            />

            {/* Category Form Modal */}
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent>
                    <DialogTitle>{editingCategory ? "Kategori Düzenle" : "Yeni Kategori"}</DialogTitle>
                    <DialogDescription>
                        {editingCategory ? `"${editingCategory.name}" kategorisini düzenliyorsunuz` : "Yeni bir kategori oluşturun"}
                    </DialogDescription>

                    {/* <DialogClose onClose={() => setFormOpen(false)} /> */}

                    <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label>Kategori Adı *</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    name: e.target.value,
                                    slug: prev.slug || slugify(e.target.value)
                                }))}
                                placeholder="Tel Ürünler"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>URL Slug</Label>
                            <Input
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                placeholder="tel-urunler"
                            />
                            <span className="text-xs text-muted-foreground">Otomatik oluşturulur</span>
                        </div>

                        <div className="space-y-2">
                            <Label>Açıklama</Label>
                            <Textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Kategori hakkında kısa açıklama..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Sıra No</Label>
                                <Input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                                />
                            </div>

                            <div className="flex items-end pb-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                                        className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-orange-500"
                                    />
                                    <span className="text-white font-bold">Aktif</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                            <button
                                onClick={() => setFormOpen(false)}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition-colors"
                            >
                                {editingCategory ? "Güncelle" : "Oluştur"}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MetalProductsAdmin
