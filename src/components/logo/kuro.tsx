"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Cursor } from "../cursor";

export function KuroLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const pointerControls = useAnimation();
  const boxControls = useAnimation();

  useEffect(() => {
    let cancelled = false;

    const runSequence = async () => {
      if (isHovered) {
        // Hover enter sequence
        await pointerControls.start({
          opacity: 1,
          scale: 1.1,
          bottom: "-14px",
          right: "-14px",
          rotate: 0,
          transition: { duration: 0.3, ease: "circOut", delay: 0.3 },
        });
        if (cancelled) return;

        await pointerControls.start({
          scale: 0.9,
          transition: { duration: 0.2, ease: "easeOut", delay: 0.4 },
        });
        if (cancelled) return;

        await boxControls.start({
          rotate: 0,
          transition: { duration: 0.3, ease: "easeInOut", delay: 0.5 },
        });
        if (cancelled) return;

        await pointerControls.start({
          scale: 1.1,
          transition: { duration: 0.3, ease: "easeInOut", delay: 0.5 },
        });
        if (cancelled) return;

        await pointerControls.start({
          opacity: 0,
          scale: 0,
          rotate: 90,
          transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
        });
      } else {
        await pointerControls.start({
          opacity: 0,
          scale: 0,
          bottom: "-20px",
          right: "40px",
          rotate: -90,
          transition: { duration: 0.15, ease: "easeInOut" },
        });

        await boxControls.start({
          rotate: -10,
          transition: { duration: 0.2, ease: "easeInOut" },
        });
      }
    };

    runSequence();

    return () => {
      cancelled = true;
      pointerControls.stop();
      boxControls.stop();
    };
  }, [isHovered, pointerControls, boxControls]);

  return (
    <motion.div
      className="group relative inline-block cursor-pointer"
      animate={boxControls}
      initial={{ rotate: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative border-2 border-blue-500 bg-transparent px-1">
        <div className="absolute -top-2 -left-2 size-3 border-2 border-blue-500 bg-white" />
        <div className="absolute -top-2 -right-2 size-3 border-2 border-blue-500 bg-white" />
        <div className="absolute -bottom-2 -left-2 size-3 border-2 border-blue-500 bg-white" />

        <div className="absolute -bottom-2 -right-2 size-3 border-2 border-blue-500 bg-white overflow-visible">
          <motion.div
            style={{
              position: "absolute",
              bottom: -16,
              right: -16,
              width: "60px",
              height: "60px",
              transformOrigin: "bottom right",
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: -90,
              bottom: "-40px",
              right: "20px",
            }}
            animate={pointerControls}
          >
            <div className="absolute bottom-0 right-0">
              <Cursor className="size-[22px] fill-black" />
            </div>
          </motion.div>
        </div>

        <h1 className="text-3xl font-black text-black selection:bg-black selection:text-white">
          kuro
        </h1>
      </div>
    </motion.div>
  );
}
