import { Box } from "@mui/material";
import EventCardStatus from "./EventCardStatus";
import EventCardTitle from "./EventCardTitle";
import { Event } from "@/constants/types/events.type";
import EventCardTags from "./EventCardTags";
import EventCardDetails from "./EventCardDetails";
import EventCardTicketButton from "./EventCardTicketButton";

interface EventCardContentProps {
  event: Event;
  showGetTicket: boolean;
  onGetTicketClick?: () => void;
}

export default function EventCardContent({
  event,
  showGetTicket,
  onGetTicketClick,
}: EventCardContentProps) {
  return (
    <Box
      sx={{
        padding: "0 16px 16px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: 1,
      }}
    >
      <EventCardStatus status={event.status} />
      <EventCardTitle title={event.title} />
      <EventCardDetails event={event} />
      <EventCardTags tags={event.tags} />
      <EventCardTicketButton
        showGetTicket={showGetTicket}
        onGetTicketClick={onGetTicketClick}
      />
    </Box>
  );
}
