"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2, Save, Upload, FileSpreadsheet, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn, slugify } from "@/lib/utils"
import { uploadProductImage } from "@/lib/actions/metal-products.actions"
import type { Category, ProductFormData } from "@/lib/supabase/metal-products.types"

interface BulkProductFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: Category[]
    onSubmit: (data: ProductFormData[]) => Promise<void>
    loading?: boolean
}

type BulkRow = {
    id: string
    name: string
    price: number | string
    stock: number | string
    slug: string
    file?: File
    previewUrl?: string
}

export const BulkProductForm: React.FC<BulkProductFormProps> = ({
    open,
    onOpenChange,
    categories,
    onSubmit,
    loading = false
}) => {
    // State
    const [rows, setRows] = React.useState<BulkRow[]>([
        { id: "1", name: "", price: "", stock: "", slug: "" }
    ])
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("")
    const [pasteMode, setPasteMode] = React.useState(false)
    const [pasteContent, setPasteContent] = React.useState("")
    const [isUploading, setIsUploading] = React.useState(false) // Local loading state for uploads

    // Handle File Selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)

            const newRows: BulkRow[] = newFiles.map(file => {
                // Generate name from filename (remove extension and hyphens)
                // "urun-ismi.webp" -> "Urun Ismi"
                const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")

                // Humanize: replace - and _ with space, Capitalize first letter of words
                const humanName = nameWithoutExt
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, l => l.toUpperCase())

                return {
                    id: Math.random().toString(36).substr(2, 9),
                    name: humanName, // User can edit this, slug auto-updates
                    price: 0,
                    stock: 0,
                    slug: slugify(nameWithoutExt), // Slug uses the filename base
                    file: file,
                    previewUrl: URL.createObjectURL(file)
                }
            })

            setRows(prev => {
                // If the first row is empty, replace it
                if (prev.length === 1 && !prev[0].name) {
                    return newRows
                }
                return [...prev, ...newRows]
            })
        }
    }

    // Add empty row
    const addRow = () => {
        setRows(prev => [
            ...prev,
            { id: Math.random().toString(36).substr(2, 9), name: "", price: "", stock: "", slug: "" }
        ])
    }

    // Remove row
    const removeRow = (id: string) => {
        if (rows.length === 1) {
            // Don't remove last row, just clear it
            setRows([{ id: "1", name: "", price: "", stock: "", slug: "" }])
            return
        }
        setRows(prev => prev.filter(r => r.id !== id))
    }

    // Update row
    const updateRow = (id: string, field: keyof BulkRow, value: any) => {
        setRows(prev => prev.map(row => {
            if (row.id !== id) return row

            const updates: Partial<BulkRow> = { [field]: value }

            // Auto update slug
            if (field === "name") {
                updates.slug = slugify(value as string)
            }

            return { ...row, ...updates }
        }))
    }

    // Handle Paste from Excel/Sheets
    const processPaste = () => {
        if (!pasteContent.trim()) return

        const lines = pasteContent.trim().split(/\r\n|\n/)
        const newRows: BulkRow[] = lines.map(line => {
            // Try to split by tab (Excel/Google Sheets default)
            const parts = line.split("\t")

            // Expected format: Name | Price | Stock
            // If only Name is present, that's fine too
            const name = parts[0]?.trim() || ""
            const price = parts[1] ? parseFloat(parts[1].replace(/[^0-9.-]+/g, "")) : ""
            const stock = parts[2] ? parseInt(parts[2].replace(/[^0-9]+/g, "")) : ""

            return {
                id: Math.random().toString(36).substr(2, 9),
                name,
                price: price || 0,
                stock: stock || 0,
                slug: slugify(name)
            }
        }).filter(r => r.name) // Filter out empty lines

        setRows(prev => {
            // If the first row is empty, replace it
            if (prev.length === 1 && !prev[0].name) {
                return newRows
            }
            return [...prev, ...newRows]
        })

        setPasteMode(false)
        setPasteContent("")
    }

    // Submit
    const handleSubmit = async () => {
        if (!selectedCategoryId) {
            alert("Lütfen toplu eklenecek ürünler için bir kategori seçin.")
            return
        }

        const validRows = rows.filter(r => r.name.trim().length > 0)

        if (validRows.length === 0) {
            alert("Lütfen en az bir ürün girin.")
            return
        }

        setIsUploading(true)

        // 1. Upload images first (if any)
        const productsWithImages = await Promise.all(validRows.map(async (row) => {
            let imageUrl = ""

            if (row.file) {
                // Upload image
                const res = await uploadProductImage(row.file, row.slug)
                if (res.success && res.data) {
                    imageUrl = res.data
                } else {
                    console.error(`Failed to upload image for ${row.name}`)
                }
            }

            return {
                name: row.name,
                slug: row.slug,
                description: "",
                price: Number(row.price) || 0,
                stock_quantity: Number(row.stock) || 0,
                category_id: selectedCategoryId,
                is_active: true,
                image_url: imageUrl,
                background_color: "#ffffff",
                features: []
            }
        }))

        setIsUploading(false)
        await onSubmit(productsWithImages)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogTitle>Toplu Ürün Ekle</DialogTitle>
                <DialogDescription>
                    Birden fazla ürünü hızlıca ekleyin. Excel'den kopyala-yapıştır yapabilirsiniz.
                </DialogDescription>

                <div className="flex flex-col gap-4 mt-4 flex-1 overflow-hidden">
                    {/* Controls */}
                    <div className="flex items-end gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                        <div className="flex-1 space-y-2">
                            <Label>Hedef Kategori *</Label>
                            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Kategori Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2">
                            <label className="flex items-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl font-bold transition-colors border border-blue-500/20 cursor-pointer">
                                <Upload className="w-5 h-5" />
                                Görsel Seç
                                <input
                                    type="file"
                                    multiple
                                    accept="image/webp,image/png,image/jpeg"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </label>

                            <button
                                onClick={() => setPasteMode(!pasteMode)}
                                className="flex items-center gap-2 px-4 py-3 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded-xl font-bold transition-colors border border-emerald-500/20"
                            >
                                <FileSpreadsheet className="w-5 h-5" />
                                {pasteMode ? "Tabloya Dön" : "Excel'den Yapıştır"}
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto min-h-[400px] border border-slate-800 rounded-xl bg-slate-900/30 relative">
                        {pasteMode ? (
                            <div className="absolute inset-0 p-4">
                                <textarea
                                    autoFocus
                                    className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-sm"
                                    placeholder={`Excel'den kopyalayıp buraya yapıştırın.\nFormat: İsim | Fiyat | Stok\nÖrnek:\nMetal Tablo A\t500\t10\nMetal Tablo B\t750\t5`}
                                    value={pasteContent}
                                    onChange={(e) => setPasteContent(e.target.value)}
                                />
                                <div className="absolute bottom-6 right-6">
                                    <button
                                        onClick={processPaste}
                                        className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 shadow-lg"
                                    >
                                        Verileri İşle
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900 sticky top-0 z-10">
                                    <tr>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider pl-4 w-12 text-center">Img</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Ürün Adı</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">Slug (Otomatik)</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Fiyat</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Stok</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {rows.map((row, index) => (
                                        <tr key={row.id} className="group hover:bg-slate-800/50 transition-colors">
                                            <td className="p-3 pl-4 text-slate-500 font-mono text-xs text-center relative">
                                                {row.previewUrl ? (
                                                    <div className="w-10 h-10 rounded overflow-hidden border border-slate-700 bg-black">
                                                        <img src={row.previewUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <span className="opacity-50">{index + 1}</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={row.name}
                                                    onChange={(e) => updateRow(row.id, "name", e.target.value)}
                                                    className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1"
                                                    placeholder="Ürün Adı"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={row.slug}
                                                    disabled
                                                    className="w-full bg-transparent text-slate-500 text-sm py-1"
                                                    placeholder="urun-adi"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={row.price}
                                                    onChange={(e) => updateRow(row.id, "price", e.target.value)}
                                                    className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1"
                                                    placeholder="0"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={row.stock}
                                                    onChange={(e) => updateRow(row.id, "stock", e.target.value)}
                                                    className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1"
                                                    placeholder="0"
                                                />
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => removeRow(row.id)}
                                                    className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} className="p-2">
                                            <button
                                                onClick={addRow}
                                                className="w-full py-3 border border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Satır Ekle
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>Toplam <strong className="text-white">{rows.filter(r => r.name).length}</strong> ürün eklenecek</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => onOpenChange(false)}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || isUploading}
                                className={cn(
                                    "px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition-colors flex items-center gap-2",
                                    (loading || isUploading) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <Save className="w-4 h-4" />
                                {isUploading ? "Görseller Yükleniyor..." : loading ? "Kaydediliyor..." : "Tümünü Kaydet"}
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
