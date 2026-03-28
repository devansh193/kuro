"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioVideo } from "@/lib/portfolio/types";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

function nextVideoId(videos: PortfolioVideo[]): number {
  if (videos.length === 0) return 1;
  return Math.max(...videos.map((v) => v.id)) + 1;
}

export default function AdminVideosPage() {
  const { content, setContent } = usePortfolioContent();
  const { videos } = content;

  const update = (index: number, patch: Partial<PortfolioVideo>) => {
    setContent((c) => {
      const next = [...c.videos];
      next[index] = { ...next[index], ...patch };
      return { ...c, videos: next };
    });
  };

  const add = () => {
    setContent((c) => ({
      ...c,
      videos: [
        ...c.videos,
        {
          id: nextVideoId(c.videos),
          videoId: "",
          client: "",
          kuro: "",
          clientName: "",
          imageSrc: "/placeholder.jpg",
          youtubeStats: "",
        },
      ],
    }));
  };

  const remove = (index: number) => {
    setContent((c) => ({
      ...c,
      videos: c.videos.filter((_, i) => i !== index),
    }));
  };

  const move = (index: number, dir: -1 | 1) => {
    setContent((c) => {
      const next = [...c.videos];
      const j = index + dir;
      if (j < 0 || j >= next.length) return c;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...c, videos: next };
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">YouTube videos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Long-form project cards. Use the YouTube video ID (from the URL).
        </p>
      </div>

      <ul className="space-y-8">
        {videos.map((video, index) => (
          <li
            key={video.id}
            className="rounded-lg border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Video #{index + 1} · id {video.id}
              </span>
              <div className="flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => move(index, 1)}
                  disabled={index === videos.length - 1}
                  aria-label="Move down"
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 text-destructive"
                  onClick={() => remove(index)}
                  aria-label="Remove"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`vid-${video.id}`}>YouTube video ID</Label>
                <Input
                  id={`vid-${video.id}`}
                  value={video.videoId}
                  onChange={(e) => update(index, { videoId: e.target.value })}
                  placeholder="e.g. dQw4w9WgXcQ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cn-${video.id}`}>Client name</Label>
                <Input
                  id={`cn-${video.id}`}
                  value={video.clientName}
                  onChange={(e) =>
                    update(index, { clientName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`ys-${video.id}`}>YouTube stats</Label>
                <Input
                  id={`ys-${video.id}`}
                  value={video.youtubeStats}
                  onChange={(e) =>
                    update(index, { youtubeStats: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`img-${video.id}`}>Image path</Label>
                <Input
                  id={`img-${video.id}`}
                  value={video.imageSrc}
                  onChange={(e) => update(index, { imageSrc: e.target.value })}
                  placeholder="/1.jpg"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`cl-${video.id}`}>Client quote</Label>
                <Input
                  id={`cl-${video.id}`}
                  value={video.client}
                  onChange={(e) => update(index, { client: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`ku-${video.id}`}>Your reply</Label>
                <Input
                  id={`ku-${video.id}`}
                  value={video.kuro}
                  onChange={(e) => update(index, { kuro: e.target.value })}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Button type="button" variant="secondary" onClick={add}>
        <Plus className="size-4" />
        Add video
      </Button>
    </div>
  );
}
