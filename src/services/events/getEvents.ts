import { collection, Firestore, getDocs, Timestamp } from "firebase/firestore";
import { Event } from "@/constants/types/events.type";

import { db } from "../firebase/firebase";

interface FirestoreEventData {
  title?: string;
  mode?: "online" | "physical" | "hybrid";
  location?: string;
  dateStart?: Timestamp;
  dateEnd?: Timestamp;
  maxParticipants?: number;
  image?: string;
  imageGoogleDriveLink?: string;
  googleDriveLink?: string;
  ticketType?: string;
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

export default async function getEvents(): Promise<Event[]> {
  try {
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);

    const events: Event[] = eventsSnapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreEventData;
      const status = data.status || "upcoming";
      const baseEvent = {
        id: doc.id,
        title: data.title || "",
        mode: data.mode || "physical",
        location: data.location || "",
        dateStart: data.dateStart?.toDate() || new Date(),
        dateEnd: data.dateEnd?.toDate(),
        maxParticipants: data.maxParticipants || 0,
        image: data.image || "/images/test.png",
        ticketType: data.ticketType || "",
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
          data.registrationLink ||
          "https://gdg.community.dev/gdg-on-campus-universiti-putra-malaysia-selangor-malaysia/",
        isActive: data.isActive !== undefined ? data.isActive : true,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };

      if (status === "upcoming") {
        return {
          ...baseEvent,
          status: "upcoming" as const,
        } as Event;
      } else {
        return {
          ...baseEvent,
          status: "past" as const,
          imageGoogleDriveLink: data.imageGoogleDriveLink || data.image || "",
          googleDriveLink: data.googleDriveLink || "#",
        } as Event;
      }
    });

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
