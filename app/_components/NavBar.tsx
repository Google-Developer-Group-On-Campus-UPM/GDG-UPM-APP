import { motion, useScroll, useSpring } from "framer-motion"
import { Button } from "../../components/ui/button"
import Image from 'next/image';

type NavBarProps = {
    homeRef: React.RefObject<HTMLDivElement>
    aboutRef: React.RefObject<HTMLDivElement>
    whatWeDoRef: React.RefObject<HTMLDivElement>
    teamRef: React.RefObject<HTMLDivElement>
    eventsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
}

const NavBar = ({homeRef, aboutRef, whatWeDoRef, teamRef, eventsRef, contactRef} : NavBarProps) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <>
            <motion.header
                className="sticky top-0 z-50 min-w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container flex h-14 items-center">
                    <div className="flex items-center space-x-2">
                        <Image src="/images/logo_gdgupm.jpg" alt="GDG UPM Logo" width={32} height={32} />
                        <span className="font-bold">GDG UPM</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
                        <Button variant="ghost" onClick={() => scrollToSection(homeRef)}>Home</Button>
                        <Button variant="ghost" onClick={() => scrollToSection(aboutRef)}>About Us</Button>
                        <Button variant="ghost" onClick={() => scrollToSection(whatWeDoRef)}>What We Do</Button>
                        <Button variant="ghost" onClick={() => scrollToSection(teamRef)}>Our Team</Button>
                        <Button variant="ghost" onClick={() => scrollToSection(eventsRef)}>Events</Button>
                        <Button variant="ghost" onClick={() => scrollToSection(contactRef)}>Get in Touch</Button>
                    </nav>
                </div>
            </motion.header>

            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
                style={{ scaleX }}
            />
        </>
    )
}
export default NavBar