import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/layout/sidebar";
import TopNav from "@/components/layout/top-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tennis Court Scheduler",
  description: "Automated tennis court booking and scheduling dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen">
            <Sidebar />
            <div className="w-full flex flex-1 flex-col">
              <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
                <TopNav />
              </header>
              <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
