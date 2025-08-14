"use client";
import YouTubePlayer from "@/components/youtube/youtube-player";
import { motion } from "framer-motion";
interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

export const ProjectCard = ({
  videoId,
  title,
  description,
}: VideoCardProps) => {
  return (
    <motion.div
      className="rounded-[36px] min-w-115 h-150 p-[12px] flex flex-col bg-white"
      whileHover={{
        y: -16,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <div className="h-75 w-full bg-[#DFDFDF] rounded-3xl flex items-center justify-center">
        <YouTubePlayer videoId={videoId} />
      </div>
    </motion.div>
  );
};
