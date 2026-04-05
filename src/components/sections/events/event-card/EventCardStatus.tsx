import { Typography } from "@mui/material";
import { Event } from "@/constants/types/events.type";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardStatusProps {
  status: Event["status"];
}

export default function EventCardStatus({ status }: EventCardStatusProps) {
  return (
    <Typography
      sx={{
        ...getGradientTextStyle(0.9),
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "140%",
        letterSpacing: "0%",
        textTransform: "capitalize",
        textAlign: "left", // Ensure left alignment
      }}
    >
      {status} Event
    </Typography>
  );
}
