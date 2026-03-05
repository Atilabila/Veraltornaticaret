"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface VariantState {
    orientation: 'vertical' | 'horizontal'
    size: '30x45' | '45x60' | '50x70' | '70x100'
}

interface ProductVariantsProps {
    onChange: (state: VariantState) => void
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({ onChange }) => {
    const [orientation, setOrientation] = React.useState<'vertical' | 'horizontal'>('vertical')
    const [size, setSize] = React.useState<'30x45' | '45x60' | '50x70' | '70x100'>('45x60')

    React.useEffect(() => {
        onChange({ orientation, size })
    }, [orientation, size, onChange])

    return (
        <div className="space-y-6">
            {/* Orientation */}
            <div className="space-y-3">
                <span className="text-sm font-black text-zinc-800 uppercase tracking-[0.2em] font-mono">Yön</span>
                <div className="flex gap-4">
                    <button
                        onClick={() => setOrientation('vertical')}
                        className={cn(
                            "flex-1 p-4 border-2 rounded-none flex flex-col items-center gap-2 transition-all shadow-[4px_4px_0_0_#18181b]",
                            orientation === 'vertical'
                                ? "border-zinc-900 bg-industrial-gold shadow-[1px_1px_0_0_#18181b] translate-x-[3px] translate-y-[3px]"
                                : "border-zinc-900 bg-white hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                        )}
                    >
                        <div className="w-6 h-8 border-2 border-zinc-900 rounded-none bg-zinc-50" />
                        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-zinc-900">Dikey</span>
                    </button>
                    <button
                        onClick={() => setOrientation('horizontal')}
                        className={cn(
                            "flex-1 p-4 border-2 rounded-none flex flex-col items-center gap-2 transition-all shadow-[4px_4px_0_0_#18181b]",
                            orientation === 'horizontal'
                                ? "border-zinc-900 bg-industrial-gold shadow-[1px_1px_0_0_#18181b] translate-x-[3px] translate-y-[3px]"
                                : "border-zinc-900 bg-white hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                        )}
                    >
                        <div className="w-8 h-6 border-2 border-zinc-900 rounded-none bg-zinc-50" />
                        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-zinc-900">Yatay</span>
                    </button>
                </div>
            </div>

            {/* Size */}
            <div className="space-y-3">
                <span className="text-sm font-black text-zinc-800 uppercase tracking-[0.2em] font-mono">Boyut (cm)</span>
                <div className="grid grid-cols-2 gap-4">
                    {['30x45', '45x60', '50x70', '70x100'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s as VariantState['size'])}
                            className={cn(
                                "flex items-center justify-center h-12 border-2 rounded-none font-black text-sm uppercase tracking-widest font-mono transition-all shadow-[4px_4px_0_0_#18181b]",
                                size === s
                                    ? "border-zinc-900 bg-industrial-gold text-zinc-900 shadow-[1px_1px_0_0_#18181b] translate-x-[3px] translate-y-[3px]"
                                    : "border-zinc-900 bg-white text-zinc-700 hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[3px] hover:translate-y-[3px]"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
