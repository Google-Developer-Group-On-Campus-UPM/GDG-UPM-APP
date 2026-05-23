"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Event } from "@/constants/types/events.type";
import getEvents from "@/services/events/getEvents";
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

	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const loadEvents = async () => {
			try {
				const fetchedEvents = await getEvents();
				if (isMounted) {
					setEvents(
						fetchedEvents
							.filter(
								(event) => event.isActive !== false && event.status === "upcoming",
							)
							.sort(
								(a, b) => a.dateStart.getTime() - b.dateStart.getTime(),
							),
					);
				}
			} catch (error) {
				console.error("Failed to load homepage events:", error);
				if (isMounted) {
					setEvents([]);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadEvents();

		return () => {
			isMounted = false;
		};
	}, []);

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

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "48px",
				py: "64px",
			}}
		>
			<EventsHeader />
			{loading ? (
				<Box
					sx={{
						height: "329px",
						display: "grid",
						placeItems: "center",
						borderRadius: "24px",
						border: "1px solid rgba(255, 255, 255, 0.12)",
						background: "rgba(255, 255, 255, 0.04)",
					}}
				>
					Loading events...
				</Box>
			) : (
				<EventsBody events={events} />
			)}
			<EventsFooter onCTAClick={handleOnCTAClick} />
		</Box>
	);
}
