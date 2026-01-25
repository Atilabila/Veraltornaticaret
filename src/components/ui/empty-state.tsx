
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    icon?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    icon,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <div className="mb-6 p-4 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                {icon || <AlertCircle className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold tracking-tight uppercase mb-2 text-zinc-900 dark:text-zinc-100">
                {title}
            </h3>
            {description && (
                <p className="text-zinc-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                    {description}
                </p>
            )}
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white uppercase bg-zinc-900 dark:bg-[#D4AF37] rounded hover:bg-zinc-800 dark:hover:bg-[#B5952F] transition-colors tracking-wider"
                >
                    {actionLabel} <ArrowRight className="w-4 h-4" />
                </Link>
            )}
        </div>
    );
}
