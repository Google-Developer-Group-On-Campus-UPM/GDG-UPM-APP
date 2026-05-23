import { Button } from "@mui/material";
import { Poppins } from "next/font/google";
import { Event } from "@/constants/types/events.type";

const poppins = Poppins({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

interface EventCardTicketButtonProps {
	showGetTicket: boolean;
	event: Event;
	onGetTicketClick?: (event: Event) => void;
}

export default function EventCardTicketButton({
	showGetTicket,
	event,
	onGetTicketClick,
}: EventCardTicketButtonProps) {
	if (!showGetTicket) return null;

	const href = event.registrationLink?.trim();
	const isExternalLink = Boolean(href);
	return (
		<Button
			variant="text"
			size="small"
			component={isExternalLink ? "a" : "button"}
			href={isExternalLink ? href : undefined}
			target={isExternalLink ? "_blank" : undefined}
			rel={isExternalLink ? "noreferrer" : undefined}
			onClick={
				isExternalLink
					? undefined
					: () => {
						if (onGetTicketClick) {
							onGetTicketClick(event);
						}
					}
			}
			disableRipple
			disabled={!isExternalLink && !onGetTicketClick}
			sx={{
				fontFamily: poppins.style.fontFamily,
				fontWeight: 700,
				fontSize: "0.75rem", // 12px in rem units
				lineHeight: 1.4,
				letterSpacing: 0,
				color: "#FFFFFF",
				textTransform: "none",
				minWidth: "auto",
				borderRadius: "6px",
				alignSelf: "flex-start",
				transition: "all 0.3s ease",
				border: "none",
				background: "transparent",
				position: "relative",
				"&:hover": {
					transform: "translateY(-1px)",
				},
				"&:active": {
					transform: "scale(0.95)", // Subtle scale animation on click
					transition: "transform 0.1s ease",
				},
				// Remove any MUI default styling
				"&:focus": {
					background: "transparent",
				},
			}}
		>
			Get Ticket →
		</Button>
	);
}
