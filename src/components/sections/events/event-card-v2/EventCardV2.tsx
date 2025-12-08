"use client";

import { Event } from "@/constants/types/events.type";
import { Card, Box } from "@mui/material";
import { Poppins } from "next/font/google";
import EventCardContentV2 from "./EventCardContentV2";
import EventCardImageV2 from "./EventCardImageV2";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface EventCardV2Props {
  event: Event;
  showGetTicket?: boolean;
  onGetTicketClick?: () => void;
  width?: number;
  height?: number;
  borderRadius?: number;
}

/**
 * EventCardV2 Component - Built with MUI Card components
 *
 * A responsive card component for displaying event information using Material-UI's
 * built-in Card components. Features automatic scaling and proper responsive behavior.
 * Maintains the same visual appearance as the original EventCard but built with
 * MUI's CardMedia and CardContent for proper layout structure.
 */
export default function EventCardV2({
  event,
  showGetTicket = false,
  onGetTicketClick,
  width = 368,
  height = 329,
  borderRadius = 16,
}: EventCardV2Props) {
  // Error handling for invalid event data
  if (!event) {
    console.warn("EventCardV2: No event data provided");
    return null;
  }

  // Calculate proportional image height (approximately 36% of total height)
  const imageHeight = 119;

  return (
    <Card
      sx={{
        width: width,
        height: height,
        borderRadius: `${borderRadius}px`,
        background: `
          linear-gradient(90deg, rgba(6, 35, 59, 0.23) 0%, rgba(16, 96, 161, 0.23) 100%),
          linear-gradient(90deg, rgba(4, 42, 81, 0.096) 19.71%, rgba(2, 28, 64, 0.4) 55.29%)
        `,
        backdropFilter: "blur(11.5px)",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        fontFamily: poppins.style.fontFamily,
        overflow: "hidden",
        position: "relative",
        // Scale all content proportionally
        fontSize: `${width / 368}rem`,
        // Ensure proper MUI Card structure without clickable areas
        cursor: "default",
      }}
    >
      {/* Image using CardMedia for proper MUI structure */}
      <EventCardImageV2 event={event} height={imageHeight} />

      {/* Content Container - centered like original, positioned below image */}
      <Box
        sx={{
          position: "absolute",
          top: `${imageHeight + 17}px`, // Image height + 17px spacing like original
          left: "50%",
          transform: "translateX(-50%)",
          width: 298, // Same as original
          height: 168, // Fixed height as requested
          display: "flex",
          flexDirection: "column",
          gap: "12px", // Same as original
          zIndex: 3,
        }}
      >
        <EventCardContentV2
          event={event}
          showGetTicket={showGetTicket}
          onGetTicketClick={onGetTicketClick}
        />
      </Box>
    </Card>
  );
}
