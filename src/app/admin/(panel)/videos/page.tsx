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
import { ImageUploadField } from "@/modules/admin/components/image-upload-field";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioVideo } from "@/lib/portfolio/types";

function nextVideoId(videos: PortfolioVideo[]): number {
  if (videos.length === 0) return 1;
  return Math.max(...videos.map((v) => v.id)) + 1;
}

type VideosFormValues = {
  videos: PortfolioVideo[];
};

export default function AdminVideosPage() {
  const { content, setContent, savePortfolio } = usePortfolioContent();

  const form = useForm<VideosFormValues>({
    defaultValues: { videos: content.videos },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "videos",
    keyName: "_rowKey",
  });

  const snapshot = useRef(content.videos);
  const prevVideos = useRef(content.videos);

  useEffect(() => {
    if (!isEqual(content.videos, prevVideos.current)) {
      prevVideos.current = content.videos;
      form.reset({ videos: content.videos });
      snapshot.current = content.videos;
    }
  }, [content, form]);

  const onSubmit = (values: VideosFormValues) => {
    if (isEqual(values.videos, snapshot.current)) return;
    setContent((c) => ({ ...c, videos: values.videos }));
    savePortfolio();
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">YouTube videos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Long-form project cards. Use the YouTube video ID (from the URL).
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
                    Video #{index + 1} · id {field.id}
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
                    name={`videos.${index}.videoId`}
                    render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel htmlFor={`vid-${field.id}`}>
                          YouTube video ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`vid-${field.id}`}
                            {...f}
                            placeholder="e.g. dQw4w9WgXcQ"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`videos.${index}.clientName`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel htmlFor={`cn-${field.id}`}>
                          Client name
                        </FormLabel>
                        <FormControl>
                          <Input id={`cn-${field.id}`} {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`videos.${index}.youtubeStats`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel htmlFor={`ys-${field.id}`}>
                          YouTube stats
                        </FormLabel>
                        <FormControl>
                          <Input id={`ys-${field.id}`} {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`videos.${index}.imageSrc`}
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
                            folder="videos"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`videos.${index}.client`}
                    render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel htmlFor={`cl-${field.id}`}>
                          Client quote
                        </FormLabel>
                        <FormControl>
                          <Input id={`cl-${field.id}`} {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`videos.${index}.kuro`}
                    render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel htmlFor={`ku-${field.id}`}>
                          Your reply
                        </FormLabel>
                        <FormControl>
                          <Input id={`ku-${field.id}`} {...f} />
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
              onClick={() => {
                const vids = form.getValues("videos");
                append({
                  id: nextVideoId(vids),
                  videoId: "",
                  client: "",
                  kuro: "",
                  clientName: "",
                  imageSrc: "/placeholder.jpg",
                  youtubeStats: "",
                });
              }}
            >
              <Plus className="size-4" />
              Add video
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              Save videos
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
