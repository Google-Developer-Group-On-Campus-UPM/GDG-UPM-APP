/**
 * FooterLinksSection Component
 *
 * Renders the grid of footer link columns.
 */

import { Box, Stack } from "@mui/material";
import FooterColumn from "./FooterColumn";
import { footerLinks } from "./footerData";

export default function FooterLinksSection() {
	return (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			flexWrap="wrap"
			sx={{
				flex: "1 1 auto",
				maxWidth: { lg: "70%" },
			}}
		>
			<Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
				<FooterColumn
					title={footerLinks.community.title}
					links={footerLinks.community.links}
				/>
			</Box>
			<Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
				<FooterColumn
					title={footerLinks.programs.title}
					links={footerLinks.programs.links}
				/>
			</Box>
			<Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
				<FooterColumn
					title={footerLinks.resources.title}
					links={footerLinks.resources.links}
				/>
			</Box>
			<Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
				<FooterColumn
					title={footerLinks.support.title}
					links={footerLinks.support.links}
				/>
			</Box>
		</Stack>
	);
}
