
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"


type OurTeam = {
    teamRef: React.RefObject<HTMLDivElement>;
}

const OurTeam = ({ teamRef }: OurTeam) => {

    const team = [
        { name: "Alice Johnson", role: "Lead", avatar: "AJ" },
        { name: "Bob Smith", role: "Technical Lead", avatar: "BS" },
        { name: "Carol Williams", role: "Event Coordinator", avatar: "CW" },
        { name: "David Brown", role: "Marketing Lead", avatar: "DB" },
    ]
    return (
        <>
            <motion.section
                ref={teamRef}
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold">Our Team</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card>
                                <CardHeader className="flex items-center">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${member.avatar}`} alt={member.name} />
                                        <AvatarFallback>{member.avatar}</AvatarFallback>
                                    </Avatar>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardTitle>{member.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

        </>
    )
}
export default OurTeam