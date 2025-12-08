/**
 * FooterMascot Component
 *
 * Renders the GDG mascot image in the footer.
 */

import { Box } from "@mui/material";
import Image from "next/image";

export default function FooterMascot() {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "180px", sm: "220px", md: "280px", lg: "300px" },
        height: { xs: "180px", sm: "220px", md: "280px", lg: "300px" },
        flexShrink: 0,
        animation: "float 3s ease-in-out infinite",
        "@keyframes float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },
      }}
    >
      <Image
        src="/images/footer/mascot.png"
        alt="GDG Mascot"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </Box>
  );
}
