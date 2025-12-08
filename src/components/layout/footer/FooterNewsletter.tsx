/**
 * FooterNewsletter Component
 *
 * Renders the newsletter subscription section in the footer.
 */

import { Box, Stack, Typography } from "@mui/material";
import CTAButton from "../../ui/CTAButton";

export default function FooterNewsletter() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      gap={{ xs: "16px", sm: "24px" }}
    >
      <Box
        sx={{
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          backgroundColor: "#3E3CE4",
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 400,
          color: "#ffffff",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        DEVSPOTLIGHT NEWSLETTER
      </Typography>

      {/* TODO: Place correct href link */}
      <CTAButton text="Subscribe" href="/" />
    </Stack>
  );
}
