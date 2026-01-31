import type { Metadata } from "next";
import { Inter, Dancing_Script, Satisfy } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MusicProvider } from "@/components/music-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-romantic",
});
const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

export const metadata: Metadata = {
  title: "Happy Birthday Avani (Octopuff) 💕",
  description: "A magical romantic birthday celebration for Avani",
  keywords: ["birthday", "romantic", "celebration", "Avani", "Octopuff"],
  authors: [{ name: "Your Secret Admirer" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFB6E1" },
    { media: "(prefers-color-scheme: dark)", color: "#4B0082" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${satisfy.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MusicProvider>
            {children}
            <Toaster />
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

