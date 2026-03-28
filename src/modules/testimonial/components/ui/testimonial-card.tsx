"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  className?: string;
  imageSrc?: string;
  testimonialText?: string;
  authorName?: string;
  designation?: string;
}

export const TestimonialCard = ({
  className,
  imageSrc,
  testimonialText,
  authorName,
  designation,
}: TestimonialCardProps) => {
  const quote =
    testimonialText ||
    "  This solution transformed our workflow completely. The intuitive design and powerful features made our team 3x more productive.";

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        className,
        "box-border flex min-h-0 min-w-0 max-w-full flex-col items-stretch justify-between gap-4 bg-[#ECECEC] selection:bg-black selection:text-white"
      )}
    >
      <blockquote className="px-4 pt-4 text-left text-base font-normal leading-relaxed text-neutral-900 sm:text-lg">
        <p className="min-w-0 [overflow-wrap:anywhere] hyphens-auto">
          {quote}
        </p>
      </blockquote>
      <footer className="flex shrink-0 items-center gap-x-2 px-3 pb-4 pt-0">
        <Image
          className="shrink-0 rounded-full border-[1.5px]"
          src={imageSrc || "/default-avatar.png"}
          alt={authorName || "Author"}
          width={50}
          height={50}
        />
        <div className="min-w-0 flex flex-col">
          <cite className="not-italic font-medium leading-tight">
            {authorName || "Anonymous"}
          </cite>
          <p className="truncate text-sm text-neutral-500">
            {designation || "Youtuber"}
          </p>
        </div>
      </footer>
    </motion.div>
  );
};
