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
      className="group rounded-[32px] w-full h-150 p-2 flex flex-col bg-white border-[1px] gap-y-4"
      whileHover={{
        y: -10,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {/* Video */}
      <div className="w-full h-54 md:h-70 flex items-center justify-center">
        <YouTubePlayer videoId={videoId} />
      </div>

      {/* Pills */}
      <div className="flex flex-col gap-4">
        {/* Left pill */}
        <div className="rounded-[32px] rounded-bl-none w-3/4 bg-background px-4 py-4 flex flex-col justify-between gap-y-2">
          <h1>
            The golden sun dipped below the horizon, painting the sky in warm
            hues as gentle waves whispered along the tranquil shore.
          </h1>
          <p className="text-start text-xs text-gray-500">Client</p>
        </div>

        {/* Right pill changes on hover */}
        <div
          className="self-end rounded-[32px] rounded-br-none w-3/4 bg-background 
             transition-colors duration-600 group-hover:bg-black px-6 py-4 
             flex flex-col justify-between"
        >
          <h1 className="text-sm md:text-base font-medium leading-snug text-gray-800 group-hover:text-white">
            Stars glimmer softly above the quiet sea.
          </h1>
          <p className="text-end text-xs text-gray-500 group-hover:text-gray-300">
            Kuro
          </p>
        </div>
      </div>
    </motion.div>
  );
};
