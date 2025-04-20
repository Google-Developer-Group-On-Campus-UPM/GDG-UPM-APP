import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Carousel from "@/app/_components/ui/Carousel"
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {}

type EventsProps = {
    eventsRef: React.RefObject<HTMLDivElement>
}

const Events = ({ eventsRef }: EventsProps) => {

    const [activeTab, setActiveTab] = useState("future")

    const eventList = [
        {
            title: "Building AI-Powered Image Processing Apps",
            date: "2025-04-25",
            description: "",
            image: "/images/test.png",
            link: "/test",
            dark_bg: false,
        },
        {
            title: "KitaHack 2025 Kickoff Session",
            date: "2025-02-22",
            description: "",
            image: "/images/test.png",
            link: "/test",
            dark_bg: true,
        },
        {
            title: "CSS Tailwind : From Basics to Frameworks",
            date: "2025-01-25",
            description: "",
            image: "/images/test.png",
            link: "/test",
            dark_bg: true,
        },
        {
            title: "Exploring UI/UX Design: Tools and Prototyping with Figma",
            date: "2025-01-11",
            description: "",
            image: "/images/test.png",
            link: "/test",
            dark_bg: true,
        },
    ]

    return (
        <>
            <motion.section
                ref={eventsRef}
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className={"space-y-6"}>
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-b from-[#ffa1a3] via-[#ff888a] to-[#ff6164] text-transparent bg-clip-text relative z-10">Our Events</h2>
                    <div className="max-w-full xl:w-[1280px] mx-auto">
                        <Carousel slides={eventList} options={OPTIONS} />
                    </div>
                </div>
            </motion.section>

        </>
    )
}
export default Events