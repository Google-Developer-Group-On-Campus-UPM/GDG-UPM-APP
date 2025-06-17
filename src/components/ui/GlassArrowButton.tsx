"use client";

import { Box, SxProps, Theme } from "@mui/material";
import Image from "next/image";

interface GlassArrowButtonProps {
  onClick?: () => void;
  size?: number;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  direction?: "left" | "right" | "up" | "down";
  icon?: React.ReactElement;
}

/**
 * GlassArrowButton Component
 *
 * Circular glass morphism button with fading border effect using two-layer approach.
 * Features a border that fades from white to transparent towards bottom right,
 * background blur effect, and semi-transparent white background.
 * Contains a centered icon that can be rotated to point in different directions.
 *
 * @example
 * <GlassArrowButton onClick={() => console.log('clicked')} />
 *
 * @example
 * <GlassArrowButton
 *   direction="right"
 *   size={60}
 *   onClick={() => navigate('next')}
 * />
 *
 * @example
 * <GlassArrowButton
 *   direction="up"
 *   icon={<CustomIcon />}
 * />
 */
export default function GlassArrowButton({
  onClick,
  size = 50,
  sx = {},
  disabled = false,
  direction = "left",
  icon,
}: GlassArrowButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Get rotation angle based on direction (ArrowBackIosNewSharp points left by default)
  const getRotation = () => {
    switch (direction) {
      case "left":
        return 0;
      case "right":
        return 180;
      case "up":
        return 90;
      case "down":
        return -90;
      default:
        return 0;
    }
  };

  // Base layer with fading border gradient
  const baseLayerStyles: SxProps<Theme> = {
    width: size,
    height: size,
    borderRadius: "50%", // Make it circular
    // Gradient border that fades from white to transparent towards bottom left
    background:
      "linear-gradient(215deg, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
    padding: "1px", // Thicker border for more visible effect
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.3s ease",
    "&:hover": !disabled
      ? {
          transform: "translateY(-1px) scale(1.05)",
          background:
            "linear-gradient(215deg, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
        }
      : {},
    "&:active": !disabled
      ? {
          transform: "translateY(0px) scale(0.95)",
          transition: "all 0.1s ease",
        }
      : {},
    ...sx,
  };

  // Inner layer with glass effect
  const innerLayerStyles: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    borderRadius: "50%", // Make it circular
    // Glass morphism effect - completely transparent center
    backgroundColor: "transparent", // No background, only border visible
    backdropFilter: "blur(3px)", // Minimal blur for subtle effect
    WebkitBackdropFilter: "blur(2px)", // Safari support
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // No border on inner layer since we want border-only effect
    border: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
  };

  // Icon styles with rotation and proper centering
  const iconStyles: SxProps<Theme> = {
    color: "black",
    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
    transform: `rotate(${getRotation()}deg)`,
    transition: "transform 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Default icon if none provided
  const displayIcon = icon || (
    <Image
      src="/icons/arrow_left.svg"
      alt="arrow"
      width={size * 0.25}
      height={size * 0.25}
    />
  );

  return (
    <Box component="button" onClick={handleClick} sx={baseLayerStyles}>
      <Box sx={innerLayerStyles}>
        <Box sx={iconStyles}>{displayIcon}</Box>
      </Box>
    </Box>
  );
}
