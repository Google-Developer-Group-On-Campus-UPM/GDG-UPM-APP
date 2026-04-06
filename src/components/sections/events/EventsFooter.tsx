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
				flexDirection: "row",
				alignItems: "flex",
				gap: "24px",
				py: "32px",
			}}
		>
			<Typography
				sx={{
					width: "523px",
					height: "52px",
					fontFamily: "Poppins",
					fontWeight: 400,
					fontSize: "20px",
					lineHeight: "130%",
					letterSpacing: "0px",
					textAlign: "center",
					verticalAlign: "middle",
					color: "rgba(255, 255, 255, 1)",
					maxWidth: "100%",
				}}
			>
				What kind of event do you expect from GDGoCUPM? Share your idea with us!
			</Typography>
			<CTAButton text="Suggest Event" onClick={onCTAClick} />
		</Box>
	);
}
