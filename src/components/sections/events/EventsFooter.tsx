import { Box, Typography } from "@mui/material";
import CTAButton from "@/components/ui/CTAButton";

export default function EventsFooter({
	onCTAClick,
}: {
	onCTAClick: () => void;
}) {
	/**
	 * Events Footer Logic:
	 * 1. Handle CTA button click
	 * 2. Fetch more events or navigate to event creation page
	 * 3. Display footer content
	 */

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				alignItems: "center",
				justifyContent: "center",
				gap: { xs: "20px", md: "24px" },
				py: { xs: "24px", md: "32px" },
				width: "100%",
				maxWidth: "800px",
				mx: "auto",
			}}
		>
			<Typography
				sx={{
					width: "100%",
					maxWidth: "523px",
					height: "auto",
					fontFamily: "Poppins",
					fontWeight: 400,
					fontSize: { xs: "16px", sm: "18px", md: "20px" },
					lineHeight: "1.5",
					textAlign: "center",
					color: "rgba(255, 255, 255, 1)",
				}}
			>
				What kind of event do you expect from GDGoC UPM? Share your idea with us!
			</Typography>
			<Box sx={{ flexShrink: 0 }}>
				<CTAButton text="Suggest Event" onClick={onCTAClick} />
			</Box>
		</Box>
	);
}
