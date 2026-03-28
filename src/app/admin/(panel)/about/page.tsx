"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isEqual } from "lodash";

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
import { hasChanges, pickChangedRecord } from "@/lib/portfolio/pick-changed";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import type { PortfolioContent } from "@/lib/portfolio/types";

type AboutFormValues = PortfolioContent["about"];
type FooterFormValues = PortfolioContent["footer"];

export default function AdminAboutPage() {
  const { content, setContent, savePortfolio } = usePortfolioContent();

  const aboutForm = useForm<AboutFormValues>({
    defaultValues: content.about,
  });
  const footerForm = useForm<FooterFormValues>({
    defaultValues: content.footer,
  });

  const aboutSnapshot = useRef(content.about);
  const footerSnapshot = useRef(content.footer);
  const prevAbout = useRef(content.about);
  const prevFooter = useRef(content.footer);

  useEffect(() => {
    if (!isEqual(content.about, prevAbout.current)) {
      prevAbout.current = content.about;
      aboutForm.reset(content.about);
      aboutSnapshot.current = content.about;
    }
  }, [content, aboutForm]);

  useEffect(() => {
    if (!isEqual(content.footer, prevFooter.current)) {
      prevFooter.current = content.footer;
      footerForm.reset(content.footer);
      footerSnapshot.current = content.footer;
    }
  }, [content, footerForm]);

  const onAboutSubmit = (values: AboutFormValues) => {
    const patch = pickChangedRecord(
      values as Record<string, unknown>,
      aboutSnapshot.current as Record<string, unknown>,
    );
    if (!hasChanges(patch)) return;
    setContent((c) => ({
      ...c,
      about: { ...c.about, ...(patch as Partial<AboutFormValues>) },
    }));
    savePortfolio();
  };

  const onFooterSubmit = (values: FooterFormValues) => {
    const patch = pickChangedRecord(
      values as Record<string, unknown>,
      footerSnapshot.current as Record<string, unknown>,
    );
    if (!hasChanges(patch)) return;
    setContent((c) => ({
      ...c,
      footer: { ...c.footer, ...(patch as Partial<FooterFormValues>) },
    }));
    savePortfolio();
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">About & contact</h1>
        <p className="text-sm text-muted-foreground mt-1">
          About section copy and the call-to-action line with a link.
        </p>
      </div>

      <Form {...aboutForm}>
        <form
          onSubmit={aboutForm.handleSubmit(onAboutSubmit)}
          className="space-y-4"
        >
          <FormField
            control={aboutForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} id="title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={aboutForm.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea {...field} id="body" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={aboutForm.control}
            name="ctaPrefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA — text before link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="ctaPrefix"
                    placeholder="Ready to elevate your content? Let's"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={aboutForm.control}
            name="ctaLinkText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA — link label</FormLabel>
                <FormControl>
                  <Input {...field} id="ctaLinkText" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={aboutForm.control}
            name="ctaUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA — URL</FormLabel>
                <FormControl>
                  <Input {...field} id="ctaUrl" placeholder="https://" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={aboutForm.control}
            name="ctaSuffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA — text after link</FormLabel>
                <FormControl>
                  <Input {...field} id="ctaSuffix" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              !aboutForm.formState.isDirty || aboutForm.formState.isSubmitting
            }
          >
            Save about
          </Button>
        </form>
      </Form>

      <div className="border-t border-border pt-8 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Footer
        </h2>
        <Form {...footerForm}>
          <form
            onSubmit={footerForm.handleSubmit(onFooterSubmit)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <FormField
              control={footerForm.control}
              name="copyrightName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copyright name</FormLabel>
                  <FormControl>
                    <Input {...field} id="copyrightName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={footerForm.control}
              name="copyrightYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} id="copyrightYear" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={
                  !footerForm.formState.isDirty ||
                  footerForm.formState.isSubmitting
                }
              >
                Save footer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
