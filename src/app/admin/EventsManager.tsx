"use client";

import { Event } from "@/constants/types/events.type";
import EventService from "@/services/events/eventService";
import { useState } from "react";
import { Edit, Delete } from "@mui/icons-material";

type EventsManagerProps = {
  role: string;
};

const service = new EventService();

export default function EventsManager({ role }: EventsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

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

  loadData();

  if (loading) return <p>Loading...</p>;
  return (
    <div>
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
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Delete className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
