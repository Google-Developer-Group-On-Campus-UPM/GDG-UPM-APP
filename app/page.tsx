'use client'

import { useRef } from "react"


//Components
import NavBar from "./_components/NavBar"
import Home from "./_components/Home"
import About from "./_components/About"
import WhatWeDo from "./_components/WhatWeDo"
import OurTeam from "./_components/OurTeam"
import Events from "./_components/Events"
import GetInTouch from "./_components/GetInTouch"


export default function App() {

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const whatWeDoRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar homeRef={homeRef} aboutRef={aboutRef} whatWeDoRef={whatWeDoRef} teamRef={teamRef} eventsRef={eventsRef} contactRef={contactRef} />

      <main className="flex-1 container py-6 space-y-20">
        <Home homeRef={homeRef} aboutRef={aboutRef} />
        <About aboutRef={aboutRef} />
        <WhatWeDo whatWeDoRef={whatWeDoRef} />
        <OurTeam teamRef={teamRef} />
        <Events eventsRef={eventsRef} />
        <GetInTouch contactRef={contactRef} />
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GDG UPM. All rights reserved. Developed by Wong Yong Xi
      </footer>
    </div>
  )
}