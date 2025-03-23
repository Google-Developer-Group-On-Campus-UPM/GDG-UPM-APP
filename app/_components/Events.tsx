import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Carousel from "@/app/_components/ui/Carousel"
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {}

type EventsProps = {
    eventsRef: React.RefObject<HTMLDivElement>
}

const Events = ({ eventsRef }: EventsProps) => {

    const [activeTab, setActiveTab] = useState("future")

    const eventList = [
        { title: "Web Development Workshop", date: "2024-03-15", description: "Learn the basics of web development", image:'/images/test.png', link:'/test' },
        { title: "AI/ML Hackathon", date: "2024-04-22", description: "Build innovative AI solutions", image:'/images/test.png', link:'/test' },
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
                <h2 className="text-3xl font-bold text-center bg-gradient-to-b from-[#ffa1a3] via-[#ff888a] to-[#ff6164] text-transparent bg-clip-text">Our Events</h2>
                <div className="max-w-full xl:w-[1280px] mx-auto">
                    <Carousel slides={eventList} options={OPTIONS} />
                </div>
            </motion.section>

        </>
    )
}
export default Events