import { Event } from "@/constants/types/events.type";

/**
 * Sort Events Function
 *
 * Sorts events by their date in either newest-first or oldest-first order.
 * Creates a new array without modifying the original events array.
 *
 * @param events - Array of events to sort
 * @param order - Sort order: "newest" (most recent first) or "oldest" (earliest first)
 * @returns Event[] - New array of events sorted by date
 *
 * @example
 * ```typescript
 * // Get all events from Firebase
 * const events = await getEvents(firebaseApp);
 *
 * // Get newest events first (most recent dates first)
 * const newestFirst = sortEvents(events, "newest");
 *
 * // Get oldest events first (earliest dates first)
 * const oldestFirst = sortEvents(events, "oldest");
 * ```
 *
 * @example
 * ```typescript
 * // Chaining with search functionality
 * const events = await getEvents(firebaseApp);
 * const flutterEvents = searchEvents(events, "Flutter");
 * const sortedFlutterEvents = sortEvents(flutterEvents, "newest");
 * ```
 */
export default function sortEvents(
  events: Event[],
  order: "newest" | "oldest",
): Event[] {
  return [...events].sort((a, b) => {
    if (order === "newest") {
      return b.date.getTime() - a.date.getTime();
    } else {
      return a.date.getTime() - b.date.getTime();
    }
  });
}
