import { LINKS } from "@/constants/links";

export const footerLinks = {
  community: {
    title: "COMMUNITY",
    links: [
      { label: "About GDG on Campus UPM", href: LINKS.FOOTER_COMMUNITY_ABOUT },
      { label: "Events & Activities", href: LINKS.FOOTER_COMMUNITY_EVENTS },
      { label: "Meet the Team", href: LINKS.FOOTER_COMMUNITY_TEAM },
      { label: "Join the Community", href: LINKS.FOOTER_COMMUNITY_JOIN },
    ],
  },
  support: {
    title: "SUPPORT",
    links: [
      { label: "FAQs", href: LINKS.FOOTER_SUPPORT_FAQS },
      { label: "Volunteer with Us", href: LINKS.FOOTER_SUPPORT_VOLUNTEER },
      {
        label: "Partnership & Sponsorships",
        href: LINKS.FOOTER_SUPPORT_PARTNERSHIPS,
      },
      { label: "Contact Us", href: LINKS.FOOTER_SUPPORT_CONTACT },
      { label: "Community Guidelines", href: LINKS.FOOTER_SUPPORT_GUIDELINES },
    ],
  },
};
