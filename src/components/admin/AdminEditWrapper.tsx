"use client"

import React, { useState, useEffect } from "react"
import { m, AnimatePresence } from 'framer-motion'
import { Pencil } from "lucide-react"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import { User } from "@supabase/supabase-js"
import Link from "next/link"

interface AdminEditWrapperProps {
    children: React.ReactNode
    tab: string // Which admin tab to link to
    section?: string // Which section within that tab
    label?: string
    className?: string
}

export const AdminEditWrapper: React.FC<AdminEditWrapperProps> = ({
    children,
    tab,
    section,
    label = "Düzenle",
    className = ""
}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createBrowserSupabaseClient()
            const { data: { user } } = await supabase.auth.getUser()
            setIsAdmin(!!user)
        }
        checkUser()
    }, [])

    if (!isAdmin) return <>{children}</>

    const adminUrl = `/admin?tab=${tab}${section ? `&section=${section}` : ""}`

    return (
        <div
            className={`relative group/admin-wrapper ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

            <AnimatePresence>
                {isHovered && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-4 right-4 z-[9999] pointer-events-auto"
                    >
                        <Link
                            href={adminUrl}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white/20 backdrop-blur-md"
                        >
                            <Pencil className="w-4 h-4" />
                            <span className="text-sm">{label}</span>
                        </Link>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Visual indicator of the editable area when hovered */}
            <div className={`absolute inset-0 border-2 border-orange-500/0 group-hover/admin-wrapper:border-orange-500/30 pointer-events-none transition-colors rounded-3xl`} />
        </div>
    )
}
