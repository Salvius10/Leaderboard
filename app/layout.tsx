import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "GANIT GenAI Ideathon Leaderboard 2026",
  description: "Public leaderboard for the GANIT Ideathon 2026 — track team progress, use cases, and scores.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8" style={{ minHeight: "60vh" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
