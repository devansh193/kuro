"use client";
import { videos } from "@/data/videos";
import { ProjectCard } from "../components/ui/project-card";
import { motion } from "framer-motion";

export const ProjectView = () => {
  return (
    <div>
      <div className="px-2 md:px-0">
        <div className="max-w-5xl mx-auto relative flex items-center justify-center h-20">
          {/* Left & Right dashed borders */}
          <div className="absolute inset-0 -z-10 border-l-[1.5px] border-r-[1.5px] border-spaced-vertical" />
          {/* Bottom dashed border */}
          <div className="absolute bottom-0 left-0 w-full border-b-[1.5px] -z-10 border-spaced-horizontal" />
          <h1 className="font-sans font-semibold text-2xl md:text-5xl selection:bg-black selection:text-white">
            THE LONG PLAY
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto w-full border-l-[1.5px] border-r-[1.5px] px-2 md:px-8 py-8 border-spaced-vertical">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="col-span-1 w-full">
                <ProjectCard
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                />
              </div>
            ))}
          </motion.div>
        </div>
        {/* Bottom dashed border */}
      </div>
      <div className="w-full border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
