"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  ctaLink = "#",
  ctaText = "Join Us",
  variant = "floating",
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  ctaLink?: string;
  ctaText?: string;
  variant?: "floating" | "full-width";
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Default true to show at top
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Separate logo from normal links
  const logoItem = navItems.find((item) => item.name === "");
  const linkItems = navItems.filter((item) => item.name !== "");

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Handle window resizing (close mobile menu if user resizes to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      // Keep navbar visible if mobile menu is open
      if (isMobileMenuOpen) {
        setVisible(true);
        return;
      }

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
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
          }}
          transition={{
            duration: 0.4,
            ease: [0.19, 1, 0.22, 1],
          }}
          className={cn(
            variant === "floating"
              ? "fixed inset-x-0 mx-auto z-5000 flex items-center justify-center font-sans top-0 md:top-8 w-full md:w-fit"
              : "fixed inset-x-0 top-0 w-full z-5000 flex items-center justify-center font-sans border-b border-white/10 bg-black/60 backdrop-blur-md",
            className
          )}
        >
          <div
            className={cn(
              variant === "floating"
                ? "flex w-full items-center justify-between md:justify-center md:gap-6 px-6 py-3 md:px-5 md:py-2.5 transition-colors duration-300 backdrop-blur-md rounded-none md:rounded-full shadow-none md:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] bg-black/60 md:bg-black/40"
                : "flex w-full max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 md:py-4 transition-colors duration-300"
            )}
          >
            {/* Logo */}
            {logoItem && (
              <a
                href={logoItem.link}
                className="relative flex items-center gap-2 px-1 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {logoItem.icon && <span className="shrink-0">{logoItem.icon}</span>}
              </a>
            )}

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {linkItems.map((navItem) => (
                <a
                  key={navItem.link}
                  href={navItem.link}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-transparent",
                    navItem.name === "Home" ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  <span>{navItem.name}</span>
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <a
              href={ctaLink}
              target={ctaLink.startsWith("http") ? "_blank" : undefined}
              rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hidden md:flex h-[34px] w-[140px] items-center justify-center rounded-full bg-white text-[13px] font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:cursor-pointer active:scale-[1.1]"
            >
              {ctaText}
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center p-2 text-white/80 transition-colors hover:text-white"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-5001 flex flex-col bg-black/95 md:hidden"
          >
            {/* Top Bar for Overlay (Matches original mobile bar layout) */}
            <div className="flex w-full items-center justify-between px-5 py-3 border-b border-white/30 bg-transparent">
              {/* Logo in overlay */}
              {logoItem && (
                <a
                  href={logoItem.link}
                  className="relative flex items-center gap-2 px-1 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {logoItem.icon && <span className="shrink-0">{logoItem.icon}</span>}
                </a>
              )}
              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center p-2 text-white/80 transition-colors hover:text-white active:scale-90"
                aria-label="Close menu"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable Nav Content */}
            <div className="flex-1 overflow-y-auto w-full">
              <div className="flex min-h-full flex-col items-center justify-start gap-10 px-6 py-16">
                {linkItems.map((navItem, idx) => (
                  <motion.a
                    key={navItem.link}
                    href={navItem.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-semibold tracking-tight text-white/90 transition-colors hover:text-white"
                  >
                    {navItem.name}
                  </motion.a>
                ))}

                <motion.a
                  href={ctaLink}
                  target={ctaLink.startsWith("http") ? "_blank" : undefined}
                  rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: linkItems.length * 0.05, duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-8 flex h-14 w-full max-w-[280px] items-center justify-center rounded-full bg-white text-xl font-semibold text-black transition-all hover:bg-white/90 active:scale-95"
                >
                  {ctaText}
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
