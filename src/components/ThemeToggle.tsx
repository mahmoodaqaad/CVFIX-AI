"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Check localStorage first, then system preference
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const initialTheme = savedTheme || systemTheme;

        setTheme(initialTheme);
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mounted]);

    const toggleTheme = () => {
        if (theme === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="p-2 rounded-lg bg-secondary w-9 h-9" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary hover:bg-accent transition-all duration-300 hover:scale-105"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground" />
            ) : (
                <Moon className="w-5 h-5 text-foreground" />
            )}
        </button>
    );
}
