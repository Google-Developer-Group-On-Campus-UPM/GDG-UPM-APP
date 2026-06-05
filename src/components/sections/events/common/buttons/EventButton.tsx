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

interface EventButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  width?: number;
  height?: number;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  logo?: ReactElement | string;
  logoPosition?: "left" | "right";
  logoSize?: number;
  gap?: number;
}

/**
 * EventButton Component
 *
 * Button with gradient border effect using two-layer approach.
 * Active: gradient background, Inactive: black background.
 * Supports optional logo with customizable positioning.
 * Automatically expands width to prevent text overflow while respecting minimum width.
 *
 * @example
 * <EventButton active onClick={() => console.log('clicked')}>
 *   Active Button
 * </EventButton>
 *
 * @example
 * <EventButton
 *   logo="/icons/star.svg"
 *   logoPosition="left"
 *   width={250}
 * >
 *   Button with Logo
 * </EventButton>
 *
 * @example
 * <EventButton
 *   width={150}
 * >
 *   Very Long Button Text That Would Overflow
 * </EventButton>
 *
 * @example
 * <EventButton
 *   logo={<CustomIcon />}
 *   logoPosition="right"
 *   gap={12}
 * >
 *   Custom Logo
 * </EventButton>
 */
export default function EventButton({
  children,
  active = false,
  onClick,
  width,
  height = 44,
  sx = {},
  disabled = false,
  logo,
  logoPosition = "left",
  logoSize = 20,
  gap = 8,
}: EventButtonProps) {
  const defaultMinWidth = 128;
  const buttonMinWidth = width || defaultMinWidth;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Calculate content width to ensure it fits
  // This is an approximation based on typical character widths
  const estimateContentWidth = () => {
    const textContent = typeof children === "string" ? children : "";
    const avgCharWidth = 12; // Approximate width per character at 20px font size
    const textWidth = textContent.length * avgCharWidth;
    const logoWidth = logo ? logoSize : 0;
    const gapWidth = logo ? gap : 0;
    const paddingWidth = 50; // 25px * 2
    const borderWidth = 3; // 1.5px * 2

    return textWidth + logoWidth + gapWidth + paddingWidth + borderWidth;
  };

  const estimatedWidth = estimateContentWidth();

  // Base layer with gradient border
  const baseLayerStyles: SxProps<Theme> = {
    minWidth: buttonMinWidth,
    width: width ? Math.max(width, estimatedWidth) : "fit-content",
    maxWidth: "100%",
    height: height,
    borderRadius: "10px",
    background: "linear-gradient(90deg, #67A4D5 0%, #ADEDFF 100%)",
    padding: "1.5px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease",
    "&:hover": !disabled
      ? {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(103, 164, 213, 0.3)",
        }
      : {},
    // Press down effect
    "&:active": !disabled
      ? {
          transform: "translateY(1px) scale(0.98)",
          boxShadow: "0 2px 6px rgba(103, 164, 213, 0.2)",
          transition: "all 0.1s ease",
        }
      : {},
    ...sx,
  };

  // Inner layer (content background)
  const innerLayerStyles: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    borderRadius: "8.5px",
    background: active
      ? "linear-gradient(90deg, #06233B 0%, #1060A1 100%)"
      : "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: logoPosition === "right" ? "row-reverse" : "row",
    gap: logo ? `${gap}px` : 0,
    paddingTop: "6px",
    paddingRight: "25px",
    paddingBottom: "6px",
    paddingLeft: "25px",
    overflow: "visible",
  };

  // Logo rendering function
  const renderLogo = () => {
    if (!logo) return null;

    if (typeof logo === "string") {
      return (
        <Image
          src={logo}
          alt="button logo"
          width={logoSize}
          height={logoSize}
          style={{
            flexShrink: 0,
            filter: "brightness(0) invert(1)", // Makes logo white to match text gradient
          }}
        />
      );
    }

    return logo;
  };

  // Text gradient styles
  const textStyles: SxProps<Theme> = {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "140%",
    letterSpacing: "-3%",
    background:
      "linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.46) 114.98%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  return (
    <Box component="button" onClick={handleClick} sx={baseLayerStyles}>
      <Box sx={innerLayerStyles}>
        {renderLogo()}
        <Typography component="span" sx={textStyles}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
