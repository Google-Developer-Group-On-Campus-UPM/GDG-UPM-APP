/**
 * FooterSocialLinks Component
 *
 * Renders the social media icon buttons in the footer.
 */

import {
	Facebook,
	Instagram,
	LinkedIn,
	Twitter,
	YouTube,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { LINKS } from "@/constants/links";

export default function FooterSocialLinks() {
	const socialLinks = [
		{
			href: LINKS.INSTAGRAM,
			icon: <Instagram sx={{ fontSize: "3rem" }} />,
			label: "Instagram",
		},
		{
			href: LINKS.LINKEDIN,
			icon: <LinkedIn sx={{ fontSize: "3rem" }} />,
			label: "LinkedIn",
		},
		{
			href: LINKS.TWITTER,
			icon: <Twitter sx={{ fontSize: "3rem" }} />,
			label: "Twitter",
		},
		{
			href: LINKS.YOUTUBE,
			icon: <YouTube sx={{ fontSize: "3rem" }} />,
			label: "YouTube",
		},
		{
			href: LINKS.FACEBOOK,
			icon: <Facebook sx={{ fontSize: "3rem" }} />,
			label: "Facebook",
		},
	];

	return (
		<Stack
			direction="row"
			alignItems="center"
			sx={{
				flexShrink: 0,
				gap: { xs: "1rem", md: "1rem" },
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
						width: { xs: "40px", md: "44px" },
						height: { xs: "40px", md: "44px" },
						padding: 0,
						color: "#ffffff",
						transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
						"&:hover": {
							transform: "translateY(-3px) scale(1.05)",
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
