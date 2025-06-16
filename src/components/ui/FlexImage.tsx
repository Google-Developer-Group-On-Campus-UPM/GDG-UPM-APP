"use client";

import { Box } from "@mui/material";
import Image from "next/image";

interface FlexImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  zoom?: number;
  radius?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  transformOrigin?: string;
}

/**
 * FlexImage Component
 *
 * A simple image component with fixed dimensions that scale naturally with browser zoom.
 * Features an inner border overlay and optional zoom control for users.
 *
 * @example
 * // Basic usage
 * <FlexImage
 *   src="/images/hero/Image_1.png"
 *   alt="Hero image"
 *   width={600}
 *   height={400}
 * />
 *
 * @example
 * // With user zoom and custom radius
 * <FlexImage
 *   src="/images/events/kitahack.png"
 *   alt="Event image"
 *   width={400}
 *   height={300}
 *   zoom={1.2}
 *   radius={50}
 * />
 */
export default function FlexImage({
  src,
  alt = "image",
  width,
  height,
  zoom = 1,
  radius = 76,
  objectFit = "cover",
  objectPosition = "center",
  transformOrigin = "center",
}: FlexImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: `${radius}px`,
          border: "2px solid rgba(255, 255, 255, 0.35)", // 35% white border
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: "soft-light",
          boxSizing: "border-box",
        },
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: objectFit,
          objectPosition: objectPosition,
          transform: `scale(${zoom})`,
          transformOrigin: transformOrigin,
        }}
      />
    </Box>
  );
}
