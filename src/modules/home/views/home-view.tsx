"use client";
import { DottedBackground } from "@/modules/home/components/ui/dotted-background";
import { ContainerTextFlip } from "@/modules/home/components/ui/text-rotate";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AvatarGroup } from "@/components/avatar-group";
import { sampleAvatars } from "@/data/sample";

export const HomeView = () => {
  return (
    <div className="relative w-full px-2 md:px-0">
      <div className="max-w-5xl mx-auto px-4 pt-2.5 flex flex-col gap-y-2 items-center justify-center relative min-h-120 md:min-h-150 border-spaced-vertical border-l-[1.5px] border-r-[1.5px]">
        <DottedBackground className="absolute inset-0 -z-10" />
        <h1>Hi there</h1>
        <motion.div
          className="text-5xl md:text-6xl max-w-[680px] mx-auto font-bold text-center relative font-phudu selection-black"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          Turning your footage into
          <ContainerTextFlip
            className="bg-transparent m-2"
            textClassName="text-2xl md:text-6xl"
            words={[
              "powerful stories",
              "reach and revenue ",
              "lasting success",
            ]}
          />
        </motion.div>
        <motion.h1
          className="text-xl text-[#000] font-medium text-center max-w-2xl selection-black"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Where creativity meets precision in every frame
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size={"lg"} className="rounded-full px-8 py-6 text-xl">
            Let&apos;s Go
          </Button>
        </motion.div>
      </div>
      <div className="relative w-full h-15 md:h-20 flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full h-full flex items-center justify-center relative">
          {/* Bottom  */}
          <div className="absolute top-0 left-0 right-0 border-b-[1.5px] border-spaced-horizontal" />
          {/* Left border */}
          <div className="absolute top-0 bottom-0 left-0 border-l-[1.5px] border-spaced-vertical" />
          {/* Right border */}
          <div className="absolute top-0 bottom-0 right-0 border-r-[1.5px] border-spaced-vertical" />
          <AvatarGroup size="sm" avatars={sampleAvatars} />
        </div>
      </div>
      <div className="w-full border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
