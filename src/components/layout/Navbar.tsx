"use client";

import Image from "next/image";
import { FloatingNav } from "../ui/floating-navbar";

const GDG_LOGO = <Image
	src="/images/navbar/gdg-logo.svg"
	alt="GDG Logo"
	width={64}
	height={40}
	className="object-contain"
	priority
/>

const navItems = [
	{
		name: "",
		link: "/",
		icon: GDG_LOGO,
	},
	{
		name: "Home",
		link: "/",
	},
	{
		name: "About",
		link: "#about",
	},
	{
		name: "Team",
		link: "#teams",
	},
	{
		name: "Events",
		link: "#events",
	},
	{
		name: "Partners",
		link: "#partners",
	},
];

export default function Navbar() {
	return <FloatingNav navItems={navItems} />
}
