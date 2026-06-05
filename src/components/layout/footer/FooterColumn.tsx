import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <Stack
      sx={{
        flex: "1 1 auto",
        minWidth: "140px",
        gap: "2rem",
      }}
    >
      {/* Column Header */}
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontSize: "20px",
          lineHeight: "140%",
          letterSpacing: "0.1em",
          color: "#ffffff",
          opacity: 0.8,
          mb: "4px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {title}
      </Typography>

      {/* Column Links */}
      <Stack gap="1rem">
        {links.map((link, index) => {
          const isInternal =
            link.href.startsWith("/") && !link.href.startsWith("//");
          return (
            <Link
              key={index}
              href={link.href}
              underline="hover"
              component={isInternal ? NextLink : "a"}
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              sx={{
                position: "relative",
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "200%",
                color: "#ffffff",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                display: "inline-block",
                width: "max-content",
                "&:hover": {
                  transform: "translateX(2px)",
                },
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
}
