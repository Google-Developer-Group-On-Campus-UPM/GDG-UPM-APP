/**
 * FooterLinksSection Component
 *
 * Renders the grid of footer link columns.
 */

import { Stack } from "@mui/material";
import FooterColumn from "./FooterColumn";
import { footerLinks } from "./footerData";

export default function FooterLinksSection() {
	return (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			flexWrap="wrap"
			spacing={{ xs: 4, sm: 6, md: 8 }}
			useFlexGap
			sx={{
				flex: "1 1 auto",
				maxWidth: { lg: "70%" },
			}}
		>
			<FooterColumn
				title={footerLinks.community.title}
				links={footerLinks.community.links}
			/>
			<FooterColumn
				title={footerLinks.programs.title}
				links={footerLinks.programs.links}
			/>
			<FooterColumn
				title={footerLinks.resources.title}
				links={footerLinks.resources.links}
			/>
			<FooterColumn
				title={footerLinks.support.title}
				links={footerLinks.support.links}
			/>
		</Stack>
	);
}
