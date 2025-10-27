"use client";
import { motion } from "framer-motion";

const items = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "About Me", href: "#about" },
];

export const NavContent = () => {
  return (
    <div className="flex items-center gap-x-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.1, ease: "easeOut" },
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.15, ease: "easeOut" },
          }}
          className="relative cursor-pointer"
        >
          <a
            href={item.href}
            className="text-[#747474] hover:text-black selection:bg-black font-sans selection:text-white font-medium transition-colors duration-200 tracking-tight"
          >
            {item.label}
          </a>
        </motion.div>
      ))}
    </div>
  );
};
