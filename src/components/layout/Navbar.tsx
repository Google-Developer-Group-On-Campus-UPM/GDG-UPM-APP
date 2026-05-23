"use client";

import Image from "next/image";
import { FloatingNav } from "../ui/floating-navbar";
import { LINKS } from "@/constants/links";

const GDG_LOGO = <Image
	src="/images/navbar/gdg-logo.svg"
	alt="GDG Logo"
	width={64}
	height={40}
	className="object-contain"
	priority
/>;

const navItems = [
	{
		name: "",
		link: LINKS.HOME,
		icon: GDG_LOGO,
	},
	{
		name: "Home",
		link: LINKS.HOME,
	},
	{
		name: "About",
		link: LINKS.ABOUT,
	},
	{
		name: "Team",
		link: LINKS.TEAMS,
	},
	{
		name: "Events",
		link: LINKS.EVENTS,
	},
	{
		name: "Partners",
		link: LINKS.PARTNERS,
	},
];

export default function Navbar() {
	return (
		<FloatingNav
			navItems={navItems}
			ctaLink={LINKS.COMMUNITY_PLATFORM}
		/>
	);
}
