import { Event } from "@/constants/types/events.type";
import { FirebaseApp } from "firebase/app";
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";

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
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date.toDate(),
        location: data.location,
        organizer: data.organizer,
        attendeesCount: data.attendeesCount,
        image: data.image || "/images/test.png",
        status: data.status,
        tags: data.tags,
        registrationLink: data.registrationLink,
        isActive: data.isActive,
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
