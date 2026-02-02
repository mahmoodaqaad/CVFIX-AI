export function Footer() {
    return (
        <footer className="border-t border-border bg-card mt-auto">
            <div className="container mx-auto px-4 py-6">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CVFix AI. Built for Mahmood aqaad
                </p>
            </div>
        </footer>
    );
}
