import { FirebaseApp } from "firebase/app";
import {
	collection,
	Firestore,
	getDocs,
	getFirestore,
	Timestamp,
} from "firebase/firestore";
import { Event } from "@/constants/types/events.type";
import { LINKS } from "@/constants/links";

/**
 * Firestore document data structure
 */
interface FirestoreEventData {
	title?: string;
	mode?: "online" | "physical" | "hybrid";
	location?: string;
	dateStart?: Timestamp;
	dateEnd?: Timestamp;
	ticketType?: string;
	maxParticipants?: number;
	image?: string;
	status?: "upcoming" | "past";
	tags?: (
		| string
		| {
				tag?: string;
				name?: string;
				presetColor?: "red" | "indigo";
				color?: "red" | "indigo";
		  }
	)[];
	registrationLink?: string;
	isActive?: boolean;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
}

/**
 * Fetches all events from Firebase
 * @param firebaseApp - The Firebase app instance
 * @returns Promise<Event[]> - Array of all events
 */
export default async function getEvents(
	firebaseApp: FirebaseApp,
): Promise<Event[]> {
	try {
		const db: Firestore = getFirestore(firebaseApp);
		const eventsCollection = collection(db, "events");
		const eventsSnapshot = await getDocs(eventsCollection);

		const events: Event[] = eventsSnapshot.docs.map((doc) => {
			const data = doc.data() as FirestoreEventData;
			return {
				id: doc.id,
				title: data.title || "",
				mode: data.mode || "physical",
				location: data.location || "",
				dateStart: data.dateStart?.toDate() || new Date(),
				dateEnd: data.dateEnd?.toDate(),
				ticketType: data.ticketType || "Free",
				maxParticipants: data.maxParticipants || 0,
				image: data.image || "/images/test.png",
				status: data.status || "upcoming",
				tags: data.tags
					? data.tags.map((tag) => ({
							tag: typeof tag === "string" ? tag : tag.tag || tag.name || "",
							presetColor:
								typeof tag === "object"
									? tag.presetColor || tag.color
									: undefined,
						}))
					: undefined,
				registrationLink:
					data.registrationLink || LINKS.COMMUNITY_PLATFORM,
				isActive: data.isActive !== undefined ? data.isActive : true,
				createdAt: data.createdAt?.toDate(),
				updatedAt: data.updatedAt?.toDate(),
			};
		});

		return events;
	} catch (error) {
		console.error("Error fetching events:", error);
		return [];
	}
}
