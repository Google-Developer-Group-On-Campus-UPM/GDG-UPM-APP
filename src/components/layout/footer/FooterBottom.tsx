/**
 * FooterBottom Component
 *
 * Renders the bottom section of the footer with copyright and social links.
 */

import { Box, Stack } from "@mui/material";
import FooterCopyright from "./FooterCopyright";
import FooterSocialLinks from "./FooterSocialLinks";

export default function FooterBottom() {
  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      {/* Content */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems="center"
        sx={{
          width: "100%",
          gap: { xs: "28px", md: "32px" },
        }}
      >
        <FooterCopyright />
        <FooterSocialLinks />
      </Stack>
    </Stack>
  );
}
