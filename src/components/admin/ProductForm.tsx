// =====================================================
// METAL PRODUCTS - PRODUCT FORM COMPONENT
// Full CRUD Form for Adding/Editing Products
// =====================================================
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
    Plus, Trash2, Save, X, GripVertical,
    Image as ImageIcon, Upload, Link as LinkIcon,
    Sparkles
} from "lucide-react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/Dialog"
import { Input, Textarea, Select } from "@/components/ui/Input"
import { ColorPicker } from "@/components/ui/ColorPicker"
import { cn, slugify } from "@/lib/utils"
import type {
    MetalProduct,
    Category,
    ProductFormData,
    FeatureFormData
} from "@/lib/supabase/metal-products.types"

// =====================================================
// TYPES
// =====================================================
interface ProductFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product?: MetalProduct | null
    categories: Category[]
    onSubmit: (data: ProductFormData) => Promise<void>
    loading?: boolean
}

// Feature icons available
const FEATURE_ICONS = [
    { value: "Shield", label: "Kalkan (Koruma)" },
    { value: "Award", label: "Ödül" },
    { value: "Sun", label: "Güneş" },
    { value: "Zap", label: "Şimşek" },
    { value: "Palette", label: "Palet (Tasarım)" },
    { value: "Sparkles", label: "Parıltı" },
    { value: "Magnet", label: "Mıknatıs" },
    { value: "Minimize2", label: "Kompakt" },
    { value: "Check", label: "Onay" },
    { value: "Star", label: "Yıldız" },
    { value: "Heart", label: "Kalp" },
    { value: "Clock", label: "Saat" },
]

