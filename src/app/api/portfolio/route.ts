import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { portfolio } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/require-admin-api";
import { getPortfolioContent } from "@/lib/portfolio/get-portfolio-content";
import { mergePortfolioContent } from "@/lib/portfolio/merge";
import { signPortfolioS3ImageUrls } from "@/lib/portfolio/sign-portfolio-s3-urls";

export async function GET() {
  try {
    const data = await getPortfolioContent();
    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Database error";
    if (message.includes("DATABASE_URL")) {
      return NextResponse.json({ error: "Server is not configured with DATABASE_URL" }, { status: 503 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const merged = mergePortfolioContent(body);

  try {
    const db = getDb();
    await db
      .insert(portfolio)
      .values({
        id: 1,
        content: merged,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: portfolio.id,
        set: {
          content: merged,
          updatedAt: new Date(),
        },
      });
    let responseBody = merged;
    try {
      responseBody = await signPortfolioS3ImageUrls(merged);
    } catch {
      // keep unsigned JSON if signing fails
    }
    return NextResponse.json(responseBody);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save portfolio" }, { status: 500 });
  }
}
