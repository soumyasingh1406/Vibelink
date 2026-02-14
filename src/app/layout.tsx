import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";
import { UserProvider } from "@/context/UserContext";
import { GameProvider } from "@/context/GameContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeLink | Find Your Vibe",
  description: "Interactive reality-show style connection platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white overflow-x-hidden`}
      >
        <UserProvider>
          <GameProvider>
            <Background />

            <main className="relative z-10 pt-24 px-4 pb-20 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </GameProvider>
        </UserProvider>
      </body>
    </html>
  );
}
