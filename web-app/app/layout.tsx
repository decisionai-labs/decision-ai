import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroSan | Privacy-First AI for Solana",
  description: "Build intelligent Solana agents that never see your wallet address. Privacy-preserving blockchain AI through sly_data architecture.",
  keywords: ["Solana", "AI", "Privacy", "Blockchain", "Web3", "Agents"],
  openGraph: {
    title: "NeuroSan | Privacy-First AI for Solana",
    description: "Build intelligent Solana agents that never see your wallet address.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
