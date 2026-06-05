"use client";

import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface SeeMoreCardProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export default function SeeMoreCard({
  width = 384,
  height = 340,
  borderRadius = 24,
}: SeeMoreCardProps) {
  return (
    <Link
      href="/community/events"
      className={`relative overflow-hidden flex flex-col items-center justify-center text-center group select-none max-w-full hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] ${poppins.className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        background:
          "linear-gradient(135deg, #05162E 0%, #0A2852 60%, #020712 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(66, 133, 244, 0.25)",
        cursor: "pointer",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Ambient Glowing Orbs inside the card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4285F4]/10 via-transparent to-[#EA4335]/5 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-6">
        {/* Visual Circular Icon Container */}
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/20">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>

        {/* Text Block */}
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-tight">
            Explore More
          </h3>
          <p className="text-sm font-light text-white/50 max-w-[200px] leading-relaxed mx-auto">
            Discover our full list of past workshops, talks, and future events.
          </p>
        </div>
      </div>
    </Link>
  );
}
