"use client";

import FlexImage from "@/components/ui/FlexImage";
import { Event } from "@/constants/types/events.type";
import { Box } from "@mui/material";

interface EventCardImageProps {
  event: Event;
  width: number;
  height: number;
  borderRadius: number;
}

export default function EventCardImage({
  event,
  width,
  height,
  borderRadius,
}: EventCardImageProps) {
  return (
    <Box
      sx={{
        width: 368,
        height: 119,
        borderTopLeftRadius: `${borderRadius}px`,
        borderTopRightRadius: `${borderRadius}px`,
        overflow: "hidden",
      }}
    >
      <FlexImage
        src={event.image || "/images/test.png"}
        alt={event.title}
        width={width}
        height={Math.floor(height * 0.42)}
        radius={0}
        objectFit="cover"
        objectPosition="center"
      />
    </Box>
  );
}
