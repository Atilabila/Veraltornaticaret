import { cn } from "@/lib/utils";

export function BrassRule({ className }: { className?: string }) {
    return (
        <div aria-hidden className={cn("flex items-center gap-3", className)}>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-atl-brass/50" />
            <span className="h-1.5 w-1.5 rotate-45 border border-atl-brass" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-atl-brass/50" />
        </div>
    );
}
