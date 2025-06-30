"use client";

import EventsHeader from "./EventsHeader";
import EventsBody from "./EventsBody";
import { Box } from "@mui/material";
import { Event } from "@/constants/types/events.type";

export default function EventsSection() {
  /**
   * Events Section Logic:
   * 1. Fetch events data from Firebase
   * 2. Filter events by status (upcoming, past, ongoing)
   * 3. Handle event search and category filtering
   * 4. Display events in grid/list format
   * 5. Handle event registration and RSVP
   * 6. Show event details in modal or separate page
   */

  // TODO: Implement actual event fetching
  const events: Event[] = []; // Replace with actual event data

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        py: "64px",
      }}
    >
      <EventsHeader />
      <EventsBody events={events} />
    </Box>
  );
}
