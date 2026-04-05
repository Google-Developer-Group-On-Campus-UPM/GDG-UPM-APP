"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useState } from "react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Default true to show at top

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      // Always show at the very top
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        // Show when scrolling up, hide when scrolling down
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          y: visible ? 0 : -20,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
        }}
        className={cn(
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto z-[5000] items-center justify-center font-sans",
          className
        )}
      >
        <div
          className="flex items-center justify-center gap-6 rounded-full border border-white/[0.08] bg-black/40 px-5 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-xl"
        >
          {/* Nav items container */}
          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  navItem.name === ""
                    ? "hover:bg-transparent px-1 py-1" // Logo specific styling: no hover bg, less padding
                    : "hover:bg-transparent", // Standard links get hover bg
                  navItem.name === "Home" || navItem.name === "" ? "text-white" : "text-white/80 hover:text-white"
                )}
              >
                {navItem.icon && <span className="flex-shrink-0">{navItem.icon}</span>}
                {navItem.name && <span className="hidden sm:block">{navItem.name}</span>}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="flex h-[34px] w-[140px] items-center justify-center rounded-full bg-white text-[13px] font-semibold text-black transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            Apply Committee
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
