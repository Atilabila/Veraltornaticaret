import { cn } from "@/lib/utils";

type PageContainerProps = {
    children: React.ReactNode;
    className?: string;
    as?: "div" | "section" | "article";
};

/** Standard content width — all public pages align to 1400px */
export function PageContainer({
    children,
    className,
    as: Tag = "div",
}: PageContainerProps) {
    return (
        <Tag
            className={cn(
                "mx-auto w-full max-w-[1400px] px-6 lg:px-12",
                className
            )}
        >
            {children}
        </Tag>
    );
}
