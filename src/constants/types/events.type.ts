/**
 * Event Type Definitions
 *
 * This file contains TypeScript type definitions for event-related data structures.
 * These types ensure type safety throughout the application and serve as documentation
 * for the expected data structure.
 */

/**
 * Core Event Interface
 *
 * Represents a single event in the GDG UPM system.
 * Used for displaying events on the website and managing event data.
 */
export interface Event {
  /** Unique identifier for the event */
  id: string;

  /** Event title/name */
  title: string;

  /** Event date and time */
  date: Date; // Use Date object for better date handling

  /** Event location (physical or online) */
  location: string;

  /** Event organizer information */
  organizer: string;

  /** Number of attendees */
  attendeesCount: number;

  /** Event banner/poster image filename (optional) */
  image: string; // Default: "/images/test.png"

  /** Event status */
  status: "upcoming" | "past";

  /** Tags for categorizing and filtering events */
  tags?: string[];

  /** Registration or event page URL (optional) */
  registrationLink?: string; // Default: https://gdg.community.dev/gdg-on-campus-universiti-putra-malaysia-selangor-malaysia/

  /** Whether the event is currently active/visible */
  isActive?: boolean;

  /** Timestamp when the event was created */
  createdAt?: Date;

  /** Timestamp when the event was last updated */
  updatedAt?: Date;
}
