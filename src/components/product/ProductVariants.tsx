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
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Yön</span>
                <div className="flex gap-3">
                    <button
                        onClick={() => setOrientation('vertical')}
                        className={cn(
                            "flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-all",
                            orientation === 'vertical'
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-primary/50"
                        )}
                    >
                        <div className="w-6 h-8 border-2 border-current rounded-sm" />
                        <span className="text-xs font-bold">Dikey</span>
                    </button>
                    <button
                        onClick={() => setOrientation('horizontal')}
                        className={cn(
                            "flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-all",
                            orientation === 'horizontal'
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-primary/50"
                        )}
                    >
                        <div className="w-8 h-6 border-2 border-current rounded-sm" />
                        <span className="text-xs font-bold">Yatay</span>
                    </button>
                </div>
            </div>

            {/* Size */}
            <div className="space-y-3">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Boyut (cm)</span>
                <div className="grid grid-cols-2 gap-3">
                    {['30x45', '45x60', '50x70', '70x100'].map((s) => (
                        <Button
                            key={s}
                            variant="outline"
                            onClick={() => setSize(s as VariantState['size'])}
                            className={cn(
                                "h-12 border-2",
                                size === s ? "border-primary bg-primary/5 text-primary" : "border-border"
                            )}
                        >
                            {s}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
