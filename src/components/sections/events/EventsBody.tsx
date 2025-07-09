"use client";

import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Event } from "@/constants/types/events.type";
import { Poppins } from "next/font/google";
import EventButton from "./common/buttons/EventButton";
import SearchBar from "./common/search/SearchBar";
import SortRecentButton from "./common/buttons/SortRecentButton";
import EventCarouselV2 from "./event-carousel-v2/EventCarouselV2";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface EventsBodyProps {
  events?: Event[];
}

export default function EventsBody({ events = [] }: EventsBodyProps) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [sortedEvents, setSortedEvents] = useState<Event[]>(events);
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");
  const [isSortActive, setIsSortActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Track search term
  const [allSearchResults, setAllSearchResults] = useState<Event[]>(events); // Store all search results

  // Apply both search and filter
  const applyFilters = (searchResults: Event[], filterType: string) => {
    return searchResults.filter((event) => {
      if (filterType === "past") {
        return event.status === "past";
      } else if (filterType === "upcoming") {
        return event.status === "upcoming";
      }
      return true; // Show all events for any other filter
    });
  };

  // Initialize filtered events when component mounts or events change
  useEffect(() => {
    // If there's a search term, use search results, otherwise use all events
    const eventsToFilter = searchTerm ? allSearchResults : events;
    const filtered = applyFilters(eventsToFilter, activeFilter);

    setFilteredEvents(filtered);
    setSortedEvents([]);
    setIsSortActive(false);
  }, [events, activeFilter, allSearchResults, searchTerm]);

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Don't reset search - let useEffect handle the filtering
  };

  // Handle search results
  const handleSearchResults = (
    searchResults: Event[],
    searchQuery?: string,
  ) => {
    // Store the search term and all search results
    setSearchTerm(searchQuery || "");
    setAllSearchResults(searchResults);

    // Filter search results based on active filter
    const filteredSearchResults = applyFilters(searchResults, activeFilter);

    setFilteredEvents(filteredSearchResults);
    // Reset sort when search changes
    setSortedEvents([]);
    setIsSortActive(false);
  };

  // Handle sort
  const handleSort = (sorted: Event[]) => {
    setSortedEvents(sorted);
    setIsSortActive(!isSortActive);
    if (isSortActive) {
      setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
    }
  };

  // Get final events to display (use sorted if available, otherwise filtered)
  const displayEvents = isSortActive ? sortedEvents : filteredEvents;

  return (
    <Box
      sx={{
        width: "1204px",
        height: "458px",
        gap: "34px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {/* Control Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side - Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Past Events Button (inactive) */}
          <EventButton
            active={activeFilter === "past"}
            onClick={() => handleFilterChange("past")}
          >
            Past Events
          </EventButton>

          {/* Upcoming Events Button (inactive) */}
          <EventButton
            active={activeFilter === "upcoming"}
            onClick={() => handleFilterChange("upcoming")}
          >
            Upcoming Events
          </EventButton>

          {/* Search Bar */}
          <SearchBar
            events={events}
            onSearchResults={handleSearchResults}
            placeholder="Search by event name..."
            sx={{ width: "100%" }}
          />
        </Box>

        {/* Right Side - Sort Button */}
        <SortRecentButton
          events={displayEvents}
          onSortedEvents={handleSort}
          active={isSortActive}
          sort={sortOrder}
          sx={{ minWidth: "180px" }}
        />
      </Box>

      {/* Events Carousel or Empty State */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {displayEvents.length > 0 ? (
          <EventCarouselV2
            events={displayEvents}
            eventsPerPage={3}
            showGetTicket={true}
            eventCardWidth={368}
            eventCardHeight={329}
            gap={34}
            containerHeight={329}
            onGetTicketClick={(event) => {
              // TODO: Implement ticket booking logic
              console.log("Get ticket for event:", event);
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              height: "329px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "140%",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "8px",
              }}
            >
              No Events Found
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "150%",
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "400px",
              }}
            >
              There are currently no events available. Check back later for
              exciting workshops and meetups!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
