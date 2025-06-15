"use client";

import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface TextPart {
  text: string;
  href?: string;
}

interface FlexChipProps {
  content: TextPart[];
  logo?: ReactElement | string;
  logoPosition?: "left" | "right" | "top" | "bottom";
  paddingX?: number;
  paddingY?: number;
  marginX?: number;
  marginY?: number;
  backgroundColor?: string;
}

/**
 * FlexChip Component
 *
 * A flexible, customizable chip component with support for mixed text content,
 * clickable links, and adjustable logo positioning.
 *
 * @example
 * // Basic usage with mixed text and links
 * <FlexChip
 *   content={[
 *     { text: "Visit" },
 *     { text: "our website", href: "https://gdg.dev" },
 *     { text: "for more info" }
 *   ]}
 * />
 *
 * @example
 * // Logo on the right with custom spacing
 * <FlexChip
 *   content={[{ text: "Custom layout" }]}
 *   logoPosition="right"
 *   paddingX={20}
 *   paddingY={12}
 *   marginX={8}
 * />
 *
 * @example
 * // Logo on top with custom icon
 * <FlexChip
 *   content={[{ text: "Stacked layout" }]}
 *   logo={<CustomIcon />}
 *   logoPosition="top"
 * />
 * @example
 * // Multiple links in one chip
 * <FlexChip
 *   content={[
 *     { text: "Check out" },
 *     { text: "GitHub", href: "https://github.com" },
 *     { text: "and" },
 *     { text: "Google", href: "https://google.com" },
 *     { text: "for resources" }
 *   ]}
 *   paddingX={16}
 *   paddingY={10}
 * />
 *
 * @example
 * // With subtle background color
 * <FlexChip
 *   content={[{ text: "Highlighted chip" }]}
 *   backgroundColor="rgba(255, 255, 255, 0.1)"
 * />
 */
export default function FlexChip({
  content,
  logo,
  logoPosition = "left",
  paddingX = 12,
  paddingY = 8,
  marginX = 1,
  marginY = 1,
  backgroundColor,
}: FlexChipProps) {
  const defaultLogo = (
    <Image
      src="/globe.svg"
      alt="globe"
      width={16}
      height={16}
      style={{ borderRadius: "50%" }}
    />
  );

  const logoElement = logo || defaultLogo;
  const renderContent = () => {
    return content.map((part, index) => (
      <Typography
        key={index}
        component="span"
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "inherit",
          textDecoration: part.href ? "underline" : "none",
          fontStyle: part.href ? "italic" : "normal",
          cursor: part.href ? "pointer" : "default",
          borderRadius: part.href ? "4px" : "0",
          whiteSpace: "nowrap",
          "&:hover": part.href
            ? {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }
            : {},
        }}
        onClick={part.href ? () => window.open(part.href, "_blank") : undefined}
      >
        {part.text}
      </Typography>
    ));
  };

  const flexDirection = () => {
    switch (logoPosition) {
      case "top":
        return "column";
      case "bottom":
        return "column-reverse";
      case "right":
        return "row-reverse";
      default:
        return "row";
    }
  };

  const gap =
    logoPosition === "top" || logoPosition === "bottom" ? "4px" : "8px";

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: flexDirection(),
        alignItems: "center",
        gap: gap,
        padding: `${paddingY}px ${paddingX}px`,
        margin: `${marginY}px ${marginX}px`,
        borderRadius: "20px",
        border: "1px solid white",
        color: "white",
        backgroundColor: backgroundColor || "transparent",
        boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
        fontFamily: poppins.style.fontFamily,
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "0%",
      }}
    >
      {typeof logoElement === "string" ? (
        <Image src={logoElement} alt="logo" width={16} height={16} />
      ) : (
        logoElement
      )}
      {renderContent()}
    </Box>
  );
}
