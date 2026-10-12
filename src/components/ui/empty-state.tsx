
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
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-atl-line rounded-lg bg-atl-surface-2">
            <div className="mb-6 p-4 rounded-full bg-atl-line text-atl-muted">
                {icon || <AlertCircle className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold tracking-tight uppercase mb-2 text-atl-text">
                {title}
            </h3>
            {description && (
                <p className="text-atl-muted mb-8 max-w-md mx-auto text-sm leading-relaxed">
                    {description}
                </p>
            )}
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-atl-bg uppercase bg-atl-brass rounded hover:bg-atl-brass-light transition-colors tracking-wider"
                >
                    {actionLabel} <ArrowRight className="w-4 h-4" />
                </Link>
            )}
        </div>
    );
}
