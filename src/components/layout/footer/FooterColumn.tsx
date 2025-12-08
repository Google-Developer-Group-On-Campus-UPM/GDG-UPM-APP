/**
 * FooterColumn Component
 *
 * Renders a single column of footer links with a title.
 */

import { Link, Stack, Typography } from "@mui/material";

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
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
              opacity: 0.8,
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
}
