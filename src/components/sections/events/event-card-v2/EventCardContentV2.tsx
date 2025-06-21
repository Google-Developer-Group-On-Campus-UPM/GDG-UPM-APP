import { Box } from "@mui/material";
import EventCardStatusV2 from "./EventCardStatusV2";
import EventCardTitleV2 from "./EventCardTitleV2";
import EventCardDetailsV2 from "./EventCardDetailsV2";
import EventCardTagsV2 from "./EventCardTagsV2";
import EventCardTicketButtonV2 from "./EventCardTicketButtonV2";
import { Event } from "@/constants/types/events.type";

interface EventCardContentV2Props {
  event: Event;
  showGetTicket: boolean;
  onGetTicketClick?: () => void;
}

export default function EventCardContentV2({
  event,
  showGetTicket,
  onGetTicketClick,
}: EventCardContentV2Props) {
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
        <EventCardStatusV2 status={event.status} />
        <EventCardTitleV2 title={event.title} />
        <EventCardDetailsV2 event={event} />
        <EventCardTagsV2 tags={event.tags} />
      </Box>

      {/* Button at bottom left */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <EventCardTicketButtonV2
          showGetTicket={showGetTicket}
          onGetTicketClick={onGetTicketClick}
        />
      </Box>
    </Box>
  );
}
