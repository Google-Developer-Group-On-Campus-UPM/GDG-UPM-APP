"use client";

import { Event } from "@/constants/types/events.type";
import sortEvents from "@/services/events/functions/sortEvents";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { SxProps, Theme } from "@mui/material";
import EventButton from "./EventButton";

type SortOrder = "newest" | "oldest";

interface SortRecentButtonProps {
  events: Event[];
  onSortedEvents: (sortedEvents: Event[]) => void;
  active?: boolean;
  sort?: SortOrder;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

/**
 * SortRecentButton Component
 *
 * Button for sorting events by date with three states:
 * - inactive: no sorting applied
 * - active + newest: sorts events newest first (down arrow)
 * - active + oldest: sorts events oldest first (up arrow)
 *
 * @example
 * <SortRecentButton
 *   events={events}
 *   onSortedEvents={(sorted) => setEvents(sorted)}
 *   active={true}
 *   sort="newest"
 * />
 *
 * @example
 * <SortRecentButton
 *   events={events}
 *   onSortedEvents={(sorted) => setEvents(sorted)}
 *   active={false}
 * />
 */
export default function SortRecentButton({
  events,
  onSortedEvents,
  active = false,
  sort = "newest",
  sx = {},
  disabled = false,
}: SortRecentButtonProps) {
  const handleClick = () => {
    if (!active) {
      // Activate and sort newest first
      const sortedEvents = sortEvents(events, "newest");
      onSortedEvents(sortedEvents);
    } else if (sort === "newest") {
      // Switch to oldest
      const sortedEvents = sortEvents(events, "oldest");
      onSortedEvents(sortedEvents);
    } else {
      // Deactivate sorting - return original order
      onSortedEvents([...events]);
    }
  };

  const getButtonText = () => {
    if (!active) return "Sort";
    return sort === "newest" ? "Newest" : "Oldest";
  };

  const getArrowIcon = () => {
    const gradientStyles = {
      fontSize: "30px",
      filter: "brightness(0) invert(1)",
      color: "white", // Fallback for browsers that don't support backgroundClip
    };

    return sort === "newest" ? (
      <ArrowDownwardRoundedIcon sx={gradientStyles} />
    ) : (
      <ArrowUpwardRoundedIcon sx={gradientStyles} />
    );
  };

  return (
    <EventButton
      active={active}
      onClick={handleClick}
      logo={active ? getArrowIcon() : undefined}
      logoPosition="right"
      logoSize={20}
      gap={6}
      sx={sx}
      disabled={disabled}
    >
      {getButtonText()}
    </EventButton>
  );
}
