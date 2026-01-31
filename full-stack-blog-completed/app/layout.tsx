import type { Metadata } from "next";
import { Inter, Dancing_Script, Kalam, Comfortaa } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MusicProvider } from "@/components/music/MusicProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-romantic",
});
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-handwritten",
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-soft",
});

export const metadata: Metadata = {
  title: "Happy Birthday Avani ❤️",
  description: "A magical birthday celebration for Octopuff",
  keywords: ["birthday", "romantic", "celebration"],
  authors: [{ name: "Your Secret Admirer" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${kalam.variable} ${comfortaa.variable} font-sans antialiased`}
      >
        <Providers>
          <MusicProvider>{children}</MusicProvider>
        </Providers>
      </body>
    </html>
  );
}

