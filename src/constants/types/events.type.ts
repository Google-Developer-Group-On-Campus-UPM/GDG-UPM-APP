import { DocumentReference } from "firebase/firestore";
export interface Event {
	id?: string;
	ref?: DocumentReference;
	title: string;
	description?: string;
	mode: "online" | "physical" | "hybrid";
	location: string;
	dateStart: Date;
	dateEnd?: Date;
	ticketType: string;
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
