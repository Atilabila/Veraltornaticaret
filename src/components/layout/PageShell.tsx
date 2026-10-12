import { cn } from "@/lib/utils";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

type PageShellProps = {
    children: React.ReactNode;
    className?: string;
    /** pt offset for fixed nav */
    padded?: boolean;
    showFooter?: boolean;
    variant?: "light" | "muted";
};

/** Unified public page chrome - dark atelier shell */
export function PageShell({
    children,
    className,
    padded = true,
    showFooter = true,
    variant = "muted",
}: PageShellProps) {
    return (
        <>
            <Navigation />
            <main
                className={cn(
                    "min-h-screen text-atl-text selection:bg-atl-brass selection:text-atl-bg",
                    variant === "light" ? "bg-atl-bg" : "atl-grain bg-atl-bg",
                    padded && "pt-28 lg:pt-32 pb-16 lg:pb-24",
                    className
                )}
            >
                {children}
            </main>
            {showFooter && <Footer />}
        </>
    );
}
