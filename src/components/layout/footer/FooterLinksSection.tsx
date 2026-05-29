import { Stack } from "@mui/material";
import FooterColumn from "./FooterColumn";
import { footerLinks } from "./footerData";

export default function FooterLinksSection() {
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      flexWrap="wrap"
      useFlexGap
      gap={{ sm: "5rem", md: "1rem" }}
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
        title={footerLinks.support.title}
        links={footerLinks.support.links}
      />
    </Stack>
  );
}
