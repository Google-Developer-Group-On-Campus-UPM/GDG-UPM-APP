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
 * EventCarousel Component
 *
 * A carousel component that displays event cards in a horizontal scrolling layout.
 * Features navigation buttons on both ends and supports customizable number of events per page.
 * Uses a sliding window approach to smoothly animate between pages of events.
 *
 * @example
 * // Basic usage with default 3 events per page
 * <EventCarousel events={eventList} />
 *
 * @example
 * // Custom configuration with ticket buttons
 * <EventCarousel
 *   events={eventList}
 *   eventsPerPage={4}
 *   showGetTicket={true}
 *   onGetTicketClick={(event) => window.open(event.registrationLink)}
 *   eventCardWidth={350}
 *   gap={20}
 * />
 *
 * @example
 * // With custom styling
 * <EventCarousel
 *   events={eventList}
 *   eventsPerPage={2}
 *   containerHeight={500}
 *   sx={{ marginTop: 4 }}
 * />
 */
export default function EventCarousel({
  events = [],
  eventsPerPage = 3,
  showGetTicket = false,
  onGetTicketClick,
  eventCardWidth = 320,
  eventCardHeight = 280,
  gap = 16,
  containerHeight = 350,
  sx = {},
}: EventCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages needed
  const totalPages = useMemo(() => {
    return Math.ceil(events.length / eventsPerPage);
  }, [events.length, eventsPerPage]);

  // Navigation handlers
  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Calculate container width based on events per page
  const containerWidth =
    eventsPerPage * eventCardWidth + (eventsPerPage - 1) * gap;

  // Calculate translate offset for sliding animation
  const translateX = useMemo(() => {
    return -(currentPage * containerWidth);
  }, [currentPage, containerWidth]);

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
        alignItems: "center",
        gap: 2,
        width: "100%",
        height: containerHeight,
        ...sx,
      }}
    >
      {/* Left Navigation Button */}
      <GlassArrowButton
        onClick={goToPreviousPage}
        disabled={totalPages <= 1}
        direction="left"
        size={50}
        sx={{
          flexShrink: 0,
          opacity: totalPages <= 1 ? 0.5 : 1,
          cursor: totalPages <= 1 ? "default" : "pointer",
        }}
      />
      {/* Carousel Container (Overflow Hidden) */}
      <Box
        sx={{
          width: containerWidth,
          height: "100%",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Sliding Events Container */}
        <Box
          sx={{
            display: "flex",
            gap: `${gap}px`,
            height: "100%",
            width: `${totalPages * containerWidth}px`,
            transform: `translateX(${translateX}px)`,
            transition: "transform 0.3s ease-in-out",
            alignItems: "flex-start",
          }}
        >
          {/* Render all pages */}
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const pageStartIndex = pageIndex * eventsPerPage;
            const pageEndIndex = pageStartIndex + eventsPerPage;
            const pageEvents = events.slice(pageStartIndex, pageEndIndex);

            return (
              <Box
                key={pageIndex}
                sx={{
                  display: "flex",
                  gap: `${gap}px`,
                  width: containerWidth,
                  height: "100%",
                  flexShrink: 0,
                  alignItems: "flex-start",
                }}
              >
                {/* Render events for this page */}
                {pageEvents.map((event) => (
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

                {/* Fill remaining slots with empty spaces to maintain left alignment */}
                {Array.from({ length: eventsPerPage - pageEvents.length }).map(
                  (_, emptyIndex) => (
                    <Box
                      key={`empty-${pageIndex}-${emptyIndex}`}
                      sx={{
                        width: eventCardWidth,
                        height: eventCardHeight,
                        flexShrink: 0,
                        visibility: "hidden",
                      }}
                    />
                  ),
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* Right Navigation Button */}
      <GlassArrowButton
        onClick={goToNextPage}
        disabled={totalPages <= 1}
        direction="right"
        size={50}
        sx={{
          flexShrink: 0,
          opacity: totalPages <= 1 ? 0.5 : 1,
          cursor: totalPages <= 1 ? "default" : "pointer",
        }}
      />
    </Box>
  );
}
