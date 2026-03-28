"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef: React.Ref<HTMLInputElement>;
  folder: "videos" | "testimonials";
  disabled?: boolean;
  className?: string;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageUploadField({
  id,
  name,
  value,
  onChange,
  onBlur,
  inputRef,
  folder,
  disabled,
  className,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const valueWhenPendingRef = useRef<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [presignedSrc, setPresignedSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState<string | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (pendingPreviewUrl) URL.revokeObjectURL(pendingPreviewUrl);
    };
  }, [pendingPreviewUrl]);

  useEffect(() => {
    if (!pendingFile) {
      valueWhenPendingRef.current = null;
      return;
    }
    if (
      valueWhenPendingRef.current !== null &&
      value !== valueWhenPendingRef.current
    ) {
      setPendingFile(null);
      setPendingPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      valueWhenPendingRef.current = null;
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [value, pendingFile]);

  const showCommittedPreview =
    !pendingFile &&
    (value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("/"));

  useEffect(() => {
    if (!value.startsWith("https://") && !value.startsWith("http://")) {
      setPresignedSrc(null);
      return;
    }
    if (value.includes("X-Amz-Algorithm")) {
      setPresignedSrc(null);
      return;
    }
    let cancelled = false;
    void fetch(`/api/media/presign?url=${encodeURIComponent(value)}`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as { url?: string };
        if (!cancelled && typeof data.url === "string") {
          setPresignedSrc(data.url);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [value]);

  const clearPending = () => {
    setPendingFile(null);
    setPendingPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    valueWhenPendingRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadPending = async () => {
    if (!pendingFile) return;
    const file = pendingFile;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        savedUrl?: string;
        previewUrl?: string;
        url?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || res.statusText || "Upload failed");
      }
      const persisted =
        typeof data.savedUrl === "string"
          ? data.savedUrl
          : typeof data.url === "string"
            ? data.url
            : null;
      if (!persisted) {
        throw new Error("Invalid response");
      }
      setPendingFile(null);
      setPendingPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      valueWhenPendingRef.current = null;
      if (fileInputRef.current) fileInputRef.current.value = "";
      onChange(persisted);
      if (
        typeof data.savedUrl === "string" &&
        typeof data.previewUrl === "string"
      ) {
        setPresignedSrc(data.previewUrl);
      }
      toast.success("Image uploaded");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upload failed";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const needsClientPresign =
    (value.startsWith("https://") || value.startsWith("http://")) &&
    !value.includes("X-Amz-Algorithm");
  const previewDisplaySrc = needsClientPresign
    ? presignedSrc
    : (presignedSrc ?? value);

  return (
    <div className={cn("space-y-3", className)}>
      <input
        ref={inputRef}
        type="hidden"
        name={name}
        value={value}
        onChange={() => {}}
        onBlur={onBlur}
        readOnly
      />

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        disabled={disabled || uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          valueWhenPendingRef.current = value;
          setPendingFile(file);
          setPendingPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file);
          });
          e.target.value = "";
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="size-4" />
          Choose image
        </Button>
        <Button
          type="button"
          variant="default"
          size="sm"
          disabled={disabled || uploading || !pendingFile}
          onClick={() => void uploadPending()}
        >
          <Upload className="size-4" />
          {uploading ? "Uploading…" : "Upload to storage"}
        </Button>
        {pendingFile ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled || uploading}
            onClick={clearPending}
            className="text-muted-foreground"
          >
            <X className="size-4" />
            Cancel
          </Button>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Upload sends the image to storage; Save on the page stores the URL in
        your portfolio.
      </p>

      {pendingFile && pendingPreviewUrl ? (
        <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
          <div className="relative aspect-video max-h-48 w-full max-w-md overflow-hidden rounded-md bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element -- blob URLs for local preview */}
            <img
              src={pendingPreviewUrl}
              alt=""
              className="size-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-muted-foreground">
            <span className="truncate font-medium text-foreground/90">
              {pendingFile.name}
            </span>
            <span className="shrink-0 tabular-nums">
              {formatFileSize(pendingFile.size)}
            </span>
          </div>
        </div>
      ) : null}

      {showCommittedPreview && value.trim() !== "" ? (
        previewDisplaySrc === null ? (
          <div className="flex items-center gap-3">
            <div className="size-14 shrink-0 rounded-full border border-border bg-muted" />
            <span className="text-xs text-muted-foreground">
              Loading preview…
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="size-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              <Image
                src={previewDisplaySrc}
                alt=""
                width={56}
                height={56}
                className="size-14 object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              Saved image preview
            </span>
          </div>
        )
      ) : null}
    </div>
  );
}
