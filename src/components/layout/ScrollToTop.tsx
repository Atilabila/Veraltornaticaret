"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`fixed right-5 z-[55] transition-all duration-300 md:right-6 ${
                isVisible ? "bottom-[9.75rem] opacity-100 translate-y-0 md:bottom-[5.25rem]" : "bottom-[9.75rem] pointer-events-none translate-y-3 opacity-0 md:bottom-[5.25rem]"
            }`}
        >
            <button
                type="button"
                onClick={scrollToTop}
                className="flex h-12 w-12 items-center justify-center border border-atl-brass bg-atl-surface text-atl-text shadow-md transition-colors hover:bg-atl-brass hover:text-atl-bg"
                aria-label="Yukarı Çık"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
        </div>
    );
}
