/**
 * Footer Component
 *
 * The main footer component that appears at the bottom of every page.
 */

"use client";

import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CTAButton from "../ui/CTAButton";

const footerLinks = {
  community: {
    title: "COMMUNITY",
    links: [
      { label: "About GDG on Campus UPM", href: "/community/info" },
      { label: "Our Mission", href: "/community/mission" },
      { label: "Events & Activities", href: "/community/events" },
      { label: "Meet the Team", href: "/community/team" },
      { label: "Join the Community", href: "/community/join" },
    ],
  },
  programs: {
    title: "PROGRAMS",
    links: [
      { label: "Study Jams", href: "/programs/jams" },
      { label: "DevFest UPM", href: "/programs/devfest/upm" },
      { label: "Tech Talks", href: "/programs/tech-talks" },
      { label: "Hackathons", href: "/programs/hackathons" },
      { label: "Workshops", href: "/programs/workshops" },
    ],
  },
  resources: {
    title: "RESOURCES",
    links: [
      { label: "Learning Materials", href: "/learning/materials" },
      { label: "GDG CodeLabs", href: "/learning/gdg/codelabs" },
      { label: "Speaker Decks", href: "/learning/speakers" },
      { label: "Blog & Articles", href: "/blog" },
      { label: "Project Showcase", href: "/projects" },
    ],
  },
  support: {
    title: "SUPPORT",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Volunteer with Us", href: "/volunteer" },
      { label: "Partnership & Sponsorships", href: "/partnerships" },
      { label: "Contact Us", href: "/contact" },
      { label: "Community Guidelines", href: "/guidelines" },
    ],
  },
};

/**
 * Footer Link Column Component
 */
const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <Stack
    sx={{
      flex: "1 1 auto",
      minWidth: "150px",
      gap: "21px",
      opacity: 1,
    }}
  >
    {/* Column Header */}
    <Typography
      sx={{
        opacity: 0.8,
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "140%",
        color: "#ffffff",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
      }}
    >
      {title}
    </Typography>

    {/* Column Links */}
    <Stack
      sx={{
        opacity: 1,
      }}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          underline="none"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "280%",
            color: "#ffffff",
            opacity: 1,
            transition: "opacity 0.2s",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            display: "inline-block",
            width: "100%",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          {link.label}
        </Link>
      ))}
    </Stack>
  </Stack>
);

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
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/footer/bg.png"
          alt="Footer Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

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
          {/* GitHub Logo */}
          <Link
            href="https://github.com/Google-Developer-Group-On-Campus-UPM"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#ffffff",
              display: "inline-flex",
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <GitHubIcon sx={{ fontSize: "63px" }} />
          </Link>

          {/* Dev Spotlight Newsletter */}
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
            <CTAButton text="Subscribe" href="/" />
          </Stack>
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
          {/* Footer Link Columns Grid */}
          <Grid
            container
            gap="80px"
            sx={{
              flex: "1 1 auto",
              opacity: 1,
            }}
          >
            <Grid>
              <FooterColumn
                title={footerLinks.community.title}
                links={footerLinks.community.links}
              />
            </Grid>
            <Grid>
              <FooterColumn
                title={footerLinks.programs.title}
                links={footerLinks.programs.links}
              />
            </Grid>
            <Grid>
              <FooterColumn
                title={footerLinks.resources.title}
                links={footerLinks.resources.links}
              />
            </Grid>
            <Grid>
              <FooterColumn
                title={footerLinks.support.title}
                links={footerLinks.support.links}
              />
            </Grid>
          </Grid>

          {/* GDG Mascot */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "150px", sm: "200px", md: "250px", lg: "20%" },
              height: { xs: "150px", sm: "200px", md: "250px", lg: "auto" },
              aspectRatio: 1,
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/footer/mascot.png"
              alt="GDG Mascot"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Stack>

        {/* Footer Bottom Section */}
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
          {/* Copyright Text */}
          <Typography
            sx={{
              flex: "1 1 auto",
              opacity: 0.8,
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: { xs: "14px", md: "18px", lg: "20px" },
              lineHeight: "140%",
              color: "#ffffff",
              textTransform: "uppercase",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            © {new Date().getFullYear()} Google Developer Groups on Campus -
            Universiti Putra Malaysia | Managed by GDGoC UPM
          </Typography>

          {/* Social Links */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              flexShrink: 0,
              gap: "16px",
              opacity: 0.8,
            }}
          >
            <IconButton
              component="a"
              href="https://facebook.com/gdgupm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: "24px",
                height: "24px",
                padding: 0,
                color: "#ffffff",
                opacity: 1,
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <Facebook sx={{ fontSize: "24px" }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://instagram.com/gdgupm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: "24px",
                height: "24px",
                padding: 0,
                color: "#ffffff",
                opacity: 1,
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <Instagram sx={{ fontSize: "24px" }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://twitter.com/gdgupm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: "24px",
                height: "24px",
                padding: 0,
                color: "#ffffff",
                opacity: 1,
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <Twitter sx={{ fontSize: "24px" }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://linkedin.com/company/gdgupm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: "24px",
                height: "24px",
                padding: 0,
                color: "#ffffff",
                opacity: 1,
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <LinkedIn sx={{ fontSize: "24px" }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://github.com/Google-Developer-Group-On-Campus-UPM"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: "24px",
                height: "24px",
                padding: 0,
                color: "#ffffff",
                opacity: 1,
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: "24px" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
