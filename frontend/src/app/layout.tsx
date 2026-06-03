import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checki — analizator kodu",
  description: "Naucz się rozumieć kod z pomocą AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 antialiased">
        <header className="border-b border-zinc-800 px-6 py-4 flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">Checki</span>
          <nav className="flex gap-4 ml-6 text-sm text-zinc-400">
            <a href="/" className="hover:text-zinc-100 transition-colors">Start</a>
            <a href="/translator" className="hover:text-zinc-100 transition-colors">Translator</a>
          </nav>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
