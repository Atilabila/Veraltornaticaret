
"use client"

import * as React from "react"
import { m } from 'framer-motion'
import {
    Plus, Trash2, Save, X, GripVertical,
    Link as LinkIcon, Upload, Sparkles
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "@/components/ui/ColorPicker"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { cn, slugify } from "@/lib/utils"
// import { Select } from "@/components/ui/select" // Imported below as RadixSelect to avoid conflict if needed, or just standard usage.
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import type {
    MetalProduct,
    Category,
    ProductFormData,
    FeatureFormData,
    VariantFormData
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
        is_showcase: false,
        stock_quantity: 0,
        features: [],
        variants: []
    })

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
                is_showcase: product.is_showcase || false,
                stock_quantity: product.stock_quantity,
                features: product.features?.map(f => ({
                    id: f.id,
                    feature_text: f.feature_text,
                    feature_icon: f.feature_icon || "",
                    display_order: f.display_order
                })) || [],
                variants: product.variants?.map(v => ({
                    id: v.id,
                    size_label: v.size_label,
                    price_modifier: Number(v.price_modifier || 0),
                    stock_quantity: Number(v.stock_quantity || 0),
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
                is_showcase: false,
                stock_quantity: 0,
                features: [],
                variants: []
            })
        }
        setErrors({})
    }, [product, open])

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            // Only auto-update slug if creating a new product
            // This prevents accidental URL changes for existing products
            slug: !isEditing ? slugify(name) : prev.slug
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

    // Add new variant row
    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [
                ...(prev.variants || []),
                { size_label: "", price_modifier: 0, stock_quantity: 0 },
            ]
        }))
    }

    // Update variant
    const updateVariant = (index: number, updates: Partial<VariantFormData>) => {
        setFormData(prev => ({
            ...prev,
            variants: (prev.variants || []).map((v, i) =>
                i === index ? { ...v, ...updates } : v
            )
        }))
    }

    // Remove variant
    const removeVariant = (index: number) => {
        setFormData(prev => ({
            ...prev,
            variants: (prev.variants || []).filter((_, i) => i !== index)
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
        if (!formData.category_id) {
            newErrors.category_id = "Lütfen bir kategori seçin"
        }

        // Variant sanity checks (duplicates, negatives)
        const normalizedVariants = (formData.variants || [])
            .map((v) => ({
                ...v,
                size_label: String(v.size_label || "").trim(),
                price_modifier: Number(v.price_modifier || 0),
                stock_quantity: Number(v.stock_quantity || 0),
            }))
            .filter((v) => v.size_label.length > 0);

        const seen = new Set<string>();
        for (const v of normalizedVariants) {
            const key = v.size_label.toLowerCase();
            if (seen.has(key)) {
                newErrors.variants = "Aynı boyut etiketi birden fazla girilemez"
                break
            }
            seen.add(key)
            if (v.price_modifier < 0) {
                newErrors.variants = "Varyant ek fiyatı negatif olamaz"
                break
            }
            if (v.stock_quantity < 0) {
                newErrors.variants = "Varyant stok adedi negatif olamaz"
                break
            }
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogTitle>{isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</DialogTitle>
                <DialogDescription>
                    {isEditing ? `"${product?.name}" ürününü düzenliyorsunuz` : "Yeni bir ürün oluşturun"}
                </DialogDescription>

                {/* <DialogClose onClose={() => onOpenChange(false)} />  <-- DialogClose is usually inside Content or handled via OpenChange */}

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">1</span>
                            Temel Bilgiler
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Ürün Adı *</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="Galvanizli Çelik Tel"
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>URL Slug</Label>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => updateField("slug", e.target.value)}
                                    placeholder="galvanizli-celik-tel"
                                />
                                <span className="text-xs text-muted-foreground">Otomatik oluşturulur</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Açıklama</Label>
                            <Textarea
                                value={formData.description || ""}
                                onChange={(e) => updateField("description", e.target.value)}
                                placeholder="Ürün hakkında detaylı bilgi..."
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Fiyat (₺)</Label>
                                <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => updateField("price", parseFloat(e.target.value) || 0)}
                                    className={errors.price ? "border-red-500" : ""}
                                />
                                {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Stok Adedi</Label>
                                <Input
                                    type="number"
                                    value={formData.stock_quantity}
                                    onChange={(e) => updateField("stock_quantity", parseInt(e.target.value) || 0)}
                                    className={errors.stock_quantity ? "border-red-500" : ""}
                                />
                                {errors.stock_quantity && <span className="text-xs text-red-500">{errors.stock_quantity}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <Select
                                    value={formData.category_id || ""}
                                    onValueChange={(val) => updateField("category_id", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kategori Seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && <span className="text-xs text-red-500">{errors.category_id}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Image & Color Section */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">2</span>
                            Görsel & Renk
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Image Input */}
                            <div className="space-y-3">
                                <ImageUploader
                                    label="Ürün Görseli"
                                    currentImage={formData.image_url}
                                    onImageUploaded={(url) => updateField("image_url", url)}
                                    folder="products"
                                />
                            </div>

                            {/* Color Picker */}
                            <div className="relative">
                                {/* Using existing ColorPicker but ensuring it works with correct imports if it uses Input internally */}
                                <ColorPicker
                                    label="Arka Plan Rengi"
                                    value={formData.background_color}
                                    onChange={(color) => updateField("background_color", color)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Variants Section */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">3</span>
                                Varyantlar (Boyut / Ek Fiyat / Stok)
                            </h3>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-2 px-4 py-2 border-2 border-near-black bg-paper-white text-near-black rounded-none text-xs font-black uppercase tracking-wider transition-transform active:translate-x-1 active:translate-y-1 shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            >
                                <Plus className="w-4 h-4" />
                                Varyant Ekle
                            </button>
                        </div>

                        {errors.variants && <span className="text-xs text-red-500">{errors.variants}</span>}

                        {(formData.variants || []).length === 0 ? (
                            <div className="text-center py-8 text-near-black/60 border-2 border-near-black bg-paper-white rounded-none">
                                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Henüz varyant eklenmedi</p>
                                <p className="text-sm">Örn: "30x45 cm", +0 TL, 100 stok</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {(formData.variants || []).map((variant, index) => (
                                    <m.div
                                        key={variant.id || index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="grid grid-cols-12 gap-3 bg-paper-white border-2 border-near-black rounded-none p-4 shadow-brutal-sm"
                                    >
                                        <div className="col-span-12 md:col-span-5 space-y-2">
                                            <Label className="text-[10px] text-near-black/70 font-mono font-black uppercase tracking-wider">Boyut Etiketi</Label>
                                            <Input
                                                value={variant.size_label}
                                                onChange={(e) => updateVariant(index, { size_label: e.target.value })}
                                                placeholder="30x45 cm"
                                                className="bg-paper-white border-2 border-near-black rounded-none"
                                            />
                                        </div>

                                        <div className="col-span-6 md:col-span-3 space-y-2">
                                            <Label className="text-[10px] text-near-black/70 font-mono font-black uppercase tracking-wider">Ek Fiyat (₺)</Label>
                                            <Input
                                                type="number"
                                                value={Number(variant.price_modifier || 0)}
                                                onChange={(e) => updateVariant(index, { price_modifier: parseFloat(e.target.value) || 0 })}
                                                className="bg-paper-white border-2 border-near-black rounded-none"
                                            />
                                        </div>

                                        <div className="col-span-6 md:col-span-3 space-y-2">
                                            <Label className="text-[10px] text-near-black/70 font-mono font-black uppercase tracking-wider">Stok</Label>
                                            <Input
                                                type="number"
                                                value={Number(variant.stock_quantity || 0)}
                                                onChange={(e) => updateVariant(index, { stock_quantity: parseInt(e.target.value) || 0 })}
                                                className="bg-paper-white border-2 border-near-black rounded-none"
                                            />
                                        </div>

                                        <div className="col-span-12 md:col-span-1 flex items-end justify-end">
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="h-11 w-11 flex items-center justify-center border-2 border-near-black bg-paper-white text-red-600 hover:bg-near-black hover:text-paper-white rounded-none transition-colors"
                                                aria-label="Varyantı sil"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="col-span-12 font-mono text-[10px] font-black uppercase tracking-wider text-near-black/60">
                                            BASE {Number(formData.price || 0).toLocaleString("tr-TR")} ₺ + MOD {Number(variant.price_modifier || 0).toLocaleString("tr-TR")} ₺
                                        </div>
                                    </m.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">4</span>
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
                                    <m.div
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
                                    </m.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status & Submit */}
                    <div className="flex items-center gap-8 pt-6 border-t border-slate-800">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) => updateField("is_active", e.target.checked)}
                                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="font-bold">Aktif (Sitede Görünür)</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_showcase}
                                onChange={(e) => updateField("is_showcase", e.target.checked)}
                                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="font-bold">Showcase (Özel Vitrin)</span>
                        </label>

                        <div className="flex-1" />

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
