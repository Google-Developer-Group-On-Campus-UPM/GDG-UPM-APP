import { Event } from "@/constants/types/events.type";

export default function searchEvents(
	events: Event[],
	searchTerm: string,
): Event[] {
	if (!searchTerm.trim()) {
		return events;
	}

	const lowerSearchTerm = searchTerm.toLowerCase();
	return events.filter((event) =>
		event.title.toLowerCase().includes(lowerSearchTerm),
	);
}
