"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { isEqual } from "lodash";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

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
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioShort } from "@/lib/portfolio/types";

type ShortsFormValues = {
  shorts: PortfolioShort[];
};

export default function AdminShortsPage() {
  const { content, setContent, savePortfolio } = usePortfolioContent();

  const form = useForm<ShortsFormValues>({
    defaultValues: { shorts: content.shorts },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "shorts",
  });

  const snapshot = useRef(content.shorts);
  const prevShorts = useRef(content.shorts);

  useEffect(() => {
    if (!isEqual(content.shorts, prevShorts.current)) {
      prevShorts.current = content.shorts;
      form.reset({ shorts: content.shorts });
      snapshot.current = content.shorts;
    }
  }, [content, form]);

  const onSubmit = (values: ShortsFormValues) => {
    if (isEqual(values.shorts, snapshot.current)) return;
    setContent((c) => ({ ...c, shorts: values.shorts }));
    savePortfolio();
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Shorts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          YouTube Shorts video IDs (shorts carousel). Order matches the site.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <ul className="space-y-3">
            {fields.map((field, index) => (
              <li
                key={field.id}
                className="flex flex-col sm:flex-row gap-2 sm:items-end"
              >
                <FormField
                  control={form.control}
                  name={`shorts.${index}.shortId`}
                  render={({ field: f }) => (
                    <FormItem className="flex-1">
                      <FormLabel htmlFor={`short-${index}`}>
                        Short #{index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id={`short-${index}`}
                          {...f}
                          placeholder="video ID"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-1 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9"
                    onClick={() => move(index, index - 1)}
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
                    onClick={() => move(index, index + 1)}
                    disabled={index === fields.length - 1}
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

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ shortId: "" })}
            >
              <Plus className="size-4" />
              Add short
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              Save shorts
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
