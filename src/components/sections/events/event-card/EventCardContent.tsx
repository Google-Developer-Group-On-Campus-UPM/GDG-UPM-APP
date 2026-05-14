import { Event } from "@/constants/types/events.type";
import EventCardDetails from "./EventCardDetails";
import EventCardStatus from "./EventCardStatus";
import EventCardTags from "./EventCardTags";
import EventCardTicketButton from "./EventCardTicketButton";
import EventCardTitle from "./EventCardTitle";

interface EventCardContentProps {
	event: Event;
	showGetTicket: boolean;
	onGetTicketClick?: () => void;
}

export default function EventCardContent({
	event,
	showGetTicket,
	onGetTicketClick,
}: EventCardContentProps) {
	return (
		<div className="flex flex-col h-full justify-between">
			{/* Main content at the top */}
			<div className="flex flex-col gap-1">
				<EventCardStatus status={event.status} />
				<EventCardTitle title={event.title} />
				<EventCardDetails event={event} />
				<EventCardTags tags={event.tags} />
			</div>

			{/* Button at bottom left */}
			<div className="flex justify-start">
				<EventCardTicketButton
					showGetTicket={showGetTicket}
					onGetTicketClick={onGetTicketClick}
				/>
			</div>
		</div>
	);
}
