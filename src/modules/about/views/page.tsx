"use client";

import { motion } from "framer-motion";
import { Socials } from "../socials";

export const AboutView = () => {
  return (
    <section
      id="about"
      style={{ scrollMarginTop: "5rem" }}
      className="w-full flex justify-center py-4 lg:py-8 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-5xl w-full rounded-3xl bg-gradient-to-b from-[#1b1b1b] to-[#121212] p-10 sm:p-16 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-10"
        >
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold font-phudu text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 selection-white">
              Hi there, I&apos;m Kuro
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl font-medium text-neutral-200 font-phudu max-w-3xl selection-white"
          >
            I help content creators transform their ideas into visually
            engaging, results-driven videos. From storytelling to editing and
            polishing visuals — I bring creativity and clarity together to make
            your content stand out.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl font-medium text-neutral-200 font-phudu max-w-3xl selection-white"
          >
            Ready to elevate your content? Let&apos;s{" "}
            <motion.span
              className="underline px-[3px] cursor-pointer"
              whileHover={{
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: {
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <a href=" https://x.com/workwithkuro" target="_blank">
                connect
              </a>
            </motion.span>{" "}
            and make it happen!
          </motion.p>

          <motion.div>
            <Socials />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
