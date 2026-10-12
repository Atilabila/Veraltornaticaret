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
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">{eyebrow}</span>
            <Tag className="mt-3 font-display text-4xl leading-[1.05] text-atl-text md:text-5xl">{title}</Tag>
            {description && <p className="mt-4 text-base leading-relaxed text-atl-muted md:text-lg">{description}</p>}
        </div>
    );
}
