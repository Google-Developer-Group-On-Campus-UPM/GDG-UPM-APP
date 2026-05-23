"use client";

import { useEffect, useState } from "react";
import { Event } from "@/constants/types/events.type";
import EventsBody from "./EventsBody";
import EventsFooter from "./EventsFooter";
import EventsHeader from "./EventsHeader";
import EventService from "@/services/events/eventService";

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
					
					// Check if it's a Firestore Timestamp (has toDate method)
					if (dateValue.toDate && typeof dateValue.toDate === 'function') {
						return dateValue.toDate();
					}
					
					// Check if it's already a Date object
					if (dateValue instanceof Date) {
						return dateValue;
					}
					
					// Try to parse as string
					if (typeof dateValue === 'string') {
						return new Date(dateValue);
					}
					
					// For any other case, try to construct a Date
					return new Date(dateValue);
				};
				
				// Convert Firestore timestamps to Date objects
				const convertedEvents = fetchedEvents.map((event) => ({
					...event,
					dateStart: convertToDate(event.dateStart) || new Date(),
					dateEnd: convertToDate(event.dateEnd),
					createdAt: convertToDate(event.createdAt),
					updatedAt: convertToDate(event.updatedAt),
				})) as Event[];
				
				setEvents(convertedEvents);
				setError(null);
			} catch (err) {
				console.error("Failed to fetch events:", err);
				setError("Failed to load events. Please try again later.");
				// Fallback to empty array if fetch fails
				setEvents([]);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	// Fallback mock data for development/demonstration
	const fallbackEvents: Event[] = [
		{
			id: "1",
			title: "Build with AI - Event",
			mode: "physical",
			location: "Universiti Putra Malaysia, Serdang",
			dateStart: new Date("2025-05-24T08:00:00"),
			dateEnd: new Date("2025-05-24T16:30:00"),
			maxParticipants: 100,
			image: "/images/events/figma.png",
			status: "upcoming",
			tags: [
				{ tag: "GenAI", presetColor: "red" },
				{ tag: "Gemini", presetColor: "indigo" },
				{ tag: "Vertex AI", presetColor: "red" },
				{ tag: "NotebookLM", presetColor: "indigo" },
			],
			registrationLink: "#",
			isActive: true,
		},
		{
			id: "2",
			title: "Women In Tech",
			mode: "physical",
			location: "Universiti Putra Malaysia, Serdang",
			dateStart: new Date("2025-06-21T10:00:00"),
			dateEnd: new Date("2025-06-21T16:30:00"),
			maxParticipants: 60,
			image: "/images/events/flutter.png",
			status: "upcoming",
			tags: [
				{ tag: "Networking", presetColor: "red" },
				{ tag: "Workshops", presetColor: "red" },
				{ tag: "AI Resume Builder", presetColor: "indigo" },
			],
			registrationLink: "#",
			isActive: true,
		},
		{
			id: "3",
			title: "Annual Grand Meeting (AGM)",
			mode: "physical",
			location: "Universiti Putra Malaysia, Serdang",
			dateStart: new Date("2025-06-22T18:00:00"),
			dateEnd: new Date("2025-06-22T22:00:00"),
			maxParticipants: 50,
			image: "/images/events/mobileAI.png",
			status: "upcoming",
			tags: [
				{ tag: "Reporting", presetColor: "red" },
				{ tag: "Awards", presetColor: "indigo" },
			],
			registrationLink: "#",
			isActive: true,
		},
		{
			id: "4",
			title: "Flutter Workshop",
			mode: "physical",
			location: "Universiti Putra Malaysia, Serdang",
			dateStart: new Date("2025-07-15T09:00:00"),
			dateEnd: new Date("2025-07-15T17:00:00"),
			maxParticipants: 80,
			image: "/images/events/tailwindcss.png",
			status: "upcoming",
			tags: [
				{ tag: "Mobile", presetColor: "indigo" },
				{ tag: "Flutter", presetColor: "red" },
				{ tag: "Development", presetColor: "indigo" },
			],
			registrationLink: "#",
			isActive: true,
		},
		{
			id: "5",
			title: "UI/UX Design Bootcamp",
			mode: "physical",
			location: "Universiti Putra Malaysia, Serdang",
			dateStart: new Date("2025-08-02T10:00:00"),
			dateEnd: new Date("2025-08-02T18:00:00"),
			maxParticipants: 40,
			image: "/images/events/uiux.png",
			status: "upcoming",
			tags: [
				{ tag: "Design", presetColor: "red" },
				{ tag: "UI", presetColor: "indigo" },
				{ tag: "UX", presetColor: "red" },
				{ tag: "Figma", presetColor: "indigo" },
			],
			registrationLink: "#",
			isActive: true,
		},
	];

	// Use fetched events if available, otherwise use fallback
	const displayEvents = events.length > 0 ? events : fallbackEvents;

	// TODO: Implement CTA button logic
	const handleOnCTAClick = () => {
		/**
		 * Handle CTA button click
		 * 1. Navigate to event creation page
		 * 2. Open modal for event suggestion
		 * 3. Fetch more events from Firebase
		 */
		console.log("CTA Button Clicked");
	};

	if (loading) {
		return (
			<section
				id="events"
				className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
			>
				<div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-12 lg:gap-16">
					<EventsHeader />
					<div className="w-full flex items-center justify-center py-12">
						<p className="text-lg text-gray-600">Loading events...</p>
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
				<EventsBody events={displayEvents} />
				<EventsFooter onCTAClick={handleOnCTAClick} />
			</div>
		</section>
	);
}
