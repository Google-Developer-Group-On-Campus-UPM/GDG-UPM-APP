/**
 * FooterCopyright Component
 *
 * Renders the copyright text in the footer.
 */

import { Typography } from "@mui/material";

export default function FooterCopyright() {
	return (
		<Typography
			sx={{
				flex: "1 1 auto",
				opacity: 0.65,
				fontFamily: "Poppins",
				fontWeight: 400,
				fontSize: { xs: "12px", sm: "13px", md: "14px" },
				lineHeight: "160%",
				color: "#ffffff",
				textAlign: { xs: "center", md: "left" },
				maxWidth: { md: "600px" },
			}}
		>
			© {new Date().getFullYear()} Google Developer Groups on Campus -
			Universiti Putra Malaysia
		</Typography>
	);
}
