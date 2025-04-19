
import { motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"


type WhatWeDoProps = {
    whatWeDoRef: React.RefObject<HTMLDivElement>
}
const WhatWeDo = ({whatWeDoRef}: WhatWeDoProps) => {
    const activities = [
        { title: "Workshops", description: "Hands-on sessions on various technologies" },
        { title: "Hackathons", description: "Competitive coding events to solve real-world problems" },
        { title: "Tech Talks", description: "Insightful presentations from industry experts" },
        { title: "Project Collaborations", description: "Team-based projects to build innovative solutions" },
    ]
    return (
        <>
        <motion.section
          ref={whatWeDoRef}
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">What We Do</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{activity.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        </>
    )
}
export default WhatWeDo