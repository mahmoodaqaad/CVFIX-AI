"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-2 rounded bg-gray-100">
                        <FileText className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">
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
