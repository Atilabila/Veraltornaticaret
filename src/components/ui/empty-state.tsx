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
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-atl-line bg-atl-surface-2 px-4 py-10 text-center sm:py-14">
            <div className="mb-4 rounded-full bg-atl-line p-3 text-atl-muted">
                {icon || <AlertCircle className="h-7 w-7" />}
            </div>
            <h3 className="mb-1.5 text-lg font-bold uppercase tracking-tight text-atl-text sm:text-xl">
                {title}
            </h3>
            {description && (
                <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-atl-muted sm:mb-6">
                    {description}
                </p>
            )}
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex min-h-11 items-center gap-2 bg-atl-brass px-6 text-xs font-bold uppercase tracking-wider text-atl-bg transition-colors hover:bg-atl-brass-light"
                >
                    {actionLabel} <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
}
