import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { WalletProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "Decision AI | Privacy-First AI for Solana",
  description: "Build intelligent Solana agents that never see your wallet address. Privacy-preserving blockchain AI through sly_data architecture.",
  keywords: ["Solana", "AI", "Privacy", "Blockchain", "Web3", "Agents", "Decision AI", "Multi-Agent", "sly_data"],
  authors: [{ name: "Decision AI" }],
  creator: "Decision AI",
  publisher: "Decision AI",
  metadataBase: new URL("https://decision.ai"),
  openGraph: {
    title: "Decision AI | Privacy-First AI for Solana",
    description: "Build intelligent Solana agents that never see your wallet address. Privacy-preserving blockchain AI through sly_data architecture.",
    type: "website",
    locale: "en_US",
    siteName: "Decision AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Decision AI - Privacy-First AI for Solana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decision AI | Privacy-First AI for Solana",
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
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased text-white bg-black">
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
