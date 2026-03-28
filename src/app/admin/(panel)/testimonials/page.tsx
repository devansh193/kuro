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
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/modules/admin/components/image-upload-field";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioTestimonial } from "@/lib/portfolio/types";

type TestimonialRow = PortfolioTestimonial & {
  designation: string;
};

type TestimonialsFormValues = {
  testimonials: TestimonialRow[];
};

function toRow(t: PortfolioTestimonial): TestimonialRow {
  return {
    ...t,
    designation: t.designation ?? "",
  };
}

function toTestimonial(row: TestimonialRow): PortfolioTestimonial {
  const designation = row.designation.trim();
  return {
    id: row.id,
    authorName: row.authorName,
    imageSrc: row.imageSrc,
    testimonialText: row.testimonialText,
    ...(designation ? { designation } : {}),
  };
}

export default function AdminTestimonialsPage() {
  const { content, setContent, savePortfolio } = usePortfolioContent();

  const form = useForm<TestimonialsFormValues>({
    defaultValues: {
      testimonials: content.testimonials.map(toRow),
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "testimonials",
    keyName: "_rowKey",
  });

  const snapshot = useRef(content.testimonials);
  const prevTestimonials = useRef(content.testimonials);

  useEffect(() => {
    if (!isEqual(content.testimonials, prevTestimonials.current)) {
      prevTestimonials.current = content.testimonials;
      form.reset({
        testimonials: content.testimonials.map(toRow),
      });
      snapshot.current = content.testimonials;
    }
  }, [content, form]);

  const onSubmit = (values: TestimonialsFormValues) => {
    const next = values.testimonials.map(toTestimonial);
    if (isEqual(next, snapshot.current)) return;
    setContent((c) => ({ ...c, testimonials: next }));
    savePortfolio();
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Testimonials</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quote, author name, image (upload), and optional subtitle (e.g. subscriber count).
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ul className="space-y-8">
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
                <FormField
                  control={form.control}
                  name={`testimonials.${index}.testimonialText`}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel htmlFor={`tt-${field.id}`}>Testimonial</FormLabel>
                      <FormControl>
                        <Textarea
                          id={`tt-${field.id}`}
                          {...f}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`testimonials.${index}.authorName`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel htmlFor={`an-${field.id}`}>
                          Author name
                        </FormLabel>
                        <FormControl>
                          <Input id={`an-${field.id}`} {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`testimonials.${index}.designation`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel htmlFor={`des-${field.id}`}>
                          Short description / subtitle
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`des-${field.id}`}
                            {...f}
                            placeholder="Optional"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`testimonials.${index}.imageSrc`}
                    render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel htmlFor={`img-${field.id}`}>
                          Image
                        </FormLabel>
                        <FormControl>
                          <ImageUploadField
                            id={`img-${field.id}`}
                            name={f.name}
                            value={f.value}
                            onChange={f.onChange}
                            onBlur={f.onBlur}
                            inputRef={f.ref}
                            folder="testimonials"
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
                  authorName: "",
                  imageSrc: "/default-avatar.png",
                  testimonialText: "",
                  designation: "",
                })
              }
            >
              <Plus className="size-4" />
              Add testimonial
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              Save testimonials
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
