import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { portfolio } from "@/db/schema";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";
import { DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/defaults";
import { mergePortfolioContent } from "@/lib/portfolio/merge";

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.select().from(portfolio).where(eq(portfolio.id, 1)).limit(1);
    if (rows.length === 0) {
      return NextResponse.json(mergePortfolioContent(DEFAULT_PORTFOLIO_CONTENT));
    }
    return NextResponse.json(mergePortfolioContent(rows[0].content));
  } catch (e) {
    const message = e instanceof Error ? e.message : "Database error";
    if (message.includes("DATABASE_URL")) {
      return NextResponse.json({ error: "Server is not configured with DATABASE_URL" }, { status: 503 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}

async function requireAdminSession(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await verifyAdminSessionToken(token);
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    return NextResponse.json(merged);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save portfolio" }, { status: 500 });
  }
}
