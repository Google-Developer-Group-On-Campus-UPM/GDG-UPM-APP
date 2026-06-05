import { GitHub, Instagram, LinkedIn, WhatsApp } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Image from "next/image";
import { LINKS } from "@/constants/links";

export default function FooterSocialLinks() {
  const socialLinks = [
    {
      href: LINKS.INSTAGRAM,
      icon: <Instagram sx={{ fontSize: "1.5rem" }} />,
      label: "Instagram",
    },
    {
      href: LINKS.LINKEDIN,
      icon: <LinkedIn sx={{ fontSize: "1.5rem" }} />,
      label: "LinkedIn",
    },
    {
      href: LINKS.WHATSAPP,
      icon: <WhatsApp sx={{ fontSize: "1.5rem" }} />,
      label: "WhatsApp",
    },
    {
      href: LINKS.MEDIUM,
      icon: (
        <Image
          src="/images/footer/Medium-Icon-White.svg"
          alt="Medium"
          width={24}
          height={24}
          style={{ objectFit: "contain", display: "block" }}
        />
      ),
      label: "Medium",
    },
    {
      href: LINKS.GITHUB_ORG,
      icon: <GitHub sx={{ fontSize: "1.5rem" }} />,
      label: "GitHub",
    },
  ];

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        flexShrink: 0,
        gap: "0.5rem",
        opacity: 0.8,
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
            width: "40px",
            height: "40px",
            padding: 0,
            color: "#ffffff",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-3px) scale(1.1)",
              color: "#ffffff",
            },
            "&:active": {
              transform: "translateY(-1px) scale(1.02)",
            },
          }}
        >
          {social.icon}
        </IconButton>
      ))}
    </Stack>
  );
}
