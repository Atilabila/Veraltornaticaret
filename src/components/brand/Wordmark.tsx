type WordmarkProps = {
    className?: string;
    title?: string;
};

/** Düz yazı logosu. Slogan ve yıl yok. */
export function Wordmark({ className = "h-12 w-auto text-atl-text", title = "Veral Torna ve Teneke" }: WordmarkProps) {
    return (
        <svg viewBox="0 0 280 72" className={className} role="img" aria-label={title}>
            <title>{title}</title>
            <text
                x="0"
                y="32"
                fill="currentColor"
                fontSize="32"
                fontWeight="600"
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
            >
                Veral
            </text>
            <text
                x="0"
                y="60"
                fill="currentColor"
                fontSize="18"
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
            >
                Torna & Teneke
            </text>
        </svg>
    );
}
