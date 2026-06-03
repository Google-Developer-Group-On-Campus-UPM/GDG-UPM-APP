import EventsBody from "@/components/sections/events/EventsBody";
import { MOCK_EVENTS } from "@/constants/mockEvents";
import { Event } from "@/constants/types/events.type";
import EventService from "@/services/events/eventService";

export default async function EventsPage() {
  let eventsToDisplay: Event[] = [];

  try {
    const eventService = new EventService();
    const fetchedEvents = await eventService.getEvents();

    const convertToDate = (dateValue: any): Date | undefined => {
      if (!dateValue) return undefined;
      if (dateValue.toDate && typeof dateValue.toDate === "function") {
        return dateValue.toDate();
      }
      if (dateValue instanceof Date) {
        return dateValue;
      }
      return new Date(dateValue);
    };

    eventsToDisplay = fetchedEvents
      .filter((event) => event.isActive !== false)
      .map((event) => {
        const { ref, ...rest } = event;
        return {
          ...rest,
          dateStart: convertToDate(event.dateStart) || new Date(),
          dateEnd: convertToDate(event.dateEnd),
          createdAt: convertToDate(event.createdAt),
          updatedAt: convertToDate(event.updatedAt),
        };
      }) as Event[];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    eventsToDisplay = MOCK_EVENTS;
  }

  return (
    <div className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Events
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl">
            Explore our upcoming workshops, hands-on study jams, and see our
            past tech achievements.
          </p>
        </div>

        {/* Events Explorer Grid */}
        <EventsBody events={eventsToDisplay} layout="grid" />
      </div>
    </div>
  );
}
