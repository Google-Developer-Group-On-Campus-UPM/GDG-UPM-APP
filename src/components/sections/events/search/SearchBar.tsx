"use client";

import { Event } from "@/constants/types/events.type";
import searchEvents from "@/services/events/functions/searchEvents";
import { Box, InputBase, SxProps, Theme } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useCallback, useState } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface SearchBarProps {
  events: Event[];
  onSearchResults: (filteredEvents: Event[]) => void;
  placeholder?: string;
  width?: number;
  height?: number;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

/**
 * SearchBar Component
 *
 * Search input with gradient border effect using two-layer approach.
 * Filters events in real-time as user types and invokes searchEvents function.
 *
 * @example
 * <SearchBar
 *   events={events}
 *   onSearchResults={(filtered) => setFilteredEvents(filtered)}
 *   placeholder="Search events..."
 * />
 *
 * @example
 * <SearchBar
 *   events={events}
 *   onSearchResults={(filtered) => setFilteredEvents(filtered)}
 *   width={400}
 *   height={50}
 * />
 */
export default function SearchBar({
  events,
  onSearchResults,
  placeholder = "Search events...",
  width = 300,
  height = 44,
  sx = {},
  disabled = false,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      const filteredEvents = searchEvents(events, value);
      onSearchResults(filteredEvents);
    },
    [events, onSearchResults],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleClear = () => {
    handleSearch("");
  };

  // Base layer with gradient border
  const baseLayerStyles: SxProps<Theme> = {
    width: width,
    height: height,
    borderRadius: "10px",
    background: "linear-gradient(90deg, #67A4D5 0%, #ADEDFF 100%)",
    padding: "1.5px",
    border: "none",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease",
    "&:hover": !disabled
      ? {
          boxShadow: "0 2px 8px rgba(103, 164, 213, 0.2)",
        }
      : {},
    "&:focus-within": !disabled
      ? {
          boxShadow: "0 4px 12px rgba(103, 164, 213, 0.3)",
        }
      : {},
    ...sx,
  };

  // Inner layer (content background)
  const innerLayerStyles: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    borderRadius: "8.5px",
    background:
      "linear-gradient(90deg, rgba(1, 1, 1, 1) 20%, rgba(2, 28, 64, 1) 100%)",
    display: "flex",
    alignItems: "center",
    paddingLeft: "16px",
    paddingRight: "16px",
    gap: "12px",
  };

  // Input field styles
  const inputStyles: SxProps<Theme> = {
    flex: 1,
    fontFamily: poppins.style.fontFamily,
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "-3%",
    color: "#FFFFFF",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    "& input": {
      padding: 0,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "#FFFFFF",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
        opacity: 1,
      },
    },
  };

  return (
    <Box sx={baseLayerStyles}>
      <Box sx={innerLayerStyles}>
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={24}
          height={24}
          style={{
            color: "#FFFFFF",
            opacity: 0.7,
            flexShrink: 0,
          }}
        />
        <InputBase
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          sx={inputStyles}
          inputProps={{
            "aria-label": "search events",
          }}
        />
        {searchTerm && (
          <Box
            component="button"
            onClick={handleClear}
            sx={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              fontSize: "16px",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            ✕
          </Box>
        )}
      </Box>
    </Box>
  );
}
