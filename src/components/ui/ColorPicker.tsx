// =====================================================
// SHADCN/UI STYLE - COLOR PICKER COMPONENT
// =====================================================
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
    value: string
    onChange: (color: string) => void
    label?: string
    presetColors?: string[]
}

const DEFAULT_COLORS = [
    // Neutrals
    "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1",
    "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b",
    "#0f172a", "#020617",
    // Brand Colors
    "#ff6b35", "#ffc107", "#4caf50", "#2196f3", "#9c27b0",
    // Product Backgrounds
    "#f0f4f8", "#1a1a2e", "#16213e", "#0f3460", "#e94560",
    "#533483", "#2c3333", "#395b64", "#a5c9ca", "#e7f6f2"
]

const TAILWIND_COLORS = [
    { value: "bg-white", hex: "#ffffff", label: "White" },
    { value: "bg-slate-100", hex: "#f1f5f9", label: "Slate 100" },
    { value: "bg-slate-900", hex: "#0f172a", label: "Slate 900" },
    { value: "bg-zinc-900", hex: "#18181b", label: "Zinc 900" },
    { value: "bg-orange-500", hex: "#f97316", label: "Orange 500" },
    { value: "bg-amber-400", hex: "#fbbf24", label: "Amber 400" },
    { value: "bg-emerald-500", hex: "#10b981", label: "Emerald 500" },
    { value: "bg-blue-500", hex: "#3b82f6", label: "Blue 500" },
    { value: "bg-violet-500", hex: "#8b5cf6", label: "Violet 500" },
    { value: "bg-pink-500", hex: "#ec4899", label: "Pink 500" },
]

const ColorPicker: React.FC<ColorPickerProps> = ({
    value,
    onChange,
    label,
    presetColors = DEFAULT_COLORS
}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [customColor, setCustomColor] = React.useState(value)
    const [activeTab, setActiveTab] = React.useState<"hex" | "tailwind">("hex")
    const pickerRef = React.useRef<HTMLDivElement>(null)

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleColorSelect = (color: string) => {
        onChange(color)
        setCustomColor(color)
    }

    const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value
        setCustomColor(newColor)
        if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
            onChange(newColor)
        }
    }

    const getDisplayColor = (val: string) => {
        // Check if it's a Tailwind class
        const tailwindMatch = TAILWIND_COLORS.find(c => c.value === val)
        if (tailwindMatch) return tailwindMatch.hex
        return val
    }

    return (
        <div className="w-full" ref={pickerRef}>
            {label && (
                <label className="block text-sm font-bold text-slate-400 mb-2">
                    {label}
                </label>
            )}

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center gap-3 px-4 py-3",
                    "bg-slate-800 border border-slate-700 rounded-xl",
                    "hover:border-slate-600 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                )}
            >
                <div
                    className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-inner"
                    style={{ backgroundColor: getDisplayColor(value) }}
                />
                <span className="flex-1 text-left text-white font-mono text-sm">
                    {value}
                </span>
                <Palette className="w-5 h-5 text-slate-400" />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-80"
                    >
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => setActiveTab("hex")}
                                className={cn(
                                    "flex-1 py-2 rounded-lg font-bold text-sm transition-colors",
                                    activeTab === "hex"
                                        ? "bg-orange-500 text-white"
                                        : "bg-slate-700 text-slate-400 hover:text-white"
                                )}
                            >
                                HEX Renkler
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("tailwind")}
                                className={cn(
                                    "flex-1 py-2 rounded-lg font-bold text-sm transition-colors",
                                    activeTab === "tailwind"
                                        ? "bg-orange-500 text-white"
                                        : "bg-slate-700 text-slate-400 hover:text-white"
                                )}
                            >
                                Tailwind Classes
                            </button>
                        </div>

                        {/* HEX Colors Grid */}
                        {activeTab === "hex" && (
                            <>
                                <div className="grid grid-cols-6 gap-2 mb-4">
                                    {presetColors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => handleColorSelect(color)}
                                            className={cn(
                                                "w-10 h-10 rounded-lg border-2 transition-all",
                                                "hover:scale-110 hover:shadow-lg",
                                                value === color
                                                    ? "border-orange-500 ring-2 ring-orange-500/50"
                                                    : "border-white/10"
                                            )}
                                            style={{ backgroundColor: color }}
                                        >
                                            {value === color && (
                                                <Check className="w-4 h-4 mx-auto text-white drop-shadow-lg" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Color Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={customColor.startsWith("#") ? customColor : "#ffffff"}
                                        onChange={(e) => handleColorSelect(e.target.value)}
                                        className="w-12 h-10 rounded-lg cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={customColor}
                                        onChange={handleCustomColorChange}
                                        placeholder="#000000"
                                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </>
                        )}

                        {/* Tailwind Colors */}
                        {activeTab === "tailwind" && (
                            <div className="space-y-2">
                                {TAILWIND_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => handleColorSelect(color.value)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                            value === color.value
                                                ? "bg-orange-500/20 border border-orange-500"
                                                : "bg-slate-700 hover:bg-slate-600 border border-transparent"
                                        )}
                                    >
                                        <div
                                            className="w-8 h-8 rounded border border-white/20"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="flex-1 text-left">
                                            <p className="text-white font-mono text-sm">{color.value}</p>
                                            <p className="text-slate-400 text-xs">{color.label}</p>
                                        </div>
                                        {value === color.value && (
                                            <Check className="w-4 h-4 text-orange-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { ColorPicker }
