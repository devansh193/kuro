import "server-only";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function encodeObjectKeySegments(objectKey: string): string {
  return objectKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function getS3Bucket(): string {
  const bucket = process.env.S3_BUCKET?.trim();
  if (!bucket) {
    throw new Error("S3_BUCKET is not set");
  }
  return bucket;
}

export function getS3Client(): S3Client {
  const region = process.env.AWS_REGION?.trim();
  if (!region) {
    throw new Error(
      "AWS_REGION is required for S3 (set it in the environment)",
    );
  }

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const endpoint = process.env.S3_ENDPOINT?.trim();

  const credentials =
    accessKeyId && secretAccessKey
      ? { accessKeyId, secretAccessKey }
      : undefined;

  return new S3Client({
    region,
    endpoint: endpoint || undefined,
    credentials,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  });
}

/**
 * Public URL for an object. Uses S3_PUBLIC_BASE_URL when set (e.g. CloudFront),
 * otherwise virtual-hosted–style: https://{bucket}.s3.{region}.amazonaws.com/{key}
 */
export function getPublicObjectUrl(objectKey: string): string {
  const publicBase = process.env.S3_PUBLIC_BASE_URL?.trim();
  if (publicBase) {
    const base = publicBase.replace(/\/+$/, "");
    return `${base}/${encodeObjectKeySegments(objectKey)}`;
  }

  const bucket = process.env.S3_BUCKET?.trim();
  const region = process.env.AWS_REGION?.trim();
  if (!bucket || !region) {
    throw new Error(
      "Set S3_PUBLIC_BASE_URL or both S3_BUCKET and AWS_REGION to build public object URLs",
    );
  }

  const origin = `https://${bucket}.s3.${region}.amazonaws.com`;
  return `${origin}/${encodeObjectKeySegments(objectKey)}`;
}

const MAX_PRESIGN_EXPIRES_SECONDS = 604800; // 7 days (SigV4 limit for IAM user keys)

/**
 * Pre-signed GET URL for a private object. Use for browser display when the bucket
 * is not public-read.
 */
export async function getPresignedGetUrl(objectKey: string): Promise<string> {
  const client = getS3Client();
  const bucket = getS3Bucket();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: objectKey,
  });
  const raw = process.env.S3_PRESIGN_EXPIRES_SECONDS?.trim();
  const parsed = raw ? Number(raw) : NaN;
  const expiresIn = Number.isFinite(parsed)
    ? Math.min(Math.max(1, Math.floor(parsed)), MAX_PRESIGN_EXPIRES_SECONDS)
    : MAX_PRESIGN_EXPIRES_SECONDS;
  return getSignedUrl(client, command, { expiresIn });
}

function pathKeyFromPathname(pathname: string): string {
  return pathname
    .replace(/^\/+/, "")
    .split("/")
    .map((s) => decodeURIComponent(s))
    .join("/");
}

/**
 * Returns the S3 object key for URLs produced by this app or matching the
 * configured bucket / public base. Ignores query string (presigned params).
 */
export function tryExtractS3ObjectKeyFromUrl(urlString: string): string | null {
  if (!urlString || urlString.startsWith("/")) {
    return null;
  }
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return null;
  }

  const pathname = url.pathname;

  const publicBase = process.env.S3_PUBLIC_BASE_URL?.trim();
  if (publicBase) {
    try {
      const base = new URL(publicBase.replace(/\/+$/, ""));
      if (url.origin === base.origin) {
        const basePath = base.pathname.replace(/\/+$/, "");
        if (basePath === "" || basePath === "/") {
          return pathKeyFromPathname(pathname);
        }
        if (pathname.startsWith(basePath)) {
          const rest = pathname.slice(basePath.length).replace(/^\/+/, "");
          return pathKeyFromPathname(`/${rest}`);
        }
      }
    } catch {
      // ignore invalid S3_PUBLIC_BASE_URL
    }
  }

  const bucket = process.env.S3_BUCKET?.trim();
  const region = process.env.AWS_REGION?.trim();

  if (bucket && region) {
    const virtualHosted = `${bucket}.s3.${region}.amazonaws.com`;
    if (url.hostname === virtualHosted) {
      return pathKeyFromPathname(pathname);
    }

    const pathStyleHost = `s3.${region}.amazonaws.com`;
    if (url.hostname === pathStyleHost) {
      const parts = pathname.replace(/^\/+/, "").split("/");
      if (parts[0] === bucket && parts.length > 1) {
        return parts
          .slice(1)
          .map((s) => decodeURIComponent(s))
          .join("/");
      }
    }
  }

  const endpoint = process.env.S3_ENDPOINT?.trim();
  const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";
  if (endpoint && forcePathStyle && bucket) {
    try {
      const ep = new URL(endpoint);
      if (url.origin === ep.origin) {
        const parts = pathname.replace(/^\/+/, "").split("/");
        if (parts[0] === bucket && parts.length > 1) {
          return parts
            .slice(1)
            .map((s) => decodeURIComponent(s))
            .join("/");
        }
      }
    } catch {
      // ignore
    }
  }

  return null;
}
