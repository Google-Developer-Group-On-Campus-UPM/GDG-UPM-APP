/**
 * Footer Component
 *
 * The main footer component that appears at the bottom of every page.
 */

"use client";

import { Box, Container, Stack } from "@mui/material";
import FooterBackground from "./footer/FooterBackground";
import FooterBottom from "./footer/FooterBottom";
import FooterHeader from "./footer/FooterHeader";
import FooterLinksSection from "./footer/FooterLinksSection";
import FooterSocialLinks from "./footer/FooterSocialLinks";

/**
 * Footer Component
 */
export default function Footer() {
  return (
    <Box
      sx={{
        position: "relative",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <FooterBackground />

      {/* Footer Content */}
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: "16px", sm: "24px", md: "32px", lg: "48px" },
          py: { xs: "60px", sm: "80px", md: "100px" },
          maxWidth: "1280px", // Equivalent to Tailwind max-w-7xl (80rem) for visual grid consistency
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Stack gap="5rem">
          {/* Main Content: Links on Left, Brand + Socmed on Right (where dinosaur was) */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", lg: "flex-start" }}
            sx={{
              width: "100%",
              gap: { xs: "60px", md: "80px", lg: "100px" },
            }}
          >
            {/* Left Column: Footer Link Columns */}
            <FooterLinksSection />

            {/* Right Column: Brand Logo + Social Stack (replacing Mascot) */}
            <Stack
              direction="column"
              alignItems="center"
              gap="1.5rem"
              sx={{ flexShrink: 0 }}
            >
              <FooterHeader />
              <FooterSocialLinks />
            </Stack>
          </Stack>

          {/* Footer Bottom Copyright Section */}
          <FooterBottom />
        </Stack>
      </Container>
    </Box>
  );
}
