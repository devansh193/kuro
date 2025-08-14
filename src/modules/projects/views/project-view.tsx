"use client";
import { videos } from "@/data/videos";
import { ProjectCard } from "../components/ui/project-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const ProjectView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <div className="mb-40">
      <div className="h-15 md:h-25 max-w-5xl mx-auto relative flex items-center justify-center">
        {/* Left & Right dashed borders */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            borderLeft: "1.5px solid transparent",
            borderRight: "1.5px solid transparent",
            borderImage: `repeating-linear-gradient(to bottom, #CBCBCB 0 8px, transparent 8px 16px) 1`,
          }}
        />

        {/* Bottom dashed border */}
        <div
          className="absolute bottom-0 left-0 w-full h-[1.5px] -z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #CBCBCB 0 8px, transparent 8px 16px)",
          }}
        />

        <h1 className="font-phudu font-bold text-2xl md:text-6xl">WORK</h1>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 1, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.4,
        }}
        className="
        max-w-5xl h-full mx-auto w-full
        border-l-[1.5px] border-r-[1.5px] p-2 md:p-8
        grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 overflow-x-auto 
        [border-image:repeating-linear-gradient(to_bottom,#CBCBCB_0_8px,transparent_8px_16px)_1]
      "
      >
        {videos.map((video) => (
          <div key={video.id} className="col-span-1 w-full h-full">
            <ProjectCard
              videoId={video.videoId}
              title={video.title}
              description={video.description}
            />
          </div>
        ))}
      </motion.div>
      <div
        className=" bottom-0 left-0 w-full h-[1.5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #CBCBCB 0 8px, transparent 8px 16px)",
        }}
      />
    </div>
  );
};
