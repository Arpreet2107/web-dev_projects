import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PMI Pune-Deccan India Chapter | Advancing Project Management Excellence",
  description: "Join Pune's premier project management community. Connect, learn, and grow with fellow professionals in project management. PMI certifications, events, and networking opportunities.",
  keywords: "PMI, Project Management, Pune, India, Certification, PMP, CAPM, Events, Networking",
  authors: [{ name: "PMI Pune-Deccan Chapter" }],
  openGraph: {
    title: "PMI Pune-Deccan India Chapter",
    description: "Advancing Project Management in Pune & Beyond",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <ErrorBoundary>
            <SessionProvider>
              <QueryProvider>
                {children}
                <Chatbot />
              </QueryProvider>
            </SessionProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

