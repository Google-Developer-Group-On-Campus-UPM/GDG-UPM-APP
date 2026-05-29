"use client";

import { Poppins } from "next/font/google";
import { Event } from "@/constants/types/events.type";
import EventCardContent from "./EventCardContent";
import EventCardImage from "./EventCardImage";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface EventCardProps {
  event: Event;
  showGetTicket?: boolean;
  onGetTicketClick?: () => void;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export default function EventCard({
  event,
  showGetTicket = false,
  onGetTicketClick,
  width = 384,
  height = 340,
  borderRadius = 24,
}: EventCardProps) {
  if (!event) {
    console.warn("EventCard: No event data provided");
    return null;
  }

  const imageHeight = 119;

  return (
    <div
      className={`relative overflow-hidden flex flex-col group max-w-full hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] ${poppins.className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        fontSize: `${width / 368}rem`,
        cursor: "default",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <EventCardImage event={event} height={imageHeight} />

      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col z-10"
        style={{
          top: `${imageHeight + 17}px`,
          width: "298px",
          height: "168px",
          gap: "12px",
        }}
      >
        <EventCardContent
          event={event}
          showGetTicket={showGetTicket}
          onGetTicketClick={onGetTicketClick}
        />
      </div>
    </div>
  );
}
