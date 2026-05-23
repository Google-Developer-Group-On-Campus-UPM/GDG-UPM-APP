/**
 * Footer Data
 *
 * Contains all the footer links organized by section.
 */

import { LINKS } from "@/constants/links";

// TODO: Make sure all links exists
export const footerLinks = {
	community: {
		title: "COMMUNITY",
		links: [
			{ label: "About GDG on Campus UPM", href: LINKS.FOOTER_COMMUNITY_ABOUT },
			{ label: "Our Mission", href: LINKS.FOOTER_COMMUNITY_MISSION },
			{ label: "Events & Activities", href: LINKS.FOOTER_COMMUNITY_EVENTS },
			{ label: "Meet the Team", href: LINKS.FOOTER_COMMUNITY_TEAM },
			{ label: "Join the Community", href: LINKS.FOOTER_COMMUNITY_JOIN },
		],
	},
	programs: {
		title: "PROGRAMS",
		links: [
			{ label: "Study Jams", href: LINKS.FOOTER_PROGRAMS_JAMS },
			{ label: "DevFest UPM", href: LINKS.FOOTER_PROGRAMS_DEVFEST },
			{ label: "Tech Talks", href: LINKS.FOOTER_PROGRAMS_TALKS },
			{ label: "Hackathons", href: LINKS.FOOTER_PROGRAMS_HACKATHONS },
			{ label: "Workshops", href: LINKS.FOOTER_PROGRAMS_WORKSHOPS },
		],
	},
	resources: {
		title: "RESOURCES",
		links: [
			{ label: "Learning Materials", href: LINKS.FOOTER_RESOURCES_LEARNING },
			{ label: "GDG CodeLabs", href: LINKS.FOOTER_RESOURCES_CODELABS },
			{ label: "Speaker Decks", href: LINKS.FOOTER_RESOURCES_SPEAKERS },
			{ label: "Blog & Articles", href: LINKS.FOOTER_RESOURCES_BLOG },
			{ label: "Project Showcase", href: LINKS.FOOTER_RESOURCES_PROJECTS },
		],
	},
	support: {
		title: "SUPPORT",
		links: [
			{ label: "FAQs", href: LINKS.FOOTER_SUPPORT_FAQS },
			{ label: "Volunteer with Us", href: LINKS.FOOTER_SUPPORT_VOLUNTEER },
			{ label: "Partnership & Sponsorships", href: LINKS.FOOTER_SUPPORT_PARTNERSHIPS },
			{ label: "Contact Us", href: LINKS.FOOTER_SUPPORT_CONTACT },
			{ label: "Community Guidelines", href: LINKS.FOOTER_SUPPORT_GUIDELINES },
		],
	},
};
