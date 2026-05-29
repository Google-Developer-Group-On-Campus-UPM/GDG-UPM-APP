"use client";

import { MOCK_EVENTS } from "@/constants/mockEvents";
import EventsBody from "./EventsBody";
import EventsFooter from "./EventsFooter";
import EventsHeader from "./EventsHeader";

export default function EventsSection() {
	/**
	 * Events Section Logic:
	 * 1. Fetch events data from Firebase
	 * 2. Filter events by status (upcoming, past, ongoing)
	 * 3. Handle event search and category filtering
	 * 4. Display events in grid/list format
	 * 5. Handle event registration and RSVP
	 * 6. Show event details in modal or separate page
	 */

	return (
		<section
			id="events"
			className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
		>
			<div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-12 lg:gap-16">
				<EventsHeader />
				<EventsBody events={MOCK_EVENTS} />
				<EventsFooter />
			</div>
		</section>
	);
}
