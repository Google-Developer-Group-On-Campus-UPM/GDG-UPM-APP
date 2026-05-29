import { Stack } from "@mui/material";
import FooterCopyright from "./FooterCopyright";

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
