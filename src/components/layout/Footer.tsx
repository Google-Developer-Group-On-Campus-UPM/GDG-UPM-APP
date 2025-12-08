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
import FooterMascot from "./footer/FooterMascot";
import FooterNewsletter from "./footer/FooterNewsletter";

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
          px: { xs: "20px", sm: "40px", md: "60px", lg: "120px" },
          py: { xs: "40px", md: "60px" },
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{
            mb: "80px",
            gap: { xs: "30px", md: "20px" },
          }}
        >
          <FooterHeader />
          <FooterNewsletter />
        </Stack>

        {/* Links & Mascot Section */}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", lg: "flex-start" }}
          sx={{
            width: "100%",
            opacity: 1,
            mb: "60px",
            gap: { xs: "40px", md: "40px" },
          }}
        >
          <FooterLinksSection />
          <FooterMascot />
        </Stack>

        {/* Footer Bottom Section */}
        <FooterBottom />
      </Container>
    </Box>
  );
}
