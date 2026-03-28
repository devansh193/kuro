"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { SocialLink, SocialPlatform } from "@/lib/portfolio/types";
import { v4 as uuidv4 } from "uuid";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

const PLATFORM_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: "x", label: "X (Twitter)" },
  { value: "email", label: "Email" },
  { value: "discord", label: "Discord" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "custom", label: "Custom / other" },
];

export default function AdminSocialsPage() {
  const { content, setContent } = usePortfolioContent();
  const { socialLinks } = content;

  const update = (index: number, patch: Partial<SocialLink>) => {
    setContent((c) => {
      const next = [...c.socialLinks];
      next[index] = { ...next[index], ...patch };
      return { ...c, socialLinks: next };
    });
  };

  const add = () => {
    setContent((c) => ({
      ...c,
      socialLinks: [
        ...c.socialLinks,
        {
          id: uuidv4(),
          label: "Label",
          url: "https://",
          platform: "custom",
        },
      ],
    }));
  };

  const remove = (index: number) => {
    setContent((c) => ({
      ...c,
      socialLinks: c.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const move = (index: number, dir: -1 | 1) => {
    setContent((c) => {
      const next = [...c.socialLinks];
      const j = index + dir;
      if (j < 0 || j >= next.length) return c;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...c, socialLinks: next };
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Social links</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Used in the about section and footer. Platform picks the icon style.
        </p>
      </div>

      <ul className="space-y-6">
        {socialLinks.map((link, index) => (
          <li
            key={link.id}
            className="rounded-lg border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                #{index + 1}
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
                  disabled={index === socialLinks.length - 1}
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
              <div className="space-y-2">
                <Label htmlFor={`plat-${link.id}`}>Platform</Label>
                <select
                  id={`plat-${link.id}`}
                  value={link.platform}
                  onChange={(e) =>
                    update(index, {
                      platform: e.target.value as SocialPlatform,
                    })
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
                >
                  {PLATFORM_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`lab-${link.id}`}>Label</Label>
                <Input
                  id={`lab-${link.id}`}
                  value={link.label}
                  onChange={(e) => update(index, { label: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`url-${link.id}`}>URL</Label>
                <Input
                  id={`url-${link.id}`}
                  value={link.url}
                  onChange={(e) => update(index, { url: e.target.value })}
                  placeholder="https:// or mailto:"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Button type="button" variant="secondary" onClick={add}>
        <Plus className="size-4" />
        Add link
      </Button>
    </div>
  );
}
