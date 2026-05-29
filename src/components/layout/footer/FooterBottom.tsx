/**
 * FooterBottom Component
 *
 * Renders the bottom section of the footer with copyright and social links.
 */

import { Stack } from "@mui/material";
import FooterCopyright from "./FooterCopyright";
import FooterSocialLinks from "./FooterSocialLinks";

export default function FooterBottom() {
	return (
		<Stack
			direction="row"
			justifyContent={{ xs: "center", md: "flex-start" }}
			alignItems="center"
		>
			<FooterCopyright />
		</Stack>
	);
}