// =====================================================
// PRODUCT FORM COMPONENT
// =====================================================
export const ProductForm: React.FC<ProductFormProps> = ({
    open,
    onOpenChange,
    product,
    categories,
    onSubmit,
    loading = false
}) => {
    const isEditing = !!product

    // Form state
    const [formData, setFormData] = React.useState<ProductFormData>({
        name: "",
        slug: "",
        description: "",
        price: 0,
        image_url: "",
        background_color: "#ffffff",
        category_id: "",
        is_active: true,
        stock_quantity: 0,
        features: []
    })

    const [imageInputType, setImageInputType] = React.useState<"url" | "upload">("url")
    const [errors, setErrors] = React.useState<Record<string, string>>({})

    // Initialize form with product data when editing
    React.useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                slug: product.slug,
                description: product.description || "",
                price: product.price,
                image_url: product.image_url || "",
                background_color: product.background_color,
                category_id: product.category_id || "",
                is_active: product.is_active,
                stock_quantity: product.stock_quantity,
                features: product.features?.map(f => ({
                    id: f.id,
                    feature_text: f.feature_text,
                    feature_icon: f.feature_icon || "",
                    display_order: f.display_order
                })) || []
            })
        } else {
            // Reset form for new product
            setFormData({
                name: "",
                slug: "",
                description: "",
                price: 0,
                image_url: "",
                background_color: "#ffffff",
                category_id: "",
                is_active: true,
                stock_quantity: 0,
                features: []
            })
        }
        setErrors({})
    }, [product, open])

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: prev.slug || slugify(name)
        }))
    }

    // Update form field
    const updateField = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
        setFormData(prev => ({ ...prev, [key]: value }))
        if (errors[key]) {
            setErrors(prev => {
                const next = { ...prev }
                delete next[key]
                return next
            })
        }
    }

    // Add new feature
    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [
                ...prev.features,
                {
                    feature_text: "",
                    feature_icon: "",
                    display_order: prev.features.length + 1
                }
            ]
        }))
    }

    // Update feature
    const updateFeature = (index: number, updates: Partial<FeatureFormData>) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((f, i) =>
                i === index ? { ...f, ...updates } : f
            )
        }))
    }

    // Remove feature
    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features
                .filter((_, i) => i !== index)
                .map((f, i) => ({ ...f, display_order: i + 1 }))
        }))
    }

    // Validate form
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Ürün adı zorunludur"
        }
        if (formData.price < 0) {
            newErrors.price = "Fiyat negatif olamaz"
        }
        if (formData.stock_quantity < 0) {
            newErrors.stock_quantity = "Stok negatif olamaz"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        // Ensure slug is set
        const dataToSubmit = {
            ...formData,
            slug: formData.slug || slugify(formData.name)
        }

        await onSubmit(dataToSubmit)
    }

    // Category options for select
    const categoryOptions = categories.map(c => ({
        value: c.id,
        label: c.name
    }))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                title={isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
                description={isEditing ? `"${product?.name}" ürününü düzenliyorsunuz` : "Yeni bir ürün oluşturun"}
                className="max-w-3xl"
            >
                <DialogClose onClose={() => onOpenChange(false)} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">1</span>
                            Temel Bilgiler
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Ürün Adı *"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder="Galvanizli Çelik Tel"
                                error={errors.name}
                            />

                            <Input
                                label="URL Slug"
                                value={formData.slug}
                                onChange={(e) => updateField("slug", e.target.value)}
                                placeholder="galvanizli-celik-tel"
                                hint="Otomatik oluşturulur"
                            />
                        </div>

                        <Textarea
                            label="Açıklama"
                            value={formData.description || ""}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Ürün hakkında detaylı bilgi..."
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                label="Fiyat (₺)"
                                type="number"
                                value={formData.price}
                                onChange={(e) => updateField("price", parseFloat(e.target.value) || 0)}
                                error={errors.price}
                            />

                            <Input
                                label="Stok Adedi"
                                type="number"
                                value={formData.stock_quantity}
                                onChange={(e) => updateField("stock_quantity", parseInt(e.target.value) || 0)}
                                error={errors.stock_quantity}
                            />

                            <Select
                                label="Kategori"
                                value={formData.category_id || ""}
                                onChange={(e) => updateField("category_id", e.target.value)}
                                options={categoryOptions}
                                placeholder="Kategori Seçin"
                            />
                        </div>
                    </div>

                    {/* Image & Color Section */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">2</span>
                            Görsel & Renk
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Image Input */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-slate-400">Ürün Görseli</label>

                                {/* Toggle between URL and Upload */}
                                <div className="flex gap-2 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setImageInputType("url")}
                                        className={cn(
                                            "flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2",
                                            imageInputType === "url"
                                                ? "bg-orange-500 text-white"
                                                : "bg-slate-800 text-slate-400 hover:text-white"
                                        )}
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageInputType("upload")}
                                        className={cn(
                                            "flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2",
                                            imageInputType === "upload"
                                                ? "bg-orange-500 text-white"
                                                : "bg-slate-800 text-slate-400 hover:text-white"
                                        )}
                                    >
                                        <Upload className="w-4 h-4" />
                                        Yükle
                                    </button>
                                </div>

                                {imageInputType === "url" ? (
                                    <Input
                                        value={formData.image_url || ""}
                                        onChange={(e) => updateField("image_url", e.target.value)}
                                        placeholder="/products/urun.webp veya https://..."
                                    />
                                ) : (
                                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                                        <p className="text-sm text-slate-400">Görsel Yükle</p>
                                        <p className="text-xs text-slate-600 mt-1">WebP, PNG, SVG (Max 5MB)</p>
                                    </div>
                                )}

                                {/* Image Preview */}
                                {formData.image_url && (
                                    <div
                                        className="mt-3 rounded-xl overflow-hidden border border-slate-700 aspect-square flex items-center justify-center"
                                        style={{ backgroundColor: formData.background_color }}
                                    >
                                        <img
                                            src={formData.image_url}
                                            alt="Önizleme"
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Color Picker */}
                            <div className="relative">
                                <ColorPicker
                                    label="Arka Plan Rengi"
                                    value={formData.background_color}
                                    onChange={(color) => updateField("background_color", color)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">3</span>
                                Ürün Özellikleri
                            </h3>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Özellik Ekle
                            </button>
                        </div>

                        {formData.features.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 border border-dashed border-slate-700 rounded-xl">
                                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Henüz özellik eklenmedi</p>
                                <p className="text-sm">Yukarıdaki butona tıklayarak özellik ekleyebilirsiniz</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {formData.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3 bg-slate-800 rounded-xl p-3"
                                    >
                                        <GripVertical className="w-5 h-5 text-slate-600 cursor-grab" />

                                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>

                                        <input
                                            type="text"
                                            value={feature.feature_text}
                                            onChange={(e) => updateFeature(index, { feature_text: e.target.value })}
                                            placeholder="Özellik metni..."
                                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                                        />

                                        <select
                                            value={feature.feature_icon || ""}
                                            onChange={(e) => updateFeature(index, { feature_icon: e.target.value })}
                                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 w-40"
                                        >
                                            <option value="">İkon Seç</option>
                                            {FEATURE_ICONS.map(icon => (
                                                <option key={icon.value} value={icon.value}>
                                                    {icon.label}
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status & Submit */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) => updateField("is_active", e.target.checked)}
                                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-white font-bold">Aktif (Sitede Görünür)</span>
                        </label>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={cn(
                                    "px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition-colors flex items-center gap-2",
                                    loading && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <Save className="w-4 h-4" />
                                {loading ? "Kaydediliyor..." : (isEditing ? "Güncelle" : "Oluştur")}
                            </button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProductForm
