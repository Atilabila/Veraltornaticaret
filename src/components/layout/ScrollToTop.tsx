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
            className={`fixed bottom-[180px] md:bottom-12 right-6 z-[9999] transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
        >
            <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center justify-center w-12 h-12 bg-atl-surface border-2 border-atl-brass text-atl-text shadow-[4px_4px_0_0_#c9a35c] hover:shadow-[1px_1px_0_0_#c9a35c] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
                aria-label="Yukarı Çık"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}
