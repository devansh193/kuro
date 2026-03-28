"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { isEqual } from "lodash";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hasChanges, pickChangedRecord } from "@/lib/portfolio/pick-changed";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioContent } from "@/lib/portfolio/types";

type HeroFormValues = {
  eyebrow: string;
  leadIn: string;
  tagline: string;
  rotatingPhrases: { value: string }[];
};

type SectionsFormValues = PortfolioContent["sections"];

function heroToForm(hero: PortfolioContent["hero"]): HeroFormValues {
  return {
    eyebrow: hero.eyebrow,
    leadIn: hero.leadIn,
    tagline: hero.tagline,
    rotatingPhrases: hero.rotatingPhrases.map((text) => ({ value: text })),
  };
}

function formToHero(values: HeroFormValues): PortfolioContent["hero"] {
  return {
    eyebrow: values.eyebrow,
    leadIn: values.leadIn,
    tagline: values.tagline,
    rotatingPhrases: values.rotatingPhrases.map((r) => r.value),
  };
}

export default function AdminHeroPage() {
  const { content, setContent, savePortfolio } = usePortfolioContent();

  const heroForm = useForm<HeroFormValues>({
    defaultValues: heroToForm(content.hero),
  });

  const sectionsForm = useForm<SectionsFormValues>({
    defaultValues: content.sections,
  });

  const { fields, append, remove } = useFieldArray({
    control: heroForm.control,
    name: "rotatingPhrases",
  });

  const heroSnapshot = useRef(content.hero);
  const sectionsSnapshot = useRef(content.sections);
  const prevHero = useRef(content.hero);
  const prevSections = useRef(content.sections);

  useEffect(() => {
    if (!isEqual(content.hero, prevHero.current)) {
      prevHero.current = content.hero;
      heroForm.reset(heroToForm(content.hero));
      heroSnapshot.current = content.hero;
    }
  }, [content, heroForm]);

  useEffect(() => {
    if (!isEqual(content.sections, prevSections.current)) {
      prevSections.current = content.sections;
      sectionsForm.reset(content.sections);
      sectionsSnapshot.current = content.sections;
    }
  }, [content, sectionsForm]);

  const onHeroSubmit = (values: HeroFormValues) => {
    const nextHero = formToHero(values);
    const patch = pickChangedRecord(
      nextHero as Record<string, unknown>,
      heroSnapshot.current as Record<string, unknown>,
    );
    if (!hasChanges(patch)) return;
    setContent((c) => ({
      ...c,
      hero: { ...c.hero, ...(patch as Partial<PortfolioContent["hero"]>) },
    }));
    savePortfolio();
  };

  const onSectionsSubmit = (values: SectionsFormValues) => {
    const patch = pickChangedRecord(
      values as Record<string, unknown>,
      sectionsSnapshot.current as Record<string, unknown>,
    );
    if (!hasChanges(patch)) return;
    setContent((c) => ({
      ...c,
      sections: { ...c.sections, ...(patch as Partial<SectionsFormValues>) },
    }));
    savePortfolio();
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Hero</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Main headline and rotating phrases on the home section.
        </p>
      </div>

      <Form {...heroForm}>
        <form
          onSubmit={heroForm.handleSubmit(onHeroSubmit)}
          className="space-y-4"
        >
          <FormField
            control={heroForm.control}
            name="eyebrow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eyebrow</FormLabel>
                <FormControl>
                  <Input {...field} id="eyebrow" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={heroForm.control}
            name="leadIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead-in (before rotating text)</FormLabel>
                <FormControl>
                  <Input {...field} id="leadIn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label>Rotating phrases</Label>
            <p className="text-xs text-muted-foreground">
              Shown in the animated flip; order matches the list.
            </p>
            <ul className="space-y-2">
              {fields.map((field, i) => (
                <li key={field.id} className="flex gap-2 items-center">
                  <FormField
                    control={heroForm.control}
                    name={`rotatingPhrases.${i}.value`}
                    render={({ field: phraseField }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...phraseField} className="flex-1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(i)}
                    disabled={fields.length <= 1}
                    aria-label="Remove phrase"
                  >
                    <Minus className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => append({ value: "New phrase" })}
            >
              <Plus className="size-4" />
              Add phrase
            </Button>
          </div>
          <FormField
            control={heroForm.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input {...field} id="tagline" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              !heroForm.formState.isDirty || heroForm.formState.isSubmitting
            }
          >
            Save hero
          </Button>
        </form>
      </Form>

      <div className="border-t border-border pt-8 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Section titles (optional)
        </h2>
        <Form {...sectionsForm}>
          <form
            onSubmit={sectionsForm.handleSubmit(onSectionsSubmit)}
            className="space-y-4"
          >
            <FormField
              control={sectionsForm.control}
              name="projectsTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long videos section title</FormLabel>
                  <FormControl>
                    <Input {...field} id="projectsTitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sectionsForm.control}
              name="shortsTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shorts section title</FormLabel>
                  <FormControl>
                    <Input {...field} id="shortsTitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sectionsForm.control}
              name="testimonialsTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonials section title</FormLabel>
                  <FormControl>
                    <Input {...field} id="testimonialsTitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                !sectionsForm.formState.isDirty ||
                sectionsForm.formState.isSubmitting
              }
            >
              Save section titles
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
