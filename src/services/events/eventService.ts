/**
 * Event Service
 *
 * Simple service to fetch events data from Firebase
 */

// Your events service logic goes here

/**
 * Event Service Logic:
 * 1. Fetch all events from Firebase
 * 2. Add new event (admin only)
 * 3. Update event (admin only)
 * 4. Delete event (admin only)
 */

// Get all events function
// - Fetch events collection from Firebase
// - Return array of events data

// Get events by status (upcoming, past)
// - Filter events by date
// - Return filtered events data

// Add event (admin only)
// - Take event data
// - Save to Firebase events collection
// - Return success/error

// Update event (admin only)
// - Take event ID and new data
// - Update document in Firebase
// - Return success/error

// Delete event (admin only)
// - Take event ID
// - Remove from Firebase collection
// - Return success/error

import { db } from "../firebase/firebase";
import {
  collection,
  DocumentData,
  CollectionReference,
  DocumentReference,
  QueryConstraint,
  where,
} from "firebase/firestore";

import BaseService from "../firebase/baseService";

import { Event } from "@/constants/types/events.type";

class EventService extends BaseService {
  eventsCollection: CollectionReference<DocumentData>;

  constructor() {
    super();
    this.eventsCollection = collection(db, "events");
  }

  async getEvents(query?: QueryConstraint[]): Promise<Event[]> {
    try {
      return (await this.getData(this.eventsCollection, query)) as Event[];
    } catch (error) {
      console.error("Failed to get events: ", error);
      throw error;
    }
  }

  async getActiveEvents(active: boolean): Promise<Event[]> {
    try {
      return await this.getEvents([where("isActive", "==", active)]);
    } catch (error) {
      console.error("Failed to get active events: ", error);
      throw error;
    }
  }

  async getPastEvents(): Promise<Event[]> {
    try {
      return await this.getEvents([where("status", "==", "past")]);
    } catch (error) {
      console.error("Failed to get past events: ", error);
      throw error;
    }
  }

  async getUpcomingEvents(): Promise<Event[]> {
    try {
      return await this.getEvents([where("status", "==", "upcoming")]);
    } catch (error) {
      console.error("Failed to get upcoming events: ", error);
      throw error;
    }
  }

  async createEvent(event: Event): Promise<DocumentReference> {
    return this.createData(event, this.eventsCollection);
  }

  async updateEvent(
    data: Partial<Event>,
    event: DocumentReference,
  ): Promise<boolean> {
    return this.updateData(data, event);
  }

  async deleteEvent(event: DocumentReference) {
    return this.deleteData(event);
  }
}

export default EventService;
