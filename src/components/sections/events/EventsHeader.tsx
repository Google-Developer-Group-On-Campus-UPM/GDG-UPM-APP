import { Box, Typography } from "@mui/material";
import FlexChip from "@/components/ui/FlexChip";

export default function EventsHeader() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				gap: "16px",
			}}
		>
			<FlexChip content={[{ text: "events" }]} />
			<Typography
				sx={{
					width: "660.027099609375px",
					height: "55px",
					fontFamily: "Poppins",
					fontWeight: 500,
					fontSize: "55px",
					lineHeight: "100%",
					letterSpacing: "-3%",
					textAlign: "center",
					background:
						"linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
				}}
			>
				Attend our Workshops
			</Typography>
			<Typography
				sx={{
					width: "660.027099609375px",
					height: "52px",
					fontFamily: "Poppins",
					fontWeight: 400,
					fontSize: "20px",
					lineHeight: "130%",
					letterSpacing: "0px",
					textAlign: "center",
					verticalAlign: "middle",
					background: "rgba(255, 255, 255, 1)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
				}}
			>
				What we pursue is not just achievement,
				<br />
				but also community impact
			</Typography>
		</Box>
	);
}
