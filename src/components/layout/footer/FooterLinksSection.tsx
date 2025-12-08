/**
 * FooterLinksSection Component
 *
 * Renders the grid of footer link columns.
 */

import { Grid } from "@mui/material";
import FooterColumn from "./FooterColumn";
import { footerLinks } from "./footerData";

export default function FooterLinksSection() {
  return (
    <Grid
      container
      gap="80px"
      sx={{
        flex: "1 1 auto",
        opacity: 1,
      }}
    >
      <Grid>
        <FooterColumn
          title={footerLinks.community.title}
          links={footerLinks.community.links}
        />
      </Grid>
      <Grid>
        <FooterColumn
          title={footerLinks.programs.title}
          links={footerLinks.programs.links}
        />
      </Grid>
      <Grid>
        <FooterColumn
          title={footerLinks.resources.title}
          links={footerLinks.resources.links}
        />
      </Grid>
      <Grid>
        <FooterColumn
          title={footerLinks.support.title}
          links={footerLinks.support.links}
        />
      </Grid>
    </Grid>
  );
}
