"use client";

import { Add, Delete, Edit } from "@mui/icons-material";
import { deleteField } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Event } from "@/constants/types/events.type";
import EventService from "@/services/events/eventService";
import { DeleteConfirmationDialog, EditEventModal } from "./Modals";

type EventsManagerProps = {
  role: string;
};

const service = new EventService();

function formatEventDate(value: unknown) {
  if (value instanceof Date) {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate();
  }

  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds?: number }).seconds === "number"
  ) {
    const timestamp = value as { seconds: number; nanoseconds?: number };
    return new Date(
      timestamp.seconds * 1000 + (timestamp.nanoseconds ?? 0) / 1_000_000,
    );
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

export default function EventsManager({ role }: EventsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const loadData = useCallback(async () => {
    try {
      const events = await service.getEvents();
      setEvents(events);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (role !== "admin" && role !== "editor") {
    return (
      <div className="text-red-500 text-xl font-semibold">Unauthorized</div>
    );
  }

  const refreshData = () => {
    setLoading(true);
    loadData();
  };

  const handleSaveEvent = async (updated: {
    title: string;
    description: string;
    mode: Event["mode"];
    location: string;
    dateStart: Date;
    dateEnd?: Date;
    maxParticipants: number;
    image: string;
    status: "upcoming" | "past";
    tags?: Event["tags"];
    registrationLink?: string;
    isActive: boolean;
    googleDriveLink?: string;
    imageGoogleDriveLink?: string;
  }) => {
    try {
      // Clean undefined values
      const cleanData: any = {};
      for (const [key, value] of Object.entries(updated)) {
        if (value !== undefined) {
          cleanData[key] = value;
        }
      }

      if (isAdding) {
        await service.createEvent(cleanData as Event);
        toast.success("Event created successfully.");
      } else if (selectedEvent?.ref) {
        // If we are updating an existing event, we must delete fields that are specific to the other status
        if (cleanData.status === "upcoming") {
          cleanData.googleDriveLink = deleteField();
          cleanData.imageGoogleDriveLink = deleteField();
        } else if (cleanData.status === "past") {
          cleanData.mode = deleteField();
          cleanData.location = deleteField();
          cleanData.dateEnd = deleteField();
          cleanData.maxParticipants = deleteField();
          cleanData.image = deleteField();
          cleanData.registrationLink = deleteField();
        }
        await service.updateEvent(cleanData as any, selectedEvent.ref);
        toast.success("Event updated successfully.");
      }

      setSelectedEvent(null);
      setIsAdding(false);
      refreshData();
    } catch (error: any) {
      toast.error("Failed to save event: " + error.message);
    }
  };

  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track and manage all event records.
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl bg-[#026cba] px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-[#015b9b] dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
          onClick={() => setIsAdding(true)}
          aria-label="Add new event"
        >
          <Add className="w-5 h-5"></Add>
          Add New
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="max-h-[68vh] overflow-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {event.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {event.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {(() => {
                      const date = formatEventDate(event.dateStart);

                      return date
                        ? date.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Invalid date";
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <span
                        className={`px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full ${
                          event.status === "upcoming"
                            ? "bg-[#026cba]/10 text-[#026cba] dark:bg-[#026cba]/20 dark:text-sky-200"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {event.status}
                      </span>
                      <span
                        className={`px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full ${
                          event.isActive !== false
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400"
                        }`}
                      >
                        {event.isActive !== false ? "Active" : "Draft"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="mr-3 text-slate-600 hover:cursor-pointer hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      aria-label={`Edit ${event.title}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEventToDelete(event)}
                      className="text-rose-600 hover:cursor-pointer hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
                      aria-label={`Delete ${event.title}`}
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditEventModal
        open={!!selectedEvent || isAdding}
        onClose={() => {
          setSelectedEvent(null);
          setIsAdding(false);
        }}
        eventItem={selectedEvent}
        onSave={handleSaveEvent}
      />
      <DeleteConfirmationDialog
        open={!!eventToDelete}
        title="Delete Event"
        itemName={eventToDelete?.title ?? ""}
        onClose={() => setEventToDelete(null)}
        onConfirm={async () => {
          if (eventToDelete) {
            try {
              if (eventToDelete.ref)
                await service.deleteEvent(eventToDelete.ref);
              toast.success("Event deleted successfully.");
              refreshData();
            } catch (err: any) {
              toast.error("Failed to delete event: " + err.message);
            }
          }
        }}
      />
    </div>
  );
}
