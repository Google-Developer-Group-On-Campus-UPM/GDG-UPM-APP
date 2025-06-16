"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

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
 * A responsive, centered image component with customizable zoom, radius, and an elegant inner border.
 * Automatically resizes according to window dimensions while maintaining aspect ratio.
 *
 * @example
 * // Basic usage with auto-sizing
 * <FlexImage
 *   src="/images/hero/Image_1.png"
 *   alt="Hero image"
 * />
 *
 * @example
 * // Custom dimensions with zoom
 * <FlexImage
 *   src="/images/team/lead/dwight.jpg"
 *   alt="Team member"
 *   width={400}
 *   height={300}
 *   zoom={1.2}
 * />
 *
 * @example
 * // Highly rounded corners
 * <FlexImage
 *   src="/images/events/figma.png"
 *   alt="Event image"
 *   radius={100}
 *   zoom={0.8}
 * />
 *
 * @example
 * // Large display with custom radius
 * <FlexImage
 *   src="/images/GDG_Logo.svg"
 *   alt="GDG Logo"
 *   width={600}
 *   height={400}
 *   radius={40}
 * />
 *
 * @example
 * // Zoomed in profile picture
 * <FlexImage
 *   src="/images/team/topboard/AminahAbujiya.jpg"
 *   alt="Profile picture"
 *   width={200}
 *   height={200}
 *   zoom={1.5}
 *   radius={50}
 * />
 *
 * @example
 * // Minimal fit - zooms to show maximum of one dimension
 * <FlexImage
 *   src="/images/hero/Image_1.png"
 *   alt="Hero image"
 *   objectFit="contain"
 *   width={400}
 *   height={300}
 * />
 *
 * @example
 * // Custom positioning - focus on top-left area
 * <FlexImage
 *   src="/images/events/kitahack.png"
 *   alt="Event banner"
 *   objectPosition="top left"
 *   objectFit="cover"
 *   zoom={1.2}
 * />
 *
 * @example
 * // Transform origin for zoom center
 * <FlexImage
 *   src="/images/team/lead/Javan.jpg"
 *   alt="Team lead"
 *   zoom={1.3}
 *   transformOrigin="center top"
 *   objectFit="cover"
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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerWidth = width || Math.min(windowSize.width * 0.8, 800);
  const containerHeight = height || Math.min(windowSize.height * 0.8, 600);

  return (
    <Box
      sx={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        margin: "auto",
        borderRadius: `${radius}px`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: `${radius}px`,
          border: "2px solid rgba(255, 255, 255, 0.35)",
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: "soft-light",
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
          borderRadius: `${radius}px`,
        }}
      />
    </Box>
  );
}
