// =====================================================
// SHADCN/UI STYLE - DATA TABLE COMPONENT
// =====================================================
"use client"

import * as React from "react"
import { m } from 'framer-motion'
import { ChevronDown, ChevronUp, Search, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// =====================================================
// TABLE TYPES
// =====================================================
export interface Column<T> {
    key: keyof T | string
    header: string
    width?: string
    sortable?: boolean
    render?: (row: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    loading?: boolean
    emptyMessage?: string
    searchPlaceholder?: string
    searchKey?: keyof T
    onRowClick?: (row: T) => void
    actions?: (row: T) => React.ReactNode
}

// =====================================================
// DATA TABLE COMPONENT
// =====================================================
function DataTable<T extends { id?: string }>({
    columns,
    data,
    loading = false,
    emptyMessage = "Veri bulunamadı",
    searchPlaceholder = "Ara...",
    searchKey,
    onRowClick,
    actions
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [sortConfig, setSortConfig] = React.useState<{
        key: string
        direction: "asc" | "desc"
    } | null>(null)

    // Filter data by search query
    const filteredData = React.useMemo(() => {
        if (!searchQuery || !searchKey) return data

        return data.filter((row) => {
            const value = row[searchKey]
            if (typeof value === "string") {
                return value.toLowerCase().includes(searchQuery.toLowerCase())
            }
            return true
        })
    }, [data, searchQuery, searchKey])

    // Sort data
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return filteredData

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof T]
            const bValue = b[sortConfig.key as keyof T]

            if (aValue === bValue) return 0
            if (aValue === null || aValue === undefined) return 1
            if (bValue === null || bValue === undefined) return -1

            const comparison = aValue < bValue ? -1 : 1
            return sortConfig.direction === "asc" ? comparison : -comparison
        })
    }, [filteredData, sortConfig])

    const handleSort = (key: string) => {
        setSortConfig((current) => {
            if (current?.key === key) {
                if (current.direction === "asc") {
                    return { key, direction: "desc" }
                }
                return null
            }
            return { key, direction: "asc" }
        })
    }

    const getCellValue = (row: T, key: string): React.ReactNode => {
        const keys = key.split(".")
        let value: unknown = row
        for (const k of keys) {
            value = (value as Record<string, unknown>)?.[k]
        }
        return value as React.ReactNode
    }

    return (
        <div className="w-full">
            {/* Search Bar */}
            {searchKey && (
                <div className="mb-4 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                </div>
            )}

            {/* Table Container */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Header */}
                        <thead>
                            <tr className="border-b border-slate-800">
                                {columns.map((column) => (
                                    <th
                                        key={String(column.key)}
                                        className={cn(
                                            "px-6 py-4 text-left text-sm font-bold text-slate-400 uppercase tracking-wider",
                                            column.sortable && "cursor-pointer hover:text-white transition-colors"
                                        )}
                                        style={{ width: column.width }}
                                        onClick={() => column.sortable && handleSort(String(column.key))}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.header}
                                            {column.sortable && sortConfig?.key === column.key && (
                                                sortConfig.direction === "asc"
                                                    ? <ChevronUp className="w-4 h-4" />
                                                    : <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {actions && (
                                    <th className="px-6 py-4 text-right text-sm font-bold text-slate-400 uppercase tracking-wider w-24">
                                        İşlemler
                                    </th>
                                )}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                // Loading skeleton
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        {columns.map((col) => (
                                            <td key={String(col.key)} className="px-6 py-4">
                                                <div className="h-4 bg-slate-700 rounded w-3/4" />
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-6 py-4">
                                                <div className="h-4 bg-slate-700 rounded w-8 ml-auto" />
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : sortedData.length === 0 ? (
                                // Empty state
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions ? 1 : 0)}
                                        className="px-6 py-12 text-center text-slate-500"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                // Data rows
                                sortedData.map((row, rowIndex) => (
                                    <m.tr
                                        key={row.id || rowIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: rowIndex * 0.03 }}
                                        className={cn(
                                            "transition-colors",
                                            onRowClick && "cursor-pointer hover:bg-slate-800/50"
                                        )}
                                        onClick={() => onRowClick?.(row)}
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={String(column.key)}
                                                className="px-6 py-4 text-white"
                                            >
                                                {column.render
                                                    ? column.render(row, rowIndex)
                                                    : getCellValue(row, String(column.key))}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-6 py-4 text-right">
                                                {actions(row)}
                                            </td>
                                        )}
                                    </m.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer / Pagination info */}
            {!loading && sortedData.length > 0 && (
                <div className="mt-4 text-sm text-slate-500">
                    Toplam {sortedData.length} kayıt
                </div>
            )}
        </div>
    )
}

// =====================================================
// BADGE COMPONENT
// =====================================================
interface BadgeProps {
    children: React.ReactNode
    variant?: "default" | "success" | "warning" | "error" | "info"
    className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className }) => {
    const variants = {
        default: "bg-slate-700 text-slate-300",
        success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        error: "bg-red-500/20 text-red-400 border-red-500/30",
        info: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    )
}

export { DataTable, Badge }
