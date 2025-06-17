"use client";

import { IconButton, SxProps, Theme } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { MouseEventHandler } from "react";

type ArrowDirection = "left" | "right" | "up" | "down";

interface GlassArrowButtonProps {
  direction?: ArrowDirection;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
}

/**
 * GlassArrowButton Component
 *
 * A glassmorphism circular button with arrow icons based on the provided SVG design.
 * Features backdrop blur, inner shadow, and gradient border effects.
 *
 * @example
 * // Basic usage
 * <GlassArrowButton direction="left" onClick={handlePrevious} />
 *
 * @example
 * // Custom size and styling
 * <GlassArrowButton
 *   direction="right"
 *   size="large"
 *   onClick={handleNext}
 *   sx={{ margin: 2 }}
 * />
 */
export default function GlassArrowButton({
  direction = "left",
  onClick,
  disabled = false,
  size = "medium",
  sx = {},
}: GlassArrowButtonProps) {
  const getIconComponent = () => {
    switch (direction) {
      case "right":
        return <KeyboardArrowRight />;
      case "up":
        return <KeyboardArrowUp />;
      case "down":
        return <KeyboardArrowDown />;
      default: // left
        return <KeyboardArrowLeft />;
    }
  };
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          width: 48,
          height: 48,
          borderRadius: "24px",
          "& .MuiSvgIcon-root": {
            fontSize: "2.5rem", // ~56px for 48px button (doubled from 1.75rem)
          },
        };
      case "large":
        return {
          width: 88,
          height: 88,
          borderRadius: "44px",
          "& .MuiSvgIcon-root": {
            fontSize: "4.5rem", // ~88px for 88px button (doubled from 2.75rem)
          },
        };
      default: // medium
        return {
          width: 64,
          height: 64,
          borderRadius: "32px",
          "& .MuiSvgIcon-root": {
            fontSize: "3.5rem", // ~72px for 64px button (doubled from 2.25rem)
          },
        };
    }
  };
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        position: "relative",
        overflow: "visible", // allow the pseudo‐element to show
        ...getSizeStyles(),
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(20px)",
        border: "none", // we’ll draw our own border via ::after
        color: "#000",
        transition: "transform 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,1)",
          transform: "translateY(-1px)",
        },
        "&:active": {
          backgroundColor: "rgba(255,255,255,1)",
          transform: "translateY(0)",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
          transform: "none",
        },

        // THE MAGIC: a fading ring
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1px", // border thickness
          background:
            "linear-gradient(to bottom left, rgba(255,255,255,0.5), rgba(255,255,255,0))",
          pointerEvents: "none",

          // mask out the center so only the “border” shows
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        },

        // Prevent text selection
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",

        // Custom sx overrides
        ...sx,
      }}
    >
      {getIconComponent()}
    </IconButton>
  );
}
