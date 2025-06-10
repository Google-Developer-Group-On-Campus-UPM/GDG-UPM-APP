
import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin']
})


const Nav = () => {
    return (
        <nav className={`${poppins.className} sticky top-10 z-50 flex justify-center font-light`}>
            <div className="absolute z-50 h-16 px-6 py-2 backdrop-blur-md bg-gray-800/50 border border-gray-400 rounded-full">
                <div className={"flex items-center justify-center h-full space-x-4 gap-14"}>

                    <img src="/images/hero/gdg-logo.svg" alt="" />

                    <div>

                        <span>
                            <Link href="/" className="text-white text-lg ml-4">
                                Home
                            </Link>
                        </span>
                        <span>
                            <Link href="/" className="text-white text-lg ml-4">
                                About
                            </Link>
                        </span>
                        <span>
                            <Link href="/" className="text-white text-lg ml-4">
                                Team
                            </Link>
                        </span>

                        <span>
                            <Link href="/" className="text-white text-lg ml-4">
                                Events
                            </Link>
                        </span>
                        <span>
                            <Link href="/" className="text-white text-lg ml-4">
                                Partners
                            </Link>
                        </span>
                    </div>


                    <div className={"border bg-white border-gray-200 w-full backdrop-blur-md rounded-full px-6 py-1 cursor-pointer"}>
                        <span className={"text-gray-800 font-medium"}>Apply Membership</span>
                    </div>


                </div>


            </div>
        </nav>
    )
}
export default Nav