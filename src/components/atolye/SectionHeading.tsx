import { cn } from "@/lib/utils";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    as?: "h1" | "h2";
    className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", className }: SectionHeadingProps) {
    return (
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-atl-brass sm:text-[11px] sm:tracking-[0.28em]">{eyebrow}</span>
            <Tag className="mt-2 font-display text-[1.85rem] leading-[1.08] text-atl-text sm:mt-3 sm:text-4xl md:text-5xl">{title}</Tag>
            {description && <p className="mt-2.5 text-sm leading-relaxed text-atl-muted sm:mt-4 sm:text-base md:text-lg">{description}</p>}
        </div>
    );
}
