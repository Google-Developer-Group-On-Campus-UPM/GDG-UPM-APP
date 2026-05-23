import { Box, Typography } from "@mui/material";
import FlexChip from "@/components/ui/FlexChip";

export default function TestimonialsHeader() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				gap: { xs: "12px", md: "16px" },
				width: "100%",
				maxWidth: "800px",
				mx: "auto",
			}}
		>
			<FlexChip content={[{ text: "testimonials" }]} />
			<Typography
				sx={{
					width: "100%",
					fontFamily: "Poppins",
					fontWeight: 500,
					fontSize: { xs: "36px", sm: "44px", md: "55px" },
					lineHeight: "1.2",
					letterSpacing: "-0.03em",
					textAlign: "center",
					background:
						"linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
				}}
			>
				Stories from the
				<br />
				Community
			</Typography>
			<Typography
				sx={{
					width: "100%",
					maxWidth: "660px",
					fontFamily: "Poppins",
					fontWeight: 400,
					fontSize: { xs: "16px", sm: "18px", md: "20px" },
					lineHeight: "1.5",
					textAlign: "center",
					background: "rgba(255, 255, 255, 1)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
				}}
			>
				From Students to Innovators
			</Typography>
		</Box>
	);
}
