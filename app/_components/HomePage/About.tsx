
import { motion } from "framer-motion"


type AboutProps = {
    aboutRef: React.RefObject<HTMLDivElement>
}

const About = ({aboutRef}: AboutProps) => {
    return (
        <>
            <motion.section
                ref={aboutRef}
                className="space-y-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold">About Us</h2>
                <p className="text-lg text-muted-foreground">
                    Google Developer Student Clubs UPM is a community group for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome.
                </p>
                <p className="text-lg text-muted-foreground">
                    Our mission is to inspire and empower students to become innovative developers and create impactful solutions for local businesses and communities.
                </p>
            </motion.section>
        </>
    )
}
export default About