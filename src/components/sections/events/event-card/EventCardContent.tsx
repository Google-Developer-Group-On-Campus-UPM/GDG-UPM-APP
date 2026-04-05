import { Box } from "@mui/material";
import EventCardStatus from "./EventCardStatus";
import EventCardTitle from "./EventCardTitle";
import EventCardDetails from "./EventCardDetails";
import EventCardTags from "./EventCardTags";
import EventCardTicketButton from "./EventCardTicketButton";
import { Event } from "@/constants/types/events.type";

interface EventCardContentProps {
  event: Event;
  showGetTicket: boolean;
  onGetTicketClick?: () => void;
}

export default function EventCardConten({
  event,
  showGetTicket,
  onGetTicketClick,
}: EventCardContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Take full height of the 168px container
        justifyContent: "space-between", // Distribute content and button
      }}
    >
      {/* Main content at the top */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px", // Same as original
        }}
      >
        <EventCardStatus status={event.status} />
        <EventCardTitle title={event.title} />
        <EventCardDetails event={event} />
        <EventCardTags tags={event.tags} />
      </Box>

      {/* Button at bottom left */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <EventCardTicketButton
          showGetTicket={showGetTicket}
          onGetTicketClick={onGetTicketClick}
        />
      </Box>
    </Box>
  );
}
