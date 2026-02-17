import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { WalletProvider } from "@/components/WalletProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroSan | Privacy-First AI for Solana",
  description: "Build intelligent Solana agents that never see your wallet address. Privacy-preserving blockchain AI through sly_data architecture.",
  keywords: ["Solana", "AI", "Privacy", "Blockchain", "Web3", "Agents", "NeuroSAN", "Cognizant", "Multi-Agent", "sly_data"],
  authors: [{ name: "NeuroSolanaAgents" }],
  creator: "NeuroSolanaAgents",
  publisher: "NeuroSolanaAgents",
  metadataBase: new URL("https://neurosan.io"),
  openGraph: {
    title: "NeuroSan | Privacy-First AI for Solana",
    description: "Build intelligent Solana agents that never see your wallet address. Privacy-preserving blockchain AI through sly_data architecture.",
    type: "website",
    locale: "en_US",
    siteName: "NeuroSan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeuroSan - Privacy-First AI for Solana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroSan | Privacy-First AI for Solana",
    description: "Build intelligent Solana agents that never see your wallet address.",
    creator: "@decision__ai",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body
        className={`${inter.className} antialiased`}
      >
        <WalletProvider>
          {/* Scroll progress indicator */}
          <ScrollProgress />

          {children}

          {/* Back to top button */}
          <BackToTop />
        </WalletProvider>
      </body>
    </html>
  );
}
