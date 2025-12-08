/**
 * FooterHeader Component
 *
 * Renders the GitHub logo link at the top of the footer.
 */

import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "@mui/material";

export default function FooterHeader() {
  return (
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
  );
}
