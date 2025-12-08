/**
 * FooterBottom Component
 *
 * Renders the bottom section of the footer with copyright and social links.
 */

import { Stack } from "@mui/material";
import FooterCopyright from "./FooterCopyright";
import FooterSocialLinks from "./FooterSocialLinks";

export default function FooterBottom() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems="center"
      sx={{
        width: "100%",
        minHeight: "28px",
        pt: "40px",
        gap: "20px",
      }}
    >
      <FooterCopyright />
      <FooterSocialLinks />
    </Stack>
  );
}
