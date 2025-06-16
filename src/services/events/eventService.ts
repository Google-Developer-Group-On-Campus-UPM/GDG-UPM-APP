/**
 * Event Service
 *
 * Simple service to fetch events data from Firebase
 */

import { Event } from "@/constants/types/events.type";
import { FirebaseApp } from "firebase/app";
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export class EventService {
  private db: Firestore;

  constructor(firebaseApp: FirebaseApp) {
    this.db = getFirestore(firebaseApp);
  }

  /**
   * Get events by status (upcoming or past)
   */
  async getEventsByStatus(status: "upcoming" | "past"): Promise<Event[]> {
    try {
      const eventsCollection = collection(this.db, "events");
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

      return events.filter((event) => event.status === status);
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }
}
