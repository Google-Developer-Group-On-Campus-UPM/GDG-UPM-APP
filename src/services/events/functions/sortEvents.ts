import { Event } from "@/constants/types/events.type";

export default function sortEvents(
	events: Event[],
	order: "newest" | "oldest",
): Event[] {
	return [...events].sort((a, b) => {
		if (order === "newest") {
			return b.dateStart.getTime() - a.dateStart.getTime();
		} else {
			return a.dateStart.getTime() - b.dateStart.getTime();
		}
	});
}
