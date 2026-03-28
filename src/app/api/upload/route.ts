import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { requireAdminSession } from "@/lib/auth/require-admin-api";
import {
  getPresignedGetUrl,
  getPublicObjectUrl,
  getS3Bucket,
  getS3Client,
} from "@/lib/storage/s3";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const ALLOWED_FOLDERS = new Set(["videos", "testimonials"]);

function sanitizeFilename(name: string): string {
  const base = name.replace(/^.*[/\\]/, "");
  const cleaned = base.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  return cleaned || "image";
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let s3: ReturnType<typeof getS3Client>;
  let bucket: string;
  try {
    s3 = getS3Client();
    bucket = getS3Bucket();
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Storage is not configured";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  const folderRaw = formData.get("folder");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const folder =
    typeof folderRaw === "string" && ALLOWED_FOLDERS.has(folderRaw)
      ? folderRaw
      : null;
  if (!folder) {
    return NextResponse.json(
      { error: "folder must be videos or testimonials" },
      { status: 400 },
    );
  }

  const type = file.type || "";
  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File must be 5 MB or smaller" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFilename(file.name);
  const objectKey = `${folder}/${uuidv4()}-${safeName}`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: buffer,
        ContentType: type,
      }),
    );
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  let savedUrl: string;
  try {
    savedUrl = getPublicObjectUrl(objectKey);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not build public URL";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  let previewUrl: string;
  try {
    previewUrl = await getPresignedGetUrl(objectKey);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not create pre-signed URL";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return NextResponse.json({
    savedUrl,
    previewUrl,
    url: previewUrl,
  });
}
