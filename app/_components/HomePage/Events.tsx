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
            title: "",
            date: "2025-04-25",
            description: "",
            image: "/images/events/uiux.png",
            link: "https://gdg.community.dev/events/details/google-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia-presents-mastering-uiux-design-industry-insights-with-figma-1/cohost-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia",
            dark_bg: false,
        },
        {
            title: "",
            date: "2025-04-25",
            description: "",
            image: "/images/events/mobileAI.png",
            link: "https://gdg.community.dev/events/details/google-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia-presents-building-ai-powered-image-processing-apps/cohost-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia",
            dark_bg: false,
        },
        {
            title: "",
            date: "2025-04-25",
            description: "",
            image: "/images/events/flutter.png",
            link: "https://gdg.community.dev/events/details/google-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia-presents-building-ai-powered-image-processing-apps/cohost-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia",
            dark_bg: false,
        },
        {
            title: "",
            date: "2025-01-25",
            description: "",
            image: "/images/events/tailwindcss.png",
            link: "https://gdg.community.dev/events/details/google-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia-presents-css-tailwind-from-basics-to-frameworks/cohost-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia",
            dark_bg: true,
        },
        {
            title: "",
            date: "2025-01-11",
            description: "",
            image: "/images/events/figma.png",
            link: "https://gdg.community.dev/events/details/google-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia-presents-exploring-uiux-design-tools-and-prototyping-with-figma/cohost-gdg-on-campus-universiti-putra-malaysia-selangor-malaysia",
            dark_bg: true,
        },
    ];


    return (
        <>
            <motion.section
                ref={eventsRef}
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                id="events-section"
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