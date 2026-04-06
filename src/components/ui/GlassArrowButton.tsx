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

	// Base layer with white to transparent gradient
	const baseLayerStyles: SxProps<Theme> = {
		width: size,
		height: size,
		borderRadius: "50%", // Make it circular
		backdropFilter: "blur(4px)", // Minimal blur for subtle effect
		WebkitBackdropFilter: "blur(3px)", // Safari support
		background:
			"linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 80%)",
		border: "none",
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? 0.5 : 1,
		transition: "all 0.3s ease",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transform: `rotate(${getRotation()}deg)`,
		"&:hover": !disabled
			? {
					transform: `rotate(${getRotation()}deg) scale(1.05)`,
				}
			: {},
		"&:active": !disabled
			? {
					transform: `rotate(${getRotation()}deg) scale(0.98)`,
					transition: "all 0.1s ease",
				}
			: {},
		...sx,
	};

	// Inner layer for content centering
	const innerLayerStyles: SxProps<Theme> = {
		width: "95%",
		height: "95%",
		borderRadius: "50%", // Make it circular
		background: "rgba(255, 255, 255, 0.05)", // Semi-transparent white
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
		boxShadow: "none",
	};

	// Icon styles with proper centering (no rotation here)
	const iconStyles: SxProps<Theme> = {
		color: "black",
		filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
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
