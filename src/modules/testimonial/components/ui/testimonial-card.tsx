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
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        className,
        "flex flex-col items-start justify-between h-full w-full bg-[#ECECEC] selection:text-white selection:bg-black"
      )}
    >
      <h1 className="p-4">
        {testimonialText ||
          "  This solution transformed our workflow completely. The intuitive design and powerful features made our team 3x more productive."}
      </h1>
      <div className="flex items-center justify-start mt-4 gap-x-2 px-2">
        <Image
          className="rounded-full mb-2 border-[1.5px]"
          src={imageSrc || "/default-avatar.png"}
          alt={authorName || "Author"}
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <h1 className="font-medium">{authorName || "Anonymous"}</h1>
          <p className="text-sm text-gray-500">{designation || "Youtuber"}</p>
        </div>
      </div>
    </motion.div>
  );
};
