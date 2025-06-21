import { Typography } from "@mui/material";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardTitleV2Props {
  title: string;
}

export default function EventCardTitleV2({ title }: EventCardTitleV2Props) {
  return (
    <Typography
      sx={{
        ...getGradientTextStyle(0.9),
        fontWeight: 700,
        fontSize: "18px",
        lineHeight: "109%",
        letterSpacing: "0%",
        textAlign: "left",
        padding: "4px 0 2px 0",
        background: `linear-gradient(0deg, rgba(240, 240, 240, 0.9), rgba(240, 240, 240, 0.9)),
          linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)`,
      }}
    >
      {title}
    </Typography>
  );
}
