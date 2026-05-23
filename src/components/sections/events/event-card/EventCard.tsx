"use client";

import { Poppins } from "next/font/google";
import { Event } from "@/constants/types/events.type";
import EventCardContent from "./EventCardContent";
import EventCardImage from "./EventCardImage";

const poppins = Poppins({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

interface EventCardProps {
	event: Event;
	showGetTicket?: boolean;
	onGetTicketClick?: () => void;
	width?: number;
	height?: number;
	borderRadius?: number;
}

/**
 * EventCard Component - Built with MUI Card components
 *
 * A responsive card component for displaying event information. Features Apple-style
 * glassmorphic design, smooth interactions, and proper responsive behavior.
 */
export default function EventCard({
	event,
	showGetTicket = false,
	onGetTicketClick,
	width = 368,
	height = 329,
	borderRadius = 24,
}: EventCardProps) {
	if (!event) {
		console.warn("EventCard: No event data provided");
		return null;
	}

	const imageHeight = 119;

	return (
		<div
			className={`relative overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 ${poppins.className}`}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				borderRadius: `${borderRadius}px`,
				background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
				backdropFilter: "blur(20px)",
				WebkitBackdropFilter: "blur(20px)",
				border: "1px solid rgba(255, 255, 255, 0.15)",
				boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
				fontSize: `${width / 368}rem`,
				cursor: "default",
			}}
		>
			<EventCardImage event={event} height={imageHeight} />

			<div
				className="absolute left-1/2 -translate-x-1/2 flex flex-col z-10"
				style={{
					top: `${imageHeight + 17}px`,
					width: "298px",
					height: "168px",
					gap: "12px",
				}}
			>
				<EventCardContent
					event={event}
					showGetTicket={showGetTicket}
					onGetTicketClick={onGetTicketClick}
				/>
			</div>
		</div>
	);
}
