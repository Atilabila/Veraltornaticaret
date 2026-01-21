"use client";

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme based on system preference or localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.removeAttribute('data-theme');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex items-center justify-center p-2 border-2 border-current transition-all duration-200 
                hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-y-[1px] active:shadow-none"
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                <Sun
                    className={`absolute inset-0 w-full h-full transition-all duration-300 transform 
                        ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}
                    `}
                />
                <Moon
                    className={`absolute inset-0 w-full h-full transition-all duration-300 transform 
                        ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}
                    `}
                />
            </div>

            {/* Hover Tooltip - Brutalist Style */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-near-black text-paper-white text-[10px] font-mono font-bold uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block pointer-events-none">
                {theme === 'light' ? 'LIGHT MODE' : 'DARK MODE'}
            </span>
        </button>
    );
}
