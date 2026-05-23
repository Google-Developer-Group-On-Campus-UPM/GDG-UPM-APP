"use client";

import { Box } from "@mui/material";
import { Event } from "@/constants/types/events.type";
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

	// TODO: Implement actual event fetching
	const events: Event[] = [
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
			<EventsBody events={events} />
			<EventsFooter onCTAClick={handleOnCTAClick} />
		</Box>
	);
}
