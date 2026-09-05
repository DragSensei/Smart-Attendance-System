import type { Metadata } from "next";
import "./globals.css";
import { APP_CONFIG } from "@/shared/data/constants";

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} - ${APP_CONFIG.company}`,
  description: "Enterprise Smart Attendance Management System powered by Wajha Technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-semibold text-lg tracking-tight">
                {APP_CONFIG.name}
              </span>
            </div>
            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors font-medium">
                Home
              </a>
              <a href="/attendance" className="hover:text-foreground transition-colors font-medium">
                Attendance
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground bg-white/50 dark:bg-slate-900/50">
          © {new Date().getFullYear()} {APP_CONFIG.company}. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
