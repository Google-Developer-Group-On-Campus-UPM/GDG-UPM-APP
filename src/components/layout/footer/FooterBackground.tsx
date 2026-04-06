/**
 * FooterBackground Component
 *
 * Renders the background image for the footer.
 */

import { Box } from "@mui/material";
import Image from "next/image";

export default function FooterBackground() {
	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 0,
			}}
		>
			<Image
				src="/images/footer/bg.png"
				alt="Footer Background"
				fill
				style={{ objectFit: "cover" }}
			/>
		</Box>
	);
}
