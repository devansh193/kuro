"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioTestimonial } from "@/lib/portfolio/types";
import { v4 as uuidv4 } from "uuid";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

export default function AdminTestimonialsPage() {
  const { content, setContent } = usePortfolioContent();
  const { testimonials } = content;

  const update = (index: number, patch: Partial<PortfolioTestimonial>) => {
    setContent((c) => {
      const next = [...c.testimonials];
      next[index] = { ...next[index], ...patch };
      return { ...c, testimonials: next };
    });
  };

  const add = () => {
    setContent((c) => ({
      ...c,
      testimonials: [
        ...c.testimonials,
        {
          id: uuidv4(),
          authorName: "",
          imageSrc: "/default-avatar.png",
          testimonialText: "",
          designation: "",
        },
      ],
    }));
  };

  const remove = (index: number) => {
    setContent((c) => ({
      ...c,
      testimonials: c.testimonials.filter((_, i) => i !== index),
    }));
  };

  const move = (index: number, dir: -1 | 1) => {
    setContent((c) => {
      const next = [...c.testimonials];
      const j = index + dir;
      if (j < 0 || j >= next.length) return c;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...c, testimonials: next };
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Testimonials</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quote, author name, image path, and optional subtitle (e.g. subscriber count).
        </p>
      </div>

      <ul className="space-y-8">
        {testimonials.map((t, index) => (
          <li
            key={t.id}
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
                  disabled={index === testimonials.length - 1}
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
            <div className="space-y-2">
              <Label htmlFor={`tt-${t.id}`}>Testimonial</Label>
              <Textarea
                id={`tt-${t.id}`}
                value={t.testimonialText}
                onChange={(e) =>
                  update(index, { testimonialText: e.target.value })
                }
                rows={4}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`an-${t.id}`}>Author name</Label>
                <Input
                  id={`an-${t.id}`}
                  value={t.authorName}
                  onChange={(e) =>
                    update(index, { authorName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`des-${t.id}`}>Short description / subtitle</Label>
                <Input
                  id={`des-${t.id}`}
                  value={t.designation ?? ""}
                  onChange={(e) =>
                    update(index, {
                      designation: e.target.value || undefined,
                    })
                  }
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`img-${t.id}`}>Image path</Label>
                <Input
                  id={`img-${t.id}`}
                  value={t.imageSrc}
                  onChange={(e) => update(index, { imageSrc: e.target.value })}
                  placeholder="/1.jpg"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Button type="button" variant="secondary" onClick={add}>
        <Plus className="size-4" />
        Add testimonial
      </Button>
    </div>
  );
}
