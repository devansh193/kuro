"use client";

import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import { SocialPlatformIcon } from "./social-platform-icon";

export const Socials = () => {
  const { content } = usePortfolioContent();

  return (
    <div className="flex flex-row items-center justify-start gap-x-4 mt-4 bg-transparent">
      {content.socialLinks.map((social) => {
        const isMail = social.url.startsWith("mailto:");
        return (
          <div key={social.id}>
            <a
              href={social.url}
              aria-label={social.label}
              {...(isMail
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              <div className="flex items-center justify-center p-1 h-12 w-12">
                <SocialPlatformIcon platform={social.platform} />
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};
