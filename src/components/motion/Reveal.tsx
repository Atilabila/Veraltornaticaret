import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    once?: boolean;
    as?: "div" | "section" | "li" | "article";
};

/** İçerik varsayılan olarak görünür. Kaydırınca beliren gizleme yok. */
export function Reveal({ children, className, as = "div" }: RevealProps) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
}
