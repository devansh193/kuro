"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { isEqual } from "lodash";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

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
import type { SocialLink, SocialPlatform } from "@/lib/portfolio/types";

const PLATFORM_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: "x", label: "X (Twitter)" },
  { value: "email", label: "Email" },
  { value: "discord", label: "Discord" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "custom", label: "Custom / other" },
];

type SocialsFormValues = {
  socialLinks: SocialLink[];
};

export default function AdminSocialsPage() {
  const { content, setContent, savePortfolio } = usePortfolioContent();

  const form = useForm<SocialsFormValues>({
    defaultValues: { socialLinks: content.socialLinks },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "socialLinks",
    keyName: "_rowKey",
  });

  const snapshot = useRef(content.socialLinks);
  const prevLinks = useRef(content.socialLinks);

  useEffect(() => {
    if (!isEqual(content.socialLinks, prevLinks.current)) {
      prevLinks.current = content.socialLinks;
      form.reset({ socialLinks: content.socialLinks });
      snapshot.current = content.socialLinks;
    }
  }, [content, form]);

  const onSubmit = (values: SocialsFormValues) => {
    if (isEqual(values.socialLinks, snapshot.current)) return;
    setContent((c) => ({ ...c, socialLinks: values.socialLinks }));
    savePortfolio();
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Social links</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Used in the about section and footer. Platform picks the icon style.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ul className="space-y-6">
            {fields.map((field, index) => (
              <li
                key={field._rowKey}
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
                      className="size-8"
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
                      className="size-8 text-destructive"
                      onClick={() => remove(index)}
                      aria-label="Remove"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.platform`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel htmlFor={`plat-${field.id}`}>
                          Platform
                        </FormLabel>
                        <FormControl>
                          <select
                            id={`plat-${field.id}`}
                            value={f.value}
                            onChange={f.onChange}
                            onBlur={f.onBlur}
                            name={f.name}
                            ref={f.ref}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
                          >
                            {PLATFORM_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.label`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel htmlFor={`lab-${field.id}`}>Label</FormLabel>
                        <FormControl>
                          <Input id={`lab-${field.id}`} {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.url`}
                    render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel htmlFor={`url-${field.id}`}>URL</FormLabel>
                        <FormControl>
                          <Input
                            id={`url-${field.id}`}
                            {...f}
                            placeholder="https:// or mailto:"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  id: uuidv4(),
                  label: "Label",
                  url: "https://",
                  platform: "custom",
                })
              }
            >
              <Plus className="size-4" />
              Add link
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              Save social links
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
