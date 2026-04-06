/**
 * FooterNewsletter Component
 *
 * Renders the newsletter subscription section in the footer.
 */

import { Box, Stack, Typography } from "@mui/material";
import CTAButton from "../../ui/CTAButton";

export default function FooterNewsletter() {
	return (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			alignItems="center"
			gap={{ xs: "20px", sm: "28px" }}
		>
			<Box
				sx={{
					position: "relative",
					width: "14px",
					height: "14px",
					borderRadius: "50%",
					backgroundColor: "#3E3CE4",
					flexShrink: 0,
					boxShadow: "0 0 12px rgba(62, 60, 228, 0.6)",
					"&::before": {
						content: '""',
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "100%",
						height: "100%",
						borderRadius: "50%",
						backgroundColor: "#3E3CE4",
						animation: "pulse 2s ease-in-out infinite",
					},
					"@keyframes pulse": {
						"0%, 100%": {
							transform: "translate(-50%, -50%) scale(1)",
							opacity: 1,
						},
						"50%": {
							transform: "translate(-50%, -50%) scale(1.8)",
							opacity: 0,
						},
					},
				}}
			/>
			<Typography
				sx={{
					fontSize: { xs: "16px", sm: "18px", md: "20px" },
					fontWeight: 500,
					letterSpacing: "0.05em",
					color: "#ffffff",
				}}
			>
				DEVSPOTLIGHT NEWSLETTER
			</Typography>

			{/* TODO: Place correct href link */}
			<CTAButton text="Subscribe" href="/" />
		</Stack>
	);
}
