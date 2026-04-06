/**
 * Generate gradient text style for consistent text styling across components
 * @param opacity - The opacity value for the gradient (0-1) - currently not used but kept for compatibility
 * @returns Style object with gradient text properties
 */
export default function getGradientTextStyle(opacity?: number) {
	return {
		background: `linear-gradient(0deg, rgba(240, 240, 240, ${opacity}), rgba(240, 240, 240, ${opacity})),
linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)`,
		backgroundClip: "text",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		color: "transparent", // Fallback for browsers that don't support backgroundClip
	};
}
