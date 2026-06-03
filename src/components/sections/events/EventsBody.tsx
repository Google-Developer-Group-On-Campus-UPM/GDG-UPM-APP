"use client";

import { Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { Event } from "@/constants/types/events.type";
import searchEvents from "@/services/events/functions/searchEvents";
import sortEvents from "@/services/events/functions/sortEvents";
import EventButton from "./common/buttons/EventButton";
import SortRecentButton from "./common/buttons/SortRecentButton";
import SearchBar from "./common/search/SearchBar";
import PastEventCard from "./event-card/PastEventCard";
import UpcomingEventCard from "./event-card/UpcomingEventCard";
import EventCarousel from "./event-carousel/EventCarousel";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface EventsBodyProps {
  events?: Event[];
  layout?: "carousel" | "grid";
}

export default function EventsBody({
  events = [],
  layout = "carousel",
}: EventsBodyProps) {
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");
  const [isSortActive, setIsSortActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Track search term

  // Handle back button / BFCache restore to prevent empty page states
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setIsSortActive(false); // Reset sort when filter changes
  };

  // Handle search results
  const handleSearchResults = (
    _searchResults: Event[],
    searchQuery?: string,
  ) => {
    setSearchTerm(searchQuery || "");
    setIsSortActive(false); // Reset sort when search changes
  };

  // Handle sort
  const handleSort = (
    _sorted: Event[],
    nextActive: boolean,
    nextSort: "newest" | "oldest",
  ) => {
    setIsSortActive(nextActive);
    setSortOrder(nextSort);
  };

  // 1. First apply search query
  const searchedEvents = useMemo(() => {
    return searchEvents(events, searchTerm);
  }, [events, searchTerm]);

  // 2. Then apply category filter (upcoming vs past)
  const categoryFilteredEvents = useMemo(() => {
    return searchedEvents.filter((event) => event.status === activeFilter);
  }, [searchedEvents, activeFilter]);

  // 3. Finally apply sorting if active
  const displayEvents = useMemo(() => {
    if (!isSortActive) return categoryFilteredEvents;
    return sortEvents(categoryFilteredEvents, sortOrder);
  }, [categoryFilteredEvents, isSortActive, sortOrder]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto min-h-[458px]">
      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
        {/* Left Side - Filter Buttons */}
        <div className="flex items-center gap-4 hide-scrollbar">
          {/* Upcoming Events Button */}
          <EventButton
            active={activeFilter === "upcoming"}
            onClick={() => handleFilterChange("upcoming")}
          >
            <span className="hidden sm:inline">Upcoming Events</span>
            <span className="inline sm:hidden">Upcoming</span>
          </EventButton>

          {/* Past Events Button */}
          <EventButton
            active={activeFilter === "past"}
            onClick={() => handleFilterChange("past")}
          >
            <span className="hidden sm:inline">Past Events</span>
            <span className="inline sm:hidden">Past</span>
          </EventButton>
        </div>

        {/* Right Side - Search and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-4 w-full lg:w-auto flex-1">
          {/* Search Bar */}
          <div className="flex-1 sm:max-w-xs">
            <SearchBar
              events={events}
              onSearchResults={handleSearchResults}
              placeholder="Search"
              sx={{ width: "100%" }}
            />
          </div>

          {/* Sort Button */}
          {!(layout === "grid" && activeFilter === "past") && (
            <div>
              <SortRecentButton
                events={displayEvents}
                onSortedEvents={handleSort}
                active={isSortActive}
                sort={sortOrder}
              />
            </div>
          )}
        </div>
      </div>

      {/* Events Carousel or Empty State */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[340px]">
        {displayEvents.length > 0 ? (
          layout === "carousel" ? (
            <EventCarousel
              events={displayEvents}
              variant={activeFilter === "past" ? "apple" : "standard"}
              showSeeMoreCard={true}
              eventsPerPage={3}
              showGetTicket={activeFilter === "upcoming"}
              eventCardWidth={activeFilter === "past" ? 400 : 384}
              eventCardHeight={activeFilter === "past" ? 500 : 340}
              gap={34}
              containerHeight={activeFilter === "past" ? 520 : 360}
              onGetTicketClick={(event) => {
                if (event?.registrationLink) {
                  window.open(event.registrationLink, "_blank", "noopener,noreferrer");
                } else {
                  console.warn("No registration link for event:", event);
                }
              }}
            />
          ) : (
            (() => {
              if (activeFilter === "past") {
                // Group events by year
                const groups: { [key: number]: Event[] } = {};
                displayEvents.forEach((event) => {
                  const year = new Date(event.dateStart).getFullYear();
                  if (!groups[year]) {
                    groups[year] = [];
                  }
                  groups[year].push(event);
                });

                // Sort years descending (e.g. 2024 first, then 2023)
                const sortedYears = Object.keys(groups)
                  .map(Number)
                  .sort((a, b) => b - a);

                return (
                  <div className="flex flex-col gap-12 w-full">
                    {sortedYears.map((year) => {
                      // Sort events in each year group chronologically (Jan-Dec)
                      const sortedEventsInYear = [...groups[year]].sort(
                        (a, b) =>
                          new Date(a.dateStart).getTime() -
                          new Date(b.dateStart).getTime(),
                      );

                      return (
                        <div key={year} className="flex flex-col gap-6 w-full">
                          <div className="flex items-center gap-4 w-full">
                            <h2 className="text-2xl font-bold text-white tracking-tight font-['Poppins']">
                              {year}
                            </h2>
                            <div className="h-px bg-white/10 flex-1" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center w-full py-4">
                            {sortedEventsInYear.map((event) => (
                              <div
                                key={event.id}
                                className="transition-all duration-300"
                              >
                                <PastEventCard
                                  event={
                                    event as Extract<Event, { status: "past" }>
                                  }
                                  width={400}
                                  height={500}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              // Standard Grid Layout for Upcoming Events
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center w-full py-4">
                  {displayEvents.map((event) => (
                    <div key={event.id}>
                      <UpcomingEventCard
                        event={event as Extract<Event, { status: "upcoming" }>}
                        showGetTicket={true}
                        onGetTicketClick={() => {
                          if (event?.registrationLink) {
                            window.open(event.registrationLink, "_blank", "noopener,noreferrer");
                          } else {
                            console.warn(
                              "No registration link for event:",
                              event,
                            );
                          }
                        }}
                        width={384}
                        height={340}
                      />
                    </div>
                  ))}
                </div>
              );
            })()
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 h-[329px] text-center w-full">
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
          </div>
        )}
      </div>
    </div>
  );
}
