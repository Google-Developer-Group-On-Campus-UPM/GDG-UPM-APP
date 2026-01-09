"use client";

import { Event } from "@/constants/types/events.type";
import EventService from "@/services/events/eventService";
import { useState, useEffect } from "react";
import { Add, Edit, Delete } from "@mui/icons-material";
import { handleDelete, BasicModal } from "./eventHandlers";

type EventsManagerProps = {
  role: string;
};

const service = new EventService();

export default function EventsManager({ role }: EventsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (role !== "admin" && role !== "editor") {
    return <div>Unauthorised</div>;
  }

  const loadData = async () => {
    try {
      const events = await service.getEvents();
      setEvents(events);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="text-xl font-semibold">Events</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer">
          <Add className="w-5 h-5"></Add>
          Add New
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {event.title}
                </div>
                <div className="text-sm text-gray-500">{event.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.dateStart.toString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    event.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-blue-600 hover:text-blue-900 mr-3 hover:cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event)}
                  className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                >
                  <Delete className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BasicModal
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        type={"events"}
      />
    </div>
  );
}
