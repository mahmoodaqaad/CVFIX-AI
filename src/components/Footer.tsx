import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card mt-auto">
            <div className="container mx-auto px-4 py-6">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CVFix AI. Built for <Link href={"https://my-portfolio-e3891.web.app/"} target="_blank" rel="noopener noreferrer">Mahmood Aqaad</Link>
                </p>
            </div>
        </footer>
    );
}
