import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeQuest - Learn JavaScript & React Through Adventure",
  description: "An RPG-style learning game for mastering JavaScript, React, and Next.js. Complete challenges, earn loot, and level up your coding skills!",
  keywords: ["JavaScript", "React", "Next.js", "learning", "game", "RPG", "coding"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
