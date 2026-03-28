"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";

export default function AdminAboutPage() {
  const { content, setContent } = usePortfolioContent();
  const { about, footer } = content;

  const setAbout = (patch: Partial<typeof about>) => {
    setContent((c) => ({
      ...c,
      about: { ...c.about, ...patch },
    }));
  };

  const setFooter = (patch: Partial<typeof footer>) => {
    setContent((c) => ({
      ...c,
      footer: { ...c.footer, ...patch },
    }));
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">About & contact</h1>
        <p className="text-sm text-muted-foreground mt-1">
          About section copy and the call-to-action line with a link.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={about.title}
            onChange={(e) => setAbout({ title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            value={about.body}
            onChange={(e) => setAbout({ body: e.target.value })}
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaPrefix">CTA — text before link</Label>
          <Input
            id="ctaPrefix"
            value={about.ctaPrefix}
            onChange={(e) => setAbout({ ctaPrefix: e.target.value })}
            placeholder="Ready to elevate your content? Let's"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaLinkText">CTA — link label</Label>
          <Input
            id="ctaLinkText"
            value={about.ctaLinkText}
            onChange={(e) => setAbout({ ctaLinkText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaUrl">CTA — URL</Label>
          <Input
            id="ctaUrl"
            value={about.ctaUrl}
            onChange={(e) => setAbout({ ctaUrl: e.target.value })}
            placeholder="https://"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaSuffix">CTA — text after link</Label>
          <Input
            id="ctaSuffix"
            value={about.ctaSuffix}
            onChange={(e) => setAbout({ ctaSuffix: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-border pt-8 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Footer
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="copyrightName">Copyright name</Label>
            <Input
              id="copyrightName"
              value={footer.copyrightName}
              onChange={(e) =>
                setFooter({ copyrightName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="copyrightYear">Year</Label>
            <Input
              id="copyrightYear"
              value={footer.copyrightYear}
              onChange={(e) =>
                setFooter({ copyrightYear: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
