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
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-brass">{eyebrow}</span>
            <Tag className="mt-3 font-display text-3xl text-atl-text sm:text-4xl md:text-5xl">{title}</Tag>
            {description && <p className="mt-3 text-base leading-relaxed text-atl-muted sm:text-lg">{description}</p>}
        </div>
    );
}
