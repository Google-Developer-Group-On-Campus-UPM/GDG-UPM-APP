import { DocumentReference } from "firebase/firestore";

interface EventBase {
	id?: string;
	ref?: DocumentReference;
	title: string;
	image: string;
	dateStart: Date;
	dateEnd?: Date;
	mode?: "online" | "physical" | "hybrid";
	location?: string;
	description?: string;
	maxParticipants?: number;
	tags?: {
		tag: string;
		presetColor?: "red" | "indigo";
	}[];
	registrationLink?: string;
	isActive?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UpcomingEvent extends EventBase {
	mode: "online" | "physical" | "hybrid";
	status: "upcoming";
}

export interface PastEvent extends EventBase {
	/** Google Drive link for media or files */
	googleDriveLink: string;
	status: "past";
}

export type Event = UpcomingEvent | PastEvent;
