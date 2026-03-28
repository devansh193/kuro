import type { Metadata } from "next";
import { Geist, Geist_Mono, Phudu } from "next/font/google";
import { AppProviders } from "@/app/providers";
import { PortfolioConfigProvider } from "@/lib/portfolio/portfolio-provider";
import "./globals.css";

const phudu = Phudu({
  variable: "--font-phudu",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuro | A Magician's Journal",
  description: "made by @devansh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${phudu.variable} antialiased`}
      >
        <AppProviders>
          <PortfolioConfigProvider>{children}</PortfolioConfigProvider>
        </AppProviders>
      </body>
    </html>
  );
}
