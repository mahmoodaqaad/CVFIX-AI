"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">
                        CVFix AI
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
