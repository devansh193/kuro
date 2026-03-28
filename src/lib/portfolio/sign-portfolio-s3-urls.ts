import "server-only";

import {
  getPresignedGetUrl,
  tryExtractS3ObjectKeyFromUrl,
} from "@/lib/storage/s3";
import type { PortfolioContent } from "./types";

async function signImageUrl(url: string): Promise<string> {
  const key = tryExtractS3ObjectKeyFromUrl(url);
  if (!key) {
    return url;
  }
  try {
    return await getPresignedGetUrl(key);
  } catch {
    return url;
  }
}

/** Replaces S3 object URLs with time-limited pre-signed GET URLs for browser use. */
export async function signPortfolioS3ImageUrls(
  content: PortfolioContent,
): Promise<PortfolioContent> {
  const out = structuredClone(content);
  for (const v of out.videos) {
    v.imageSrc = await signImageUrl(v.imageSrc);
  }
  for (const t of out.testimonials) {
    t.imageSrc = await signImageUrl(t.imageSrc);
  }
  return out;
}
