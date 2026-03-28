"use client";

import type { SocialPlatform } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";
import {
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";

function IconX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

function IconDiscord({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 199"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
    </svg>
  );
}

const iconClass = "size-7 sm:size-8";

export function SocialPlatformIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const c = cn("text-white shrink-0", className);
  switch (platform) {
    case "x":
      return <IconX className={cn(iconClass, c)} />;
    case "email":
      return <Mail className={cn(iconClass, c)} strokeWidth={2} />;
    case "discord":
      return <IconDiscord className={cn(iconClass, c)} />;
    case "youtube":
      return <Youtube className={cn(iconClass, c)} strokeWidth={2} />;
    case "instagram":
      return <Instagram className={cn(iconClass, c)} strokeWidth={2} />;
    case "linkedin":
      return <Linkedin className={cn(iconClass, c)} strokeWidth={2} />;
    case "custom":
      return <Globe className={cn(iconClass, c)} strokeWidth={2} />;
  }
}

