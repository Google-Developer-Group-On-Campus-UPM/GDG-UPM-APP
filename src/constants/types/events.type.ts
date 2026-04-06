/**
 * Event Type Definitions
 *
 * This file contains TypeScript type definitions for event-related data structures.
 * These types ensure type safety throughout the application and serve as documentation
 * for the expected data structure.
 */

import { DocumentReference } from "firebase/firestore";

/**
 * Core Event Interface
 *
 * Represents a single event in the GDG UPM system.
 * Used for displaying events on the website and managing event data.
 */
export interface Event {
	/** Unique identifier for the event */
	id?: string;

	ref?: DocumentReference;

	/** Event title/name */
	title: string;

	/** Event mode */
	mode: "online" | "physical" | "hybrid";

	/** Event location (physical or online) */
	location: string;

	/** Event start date and time */
	dateStart: Date;

	/** Event end date and time (optional) */
	dateEnd?: Date;

	/** Ticket information */
	ticketType: string;

	/** Maximum number of participants */
	maxParticipants: number;

	/** Event banner/poster image filename (optional) */
	image: string; // Default: "/images/test.png"

	/** Event status */
	status: "upcoming" | "past";
	/** Tags for categorizing and filtering events */
	tags?: {
		tag: string;
		presetColor?: "red" | "indigo"; // Optional color for the tag
	}[];

	/** Registration or event page URL (optional) */
	registrationLink?: string; // Default: https://gdg.community.dev/gdg-on-campus-universiti-putra-malaysia-selangor-malaysia/

	/** Whether the event is currently active/visible */
	isActive?: boolean;

	/** Timestamp when the event was created */
	createdAt?: Date;

	/** Timestamp when the event was last updated */
	updatedAt?: Date;
}
