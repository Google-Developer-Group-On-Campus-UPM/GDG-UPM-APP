import { Poppins } from "next/font/google"
import Link from "next/link"
import { useState } from "react"

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin']
})

const Nav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <nav className={`${poppins.className} sticky top-4 sm:top-6 md:top-8 lg:top-10 z-50 flex justify-center font-light`}>
                <div className="absolute z-50 h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6 py-2 backdrop-blur-md bg-gray-800/50 border border-gray-400 rounded-full w-[95%] sm:w-[90%] md:w-auto">
                    <div className={"flex items-center justify-between md:justify-center h-full gap-4 sm:gap-8 md:gap-14"}>
                        {/* Logo */}
                        <img src="/images/hero/gdg-logo.svg" alt="" className="w-8 sm:w-10 md:w-auto" />

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:block">
                            {['Home', 'About', 'Team', 'Events', 'Partners'].map((item) => (
                                <span key={item}>
                                    <Link href="/" className="text-white text-base lg:text-lg ml-2 sm:ml-3 md:ml-4 hover:text-gray-200 transition-colors">
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
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Apply Membership Button */}
                        <div className={"hidden md:block border bg-white border-gray-200 backdrop-blur-md rounded-full px-4 md:px-6 py-1 cursor-pointer hover:bg-gray-100 transition-colors"}>
                            <span className={"text-gray-800 font-medium text-sm md:text-base"}>Apply Membership</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar - Mobile */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900/95 backdrop-blur-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out md:hidden`}
            >
                <div className="flex flex-col h-full pt-20 px-4">
                    {/* Close Button */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4 right-4 text-white"
                        aria-label="Close menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Mobile Navigation Links */}
                    {['Home', 'About', 'Team', 'Events', 'Partners'].map((item) => (
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
                        <div className={"border bg-white border-gray-200 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-center"}>
                            <span className={"text-gray-800 font-medium"}>Apply Membership</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
}

export default Nav