"use client";

import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Poppins } from "next/font/google";
import { useRef, useState } from "react";
import { Testimonial } from "@/constants/types/testimonials.type";
import { cn } from "@/lib/utils";
import { parseHighlightedText } from "./utils/parseHighlightedText";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

/* ─── Shared glass card tokens (mirrored from EventCard) ─── */
const GLASS_CARD_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
};

/* ─── Highlight colour per variant ─── */
const HIGHLIGHT_COLOR = {
  video: "#ffffff",
  text: "#FFD427",
} as const;

/* ─── Props ─── */
interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const isVideo = testimonial.variant === "video";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20",
        poppins.className,
        className,
      )}
      style={{
        ...GLASS_CARD_STYLE,
        width: isVideo ? "100%" : "100%",
        maxWidth: isVideo ? "420px" : "280px",
      }}
    >
      {isVideo && testimonial.videoSrc && (
        <VideoPlayer src={testimonial.videoSrc} />
      )}

      <CardBody testimonial={testimonial} isVideo={isVideo} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Video Player — self-contained with AnimatePresence overlay
   ═══════════════════════════════════════════════════════════ */

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl aspect-video">
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        onPlay={() => setPlaying(true)}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        className="w-full h-full object-cover"
      />

      <AnimatePresence>
        {!playing && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-colors hover:bg-black/30"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-neutral-900 transition-transform hover:scale-110">
              <Play size={28} fill="currentColor" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Card Body — renders text content for both variants
   ═══════════════════════════════════════════════════════════ */

function CardBody({
  testimonial,
  isVideo,
}: {
  testimonial: Testimonial;
  isVideo: boolean;
}) {
  const highlightColor = HIGHLIGHT_COLOR[testimonial.variant];

  return (
    <div className="flex flex-col gap-2">
      {/* Title — video variant only */}
      {isVideo && testimonial.title && (
        <h4 className="text-white text-lg font-bold leading-snug">
          {parseHighlightedText(testimonial.title).map((seg, i) => (
            <span
              key={i}
              style={seg.highlight ? { color: highlightColor } : undefined}
            >
              {seg.text}
            </span>
          ))}
        </h4>
      )}

      {/* Description */}
      <p className="text-[15px] leading-relaxed text-white/90">
        {isVideo
          ? testimonial.description
          : parseHighlightedText(testimonial.description).map((seg, i) => (
              <span
                key={i}
                style={
                  seg.highlight
                    ? { color: highlightColor, fontWeight: 600 }
                    : undefined
                }
              >
                {seg.text}
              </span>
            ))}
      </p>

      {/* Divider */}
      <div
        className="border-t border-white/30"
        style={{ width: isVideo ? "100%" : "50%" }}
      />

      {/* Author */}
      <div className="flex items-center gap-3 pt-1">
        {!isVideo && testimonial.avatarSrc && (
          <img
            src={testimonial.avatarSrc}
            alt={testimonial.author}
            className="w-9 h-9 rounded-full object-cover border border-white/20"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-white">
            {testimonial.author}
          </p>
          <p className="text-[11px] text-white/60">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
