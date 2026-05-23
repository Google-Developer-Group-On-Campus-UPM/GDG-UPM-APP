"use client";

import { Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { Event } from "@/constants/types/events.type";
import EventButton from "./common/buttons/EventButton";
import SortRecentButton from "./common/buttons/SortRecentButton";
import SearchBar from "./common/search/SearchBar";
import EventCarousel from "./event-carousel/EventCarousel";

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
	const applyFilters = useCallback(
		(searchResults: Event[], filterType: string) => {
			return searchResults.filter((event) => {
				if (filterType === "past") {
					return event.status === "past";
				} else if (filterType === "upcoming") {
					return event.status === "upcoming";
				}
				return true; // Show all events for any other filter
			});
		},
		[],
	);

	// Initialize filtered events when component mounts or events change
	useEffect(() => {
		// If there's a search term, use search results, otherwise use all events
		const eventsToFilter = searchTerm ? allSearchResults : events;
		const filtered = applyFilters(eventsToFilter, activeFilter);

		setFilteredEvents(filtered);
		setSortedEvents([]);
		setIsSortActive(false);
	}, [events, activeFilter, allSearchResults, searchTerm, applyFilters]);

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
	const handleSort = (
		sorted: Event[],
		nextActive: boolean,
		nextSort: "newest" | "oldest",
	) => {
		setSortedEvents(sorted);
		setIsSortActive(nextActive);
		setSortOrder(nextSort);
	};

	// Get final events to display (use sorted if available, otherwise filtered)
	const displayEvents = isSortActive ? sortedEvents : filteredEvents;

	return (
		<div className="flex flex-col gap-8 w-full max-w-[1204px] mx-auto min-h-[458px]">
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
					<div>
						<SortRecentButton
							events={displayEvents}
							onSortedEvents={handleSort}
							active={isSortActive}
							sort={sortOrder}
						/>
					</div>
				</div>
			</div>

			{/* Events Carousel or Empty State */}
			<div className="flex-1 flex items-center justify-center w-full min-h-[329px]">
				{displayEvents.length > 0 ? (
					<EventCarousel
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
