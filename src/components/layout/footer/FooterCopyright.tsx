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
        opacity: 0.8,
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: { xs: "14px", md: "18px", lg: "20px" },
        lineHeight: "140%",
        color: "#ffffff",
        textTransform: "uppercase",
        textAlign: { xs: "center", md: "left" },
      }}
    >
      © {new Date().getFullYear()} Google Developer Groups on Campus -
      Universiti Putra Malaysia | Managed by GDGoC UPM
    </Typography>
  );
}
