import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Event } from "@/constants/types/events.type";
import formatDateWithTime from "./functions/util/formatDateWithTime";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardDetailsProps {
	event: Event;
}

export default function EventCardDetails({ event }: EventCardDetailsProps) {
	const getEventType = () => {
		switch (event.mode) {
			case "online":
				return "Online";
			case "hybrid":
				return "Hybrid";
			default:
				return "Physical";
		}
	};

	const detailItemStyle = {
		display: "flex",
		alignItems: "center",
		gap: 1, // 8px spacing using MUI spacing units
		marginBottom: 0.5, // 4px spacing between rows
	};

	const iconStyle = {
		flexShrink: 0,
		width: 12,
		height: 12,
	};

	const textStyle = {
		...getGradientTextStyle(0.47),
		fontWeight: 400,
		fontSize: "0.75rem", // 12px in rem units
		lineHeight: 1.4,
		letterSpacing: 0,
		textAlign: "left" as const,
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			{/* Location Row */}
			<Box sx={detailItemStyle}>
				<Image
					src="/icons/location.svg"
					alt="location"
					width={12}
					height={12}
					style={iconStyle}
				/>
				<Typography sx={textStyle}>
					{getEventType()}, {event.location}
				</Typography>
			</Box>

			{/* Date Row */}
			<Box sx={detailItemStyle}>
				<Image
					src="/icons/clock.svg"
					alt="clock"
					width={12}
					height={12}
					style={iconStyle}
				/>
				<Typography sx={textStyle}>
					{event.dateStart &&
						event.dateEnd &&
						formatDateWithTime(event.dateStart, event.dateEnd)}
				</Typography>
			</Box>

			{/* Organizer/Participants Row */}
			{(event.ticketType || event.maxParticipants) && (
				<Box sx={detailItemStyle}>
					<Image
						src="/icons/people.svg"
						alt="people"
						width={12}
						height={12}
						style={iconStyle}
					/>
					<Typography sx={textStyle}>
						{event.ticketType}
						{event.ticketType && event.maxParticipants && ", "}
						{event.maxParticipants > 0 &&
							`${event.maxParticipants} participants`}
					</Typography>
				</Box>
			)}
		</Box>
	);
}
