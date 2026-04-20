import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Phudu } from "next/font/google";
import { AppProviders } from "@/app/providers";
import { PortfolioLoadingFallback } from "@/components/portfolio-loading-fallback";
import { getPortfolioContent } from "@/lib/portfolio/get-portfolio-content";
import { PortfolioErrorBoundary } from "@/lib/portfolio/portfolio-error-boundary";
import { PortfolioConfigProvider } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioContent } from "@/lib/portfolio/types";
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

/** Fresh DB read per request; avoids a static snapshot of portfolio in the shell. */
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialPortfolio: PortfolioContent | undefined;
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
          <PortfolioErrorBoundary>
            <Suspense fallback={<PortfolioLoadingFallback />}>
              <PortfolioConfigProvider
                initialPortfolio={initialPortfolio}
                initialFetchedAt={initialFetchedAt}
              >
                {children}
              </PortfolioConfigProvider>
            </Suspense>
          </PortfolioErrorBoundary>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
