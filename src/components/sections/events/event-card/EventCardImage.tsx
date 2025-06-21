"use client";

import FlexImage from "@/components/ui/FlexImage";
import { Event } from "@/constants/types/events.type";
import { Box } from "@mui/material";

interface EventCardImageProps {
  event: Event;
  width?: number;
  height?: number;
  borderRadius: number;
}

export default function EventCardImage({
  event,
  width = 368,
  height = 119,
  borderRadius,
}: EventCardImageProps) {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        borderTopLeftRadius: `${borderRadius}px`,
        borderTopRightRadius: `${borderRadius}px`,
        overflow: "hidden",
      }}
    >
      <FlexImage
        src={event.image || "/images/test.png"}
        alt={event.title}
        width={width}
        height={height}
        radius={0}
        objectFit="cover"
        objectPosition="center"
      />
    </Box>
  );
}
