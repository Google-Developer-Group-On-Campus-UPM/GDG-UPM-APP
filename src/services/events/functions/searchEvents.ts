import { Event } from "@/constants/types/events.type";

/**
 * Search Events Function
 *
 * Filters events based on a search term that matches event titles.
 * The search is case-insensitive and looks for partial matches within event titles.
 *
 * @param events - Array of events to search through
 * @param searchTerm - The search term to filter by (case-insensitive)
 * @returns Event[] - Array of events that match the search term
 *
 * @example
 * ```typescript
 * const events = await getEvents(firebaseApp);
 * const flutterEvents = searchEvents(events, "Flutter");
 * const workshopEvents = searchEvents(events, "workshop");
 * ```
 *
 * @example
 * ```typescript
 * // Returns all events if search term is empty
 * const allEvents = searchEvents(events, "");
 * const allEventsWithSpaces = searchEvents(events, "   ");
 * ```
 *
 * @example
 * ```typescript
 * // Case insensitive search
 * const results1 = searchEvents(events, "flutter");
 * const results2 = searchEvents(events, "FLUTTER");
 * const results3 = searchEvents(events, "FlUtTeR");
 * // All three will return the same results
 * ```
 */
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
