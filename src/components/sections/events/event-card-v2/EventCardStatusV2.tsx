import { Typography } from "@mui/material";
import { Event } from "@/constants/types/events.type";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardStatusV2Props {
  status: Event["status"];
}

export default function EventCardStatusV2({ status }: EventCardStatusV2Props) {
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
