import {
	CollectionReference,
	collection,
	DocumentData,
	DocumentReference,
	QueryConstraint,
	where,
	CollectionReference,
	collection,
	DocumentData,
	DocumentReference,
	QueryConstraint,
	where,
} from "firebase/firestore";
import { Event } from "@/constants/types/events.type";
import { Event } from "@/constants/types/events.type";

import BaseService from "../firebase/baseService";
import { db } from "../firebase/firebase";
import { db } from "../firebase/firebase";

class EventService extends BaseService {
	eventsCollection: CollectionReference<DocumentData>;
	eventsCollection: CollectionReference<DocumentData>;

	constructor() {
		super();
		this.eventsCollection = collection(db, "events");
	}
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
	async createEvent(event: Event): Promise<DocumentReference> {
		return this.createData(event, this.eventsCollection);
	}

	async updateEvent(
		data: Partial<Event>,
		event: DocumentReference,
	): Promise<boolean> {
		return this.updateData(data, event);
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
	async deleteEvent(event: DocumentReference) {
		return this.deleteData(event);
	}
}

export default EventService;
