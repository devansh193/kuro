export type SocialPlatform =
  | "x"
  | "email"
  | "discord"
  | "youtube"
  | "instagram"
  | "linkedin"
  | "custom";

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  platform: SocialPlatform;
};

export type PortfolioVideo = {
  id: number;
  videoId: string;
  client: string;
  kuro: string;
  clientName: string;
  imageSrc: string;
  youtubeStats: string;
};

export type PortfolioShort = {
  shortId: string;
};

export type PortfolioTestimonial = {
  id: string;
  authorName: string;
  imageSrc: string;
  testimonialText: string;
  designation?: string;
};

export type PortfolioContent = {
  hero: {
    eyebrow: string;
    leadIn: string;
    rotatingPhrases: string[];
    tagline: string;
  };
  sections: {
    projectsTitle: string;
    shortsTitle: string;
    testimonialsTitle: string;
  };
  videos: PortfolioVideo[];
  shorts: PortfolioShort[];
  testimonials: PortfolioTestimonial[];
  about: {
    title: string;
    body: string;
    ctaPrefix: string;
    ctaLinkText: string;
    ctaUrl: string;
    ctaSuffix: string;
  };
  footer: {
    copyrightName: string;
    copyrightYear: string;
  };
  socialLinks: SocialLink[];
};
