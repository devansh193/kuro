"use client";
import { DottedBackground } from "@/modules/home/components/ui/dotted-background";
import { ContainerTextFlip } from "@/modules/home/components/ui/text-rotate";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AvatarGroup } from "@/components/avatar-group";
import { sampleAvatars } from "@/data/sample";

export const HomeView = () => {
  return (
    <div className="relative w-full">
      <div className="max-w-5xl mx-auto px-4 pt-2.5 flex flex-col gap-y-2 items-center justify-center relative h-150 border-t-0 border-l-[1.5px] border-r-[1.5px] ">
        <DottedBackground className="absolute inset-0 -z-10" />
        <h1>Hi there</h1>
        <motion.div
          className="text-6xl max-w-[680px] mx-auto font-bold text-center relative font-phudu"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
        >
          Turning your footage into
          <ContainerTextFlip
            className="bg-transparent m-2"
            textClassName="text-6xl"
            words={[
              "powerful stories",
              "reach and revenue ",
              "lasting success",
            ]}
          />
        </motion.div>
        <motion.h1
          className="text-xl text-[#000] font-medium text-center max-w-2xl"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Where creativity meets precision in every frame
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button size={"lg"} className="rounded-full px-8 py-6 text-xl">
            Let&apos;s Go
          </Button>
        </motion.div>
      </div>
      <div className="relative w-full h-30 flex items-center justify-center border-b-0 border-[1.5px]">
        <div className="max-w-5xl mx-auto w-full h-full flex items-center border-l-[1.5px] border-r-[1.5px] justify-center relative">
          {/* Bottom  */}
          {/* <div
          className="absolute top-0 left-0 right-0 h-[1.5px] "
          // style={{
          //   backgroundImage: `repeating-linear-gradient(to right, #CBCBCB 0 8px, transparent 8px 16px)`,
          // }}
        /> */}

          {/* Left border */}
          {/* <div
          className="absolute top-0 bottom-0 left-0 w-[1.5px]"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, #CBCBCB 0 8px, transparent 8px 16px)`,
          }}
        /> */}

          {/* Right border */}
          {/* <div
          className="absolute top-0 bottom-0 right-0 w-[1.5px]"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, #CBCBCB 0 8px, transparent 8px 16px)`,
          }}
        /> */}
          {/* <People /> */}
          <AvatarGroup avatars={sampleAvatars} />
        </div>
      </div>
      <div className="w-full border-[1px]" />
    </div>
  );
};
