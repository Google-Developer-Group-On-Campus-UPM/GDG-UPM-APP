'use client'

import { useState, useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState("future")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const whatWeDoRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { name, email, message })
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    setName("")
    setEmail("")
    setMessage("")
  }

  const activities = [
    { title: "Workshops", description: "Hands-on sessions on various technologies" },
    { title: "Hackathons", description: "Competitive coding events to solve real-world problems" },
    { title: "Tech Talks", description: "Insightful presentations from industry experts" },
    { title: "Project Collaborations", description: "Team-based projects to build innovative solutions" },
  ]

  const team = [
    { name: "Alice Johnson", role: "Lead", avatar: "AJ" },
    { name: "Bob Smith", role: "Technical Lead", avatar: "BS" },
    { name: "Carol Williams", role: "Event Coordinator", avatar: "CW" },
    { name: "David Brown", role: "Marketing Lead", avatar: "DB" },
  ]

  const futureEvents = [
    { title: "Web Development Workshop", date: "2024-03-15", description: "Learn the basics of web development" },
    { title: "AI/ML Hackathon", date: "2024-04-22", description: "Build innovative AI solutions" },
  ]

  const pastEvents = [
    { title: "Mobile App Development", date: "2023-11-10", description: "Introduction to Android app development" },
    { title: "Cloud Computing Seminar", date: "2023-12-05", description: "Exploring cloud technologies" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <motion.header 
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
          <Image src="/images/logo_gdgupm.jpg" alt="GDG UPM Logo" width={32} height={32} />
            <span className="font-bold">GDG UPM</span>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
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

      <main className="flex-1 container py-6 space-y-20">
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

        <motion.section 
          ref={contactRef} 
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Send Feedback</Button>
          </form>
        </motion.section>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GDG UPM. All rights reserved. Developed by Wong Yong Xi
      </footer>
    </div>
  )
}