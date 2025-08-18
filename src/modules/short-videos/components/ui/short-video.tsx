"use client";

import YouTubePlayer from "@/components/youtube/youtube-player";
import { motion } from "framer-motion";

interface ShortVideoProps {
  shortId: string;
}

export const ShortVideo = ({ shortId }: ShortVideoProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="h-160 w-90 rounded-[36px] p-2 border"
    >
      <div className="h-full w-full overflow-hidden">
        <YouTubePlayer videoId={shortId} />
      </div>
    </motion.div>
  );
};
