import { DocumentReference } from "firebase/firestore";
export interface UpcomingEvent {
	id?: string;
	ref?: DocumentReference;
	title: string;
	description?: string;
	mode: "online" | "physical" | "hybrid";
	location: string;
	dateStart: Date;
	dateEnd?: Date;
	maxParticipants: number;
	image: string;
	status: "upcoming" | "past";
	tags?: {
		tag: string;
		presetColor?: "red" | "indigo";
	}[];
	registrationLink?: string;
	isActive?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
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
