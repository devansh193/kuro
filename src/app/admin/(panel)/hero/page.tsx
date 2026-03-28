"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import { Minus, Plus } from "lucide-react";

export default function AdminHeroPage() {
  const { content, setContent } = usePortfolioContent();
  const { hero, sections } = content;

  const setHero = (patch: Partial<typeof hero>) => {
    setContent((c) => ({
      ...c,
      hero: { ...c.hero, ...patch },
    }));
  };

  const setSections = (patch: Partial<typeof sections>) => {
    setContent((c) => ({
      ...c,
      sections: { ...c.sections, ...patch },
    }));
  };

  const updatePhrase = (index: number, value: string) => {
    const next = [...hero.rotatingPhrases];
    next[index] = value;
    setHero({ rotatingPhrases: next });
  };

  const addPhrase = () => {
    setHero({ rotatingPhrases: [...hero.rotatingPhrases, "New phrase"] });
  };

  const removePhrase = (index: number) => {
    if (hero.rotatingPhrases.length <= 1) return;
    setHero({
      rotatingPhrases: hero.rotatingPhrases.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Hero</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Main headline and rotating phrases on the home section.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eyebrow">Eyebrow</Label>
          <Input
            id="eyebrow"
            value={hero.eyebrow}
            onChange={(e) => setHero({ eyebrow: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leadIn">Lead-in (before rotating text)</Label>
          <Input
            id="leadIn"
            value={hero.leadIn}
            onChange={(e) => setHero({ leadIn: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Rotating phrases</Label>
          <p className="text-xs text-muted-foreground">
            Shown in the animated flip; order matches the list.
          </p>
          <ul className="space-y-2">
            {hero.rotatingPhrases.map((phrase, i) => (
              <li key={i} className="flex gap-2 items-center">
                <Input
                  value={phrase}
                  onChange={(e) => updatePhrase(i, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removePhrase(i)}
                  disabled={hero.rotatingPhrases.length <= 1}
                  aria-label="Remove phrase"
                >
                  <Minus className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
          <Button type="button" variant="secondary" size="sm" onClick={addPhrase}>
            <Plus className="size-4" />
            Add phrase
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={hero.tagline}
            onChange={(e) => setHero({ tagline: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-border pt-8 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Section titles (optional)
        </h2>
        <div className="space-y-2">
          <Label htmlFor="projectsTitle">Long videos section title</Label>
          <Input
            id="projectsTitle"
            value={sections.projectsTitle}
            onChange={(e) =>
              setSections({ projectsTitle: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shortsTitle">Shorts section title</Label>
          <Input
            id="shortsTitle"
            value={sections.shortsTitle}
            onChange={(e) => setSections({ shortsTitle: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonialsTitle">Testimonials section title</Label>
          <Input
            id="testimonialsTitle"
            value={sections.testimonialsTitle}
            onChange={(e) =>
              setSections({ testimonialsTitle: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
