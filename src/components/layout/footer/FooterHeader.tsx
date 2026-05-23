/**
 * FooterHeader Component
 *
 * Renders the GitHub logo link at the top of the footer.
 */

import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "@mui/material";
import { LINKS } from "@/constants/links";

export default function FooterHeader() {
	return (
		<Link
			href={LINKS.GITHUB_ORG}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Visit our GitHub Page"
			sx={{
				color: "#ffffff",
				display: "inline-flex",
				transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
				"&:hover": {
					transform: "scale(1.05)",
					opacity: 0.9,
				},
				"&:active": {
					transform: "scale(0.98)",
				},
			}}
		>
			<GitHubIcon sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }} />
		</Link>
	);
}
