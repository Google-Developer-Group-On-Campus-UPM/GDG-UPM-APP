import { Clock, MapPin, Users } from "lucide-react";
import { Event } from "@/constants/types/events.type";
import formatDateWithTime from "./functions/util/formatDateWithTime";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardDetailsProps {
  event: Event;
}

export default function EventCardDetails({ event }: EventCardDetailsProps) {
  const getEventType = () => {
    switch (event.mode) {
      case "online":
        return "Online";
      case "hybrid":
        return "Hybrid";
      default:
        return "Physical";
    }
  };

  const gradientStyle = getGradientTextStyle(0.47);

  return (
    <div className="flex flex-col">
      {/* Location Row */}
      <div className="flex items-center gap-2 mb-1">
        <MapPin size={12} className="shrink-0 text-white/70" />
        <span
          className="font-normal text-xs leading-snug text-left"
          style={gradientStyle}
        >
          {getEventType()}, {event.location}
        </span>
      </div>

      {/* Date Row */}
      <div className="flex items-center gap-2 mb-1">
        <Clock size={12} className="shrink-0 text-white/70" />
        <span
          className="font-normal text-xs leading-snug text-left"
          style={gradientStyle}
        >
          {event.dateStart &&
            event.dateEnd &&
            formatDateWithTime(event.dateStart, event.dateEnd)}
        </span>
      </div>

      {/* Organizer/Participants Row */}
      {(event.ticketType || event.maxParticipants) && (
        <div className="flex items-center gap-2 mb-1">
          <Users size={12} className="shrink-0 text-white/70" />
          <span
            className="font-normal text-xs leading-snug text-left"
            style={gradientStyle}
          >
            {event.ticketType}
            {event.ticketType && event.maxParticipants && ", "}
            {event.maxParticipants > 0 &&
              `${event.maxParticipants} participants`}
          </span>
        </div>
      )}
    </div>
  );
}
