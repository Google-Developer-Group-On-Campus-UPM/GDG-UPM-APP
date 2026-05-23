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
				left: "50%",
				transform: "translateX(-50%)",
				width: "100%",
				maxWidth: "2560px",
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
			{/* Side Fades to blend with layout pillars starting outside 1080p limit */}
			<div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'linear-gradient(to right, black 0%, black calc(50% - 1200px), transparent calc(50% - 960px), transparent calc(50% + 960px), black calc(50% + 1200px), black 100%)' }} />
		</Box>
	);
}
