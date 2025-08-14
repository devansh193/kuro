"use client";
import { motion } from "framer-motion";

const items = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "About Me", href: "#projects" },
];

export const NavContent = () => {
  return (
    <div className="flex items-center gap-x-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.25, ease: "easeOut" },
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.15, ease: "easeOut" },
          }}
          className="relative cursor-pointer"
        >
          <span className="text-[#747474] hover:text-black font-medium transition-colors duration-200 tracking-tight">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
