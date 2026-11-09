"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 500);
        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div
            className={`fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 z-[55] transition-all duration-300 md:right-6 lg:bottom-[5.5rem] ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            }`}
        >
            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex h-11 w-11 items-center justify-center border border-atl-brass bg-atl-surface text-atl-text shadow-md transition-colors hover:bg-atl-brass hover:text-atl-bg md:h-12 md:w-12"
                aria-label="Yukarı çık"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
        </div>
    );
}
