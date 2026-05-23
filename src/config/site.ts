import { LINKS } from "@/constants/links";

export const siteConfig = {
	name: "GDGoC UPM",
	description: "Google Developer Group on Campus Universiti Putra Malaysia",
	// TODO: Add production URL here when available, e.g. "https://gdg-upm.com"
	url: "",
	ogImage: "/images/navbar/gdg-logo.svg",
	links: {
		github: LINKS.GITHUB,
		instagram: LINKS.INSTAGRAM,
	},
};

export type SiteConfig = typeof siteConfig;
