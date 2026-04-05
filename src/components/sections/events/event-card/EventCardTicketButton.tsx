import { Button } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface EventCardTicketButtonProps {
  showGetTicket: boolean;
  onGetTicketClick?: () => void;
}

export default function EventCardTicketButton({
  showGetTicket,
  onGetTicketClick,
}: EventCardTicketButtonProps) {
  if (!showGetTicket) return null;
  return (
    <Button
      variant="text"
      size="small"
      onClick={onGetTicketClick}
      disableRipple
      sx={{
        fontFamily: poppins.style.fontFamily,
        fontWeight: 700,
        fontSize: "0.75rem", // 12px in rem units
        lineHeight: 1.4,
        letterSpacing: 0,
        color: "#FFFFFF",
        textTransform: "none",
        minWidth: "auto",
        borderRadius: "6px",
        alignSelf: "flex-start",
        transition: "all 0.3s ease",
        border: "none",
        background: "transparent",
        position: "relative",
        "&:hover": {
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "scale(0.95)", // Subtle scale animation on click
          transition: "transform 0.1s ease",
        },
        // Remove any MUI default styling
        "&:focus": {
          background: "transparent",
        },
      }}
    >
      Get Ticket →
    </Button>
  );
}
