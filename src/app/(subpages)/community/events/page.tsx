import EventsBody from "@/components/sections/events/EventsBody";
import { MOCK_EVENTS } from "@/constants/mockEvents";

export default function EventsPage() {
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
        <EventsBody events={MOCK_EVENTS} layout="grid" />
      </div>
    </div>
  );
}
