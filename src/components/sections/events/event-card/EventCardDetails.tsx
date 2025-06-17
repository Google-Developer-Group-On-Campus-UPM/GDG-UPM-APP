import { Event } from "@/constants/types/events.type";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";
import formatDateWithTime from "./functions/util/formatDateWithTime";

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Location Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Image
          src="icons/location.svg"
          alt="location"
          width={12}
          height={12}
          style={{ flexShrink: 0 }}
        />
        <Typography
          sx={{
            ...getGradientTextStyle(0.47),
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "140%",
            letterSpacing: "0%",
            textAlign: "left",
          }}
        >
          {getEventType()}, {event.location}
        </Typography>
      </Box>

      {/* Date Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Image
          src="icons/clock.svg"
          alt="clock"
          width={12}
          height={12}
          style={{ flexShrink: 0 }}
        />
        <Typography
          sx={{
            ...getGradientTextStyle(0.47),
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "140%",
            letterSpacing: "0%",
            textAlign: "left",
          }}
        >
          {formatDateWithTime(event.dateStart, event.dateEnd)}
        </Typography>
      </Box>

      {/* Organizer/Participants Row */}
      {(event.ticketType || event.maxParticipants) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Image
            src="icons/people.svg"
            alt="people"
            width={12}
            height={12}
            style={{ flexShrink: 0 }}
          />
          <Typography
            sx={{
              ...getGradientTextStyle(0.47),
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "140%",
              letterSpacing: "0%",
              textAlign: "left",
            }}
          >
            {event.ticketType}
            {event.ticketType && event.maxParticipants && ", "}
            {event.maxParticipants > 0 &&
              `${event.maxParticipants} participants`}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
