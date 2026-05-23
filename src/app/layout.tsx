import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Fonts
const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

// SEO metadata for the entire application
export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
	icons: {
		icon: "/images/navbar/gdg-logo.svg",
		shortcut: "/images/navbar/gdg-logo.svg",
		apple: "/images/navbar/gdg-logo.svg",
	},
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 800,
				height: 600,
				alt: siteConfig.name,
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("font-sans", geist.variable)}>
			<body className={`${poppins.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden`}>
				<div className="w-full relative flex flex-col min-h-screen">
					{children}
				</div>
			</body>
		</html>
	);
}
