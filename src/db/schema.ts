import { integer, jsonb, pgTable, timestamp } from "drizzle-orm/pg-core";
import type { PortfolioContent } from "@/lib/portfolio/types";

export const portfolio = pgTable("portfolio", {
  id: integer("id").primaryKey().default(1),
  content: jsonb("content").$type<PortfolioContent>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
