import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

const NavBar: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<>
			<nav
				className={`${poppins.className} sticky top-4 sm:top-6 md:top-8 lg:top-10 z-40 flex justify-center font-light`}
			>
				<div className="absolute z-50 h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6 py-2 backdrop-blur-md bg-gray-800/50 border border-gray-400 rounded-full w-[95%] sm:w-[90%] md:w-auto">
					<div className="flex items-center justify-between md:justify-center h-full gap-4 sm:gap-8 md:gap-14">
						{/* Logo */}
						<Image
							src="/images/navbar/gdg-logo.svg"
							alt="GDG Logo"
							width={40}
							height={40}
							className="w-8 sm:w-10 md:w-auto"
							priority
						/>

						{/* Navigation Links - Desktop */}
						<div className="hidden md:block">
							{["Home", "About", "Team", "Events", "Partners"].map((item) => (
								<span key={item}>
									<Link
										href="/"
										className="text-white text-base lg:text-lg ml-2 sm:ml-3 md:ml-4 hover:text-gray-200 transition-colors"
									>
										{item}
									</Link>
								</span>
							))}
						</div>

						{/* Mobile Menu Icon */}
						<button
							onClick={toggleSidebar}
							className="md:hidden"
							aria-label="Toggle menu"
							type="button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-6 h-6 text-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>

						{/* Apply Membership Button */}
						<div className="hidden md:block border-2 bg-linear-to-r from-[#C0C0C0] to-[#ffff] border-white backdrop-blur-md rounded-full px-4 md:px-6 py-1 cursor-pointer hover:bg-gray-100 transition-colors">
							<span className="text-gray-800 font-normal text-sm md:text-base">
								Apply Committee
							</span>
						</div>
					</div>
				</div>
			</nav>

			{/* Sidebar - Mobile */}
			<div
				className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900/95 backdrop-blur-lg transform ${
					isSidebarOpen ? "translate-x-0" : "translate-x-full"
				} transition-transform duration-300 ease-in-out md:hidden`}
			>
				<div className="flex flex-col h-full pt-20 px-4">
					{/* Close Button */}
					<button
						onClick={toggleSidebar}
						className="absolute top-4 right-4 text-white"
						aria-label="Close menu"
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Mobile Navigation Links */}
					{["Home", "About", "Team", "Events", "Partners"].map((item) => (
						<Link
							key={item}
							href="/"
							className="text-white text-lg py-4 border-b border-gray-700 hover:text-gray-300 transition-colors"
							onClick={toggleSidebar}
						>
							{item}
						</Link>
					))}

					{/* Mobile Apply Membership Button */}
					<div className="mt-auto mb-8">
						<div className="bg-linear-to-r from-[#C0C0C0] to-[#ffff] border-2 border-white rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-center">
							<span className="text-gray-800 font-medium">Apply Committee</span>
						</div>
					</div>
				</div>
			</div>

			{/* Overlay */}
			{isSidebarOpen && (
				<button
					className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
					onClick={toggleSidebar}
					aria-label="Sidebar overlay"
				/>
			)}
		</>
	);
};

export default NavBar;

// /**
//  * Navigation Bar Component
//  *
//  * Main navigation component that appears at the top of every section.
//  *
//  * Features:
//  * - Links to different sections/pages
//  * - Responsive design
//  *
//  * TODO:
//  * - Add logo/brand
//  * - Implement mobile menu toggle
//  * - Add active section highlighting
//  * - Add smooth scrolling to sections
//  */

// "use client";

// /**
//  * Navbar Component
//  *
//  * @returns JSX element containing the navigation bar
//  *
//  * Current structure:
//  * - Container with flex layout
//  * - Navigation links
//  * - Responsive spacing and hover effects
//  */
// export default function Navbar() {
//   // TODO: Add state for mobile menu toggle
//   // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // TODO: Add authentication state
//   // const { user, isAuthenticated } = useAuth();

//   /**
//    * Navbar Component Logic:
//    * 1. Check authentication state (if user is admin)
//    * 2. Handle mobile menu toggle state
//    * 3. Manage active section highlighting
//    * 4. Handle smooth scrolling to sections
//    */

//   // Authentication state management
//   // const { user, isAuthenticated } = useAuth();

//   // Mobile menu state
//   // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Active section tracking
//   // const [activeSection, setActiveSection] = useState('home');

//   // Handle mobile menu toggle
//   // const handleMobileMenuToggle = () => {
//   //   setIsMobileMenuOpen(!isMobileMenuOpen);
//   // };

//   // Handle section navigation with smooth scroll
//   // const handleSectionClick = (sectionId: string) => {
//   //   const element = document.getElementById(sectionId);
//   //   element?.scrollIntoView({ behavior: 'smooth' });
//   //   setActiveSection(sectionId);
//   //   setIsMobileMenuOpen(false); // Close mobile menu after click
//   // };

//   return (
//     /**
//      * Navbar Structure:
//      * 1. Logo/Brand section (left side)
//      * 2. Desktop navigation links (center/right)
//      * 3. Mobile menu button (mobile only)
//      * 4. Authentication buttons (login/logout)
//      * 5. Mobile menu overlay (mobile only)
//      *
//      * Navigation Links:
//      * - Home -> INPUT: onClick; OUTPUT: scroll to home section
//      * - About -> INPUT: onClick; OUTPUT: scroll to about section
//      * - Teams -> INPUT: onClick; OUTPUT: scroll to teams section
//      * - Events -> INPUT: onClick; OUTPUT: scroll to events section
//      * - Partners -> INPUT: onClick; OUTPUT: scroll to partners section
//      * - Admin -> INPUT: onClick; OUTPUT: navigate to admin page
//      */

//     <></>
//   );
// }
