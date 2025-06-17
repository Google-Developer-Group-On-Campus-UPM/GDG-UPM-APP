"use client";

import { Event } from "@/constants/types/events.type";
import { Box } from "@mui/material";
import { Poppins } from "next/font/google";
import EventCardContent from "./EventCardContent";
import EventCardImage from "./EventCardImage";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface EventCardProps {
  event: Event;
  showGetTicket?: boolean;
  onGetTicketClick?: () => void;
  width?: number;
  height?: number;
  borderRadius?: number;
}

/**
 * EventCard Component
 *
 * A sophisticated card component for displaying event information with glassmorphism design.
 * Features event image, status, title, location details, tags, and optional ticket action.
 * Follows Material Design principles with custom gradient styling and backdrop blur effects.
 *
 * @example
 * // Basic usage
 * <EventCard event={eventData} />
 *
 * @example
 * // With ticket button and custom dimensions
 * <EventCard
 *   event={eventData}
 *   showGetTicket={true}
 *   onGetTicketClick={() => window.open(event.registrationLink)}
 *   width={400}
 *   height={350}
 * />
 *
 * @example
 * // Custom styling with different radius
 * <EventCard
 *   event={eventData}
 *   borderRadius={20}
 *   showGetTicket={true}
 * />
 *
 * @example
 * // Event with tags and participants
 * <EventCard
 *   event={{
 *     ...eventData,
 *     tags: ["Web Development", "Workshop"],
 *     attendeesCount: 50,
 *     organizer: "GDG UPM"
 *   }}
 * />
 */
export default function EventCard({
  event,
  showGetTicket = false,
  onGetTicketClick,
  width = 368,
  height = 329,
  borderRadius = 16,
}: EventCardProps) {
  // Error handling for invalid event data
  if (!event) {
    console.warn("EventCard: No event data provided");
    return null;
  }
  return (
    <Box
      sx={{
        position: "relative",
        width: width,
        height: height,
        borderRadius: `${borderRadius}px`,
        background: `
          linear-gradient(90deg, rgba(6, 35, 59, 0.23) 0%, rgba(16, 96, 161, 0.23) 100%),
          linear-gradient(90deg, rgba(4, 42, 81, 0.096) 19.71%, rgba(2, 28, 64, 0.4) 55.29%)
        `,
        backdropFilter: "blur(11.5px)",

        // Light border overlay
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: `${borderRadius}px`,
          border: "2px solid rgba(255, 255, 255, 0.1)",
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: "soft-light",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: `${borderRadius}px`,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "hidden",
          fontFamily: poppins.style.fontFamily,
          position: "relative",
          zIndex: 1,
        }}
      >
        <EventCardImage
          event={event}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />

        {/* Details Container - positioned 17px below image */}
        <Box
          sx={{
            position: "absolute",
            top: "136px", // 119px (image height) + 17px spacing
            left: "50%",
            transform: "translateX(-50%)",
            width: 298,
            height: 168,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 3,
          }}
        >
          <EventCardContent
            event={event}
            showGetTicket={showGetTicket}
            onGetTicketClick={onGetTicketClick}
          />
        </Box>
      </Box>
    </Box>
  );
}
