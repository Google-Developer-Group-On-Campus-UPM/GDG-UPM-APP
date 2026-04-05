"use client";

import { Event } from "@/constants/types/events.type";
import { Box, SxProps, Theme } from "@mui/material";
import { useState, useMemo } from "react";
import GlassArrowButton from "../../../ui/GlassArrowButton";
import EventCard from "../event-card/EventCard";

interface EventCarouselProps {
  events: Event[];
  eventsPerPage?: number;
  showGetTicket?: boolean;
  onGetTicketClick?: (event: Event) => void;
  eventCardWidth?: number;
  eventCardHeight?: number;
  gap?: number;
  containerHeight?: number;
  sx?: SxProps<Theme>;
}

/**
 * EventCarousel Component - Built with EventCard
 *
 * A carousel component that displays EventCard components in a horizontal scrolling layout.
 * Features glass navigation buttons floating on the sides and proper page-based pagination
 * to prevent card offset issues.
 *
 * @example
 * // Basic usage with default 3 events per page
 * <EventCarousel events={eventList} />
 *
 * @example
 * // Custom configuration with ticket buttons
 * <EventCarousel
 *   events={eventList}
 *   eventsPerPage={3}
 *   showGetTicket={true}
 *   onGetTicketClick={(event) => console.log(event)}
 *   eventCardWidth={368}
 *   eventCardHeight={329}
 *   gap={20}
 * />
 */
export default function EventCarousel({
  events = [],
  eventsPerPage = 3,
  showGetTicket = false,
  onGetTicketClick,
  eventCardWidth = 368,
  eventCardHeight = 329,
  gap = 20,
  containerHeight = 400,
  sx = {},
}: EventCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages needed
  const totalPages = useMemo(() => {
    return Math.ceil(events.length / eventsPerPage);
  }, [events.length, eventsPerPage]);

  // Navigation handlers
  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : totalPages - 1,
    );
  };

  // Calculate exact container width based on events per page (no extra space)
  const containerWidth =
    eventsPerPage * eventCardWidth + (eventsPerPage - 1) * gap;

  // Get events for current page
  const currentPageEvents = useMemo(() => {
    const startIndex = currentPage * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return events.slice(startIndex, endIndex);
  }, [events, currentPage, eventsPerPage]);

  // If no events, show empty state
  if (events.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: containerHeight,
          color: "white",
          fontSize: "18px",
          fontFamily: "Poppins, sans-serif",
          ...sx,
        }}
      >
        No events available
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: containerHeight + 40, // Reserve space for page indicators
        ...sx,
      }}
    >
      {/* Carousel Container */}
      <Box
        sx={{
          position: "relative",
          width: containerWidth,
          height: containerHeight,
        }}
      >
        {/* Left Glass Button - Floating on the side */}
        {totalPages > 1 && currentPage > 0 && (
          <GlassArrowButton
            onClick={goToPreviousPage}
            direction="left"
            size={50}
            sx={{
              position: "absolute",
              left: -25, // Position outside the container, floating above cards
              top: "50%",
              marginTop: "-25px", // Half of button size (50px) to center vertically
              zIndex: 10,
            }}
          />
        )}
        {/* Right Glass Button - Floating on the side */}
        {totalPages > 1 && currentPage < totalPages - 1 && (
          <GlassArrowButton
            onClick={goToNextPage}
            direction="right"
            size={50}
            sx={{
              position: "absolute",
              right: -25, // Position outside the container, floating above cards
              top: "50%",
              marginTop: "-25px", // Half of button size (50px) to center vertically
              zIndex: 10,
            }}
          />
        )}
        {/* Cards Container - No margins, cards fill the exact width */}
        <Box
          sx={{
            display: "flex",
            gap: `${gap}px`,
            width: "100%",
            height: "100%",
            alignItems: "flex-start",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* Render only current page events */}
          {currentPageEvents.map((event) => (
            <Box
              key={event.id}
              sx={{
                width: eventCardWidth,
                height: eventCardHeight,
                flexShrink: 0,
              }}
            >
              <EventCard
                event={event}
                showGetTicket={showGetTicket}
                onGetTicketClick={() => onGetTicketClick?.(event)}
                width={eventCardWidth}
                height={eventCardHeight}
              />
            </Box>
          ))}
          {/* Fill remaining slots if current page has fewer events than eventsPerPage */}
          {currentPageEvents.length < eventsPerPage &&
            Array.from({
              length: eventsPerPage - currentPageEvents.length,
            }).map((_, index) => (
              <Box
                key={`empty-${index}`}
                sx={{
                  width: eventCardWidth,
                  height: eventCardHeight,
                  flexShrink: 0,
                  visibility: "hidden", // Invisible placeholder to maintain layout
                }}
              />
            ))}
        </Box>
      </Box>

      {/* Page Indicator Dots - Fixed position with reserved space */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "32px", // Fixed height for page indicators area
          marginTop: "20px",
        }}
      >
        {totalPages > 1 &&
          Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentPage(index)}
              sx={{
                width: index === currentPage ? 12 : 8,
                height: index === currentPage ? 12 : 8,
                borderRadius: "50%",
                backgroundColor:
                  index === currentPage
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                ...(index !== currentPage && {
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    transform: "scale(1.4)",
                  },
                }),
              }}
            />
          ))}
      </Box>
    </Box>
  );
}
