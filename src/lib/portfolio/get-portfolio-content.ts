import "server-only";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { portfolio } from "@/db/schema";
import { DEFAULT_PORTFOLIO_CONTENT } from "./defaults";
import { mergePortfolioContent } from "./merge";
import { signPortfolioS3ImageUrls } from "./sign-portfolio-s3-urls";
import type { PortfolioContent } from "./types";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const db = getDb();
  const rows = await db.select().from(portfolio).where(eq(portfolio.id, 1)).limit(1);
  const merged =
    rows.length === 0
      ? mergePortfolioContent(DEFAULT_PORTFOLIO_CONTENT)
      : mergePortfolioContent(rows[0].content);
  try {
    return await signPortfolioS3ImageUrls(merged);
  } catch {
    return merged;
  }
}
