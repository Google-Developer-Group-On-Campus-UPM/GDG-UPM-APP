"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import FlexChip from "@/components/ui/FlexChip";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({
  title,
  description = "We are currently cooking up some premium materials for this page. Stay tuned as we build the premier developer experience!",
}: ComingSoonProps) {
  return (
    <div className="relative min-h-[70vh] w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-24 flex flex-col items-center text-center space-y-8"
      >
        {/* Section Chip */}
        <div className="flex justify-center">
          <FlexChip content={[{ text: "coming soon" }]} />
        </div>

        {/* Glassmorphic Display Card */}
        <div className="w-full max-w-2xl p-8 md:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h1>

          {/* Gradient Divider */}
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

          <p className="text-gray-400 font-light text-base md:text-lg max-w-md leading-relaxed">
            {description}
          </p>

          {/* Back Home CTA Button */}
          <Link
            href="/"
            className="group mt-4 flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-black font-semibold text-sm transition-all duration-200 hover:bg-white/90 active:scale-95 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
