"use client";
import { videos } from "@/data/videos";
import { ProjectCard } from "../components/ui/project-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const ProjectView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.4,
      }}
      className="w-full border-b-[1.5px] border-t-0! p-4 py-16 mb-40 flex items-center justify-center gap-x-8 overflow-x-auto"
      style={{
        borderTop: "1.5px solid transparent",
        borderImage: `repeating-linear-gradient(to right, #CBCBCB 0 8px, transparent 8px 16px) 1`,
      }}
    >
      {videos.map((video) => (
        <ProjectCard
          key={video.id}
          videoId={video.videoId}
          title={video.title}
          description={video.description}
        />
      ))}
    </motion.div>
  );
};
