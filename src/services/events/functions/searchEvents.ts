import { Event } from "@/constants/types/events.type";

/**
 * Sort events by date (newest or oldest)
 */
export default function sortEvents(
  events: Event[],
  order: "newest" | "oldest"
): Event[] {
  return [...events].sort((a, b) => {
    if (order === "newest") {
      return b.date.getTime() - a.date.getTime();
    } else {
      return a.date.getTime() - b.date.getTime();
    }
  });
}
