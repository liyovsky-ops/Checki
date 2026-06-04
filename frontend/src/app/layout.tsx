import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/features/programming-mode/ModeContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checki — analizator kodu",
  description: "Naucz się rozumieć kod z pomocą AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col text-zinc-100 antialiased">
        <ModeProvider>
          <header className="border-b px-6 py-4 flex items-center gap-3 header-styled">
            <span className="text-lg font-semibold tracking-tight">Checki</span>
            <nav className="flex gap-4 ml-6 text-sm text-zinc-400">
              <a href="/" className="hover:text-zinc-100 transition-colors">Start</a>
              <a href="/translator" className="hover:text-zinc-100 transition-colors">Translator</a>
              <a href="/programming-mode" className="hover:text-zinc-100 transition-colors">Tryb programowania</a>
            </nav>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
        </ModeProvider>
      </body>
    </html>
  );
}
