// =====================================================
// SHADCN/UI STYLE - DIALOG COMPONENT
// =====================================================
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

interface DialogContentProps {
    children: React.ReactNode
    className?: string
    title?: string
    description?: string
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false)
        }
        if (open) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = ""
        }
    }, [open, onOpenChange])

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={() => onOpenChange(false)}
                    />
                    {children}
                </>
            )}
        </AnimatePresence>
    )
}

const DialogContent: React.FC<DialogContentProps> = ({
    children,
    className,
    title,
    description
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
                "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
                "w-full max-w-2xl max-h-[90vh] overflow-y-auto",
                "bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl",
                "p-6",
                className
            )}
        >
            {title && (
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    {description && (
                        <p className="text-slate-400 mt-1">{description}</p>
                    )}
                </div>
            )}
            {children}
        </motion.div>
    )
}

const DialogClose: React.FC<{
    onClose: () => void
    className?: string
}> = ({ onClose, className }) => {
    return (
        <button
            onClick={onClose}
            className={cn(
                "absolute right-4 top-4 p-2 rounded-lg",
                "text-slate-400 hover:text-white hover:bg-slate-800",
                "transition-colors",
                className
            )}
        >
            <X className="w-5 h-5" />
        </button>
    )
}

export { Dialog, DialogContent, DialogClose }
