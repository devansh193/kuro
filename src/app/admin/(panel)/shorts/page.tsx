"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

export default function AdminShortsPage() {
  const { content, setContent } = usePortfolioContent();
  const { shorts } = content;

  const update = (index: number, shortId: string) => {
    setContent((c) => {
      const next = [...c.shorts];
      next[index] = { shortId };
      return { ...c, shorts: next };
    });
  };

  const add = () => {
    setContent((c) => ({
      ...c,
      shorts: [...c.shorts, { shortId: "" }],
    }));
  };

  const remove = (index: number) => {
    setContent((c) => ({
      ...c,
      shorts: c.shorts.filter((_, i) => i !== index),
    }));
  };

  const move = (index: number, dir: -1 | 1) => {
    setContent((c) => {
      const next = [...c.shorts];
      const j = index + dir;
      if (j < 0 || j >= next.length) return c;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...c, shorts: next };
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Shorts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          YouTube Shorts video IDs (shorts carousel). Order matches the site.
        </p>
      </div>

      <ul className="space-y-3">
        {shorts.map((short, index) => (
          <li
            key={`${index}-${short.shortId}`}
            className="flex flex-col sm:flex-row gap-2 sm:items-end"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor={`short-${index}`}>Short #{index + 1}</Label>
              <Input
                id={`short-${index}`}
                value={short.shortId}
                onChange={(e) => update(index, e.target.value)}
                placeholder="video ID"
              />
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9"
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
                className="size-9"
                onClick={() => move(index, 1)}
                disabled={index === shorts.length - 1}
                aria-label="Move down"
              >
                <ArrowDown className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 text-destructive"
                onClick={() => remove(index)}
                aria-label="Remove"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Button type="button" variant="secondary" onClick={add}>
        <Plus className="size-4" />
        Add short
      </Button>
    </div>
  );
}
