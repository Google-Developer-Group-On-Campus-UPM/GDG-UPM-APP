import { Box } from "@mui/material";
import FlexChip from "@/components/ui/FlexChip";

interface EventCardTagsProps {
  tags?: string[];
}

export default function EventCardTags({ tags }: EventCardTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}
    >
      {tags.map((tag, index) => (
        <FlexChip
          key={index}
          content={[{ text: tag }]}
          hasLogo={false}
          paddingX={8}
          paddingY={4}
          // TODO: Change font to Inter as specified in design
          // Currently using Poppins as default
        />
      ))}
    </Box>
  );
}
