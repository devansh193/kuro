"use client";
import { DottedBackground } from "@/modules/home/components/ui/dotted-background";
import { ContainerTextFlip } from "@/modules/home/components/ui/text-rotate";
import { AvatarGroup } from "@/components/avatar-group";
import { Button } from "@/components/ui/button";
import { sampleAvatars } from "@/data/sample";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HomeView = () => {
  return (
    <div
      className={cn(
        // Positioning
        "relative",
        // Sizing
        "w-full",
        // Spacing
        "px-2 md:px-0"
      )}
    >
      <div
        className={cn(
          // Sizing
          "max-w-5xl mx-auto min-h-120 md:min-h-150",
          // Spacing
          "px-4 pt-2.5 gap-y-2",
          // Layout
          "flex flex-col items-center justify-center",
          // Positioning
          "relative",
          // Borders
          "border-spaced-vertical border-l-[1.5px] border-r-[1.5px]"
        )}
      >
        <DottedBackground
          className={cn(
            // Positioning
            "absolute inset-0",
            // Layering
            "-z-10"
          )}
        />
        <h1 className="font-semibold text-lg font-phudu selection-black">
          WORK WITH KURO
        </h1>
        <motion.div
          className={cn(
            // Typography
            "text-5xl md:text-6xl font-bold font-phudu text-center selection-black",
            // Sizing/Layout
            "max-w-[680px] mx-auto",
            // Positioning
            "relative"
          )}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          Turning your footage into
          <ContainerTextFlip
            className={cn(
              // Visual
              "bg-transparent",
              // Spacing
              "m-2"
            )}
            textClassName={cn(
              // Typography
              "text-2xl md:text-6xl"
            )}
            words={[
              "powerful stories",
              "reach and revenue ",
              "lasting success",
            ]}
          />
        </motion.div>
        <motion.h1
          className={cn(
            // Typography
            "text-xl text-[#000] font-medium font-phudu text-center selection-black",
            // Sizing
            "max-w-2xl"
          )}
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
          <Button
            size={"lg"}
            className={cn(
              // Shape
              "rounded-full",
              // Spacing
              "px-8 py-6",
              // Typography
              "text-xl"
            )}
          >
            Let&apos;s Go
          </Button>
        </motion.div>
      </div>
      <div
        className={cn(
          // Positioning
          "relative",
          // Sizing
          "w-full h-15 md:h-20",
          // Layout
          "flex items-center justify-center"
        )}
      >
        <div
          className={cn(
            // Sizing
            "max-w-5xl mx-auto w-full h-full",
            // Layout
            "flex items-center justify-center",
            // Positioning
            "relative"
          )}
        >
          {/* Bottom  */}
          <div
            className={cn(
              // Positioning
              "absolute top-0 left-0 right-0",
              // Border
              "border-b-[1.5px] border-spaced-horizontal"
            )}
          />
          {/* Left border */}
          <div
            className={cn(
              // Positioning
              "absolute top-0 bottom-0 left-0",
              // Border
              "border-l-[1.5px] border-spaced-vertical"
            )}
          />
          {/* Right border */}
          <div
            className={cn(
              // Positioning
              "absolute top-0 bottom-0 right-0",
              // Border
              "border-r-[1.5px] border-spaced-vertical"
            )}
          />
          <AvatarGroup size="sm" avatars={sampleAvatars} />
        </div>
      </div>
      <div
        className={cn(
          // Sizing
          "w-full",
          // Border
          "border-b-[1.5px] border-spaced-horizontal"
        )}
      />
    </div>
  );
};
