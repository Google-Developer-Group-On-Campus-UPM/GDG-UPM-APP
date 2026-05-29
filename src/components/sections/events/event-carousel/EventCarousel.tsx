"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Event } from "@/constants/types/events.type";
import AppleEventCard from "../event-card/AppleEventCard";
import EventCard from "../event-card/EventCard";
import SeeMoreCard from "../event-card/SeeMoreCard";

interface EventCarouselProps {
  events: Event[];
  eventsPerPage?: number;
  showGetTicket?: boolean;
  onGetTicketClick?: (event: Event) => void;
  eventCardWidth?: number;
  eventCardHeight?: number;
  gap?: number;
  containerHeight?: number;
  className?: string;
  variant?: "standard" | "apple";
  showSeeMoreCard?: boolean;
}

/**
 * EventCarousel Component - Built with EventCard
 *
 * A carousel component that displays EventCard components in a horizontal scrolling layout.
 * Built with Shadcn UI (Embla Carousel) for smooth, Apple-like swiping and snapping.
 */
export default function EventCarousel({
  events = [],
  eventsPerPage = 3,
  showGetTicket = false,
  onGetTicketClick,
  eventCardWidth = 384,
  eventCardHeight = 340,
  gap = 20,
  containerHeight = 410,
  className = "",
  variant = "standard",
  showSeeMoreCard = false,
}: EventCarouselProps) {
  if (events.length === 0) {
    return (
      <div
        className={`flex items-center justify-center text-white text-[18px] font-['Poppins'] ${className}`}
        style={{ height: `${containerHeight}px` }}
      >
        No events available
      </div>
    );
  }

  // Limit to 8 items if see-more is active, to fit exactly 9 slots (3 slides of 3)
  const displayList = showSeeMoreCard ? events.slice(0, 8) : events;

  return (
    <div
      className={`flex flex-col items-center w-full max-w-full relative ${className}`}
    >
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: false, // Apple style: drag free with snap
        }}
        className="w-full relative"
        style={{ maxWidth: "100%" }}
      >
        <CarouselContent
          className="-ml-4 md:-ml-6" // Use negative margin to offset the padding of items
        >
          {displayList.map((event) => (
            <CarouselItem
              key={event.id}
              className="pl-4 md:pl-6 basis-auto" // Control the spacing
            >
              <div className="py-4">
                {" "}
                {/* Padding to prevent shadow clipping */}
                {variant === "apple" ? (
                  <AppleEventCard
                    event={event}
                    width={eventCardWidth}
                    height={eventCardHeight}
                  />
                ) : (
                  <EventCard
                    event={event}
                    showGetTicket={showGetTicket}
                    onGetTicketClick={() => onGetTicketClick?.(event)}
                    width={eventCardWidth}
                    height={eventCardHeight}
                  />
                )}
              </div>
            </CarouselItem>
          ))}

          {/* Append See More card as the final slot if active */}
          {showSeeMoreCard && (
            <CarouselItem className="pl-4 md:pl-6 basis-auto">
              <div className="py-4">
                <SeeMoreCard width={eventCardWidth} height={eventCardHeight} />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>

        {/* Navigation arrows hidden on touch devices, visible on hover/desktop */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 xl:-left-12 w-12 h-12 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md z-10" />
          <CarouselNext className="right-4 xl:-right-12 w-12 h-12 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md z-10" />
        </div>
      </Carousel>
    </div>
  );
}
