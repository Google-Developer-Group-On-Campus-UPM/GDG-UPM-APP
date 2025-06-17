import { Box, Typography } from "@mui/material";
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
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 700,
          fontSize: "12px",
          lineHeight: "140%",
          letterSpacing: "0%",
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          margin: 0,
          padding: "4px 4px",
          display: "inline-block",
          cursor: "pointer",
          borderRadius: "6px",
          transition: "all 0.3s ease",
          border: "1px solid transparent",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          "&:hover": {
            color: "#E3F2FD",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
          "&:active": {
            transform: "translateY(0px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
        onClick={onGetTicketClick}
      >
        Get Ticket →
      </Typography>
    </Box>
  );
}
