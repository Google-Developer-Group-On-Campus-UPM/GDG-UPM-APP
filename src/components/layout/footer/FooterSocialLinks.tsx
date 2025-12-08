/**
 * FooterSocialLinks Component
 *
 * Renders the social media icon buttons in the footer.
 */

import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Stack } from "@mui/material";

export default function FooterSocialLinks() {
  const socialLinks = [
    {
      href: "https://facebook.com/gdgupm",
      icon: <Facebook sx={{ fontSize: "24px" }} />,
      label: "Facebook",
    },
    {
      href: "https://instagram.com/gdgupm",
      icon: <Instagram sx={{ fontSize: "24px" }} />,
      label: "Instagram",
    },
    {
      href: "https://twitter.com/gdgupm",
      icon: <Twitter sx={{ fontSize: "24px" }} />,
      label: "Twitter",
    },
    {
      href: "https://linkedin.com/company/gdgupm",
      icon: <LinkedIn sx={{ fontSize: "24px" }} />,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/Google-Developer-Group-On-Campus-UPM",
      icon: <GitHubIcon sx={{ fontSize: "24px" }} />,
      label: "GitHub",
    },
  ];

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        flexShrink: 0,
        gap: "16px",
      }}
    >
      {socialLinks.map((social, index) => (
        <IconButton
          key={index}
          component="a"
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          sx={{
            width: "24px",
            height: "24px",
            padding: 0,
            color: "#ffffff",
            opacity: 0.8,
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          {social.icon}
        </IconButton>
      ))}
    </Stack>
  );
}
