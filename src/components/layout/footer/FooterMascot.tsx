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
        width: { xs: "150px", sm: "200px", md: "250px", lg: "20%" },
        height: { xs: "150px", sm: "200px", md: "250px", lg: "auto" },
        aspectRatio: 1,
        flexShrink: 0,
      }}
    >
      <Image
        src="/images/footer/mascot.png"
        alt="GDG Mascot"
        fill
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
