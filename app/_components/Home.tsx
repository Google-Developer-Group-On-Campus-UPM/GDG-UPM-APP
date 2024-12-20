
import { motion} from "framer-motion"
import { Button } from "../../components/ui/button"

type HomeProps = {
    homeRef: React.RefObject<HTMLDivElement>
    aboutRef: React.RefObject<HTMLDivElement>
}

const Home = ({ homeRef, aboutRef } : HomeProps) => {

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <motion.section
                ref={homeRef}
                className="flex flex-col items-center justify-center space-y-4 text-center min-h-[calc(100vh-4rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Welcome to GDG UPM
                </motion.h1>
                <motion.p
                    className="max-w-[700px] text-lg text-muted-foreground sm:text-xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Empowering students to grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button onClick={() => scrollToSection(aboutRef)}>Learn More</Button>
                </motion.div>
            </motion.section>
        </>
    )
}
export default Home