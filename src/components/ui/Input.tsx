// =====================================================
// SHADCN/UI STYLE - INPUT COMPONENT
// =====================================================
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, hint, ...props }, ref) => {
        const id = React.useId()

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-bold text-slate-400 mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={id}
                    className={cn(
                        "w-full bg-slate-800 border rounded-xl px-4 py-3",
                        "text-white placeholder:text-slate-500",
                        "focus:outline-none focus:ring-2 focus:ring-offset-0",
                        "transition-all duration-200",
                        error
                            ? "border-red-500 focus:ring-red-500/30"
                            : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {hint && !error && (
                    <p className="mt-1.5 text-sm text-slate-500">{hint}</p>
                )}
                {error && (
                    <p className="mt-1.5 text-sm text-red-400">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

// =====================================================
// TEXTAREA COMPONENT
// =====================================================
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        const id = React.useId()

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-bold text-slate-400 mb-2"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={id}
                    className={cn(
                        "w-full bg-slate-800 border rounded-xl px-4 py-3 min-h-[100px]",
                        "text-white placeholder:text-slate-500",
                        "focus:outline-none focus:ring-2 focus:ring-offset-0",
                        "transition-all duration-200 resize-y",
                        error
                            ? "border-red-500 focus:ring-red-500/30"
                            : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-red-400">{error}</p>
                )}
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

// =====================================================
// SELECT COMPONENT
// =====================================================
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
    placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, ...props }, ref) => {
        const id = React.useId()

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-bold text-slate-400 mb-2"
                    >
                        {label}
                    </label>
                )}
                <select
                    id={id}
                    className={cn(
                        "w-full bg-slate-800 border rounded-xl px-4 py-3",
                        "text-white",
                        "focus:outline-none focus:ring-2 focus:ring-offset-0",
                        "transition-all duration-200",
                        error
                            ? "border-red-500 focus:ring-red-500/30"
                            : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1.5 text-sm text-red-400">{error}</p>
                )}
            </div>
        )
    }
)
Select.displayName = "Select"

export { Input, Textarea, Select }
