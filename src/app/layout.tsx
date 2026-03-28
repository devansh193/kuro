import type { Metadata } from "next";
import { Geist, Geist_Mono, Phudu } from "next/font/google";
import { AppProviders } from "@/app/providers";
import { DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/defaults";
import { getPortfolioContent } from "@/lib/portfolio/get-portfolio-content";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialPortfolio = DEFAULT_PORTFOLIO_CONTENT;
  let initialFetchedAt = 0;
  try {
    initialPortfolio = await getPortfolioContent();
    initialFetchedAt = Date.now();
  } catch (e) {
    console.error(e);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${phudu.variable} antialiased`}
      >
        <AppProviders>
          <PortfolioConfigProvider
            initialPortfolio={initialPortfolio}
            initialFetchedAt={initialFetchedAt}
          >
            {children}
          </PortfolioConfigProvider>
        </AppProviders>
      </body>
    </html>
  );
}
