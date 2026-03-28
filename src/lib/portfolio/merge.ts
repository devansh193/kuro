import { DEFAULT_PORTFOLIO_CONTENT } from "./defaults";
import type { PortfolioContent, SocialPlatform } from "./types";

const PLATFORMS: SocialPlatform[] = [
  "x",
  "email",
  "discord",
  "youtube",
  "instagram",
  "linkedin",
  "custom",
];

function isPlatform(x: unknown): x is SocialPlatform {
  return typeof x === "string" && PLATFORMS.includes(x as SocialPlatform);
}

export function mergePortfolioContent(input: unknown): PortfolioContent {
  const base = structuredClone(DEFAULT_PORTFOLIO_CONTENT);
  if (!input || typeof input !== "object") return base;
  const src = input as Record<string, unknown>;

  if (src.hero && typeof src.hero === "object") {
    const h = src.hero as Record<string, unknown>;
    if (typeof h.eyebrow === "string") base.hero.eyebrow = h.eyebrow;
    if (typeof h.leadIn === "string") base.hero.leadIn = h.leadIn;
    if (typeof h.tagline === "string") base.hero.tagline = h.tagline;
    if (Array.isArray(h.rotatingPhrases)) {
      const phrases = h.rotatingPhrases.filter(
        (p): p is string => typeof p === "string",
      );
      if (phrases.length > 0) base.hero.rotatingPhrases = phrases;
    }
  }

  if (src.sections && typeof src.sections === "object") {
    const s = src.sections as Record<string, unknown>;
    if (typeof s.projectsTitle === "string")
      base.sections.projectsTitle = s.projectsTitle;
    if (typeof s.shortsTitle === "string")
      base.sections.shortsTitle = s.shortsTitle;
    if (typeof s.testimonialsTitle === "string")
      base.sections.testimonialsTitle = s.testimonialsTitle;
  }

  if (Array.isArray(src.videos)) {
    const videos = src.videos
      .map((v) => {
        if (!v || typeof v !== "object") return null;
        const o = v as Record<string, unknown>;
        const id = typeof o.id === "number" ? o.id : Number(o.id);
        if (!Number.isFinite(id)) return null;
        return {
          id,
          videoId: String(o.videoId ?? ""),
          client: String(o.client ?? ""),
          kuro: String(o.kuro ?? ""),
          clientName: String(o.clientName ?? ""),
          imageSrc: String(o.imageSrc ?? ""),
          youtubeStats: String(o.youtubeStats ?? ""),
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
    if (videos.length > 0) base.videos = videos;
  }

  if (Array.isArray(src.shorts)) {
    const shorts = src.shorts
      .map((s) => {
        if (!s || typeof s !== "object") return null;
        const o = s as Record<string, unknown>;
        return { shortId: String(o.shortId ?? "") };
      })
      // Keep rows with empty shortId so admin can add a slot before pasting an ID.
      .filter((s): s is NonNullable<typeof s> => s !== null);
    if (shorts.length > 0) base.shorts = shorts;
  }

  if (Array.isArray(src.testimonials)) {
    const testimonials = src.testimonials
      .map((t) => {
        if (!t || typeof t !== "object") return null;
        const o = t as Record<string, unknown>;
        const id = String(o.id ?? "");
        if (!id) return null;
        const designation =
          typeof o.designation === "string" ? o.designation : undefined;
        return {
          id,
          authorName: String(o.authorName ?? ""),
          imageSrc: String(o.imageSrc ?? ""),
          testimonialText: String(o.testimonialText ?? ""),
          ...(designation !== undefined ? { designation } : {}),
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);
    if (testimonials.length > 0) base.testimonials = testimonials;
  }

  if (src.about && typeof src.about === "object") {
    const a = src.about as Record<string, unknown>;
    if (typeof a.title === "string") base.about.title = a.title;
    if (typeof a.body === "string") base.about.body = a.body;
    if (typeof a.ctaPrefix === "string") base.about.ctaPrefix = a.ctaPrefix;
    if (typeof a.ctaLinkText === "string")
      base.about.ctaLinkText = a.ctaLinkText;
    if (typeof a.ctaUrl === "string") base.about.ctaUrl = a.ctaUrl;
    if (typeof a.ctaSuffix === "string") base.about.ctaSuffix = a.ctaSuffix;
  }

  if (src.footer && typeof src.footer === "object") {
    const f = src.footer as Record<string, unknown>;
    if (typeof f.copyrightName === "string")
      base.footer.copyrightName = f.copyrightName;
    if (typeof f.copyrightYear === "string")
      base.footer.copyrightYear = f.copyrightYear;
  }

  if (Array.isArray(src.socialLinks)) {
    const links = src.socialLinks
      .map((l) => {
        if (!l || typeof l !== "object") return null;
        const o = l as Record<string, unknown>;
        const id = String(o.id ?? "");
        if (!id) return null;
        const platform = o.platform;
        return {
          id,
          label: String(o.label ?? ""),
          url: String(o.url ?? ""),
          platform: isPlatform(platform) ? platform : "custom",
        };
      })
      .filter((l): l is NonNullable<typeof l> => l !== null);
    if (links.length > 0) base.socialLinks = links;
  }

  return base;
}
