"use client";

import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { ReactElement } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface TextPart {
  text: string;
  href?: string;
}

interface FlexChipProps {
  content: TextPart[];
  hasLogo?: boolean;
  logo?: ReactElement | string;
  logoPosition?: "left" | "right" | "top" | "bottom";
  preset?: "red" | "indigo";
  sx?: SxProps<Theme>;
  fontSize?: string | number;
  fontFamily?: string;
  fontWeight?: string | number;
  color?: string;
}

/**
 * FlexChip Component
 *
 * A flexible, customizable chip component with support for mixed text content,
 * clickable links, color presets, and adjustable logo positioning.
 * Now supports sx prop for custom styling and Typography-style props.
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
 * // Red preset for error/warning states
 * <FlexChip
 *   content={[{ text: "Error" }]}
 *   preset="red"
 *   hasLogo={false}
 * />
 *
 * @example
 * // Indigo preset for info states
 * <FlexChip
 *   content={[{ text: "Information" }]}
 *   preset="indigo"
 *   hasLogo={false}
 * />
 *
 * @example
 * // Custom styling with sx prop
 * <FlexChip
 *   content={[{ text: "Custom Style" }]}
 *   sx={{
 *     padding: "12px 16px",
 *     borderRadius: "8px",
 *     backgroundColor: "purple"
 *   }}
 *   hasLogo={false}
 * />
 *
 * @example
 * // Typography-style props
 * <FlexChip
 *   content={[{ text: "Large Bold Text" }]}
 *   fontSize="16px"
 *   fontWeight={700}
 *   fontFamily="Inter"
 *   hasLogo={false}
 * />
 *
 * @example
 * // Logo positioning
 * <FlexChip
 *   content={[{ text: "Logo on top" }]}
 *   logoPosition="top"
 * />
 *
 * @example
 * // Multiple links in one chip
 * <FlexChip
 *   content={[
 *     { text: "Check out" },
 *     { text: "GitHub", href: "https://github.com" },
 *     { text: "and" },
 *     { text: "Google", href: "https://google.com" }
 *   ]}
 *   hasLogo={false}
 * />
 */
export default function FlexChip({
  content,
  logo,
  hasLogo = true,
  logoPosition = "left",
  preset,
  sx = {},
  fontSize = "12px",
  fontFamily,
  fontWeight = 400,
  color,
}: FlexChipProps) {
  const defaultLogo = (
    <Image
      src="/icons/globe.svg"
      alt="globe"
      width={16}
      height={16}
      style={{ borderRadius: "50%" }}
    />
  );

  // Logo logic: show logo if hasLogo is true
  const logoElement = hasLogo ? logo || defaultLogo : null; // Color preset logic
  const getPresetColors = () => {
    switch (preset) {
      case "red":
        return {
          color: "#DC2626", // Red-600
          borderColor: "#EF4444", // Red-500
          backgroundColor: "#FEF2F2", // Red-50
        };
      case "indigo":
        return {
          color: "#4F46E5", // Indigo-600
          borderColor: "#6366F1", // Indigo-500
          backgroundColor: "#EEF2FF", // Indigo-50
        };
      default:
        return {
          color: color || "white",
          borderColor: "white",
          backgroundColor: "transparent",
        };
    }
  };

  const presetColors = getPresetColors();
  const chipFont = fontFamily || poppins.style.fontFamily;

  const renderContent = () => {
    return content.map((part, index) => (
      <Typography
        key={index}
        component="span"
        sx={{
          fontFamily: chipFont,
          fontWeight: fontWeight,
          fontSize: fontSize,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "inherit",
          textDecoration: part.href ? "underline" : "none",
          fontStyle: part.href ? "italic" : "normal",
          cursor: part.href ? "pointer" : "default",
          borderRadius: part.href ? "4px" : "0",
          margin: part.href ? "2px" : "0",
          padding: part.href ? "2px" : "0",
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

  const renderTextContent = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {renderContent()}
      </Box>
    );
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
        padding: "8px 12px",
        margin: "1px",
        borderRadius: "20px",
        border: `1px solid ${presetColors.borderColor}`,
        color: presetColors.color,
        backgroundColor: presetColors.backgroundColor,
        boxShadow: preset ? "none" : "0 0 8px rgba(255, 255, 255, 0.3)",
        fontFamily: chipFont,
        fontWeight: fontWeight,
        fontSize: fontSize,
        lineHeight: "100%",
        letterSpacing: "0%",
        ...sx,
      }}
    >
      {logoElement &&
        (typeof logoElement === "string" ? (
          <Image src={logoElement} alt="logo" width={16} height={16} />
        ) : (
          logoElement
        ))}
      {renderTextContent()}
    </Box>
  );
}
