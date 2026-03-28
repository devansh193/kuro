import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth/require-admin-api";
import {
  getPresignedGetUrl,
  tryExtractS3ObjectKeyFromUrl,
} from "@/lib/storage/s3";

export async function GET(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const urlParam = new URL(request.url).searchParams.get("url");
  if (!urlParam) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let canonical: string;
  try {
    canonical = decodeURIComponent(urlParam);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const key = tryExtractS3ObjectKeyFromUrl(canonical);
  if (!key) {
    return NextResponse.json(
      { error: "Not an S3 object URL for this deployment" },
      { status: 400 },
    );
  }

  try {
    const signed = await getPresignedGetUrl(key);
    return NextResponse.json({ url: signed });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Presign failed";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
