/**
 * Footer Component
 *
 * The main footer component that appears at the bottom of every page.
 */

"use client";

import { Box, Container, Stack } from "@mui/material";
import FooterBackground from "./footer/FooterBackground";
import FooterBottom from "./footer/FooterBottom";
import FooterHeader from "./footer/FooterHeader";
import FooterLinksSection from "./footer/FooterLinksSection";
import FooterMascot from "./footer/FooterMascot";
import FooterNewsletter from "./footer/FooterNewsletter";

/**
 * Footer Component
 */
export default function Footer() {
	return (
		<Box
			sx={{
				position: "relative",
				background: "#000000",
				overflow: "hidden",
			}}
		>
			{/* Background Image */}
			<FooterBackground />

			{/* Footer Content */}
			<Container
				maxWidth={false}
				sx={{
					position: "relative",
					zIndex: 1,
					px: { xs: "24px", sm: "48px", md: "72px", lg: "120px" },
					py: { xs: "60px", sm: "80px", md: "100px" },
					maxWidth: "1920px",
					margin: "0 auto",
				}}
			>
				<Stack gap="5rem">
					{/* Header Section */}
					<Stack
						direction={{ xs: "column", md: "row" }}
						alignItems="center"
						justifyContent={{ xs: "center", md: "space-between" }}
						sx={{
							gap: { xs: "40px", md: "32px" },
						}}
					>
						<FooterHeader />
						<FooterNewsletter />
					</Stack>

					{/* Links & Mascot Section */}
					<Stack
						direction={{ xs: "column", lg: "row" }}
						justifyContent="space-between"
						alignItems={{ xs: "center", lg: "flex-start" }}
						sx={{
							width: "100%",
							gap: { xs: "60px", md: "80px", lg: "100px" },
						}}
					>
						<FooterLinksSection />
						<FooterMascot />
					</Stack>

					{/* Footer Bottom Section */}
					<FooterBottom />
				</Stack>
			</Container>
		</Box>
	);
}
