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
      }}
    >
      © {new Date().getFullYear()} GOOGLE DEVELOPER GROUPS ON CAMPUS -
      UNIVERSITI PUTRA MALAYSIA | MANAGED BY GDGOC UPM R&D
    </Typography>
  );
}
