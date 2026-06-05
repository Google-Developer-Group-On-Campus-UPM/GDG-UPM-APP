"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface FlexImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
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
 * If width/height not provided, uses the image's natural dimensions.
 *
 * @example
 * // Basic usage with auto-sizing (uses image's natural dimensions)
 * <FlexImage
 *   src="/images/hero/Image_1.png"
 *   alt="Hero image"
 * />
 *
 * @example
 * // Custom dimensions
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
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    if (!width || !height) {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
  };

  const containerWidth = width || imageDimensions?.width || 400; // fallback to 400
  const containerHeight = height || imageDimensions?.height || 300; // fallback to 300

  return (
    <Box
      sx={{
        position: "relative",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
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
        onLoad={handleImageLoad}
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
