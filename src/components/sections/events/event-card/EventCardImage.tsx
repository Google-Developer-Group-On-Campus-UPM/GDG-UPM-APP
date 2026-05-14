import { Event } from "@/constants/types/events.type";
import Image from "next/image";

interface EventCardImageProps {
	event: Event;
	height?: number;
}

export default function EventCardImage({
	event,
	height = 119,
}: EventCardImageProps) {
	return (
		<div
			className="relative w-full shrink-0 overflow-hidden"
			style={{ height: `${height}px` }}
		>
			<img
				src={event.image || "/images/test.png"}
				alt={event.title}
				className="w-full h-full object-cover object-center"
			/>
			{/* Soft gradient overlay for better text readability and apple-style depth */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
		</div>
	);
}
