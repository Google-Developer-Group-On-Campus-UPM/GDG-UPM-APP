"use client";

import { useEffect, useState } from "react";
import { MOCK_EVENTS } from "@/constants/mockEvents";
import { Event } from "@/constants/types/events.type";
import EventsBody from "./EventsBody";
import EventsFooter from "./EventsFooter";
import EventsHeader from "./EventsHeader";
import EventService from "@/services/events/eventService";

export default function EventsSection() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);
				const eventService = new EventService();
				const fetchedEvents = await eventService.getActiveEvents(true);

				// Helper function to convert Firestore Timestamp or other date formats to Date
				const convertToDate = (dateValue: any): Date | undefined => {
					if (!dateValue) return undefined;

					if (
						dateValue.toDate &&
						typeof dateValue.toDate === "function"
					) {
						return dateValue.toDate();
					}

					if (dateValue instanceof Date) {
						return dateValue;
					}

					if (typeof dateValue === "string") {
						return new Date(dateValue);
					}

					return new Date(dateValue);
				};

				const convertedEvents = fetchedEvents.map((event) => ({
					...event,
					dateStart:
						convertToDate(event.dateStart) || new Date(),
					dateEnd: convertToDate(event.dateEnd),
					createdAt: convertToDate(event.createdAt),
					updatedAt: convertToDate(event.updatedAt),
				})) as Event[];

				setEvents(convertedEvents);
				setError(null);
			} catch (err) {
				console.error("Failed to fetch events:", err);
				setError(
					"Failed to load events. Please try again later."
				);
				setEvents(MOCK_EVENTS);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	/**
	 * Events Section Logic:
	 * 1. Fetch events data from Firebase
	 * 2. Filter events by status (upcoming, past, ongoing)
	 * 3. Handle event search and category filtering
	 * 4. Display events in grid/list format
	 * 5. Handle event registration and RSVP
	 * 6. Show event details in modal or separate page
	 */

	if (loading) {
		return (
			<section
				id="events"
				className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
			>
				<div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-12 lg:gap-16">
					<EventsHeader />
					<div className="w-full flex items-center justify-center py-12">
						<p className="text-lg text-gray-600">
							Loading events...
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section
				id="events"
				className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
			>
				<div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-12 lg:gap-16">
					<EventsHeader />
					<div className="w-full flex items-center justify-center py-12">
						<p className="text-lg text-red-600">{error}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="events"
			className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
		>
			<div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-12 lg:gap-16">
				<EventsHeader />
				<EventsBody events={events} />
				<EventsFooter />
			</div>
		</section>
	);
}
