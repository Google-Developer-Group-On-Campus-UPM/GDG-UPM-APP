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
				minWidth: "180px",
				gap: "12px",
			}}
		>
			{/* Column Header */}
			<Typography
				sx={{
					fontFamily: "Poppins",
					fontWeight: 600,
					fontSize: { xs: "16px", md: "18px" },
					lineHeight: "140%",
					letterSpacing: "0.1em",
					color: "#ffffff",
					opacity: 0.95,
					mb: "4px",
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
					gap: "4px",
				}}
			>
				{links.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						underline="none"
						sx={{
							position: "relative",
							fontFamily: "Poppins",
							fontWeight: 400,
							fontSize: { xs: "14px", md: "16px" },
							lineHeight: "200%",
							color: "#ffffff",
							opacity: 0.75,
							transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
							wordWrap: "break-word",
							overflowWrap: "break-word",
							whiteSpace: "normal",
							display: "inline-block",
							width: "fit-content",
							"&:hover": {
								opacity: 1,
								transform: "translateX(1px)",
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
