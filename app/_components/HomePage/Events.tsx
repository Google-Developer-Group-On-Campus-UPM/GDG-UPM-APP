import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"


type EventsProps = {
    eventsRef: React.RefObject<HTMLDivElement>
}

const Events = ({ eventsRef }: EventsProps) => {

    const [activeTab, setActiveTab] = useState("future")

    const futureEvents = [
        { title: "Web Development Workshop", date: "2024-03-15", description: "Learn the basics of web development" },
        { title: "AI/ML Hackathon", date: "2024-04-22", description: "Build innovative AI solutions" },
    ]

    const pastEvents = [
        { title: "Mobile App Development", date: "2023-11-10", description: "Introduction to Android app development" },
        { title: "Cloud Computing Seminar", date: "2023-12-05", description: "Exploring cloud technologies" },
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
                <h2 className="text-3xl font-bold">Events</h2>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="future">Future Events</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="future">
                        <div className="grid gap-4 md:grid-cols-2">
                            {futureEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{event.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">Date: {event.date}</p>
                                            <p>{event.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="past">
                        <div className="grid gap-4 md:grid-cols-2">
                            {pastEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{event.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">Date: {event.date}</p>
                                            <p>{event.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.section>

        </>
    )
}
export default Events