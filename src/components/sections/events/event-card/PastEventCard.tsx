"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { PastEvent } from "@/constants/types/events.type";
import { getGoogleDriveDirectLink } from "@/lib/utils";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface PastEventCardProps {
  event: PastEvent;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export default function PastEventCard({
  event,
  width = 400,
  height = 500,
  borderRadius = 24,
}: PastEventCardProps) {
  if (!event) return null;

  // Retrieve the google drive link safely from the past event union type
  const driveLink = "googleDriveLink" in event ? event.googleDriveLink : "#";

  return (
    <Link
      href={driveLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden flex flex-col group select-none max-w-full hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] ${poppins.className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        cursor: "pointer",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Background Image - spans the entire card, absolutely positioned in the background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            getGoogleDriveDirectLink(event.imageGoogleDriveLink) ||
            "/images/test.png"
          }
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          priority
        />
        {/* Soft, dark gradient at the top that fades to 0% transparency (fully clear) right after the 140px title area */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Top Content: occupies exactly 140px, containing only the title */}
      <div
        className="relative z-10 flex items-start text-left px-8 pt-8 shrink-0"
        style={{ height: "140px" }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug line-clamp-3">
          {event.title}
        </h3>
      </div>

      {/* Empty space filling the rest of the 500px tall card */}
      <div className="flex-1 relative z-10" />
    </Link>
  );
}
