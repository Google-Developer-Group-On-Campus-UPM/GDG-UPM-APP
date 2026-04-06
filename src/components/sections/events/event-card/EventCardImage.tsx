import { CardMedia } from "@mui/material";
import { Event } from "@/constants/types/events.type";

interface EventCardImageProps {
	event: Event;
	height?: number;
}

export default function EventCardImage({
	event,
	height = 119,
}: EventCardImageProps) {
	return (
		<CardMedia
			component="img"
			height={height}
			image={event.image || "/images/test.png"}
			alt={event.title}
			sx={{
				objectFit: "cover",
				objectPosition: "center",
				flexShrink: 0, // Prevent the image from shrinking
				minHeight: height, // Ensure minimum height
				maxHeight: height, // Prevent expansion
			}}
		/>
	);
}
