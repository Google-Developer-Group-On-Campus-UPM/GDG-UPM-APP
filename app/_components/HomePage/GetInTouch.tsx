"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { toast } from "../../../components/ui/use-toast"


import { addDoc, collection } from "firebase/firestore"
import { db } from "@/config/firebase-config"


type GetInTouchProps = {
    contactRef: React.RefObject<HTMLDivElement>
}

const GetInTouch = ({ contactRef }: GetInTouchProps) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const dbref = collection(db, "feedback")

        try {
            await addDoc(dbref, {
                Name: name,
                Email: email,
                Message: message,
                Timestamp: new Date(),
            })

            toast({
                title: "Feedback Submitted",
                description: "Thank you for your feedback!",
            })

            setName("")
            setEmail("")
            setMessage("")
        } catch (error) {
            console.error("Error submitting feedback:", error)
            toast({
                title: "Error Submitting Feedback",
                description: "Something went wrong. Please try again.",
            })
        }
    }




    return (
        <>
            <motion.section
                ref={contactRef}
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                id="contacts-section"
            >
                <h2 className="text-3xl font-bold text-center bg-gradient-to-b from-[#ffa1a3] via-[#ff888a] to-[#ff6164] text-transparent bg-clip-text relative z-10">Get in Touch</h2>
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
        </>
    )
}
export default GetInTouch