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
export interface UpcomingEvent {
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
  status: "upcoming";

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

  /** Description text */
  description?: string;
}

export interface PastEvent {
  /** Unique identifier for the event */
  id?: string;

  ref?: DocumentReference;

  /** Event title/name */
  title: string;

  /** Event banner/poster image filename */
  image: string;

  /** Google Drive link for media or files */
  googleDriveLink: string;

  /** Event start date and time */
  dateStart: Date;

  /** Event status */
  status: "past";

  // Optional fields for flexibility/backward compatibility with existing systems
  mode?: "online" | "physical" | "hybrid";
  location?: string;
  dateEnd?: Date;
  ticketType?: string;
  maxParticipants?: number;
  tags?: {
    tag: string;
    presetColor?: "red" | "indigo";
  }[];
  registrationLink?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
}

export type Event = UpcomingEvent | PastEvent;
