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
      className="rounded-[32px] w-full h-full p-[4px] md:p-[4px] flex flex-col bg-white border-[1px]"
      whileHover={{
        y: -16,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <div className="w-full aspect-video flex items-center justify-center">
        <YouTubePlayer videoId={videoId} />
      </div>
    </motion.div>
  );
};
