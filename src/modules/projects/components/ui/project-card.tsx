"use client";
import YouTubePlayer from "@/components/youtube/youtube-player";
import { motion } from "framer-motion";
import Image from "next/image";

interface VideoCardProps {
  videoId: string;
  client: string;
  kuro: string;
  clientName: string;
  imageSrc: string;
  youtubeStats: string;
}

export const ProjectCard = ({
  videoId,
  client,
  kuro,
  clientName,
  imageSrc,
  youtubeStats,
}: VideoCardProps) => {
  return (
    <motion.div
      className="group rounded-[32px] w-full p-2 flex flex-col bg-white border-[1px] gap-y-4"
      whileHover={{
        y: -10,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <div className="w-full h-54 md:h-70 flex items-center justify-center">
        <YouTubePlayer videoId={videoId} />
      </div>

      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="self-start rounded-[32px] rounded-bl-none group-hover:bg-black md:bg-background bg-black transition-colors duration-300 px-6 py-4 
             flex flex-col justify-between selection-white"
        >
          <h1 className=" text-white  md:text-gray-800 group-hover:text-white">
            {client}
          </h1>
          <p className="text-start text-xs text-gray-500 group-hover:text-gray-300">
            {clientName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1.3 }}
          className="self-end rounded-[32px] rounded-br-none bg-background px-6 py-4 
             flex flex-col justify-between selection-white"
        >
          <h1 className="">{kuro}</h1>
          <p className="text-end text-xs">Kuro</p>
        </motion.div>
      </div>
      <div className="flex items-center justify-send mt-4 gap-x-2">
        <Image
          className="rounded-full border-[1.5px]"
          src={imageSrc || "/1.jpg"}
          alt={clientName || "Author"}
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <h1 className="font-medium text-sm">{clientName || "Anonymous"}</h1>
          <p className="text-xs text-gray-500 ">{youtubeStats || "Youtuber"}</p>
        </div>
      </div>
    </motion.div>
  );
};
